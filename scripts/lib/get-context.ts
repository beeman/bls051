import { getConfig } from './get-config.ts'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { mplCore } from '@metaplex-foundation/mpl-core'
import { mplCandyMachine } from '@metaplex-foundation/mpl-core-candy-machine'
import { Keypair as UmiKeypair, keypairIdentity, Umi } from '@metaplex-foundation/umi'
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys'

export interface Context {
  umi: Umi
  signerIdentity: UmiKeypair
}

export async function getContext(): Promise<Context> {
  const config = await getConfig()

  // Here we initialize the UMI instance
  const umi = createUmi(config.solanaEndpoint)
  const signerIdentity = umi.eddsa.createKeypairFromFile(config.feePayerKeypairPath)
  umi.use(mplCore())
  umi.use(mplCandyMachine())
  umi.use(keypairIdentity(signerIdentity))
  umi.use(irysUploader())

  console.log(`[Context] Connected to ${config.solanaEndpoint.split('?')[0]}`)
  console.log(`[Context] Fee payer: ${signerIdentity.publicKey}`)
  return {
    umi,
    signerIdentity,
  }
}
