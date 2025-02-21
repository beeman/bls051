import { WalletConnectionLoaderRenderer } from '../solana'
import { Box, Button, Stack } from '@mantine/core'
import { generateSigner, publicKey, some } from '@metaplex-foundation/umi'
import { useUmi } from '../solana/umi-provider-context.tsx'
import { mintV1 } from '@metaplex-foundation/mpl-core-candy-machine'
import { base58 } from '@metaplex-foundation/umi/serializers'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function FeatureHomeConnected(_props: WalletConnectionLoaderRenderer) {
  const { umi } = useUmi()
  const collection = publicKey('JE5u3tRt55qzV4SRuW8VNr8aW9XiVkQQXYTR72W2RMQ')
  const candyMachine = publicKey('7mz2zEyq3mfLPcPhqN2ST7xpCRU157xYmNemVyfbV15x')

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
