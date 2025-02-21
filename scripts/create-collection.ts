import 'dotenv/config'
import { getContext } from './lib/get-context.ts'
import pico from 'picocolors'
import {
  amountToString,
  createGenericFile,
  generateSigner,
  none,
  sol,
  some,
  TransactionSignature,
  Umi,
} from '@metaplex-foundation/umi'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { createCollection } from '@metaplex-foundation/mpl-core'
import { base58 } from '@metaplex-foundation/umi/serializers'
import { addConfigLines, create } from '@metaplex-foundation/mpl-core-candy-machine'

const { signerIdentity, umi } = await getContext()

const balance = await umi.rpc.getBalance(signerIdentity.publicKey)
console.log(`[Fee Payer] Balance: ${amountToString(balance)} SOL`)

// Step 1: Update to collection image and store the URI
console.log(pico.whiteBright(`[ STEP 1 ] Uploading the collection image`))
const { collectionImageUri, collectionMetadataUri } = await uploadCollectionImage(umi, {
  collectionImage: join(process.cwd(), 'collection/assets/collection.png'),
})

console.log(`[ STEP 1 ] Collection metadata URI: ${collectionMetadataUri} and image URI: ${collectionImageUri}`)

// Step 2: Upload the assets and store the URI
console.log(pico.whiteBright(`[ STEP 2 ] Uploading the assets`))
const assetConfigLines: { name: string; uri: string }[] = []
const assetCount = 16 // The Numbers collection has 16 assets
for (let i = 0; i < assetCount; i++) {
  const { assetImageUri, assetName, assetMetadataUri } = await uploadAssetImage(umi, {
    assetImage: join(process.cwd(), `collection/assets/${i}.png`),
    i,
  })
  console.log(`[ STEP 2 ] Asset ${i} ${assetName} metadata URI: ${assetMetadataUri} and image URI: ${assetImageUri}`)
  assetConfigLines.push({
    name: assetName,
    uri: assetMetadataUri,
  })
}

console.log(pico.gray(`[ STEP 2 ] Uploaded ${assetConfigLines.length} assets`))

console.log(pico.whiteBright(`[ STEP 3 ] Creating the collection...`))
const collectionKeypair = generateSigner(umi)
const collection = collectionKeypair.publicKey

const createCollectionSignature = await createCollection(umi, {
  collection: collectionKeypair,
  name: 'Numbers BLS051',
  uri: collectionMetadataUri,
}).sendAndConfirm(umi)

console.log(
  `[ STEP 3 ] Collection ${collection} created, signature: ${signatureToStr(createCollectionSignature.signature)}`,
)

console.log(pico.whiteBright(`[ STEP 4 ] Creating the Candy Machine...`))

const candyMachineKeypair = generateSigner(umi)
const candyMachine = candyMachineKeypair.publicKey
const createCandyMachineTx = await create(umi, {
  candyMachine: candyMachineKeypair,
  collection,
  collectionUpdateAuthority: umi.identity,
  itemsAvailable: 10,
  configLineSettings: none(),
  hiddenSettings: none(),
  guards: {
    // bot tax
    botTax: some({
      lamports: sol(0.1),
      lastInstruction: true,
    }),
    // sol payment
    solPayment: some({
      lamports: sol(0.1),
      destination: umi.identity.publicKey,
    }),
  },
})

const createCandyMachineSig = await createCandyMachineTx.sendAndConfirm(umi, {
  send: { skipPreflight: true },
})

console.log('createCandyMachineSig', signatureToStr(createCandyMachineSig.signature))
console.log(`Candy Machine: ${candyMachine}`)
//
//Step 6: Add configLinks to the Candy Machine.
//
// We need to loop over the assetConfigLines and add them to the Candy Machine, we do 10 at a time
// to avoid hitting the transaction size limit.
const addConfigLinkIxs = []
for (let i = 0; i < assetConfigLines.length; i += 10) {
  const ix = addConfigLines(umi, {
    candyMachine: candyMachineKeypair.publicKey,
    index: i,
    configLines: assetConfigLines.slice(i, i + 10),
  })
  addConfigLinkIxs.push(ix)
}

console.log(
  pico.whiteBright(`[ STEP 5 ] Adding config links to the Candy Machine. ${addConfigLinkIxs.length} transactions`),
)
let i = 0
for (const ix of addConfigLinkIxs) {
  const addConfigLineSig = await ix.sendAndConfirm(umi, {
    send: { skipPreflight: true },
  })
  console.log(
    pico.gray(
      `[ STEP 5 ] addConfigLineSig ${i++}/${addConfigLinkIxs.length} ${signatureToStr(addConfigLineSig.signature)}`,
    ),
  )
}

console.log(pico.greenBright(`[ STEP 6 ] Collection: ${collection}`))
console.log(pico.greenBright(`[ STEP 6 ] Candy Machine: ${candyMachine}`))
console.log(pico.whiteBright(`[ STEP 6 ] Done`))

async function uploadCollectionImage(umi: Umi, { collectionImage }: { collectionImage: string }) {
  console.log(pico.gray(`[ uploadCollectionAssets ] Uploading the collection image`))
  const content = await readFile(collectionImage)
  const collectionImageUri = await umi.uploader
    .upload([
      createGenericFile(content, 'collection.png', {
        tags: [{ name: 'content-type', value: 'image/png' }],
        contentType: 'image/png',
        extension: 'png',
      }),
    ])
    // We are only interested in the first URI
    .then((uri) => uri[0])

  console.log(pico.gray(`[ uploadCollectionAssets ] Collection image URI: ${collectionImageUri}`))

  console.log(pico.gray(`[ uploadCollectionAssets ] Uploading the collection metadata`))
  const collectionMetadataData = {
    name: 'Numbers BLS051',
    symbol: 'NUMBERS',
    description: 'Awesome numbers 0 - 10',
    image: collectionImageUri,
    properties: {
      files: [{ uri: collectionImageUri, type: 'image/png' }],
    },
  }
  const collectionMetadataUri = await umi.uploader.uploadJson(collectionMetadataData)
  console.log(pico.gray(`[ uploadCollectionAssets ] Collection metadata URI: ${collectionMetadataUri}`))

  return {
    collectionImageUri,
    collectionMetadataUri,
  }
}

async function uploadAssetImage(umi: Umi, { assetImage, i }: { assetImage: string; i: number }) {
  console.log(pico.gray(`[ uploadAssetAssets ] Uploading the asset image ${i} ${assetImage}`))
  const content = await readFile(assetImage)
  const assetImageUri = await umi.uploader
    .upload([
      createGenericFile(content, 'asset.png', {
        tags: [{ name: 'content-type', value: 'image/png' }],
        contentType: 'image/png',
        extension: 'png',
      }),
    ])
    // We are only interested in the first URI
    .then((uri) => uri[0])

  console.log(pico.gray(`[ uploadAssetAssets ] Asset image URI: ${assetImageUri}`))

  const assetMetadataData = {
    name: `Number ${i}`,
    symbol: `NUMBER${i}`,
    description: `Awesome number ${i}`,
    image: assetImageUri,
    properties: {
      files: [{ uri: assetImageUri, type: 'image/png' }],
    },
  }
  const assetMetadataUri = await umi.uploader.uploadJson(assetMetadataData)
  console.log(pico.gray(`[ uploadAssetAssets ] Asset metadata URI: ${assetMetadataUri}`))

  return {
    assetImageUri,
    assetName: assetMetadataData.name,
    assetMetadataUri,
  }
}

function signatureToStr(signatureBytes: TransactionSignature) {
  const [str] = base58.deserialize(signatureBytes)
  return str
}
