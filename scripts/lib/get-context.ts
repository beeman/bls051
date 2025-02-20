import { Connection, Keypair } from '@solana/web3.js'
import { getConfig } from './get-config.ts'
import { getKeypairFromByteArray } from './get-keypair-from-byte-array.ts'

export interface Context {
  connection: Connection
  feePayer: Keypair
  // TODO: Add UMI here
  // umi: Umi
}

export async function getContext(): Promise<Context> {
  const config = await getConfig()

  const feePayer = getKeypairFromByteArray(config.feePayerKeypair)
  const connection = new Connection(config.solanaEndpoint, 'confirmed')
  // TODO: Initialize UMI here
  // const umi = ...

  console.log(`[Context] Connected to ${config.solanaEndpoint.split('?')[0]}`)
  console.log(`[Context] Fee payer: ${feePayer.publicKey.toString()}`)
  return {
    connection,
    feePayer,
    // TODO: Expose UMI here
    // umi,
  }
}
