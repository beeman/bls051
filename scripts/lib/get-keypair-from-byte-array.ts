import { Keypair } from '@solana/web3.js'

export function getKeypairFromByteArray(keypair: string): Keypair {
  try {
    const keypairBytes = JSON.parse(keypair)
    return Keypair.fromSecretKey(new Uint8Array(keypairBytes))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    throw new Error('Invalid keypair')
  }
}
