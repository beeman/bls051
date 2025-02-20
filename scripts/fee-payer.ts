import { getContext } from './lib/get-context.ts'

const { connection, feePayer } = await getContext()

const balance = await connection.getBalance(feePayer.publicKey)
console.log(`[Fee Payer] Balance: ${balance / 1e9} SOL`)
