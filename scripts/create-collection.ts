import 'dotenv/config'
import { getContext } from './lib/get-context.ts'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { mplCore } from '@metaplex-foundation/mpl-core'
import { keypairIdentity, publicKey } from '@metaplex-foundation/umi'
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys'
import { mplCandyMachine } from '@metaplex-foundation/mpl-core-candy-machine'

const { connection, feePayer } = await getContext()

// const balance = await connection.getBalance(feePayer.publicKey)
// console.log(`[Fee Payer] Balance: ${balance / 1e9} SOL`)

const umi = createUmi('https://api.devnet.solana.com')
const signerIdentity = umi.eddsa.createKeypairFromFile(process.env.FEE_PAYER_KEYPAIR!)
umi.use(mplCore())
umi.use(mplCandyMachine())
umi.use(keypairIdentity(signerIdentity))
umi.use(irysUploader())

console.log('signerIdentity', signerIdentity.publicKey.toString())

// // Step 1: Create the Collection URI (Assets on Irys)
// const collectionImage = join(process.cwd(), 'collection/assets/collection.png')
// const collectionImageUri = await umi.uploader.upload([
//   createGenericFile(await readFile(collectionImage), 'collection.png', {
//     tags: [{ name: 'content-type', value: 'image/png' }],
//     contentType: 'image/png',
//     extension: 'png',
//   }),
// ])
//
// console.log('collectionImageUri', collectionImageUri)

// STEP 2: upload collection.json

const collectionImageUploaded = 'https://devnet.irys.xyz/AkGcKrUvCtzz77VA69jxW1z35PE4wjBG5pC1rAc2EVgp'
// const collectionMetadataData = {
//   name: 'Numbers BLS051',
//   description: 'Awesome numbers 0 - 10',
//   image: collectionImageUploaded,
//   properties: {
//     files: [{ uri: collectionImageUploaded, type: 'image/png' }],
//   },
// }
// const collectionMetadataUploaded = await umi.uploader.uploadJson(collectionMetadataData)
// console.log(collectionMetadataUploaded)

// Step 3 - create the MPL Core collection onchain with the metadata.
// const collectionMetadataUploadedUri = 'https://gateway.irys.xyz/8AXQFfQRx8uXhmTCuKmbvaFTrYEzjMjY5sSR1M9bxDPE'
// const collectionKeypair = generateSigner(umi)
// const createCollectionSignature = await createCollection(umi, {
//   collection: collectionKeypair,
//   name: 'Numbers BLS051',
//   uri: collectionMetadataUploadedUri,
// }).sendAndConfirm(umi)
//
// console.log('createCollectionSignature', base58.deserialize(createCollectionSignature.signature)[0])
// // sig: ng3rgQ7vS3py1dA8r77xExsJ2VCxJvsZ1yrYv1CwQDk196J6r48DzjFnM3jLEXYFFDcU1MwcbRT2ChyY47xyJ2v
// account https://explorer.solana.com/address/6k3ANB6jCDDnnF3ULibzBP2N34ZP3yixr8dHeza4Zi2g?cluster=devnet

const collection = publicKey('6k3ANB6jCDDnnF3ULibzBP2N34ZP3yixr8dHeza4Zi2g')

console.log(`Collection: ${collection}`)

// STEP 4: Create the Candy Machine.

// const candyMachineKeypair = generateSigner(umi)
//
// const createCandyMachineTx = await create(umi, {
//   candyMachine: candyMachineKeypair,
//   // mplCoreProgram: MPL_CORE_PROGRAM_ID,
//   collection,
//   collectionUpdateAuthority: umi.identity,
//   itemsAvailable: 10,
//   configLineSettings: none(),
//   hiddenSettings: none(),
//   guards: {
//     // bot tax
//     botTax: some({
//       lamports: sol(0.1),
//       lastInstruction: true,
//     }),
//     // sol payment
//     solPayment: some({
//       lamports: sol(0.1),
//       destination: umi.identity.publicKey,
//     }),
//   },
// })
//
// const createCandyMachineSig = await createCandyMachineTx.sendAndConfirm(umi, {
//   send: { skipPreflight: true },
// })
//
// console.log('createCandyMachineSig', base58.deserialize(createCandyMachineSig.signature)[0])

// STEP 5: Add assets to the Candy Machine.

// async function uploadAsset(num: number): Promise<{ name: string; uri: string }> {
//   if (num < 0 || num > 10) {
//     throw new Error('Asset number must be between 0 and 10')
//   }
//
//   const assetPath = join(process.cwd(), `collection/assets/${num}.png`)
//   const assetFile = createGenericFile(await readFile(assetPath), `${num}.png`, {
//     tags: [{ name: 'content-type', value: 'image/png' }],
//     contentType: 'image/png',
//     extension: 'png',
//   })
//
//   const [uploadedUri] = await umi.uploader.upload([assetFile])
//   return { name: `Number ${num}`, uri: uploadedUri }
// }
//
// async function uploadAllAssets(): Promise<{ name: string; uri: string }[]> {
//   const uploadPromises = Array.from({ length: 11 }, (_, i) => uploadAsset(i))
//   return await Promise.all(uploadPromises)
// }
//
// const configLines = await uploadAllAssets()
//   .then((configLines) => console.log(configLines))
//   .catch(console.error)

// console.log('configLines', configLines)

const candyMachine = publicKey('EuuM6yVY5ezaDAF5aCJVTMEc2mb1entcHWDux73ZfNzM')

const configLines = [
  {
    name: 'Number 0',
    uri: 'https://gateway.irys.xyz/9uBUaRukMAZZf4W5zpVr3N76fBzuVGEDupmWyUa32rDr',
  },
  {
    name: 'Number 1',
    uri: 'https://gateway.irys.xyz/Fvf9wbvZy3ambH4DBrqVtMiyXJ9hh899Q9v4qptL59Pp',
  },
  {
    name: 'Number 2',
    uri: 'https://gateway.irys.xyz/D29Niprmf3HYRygX48aQWVdeXTHa7aPDr9tmJQwZznV6',
  },
  {
    name: 'Number 3',
    uri: 'https://gateway.irys.xyz/22ahrG6TjVKf4W1ZR49tNuP7D9or3kW2gX75XJGPjvez',
  },
  {
    name: 'Number 4',
    uri: 'https://gateway.irys.xyz/E58koHBgrjVrcJhkyRfMHfw48upe7jDBuBeK798fW2eP',
  },
  {
    name: 'Number 5',
    uri: 'https://gateway.irys.xyz/EjAc74fyqmjk8CdnAdNF129rc6q2kmgXaqEYNy5D7KqZ',
  },
  {
    name: 'Number 6',
    uri: 'https://gateway.irys.xyz/Bdzaiv82TghCBRHVnsA1ZKxxbY3G49CkmQVwBWetuyw8',
  },
  {
    name: 'Number 7',
    uri: 'https://gateway.irys.xyz/3gBerS5NPVmu5GC2EMxmqYeRkLcMtKduv9RxG99F5an2',
  },
  {
    name: 'Number 8',
    uri: 'https://gateway.irys.xyz/3nqAocS228WZ2qZ3sn6ZaxMDUnU81ruLixfxQ6VJwaXD',
  },
  {
    name: 'Number 9',
    uri: 'https://gateway.irys.xyz/CppqerRtQdS6rSuuFoNU8JwR7iNUgqhqRHhpTc6Xqfd1',
  },
  // {
  //   name: 'Number 10',
  //   uri: 'https://gateway.irys.xyz/Dz8v43fFRN45NWp8j6n2TEaHQc3PE7fwNm8oPLGxK1Dp',
  // },
]

// Step 6: Add configLinks to the Candy Machine.

// const addConfigLinkIx = addConfigLines(umi, {
//   candyMachine,
//   index: 0,
//   configLines,
// })
//
// const addConfigLineSig = await addConfigLinkIx.sendAndConfirm(umi, {
//   send: { skipPreflight: true },
// })
//
// console.log('addConfigLineSig', base58.deserialize(addConfigLineSig.signature)[0])
