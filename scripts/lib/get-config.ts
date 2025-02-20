import 'dotenv/config'
import { readFile } from 'node:fs/promises'
import { homedir } from 'node:os'

export interface Config {
  feePayerKeypair: string
  solanaEndpoint: string
}

export async function getConfig(): Promise<Config> {
  const feePayerKeypairPath = process.env.FEE_PAYER_KEYPAIR
  const solanaEndpoint = process.env.SOLANA_ENDPOINT

  if (!feePayerKeypairPath) {
    throw new Error('FEE_PAYER_KEYPAIR is not set')
  }
  const feePayerKeypair = await readFile(feePayerKeypairPath.replace('~', homedir()), 'utf-8')

  if (!feePayerKeypair) {
    throw new Error('Error reading FEE_PAYER_KEYPAIR ${feePayerKeypairPath}')
  }

  if (!solanaEndpoint) {
    throw new Error('SOLANA_ENDPOINT is not set')
  }

  return {
    feePayerKeypair,
    solanaEndpoint,
  }
}
