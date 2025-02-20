import { WalletConnectionLoaderRenderer } from '../solana'
import { Box, Button, Stack } from '@mantine/core'
import { base58, generateSigner, publicKey, some } from '@metaplex-foundation/umi'
import { useUmi } from '../solana/umi-provider-context.tsx'
import { mintV1 } from '@metaplex-foundation/mpl-core-candy-machine'

export function FeatureHomeConnected(props: WalletConnectionLoaderRenderer) {
  // const mutationRequestAirdrop = useRequestAirdrop(props)
  // const queryBalance = useBalance(props)
  // const balance = queryBalance.data ? (queryBalance.data / 1e9).toFixed(2) : '0'
  const { umi } = useUmi()
  const collection = publicKey('6k3ANB6jCDDnnF3ULibzBP2N34ZP3yixr8dHeza4Zi2g')
  const candyMachine = publicKey('EuuM6yVY5ezaDAF5aCJVTMEc2mb1entcHWDux73ZfNzM')

  async function mint() {
    const assetKeypair = generateSigner(umi)
    console.log('assetKeypair', assetKeypair)
    const mintTx = await mintV1(umi, {
      candyMachine,
      collection,
      asset: assetKeypair,
      mintArgs: {
        solPayment: some({
          destination: publicKey('BLSY4UjKk3T2fop3U6iMEguzirASTFBWpgZaGgzHoFmk'),
        }),
      },
    }).sendAndConfirm(umi)

    console.log(`mintTx`, base58.deserialize(mintTx.signature)[0])
  }

  return (
    <Stack align="flex-start">
      <Button
        onClick={() => {
          mint()
        }}
      >
        Mint
      </Button>
      <Box component="pre" fz="xs">
        {JSON.stringify(
          {
            candyMachine,
          },
          null,
          2,
        )}
      </Box>
    </Stack>
  )
}
