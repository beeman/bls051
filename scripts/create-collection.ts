import 'dotenv/config'
import { getContext } from './lib/get-context.ts'
import pico from 'picocolors'
import {
  amountToString,
  generateSigner,
  none,
  publicKey,
  sol,
  some,
  TransactionSignature,
} from '@metaplex-foundation/umi'
import { findAssociatedTokenPda } from '@metaplex-foundation/mpl-toolbox'
import { base58 } from '@metaplex-foundation/umi/serializers'
import { addConfigLines, create, getMerkleRoot } from '@metaplex-foundation/mpl-core-candy-machine'

const { signerIdentity, umi } = await getContext()

const balance = await umi.rpc.getBalance(signerIdentity.publicKey)
console.log(`[Fee Payer] Balance: ${amountToString(balance)} SOL`)

// // Step 1: Update to collection image and store the URI
// console.log(pico.whiteBright(`[ STEP 1 ] Uploading the collection image`))
// const { collectionImageUri, collectionMetadataUri } = await uploadCollectionImage(umi, {
//   collectionImage: join(process.cwd(), 'collection/assets/collection.png'),
// })
//
// console.log(`[ STEP 1 ] Collection metadata URI: ${collectionMetadataUri} and image URI: ${collectionImageUri}`)
//
// // Step 2: Upload the assets and store the URI
// console.log(pico.whiteBright(`[ STEP 2 ] Uploading the assets`))
// const assetConfigLines: { name: string; uri: string }[] = []
// const assetCount = 16 // The Numbers collection has 16 assets
// for (let i = 0; i < assetCount; i++) {
//   const { assetImageUri, assetName, assetMetadataUri } = await uploadAssetImage(umi, {
//     assetImage: join(process.cwd(), `collection/assets/${i}.png`),
//     i,
//   })
//   console.log(`[ STEP 2 ] Asset ${i} ${assetName} metadata URI: ${assetMetadataUri} and image URI: ${assetImageUri}`)
//   assetConfigLines.push({
//     name: assetName,
//     uri: assetMetadataUri,
//   })
// }
//
// console.log(pico.gray(`[ STEP 2 ] Uploaded ${assetConfigLines.length} assets`))
const assetConfigLines = [
  {
    name: 'Number 0',
    uri: 'https://gateway.irys.xyz/9jza5gBW4F5k4J7Ldmar5mF2bokDvPJJyN13fhndBb5L',
  },
  {
    name: 'Number 1',
    uri: 'https://gateway.irys.xyz/34ArU3AYn68VdG4zVdJ2AJj4zP9nsKm4ohQU5vaPZS6a',
  },
  {
    name: 'Number 2',
    uri: 'https://gateway.irys.xyz/D3e5anzvyLADrkCfnfPsFxbZUupb8vDnhaJ1iEjyBxxU',
  },
  {
    name: 'Number 3',
    uri: 'https://gateway.irys.xyz/D8SqucqLSj5cSmB4CKi17To1cJxu98B6gika7Nx7N2XH',
  },
  {
    name: 'Number 4',
    uri: 'https://gateway.irys.xyz/8xpUSbjh63XVod7bEqbyvc37Md4USFJQYcJdpE3HiWQ6',
  },
  {
    name: 'Number 5',
    uri: 'https://gateway.irys.xyz/CBoWaTejWRUKymdWfpZg5kkzTKF3twoYSXJse6yYaZHo',
  },
  {
    name: 'Number 6',
    uri: 'https://gateway.irys.xyz/GJ8X6Hoqrv6m3sncB2aSYr9QP3P679CueHefBf4Fvt83',
  },
  {
    name: 'Number 7',
    uri: 'https://gateway.irys.xyz/BHf6AumMSwr6yYyt3KrdxYBH9YgKXYj334aCGsPxnbD9',
  },
  {
    name: 'Number 8',
    uri: 'https://gateway.irys.xyz/Gin1phWu68197q3f3aAUEQZaTX5WVq1zkErAyMfAyeY9',
  },
  {
    name: 'Number 9',
    uri: 'https://gateway.irys.xyz/9R1PFW6YwT1jNwdA3HKHQHZ23fr6NPBVfBSfLxCAHXh8',
  },
  {
    name: 'Number 10',
    uri: 'https://gateway.irys.xyz/AVQzzx4FNprQ2MTCUkJhw2jkYH2JV7gVf2AaMpuvfkz6',
  },
  {
    name: 'Number 11',
    uri: 'https://gateway.irys.xyz/7u5aFVdoKeCp1kZf963ZM6rcbcibz7P9KdkhZ3a74ujr',
  },
  {
    name: 'Number 12',
    uri: 'https://gateway.irys.xyz/GKHLsW55Wc5CGS2MGF7eSi8fr9GkmffZW9oEpVnCK78h',
  },
  {
    name: 'Number 13',
    uri: 'https://gateway.irys.xyz/EBVFREBYSu6LQZg4qQaZ9rCMhkoNPgQ3AGvD7gR55no',
  },
  {
    name: 'Number 14',
    uri: 'https://gateway.irys.xyz/2UpiLmkZbRBne9dRYnKws3G1ovqYtbGDt2NerHbZ2ivw',
  },
  {
    name: 'Number 15',
    uri: 'https://gateway.irys.xyz/4GXXvAeQyUHL4rN5Mmjm6rJ29kjZK9o6pBHbGm3YH7Ex',
  },
]

// console.log(JSON.stringify(assetConfigLines, null, 2))

console.log(pico.whiteBright(`[ STEP 3 ] Creating the collection...`))
// const collectionKeypair = generateSigner(umi)
// const collection = collectionKeypair.publicKey
const collection = publicKey('3AmhBfmz9vhZ9mx9XhpZZxSME8R2vNSeBVSLRpnSxi8y')

// const createCollectionSignature = await createCollection(umi, {
//   collection: collectionKeypair,
//   name: 'Numbers BLS051',
//   uri: collectionMetadataUri,
// }).sendAndConfirm(umi)
//
// console.log(
//   `[ STEP 3 ] Collection ${collection} created, signature: ${signatureToStr(createCollectionSignature.signature)}`,
// )

console.log(pico.whiteBright(`[ STEP 4 ] Creating the Candy Machine...`))

const allowList = [
  'BLSY4UjKk3T2fop3U6iMEguzirASTFBWpgZaGgzHoFmk',
  'BeEMuaaQCQPodQdaA7W6Rmsu7761vCabN4Tth6jA4VCP',
  '9BsCWaNtVKmRJbKJUMCjdfpABAKkaBptYB4qCuXnqx5D',
]
const merkleRoot = getMerkleRoot(allowList)

// const endDateWhitelist = dateTime('2025-02-28T00:00:00Z')
// const endDatePublic = dateTime('2025-03-1T00:00:00Z')
const mint = publicKey('HzwqbKZw8HxMN6bF2yFZNrht3c2iXXzpKcFu7uBEDKtr')
const destinationAta = findAssociatedTokenPda(umi, {
  mint,
  owner: umi.identity.publicKey,
})[0]

const candyMachineKeypair = generateSigner(umi)
const candyMachine = candyMachineKeypair.publicKey
const createCandyMachineTx = await create(umi, {
  candyMachine: candyMachineKeypair,
  collection,
  collectionUpdateAuthority: umi.identity,
  itemsAvailable: assetConfigLines.length,
  configLineSettings: none(),
  hiddenSettings: none(),
  // Groups
  //  - label: grp1
  //    - Whitelist, based one or more addresses
  //    - 0.1 SOL payment
  //    - Need to mind in 24 hours
  //  - label: whitelistEurc
  //    - Whitelist, based one or more addresses
  //    - OR 5 EURC payment
  //    - Need to mind in 24 hours
  //  - label: publicSol
  //    - 0.2 SOL payment
  //    - Need to mind in 72 hours
  //  - label: publicEurc
  //    - 10 EURC payment
  //    - Need to mind in 72 hours

  guards: {
    // bot tax (applies to all the groups)
    botTax: some({
      lamports: sol(0.1),
      lastInstruction: true,
    }),
  },
  groups: [
    {
      label: 'grp1',
      guards: {
        // these addresses are allowed to mint
        allowList: some({ merkleRoot }),
        // sol payment
        solPayment: some({ lamports: sol(0.1), destination: umi.identity.publicKey }),
        // need to mint in 24 hours
        // endDate: some({ date: endDateWhitelist }),
      },
    },
    {
      label: 'grp2',
      guards: {
        // these addresses are allowed to mint
        allowList: some({ merkleRoot }),
        // 5 EURC payment
        tokenPayment: some({ amount: 5, mint, destinationAta }),
        // If you want a Token 2022 payment, you need to use this guard
        // token2022Payment: some({ amount: 5, mint: token2022Mint, destinationAta }),
        // need to mint in 24 hours
        // endDate: some({ date: endDateWhitelist }),
      },
    },
    {
      label: 'grp3',
      guards: {
        // sol payment
        solPayment: some({ lamports: sol(0.2), destination: umi.identity.publicKey }),
        // need to mint in 72 hours
        // endDate: some({ date: endDatePublic }),
      },
    },
    {
      label: 'grp4',
      guards: {
        // 10 EURC payment
        tokenPayment: some({ amount: 10, mint, destinationAta }),
        // If you want a Token 2022 payment, you need to use this guard
        // token2022Payment: some({ amount: 10, mint: token2022Mint, destinationAta }),
        // need to mint in 72 hours
        // endDate: some({ date: endDatePublic }),
      },
    },
  ],
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

// async function uploadCollectionImage(umi: Umi, { collectionImage }: { collectionImage: string }) {
//   console.log(pico.gray(`[ uploadCollectionAssets ] Uploading the collection image`))
//   const content = await readFile(collectionImage)
//   const collectionImageUri = await umi.uploader
//     .upload([
//       createGenericFile(content, 'collection.png', {
//         tags: [{ name: 'content-type', value: 'image/png' }],
//         contentType: 'image/png',
//         extension: 'png',
//       }),
//     ])
//     // We are only interested in the first URI
//     .then((uri) => uri[0])
//
//   console.log(pico.gray(`[ uploadCollectionAssets ] Collection image URI: ${collectionImageUri}`))
//
//   console.log(pico.gray(`[ uploadCollectionAssets ] Uploading the collection metadata`))
//   const collectionMetadataData = {
//     name: 'Numbers BLS051',
//     symbol: 'NUMBERS',
//     description: 'Awesome numbers 0 - 10',
//     image: collectionImageUri,
//     properties: {
//       files: [{ uri: collectionImageUri, type: 'image/png' }],
//     },
//   }
//   const collectionMetadataUri = await umi.uploader.uploadJson(collectionMetadataData)
//   console.log(pico.gray(`[ uploadCollectionAssets ] Collection metadata URI: ${collectionMetadataUri}`))
//
//   return {
//     collectionImageUri,
//     collectionMetadataUri,
//   }
// }

// async function uploadAssetImage(umi: Umi, { assetImage, i }: { assetImage: string; i: number }) {
//   console.log(pico.gray(`[ uploadAssetAssets ] Uploading the asset image ${i} ${assetImage}`))
//   const content = await readFile(assetImage)
//   const assetImageUri = await umi.uploader
//     .upload([
//       createGenericFile(content, 'asset.png', {
//         tags: [{ name: 'content-type', value: 'image/png' }],
//         contentType: 'image/png',
//         extension: 'png',
//       }),
//     ])
//     // We are only interested in the first URI
//     .then((uri) => uri[0])
//
//   console.log(pico.gray(`[ uploadAssetAssets ] Asset image URI: ${assetImageUri}`))
//
//   const assetMetadataData = {
//     name: `Number ${i}`,
//     symbol: `NUMBER${i}`,
//     description: `Awesome number ${i}`,
//     image: assetImageUri,
//     properties: {
//       files: [{ uri: assetImageUri, type: 'image/png' }],
//     },
//   }
//   const assetMetadataUri = await umi.uploader.uploadJson(assetMetadataData)
//   console.log(pico.gray(`[ uploadAssetAssets ] Asset metadata URI: ${assetMetadataUri}`))
//
//   return {
//     assetImageUri,
//     assetName: assetMetadataData.name,
//     assetMetadataUri,
//   }
// }

function signatureToStr(signatureBytes: TransactionSignature) {
  const [str] = base58.deserialize(signatureBytes)
  return str
}
