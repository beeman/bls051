import 'dotenv/config'

export interface Config {
  feePayerKeypairPath: string
  solanaEndpoint: string
}

export async function getConfig(): Promise<Config> {
  const feePayerKeypairPath = process.env.FEE_PAYER_KEYPAIR_PATH
  const solanaEndpoint = process.env.SOLANA_ENDPOINT

  if (!feePayerKeypairPath) {
    throw new Error('FEE_PAYER_KEYPAIR_PATH is not set')
  }

  if (!solanaEndpoint) {
    throw new Error('SOLANA_ENDPOINT is not set')
  }

  return {
    feePayerKeypairPath,
    solanaEndpoint,
  }
}
