import { WalletConnectionLoaderRenderer } from '../solana'
import { Box, Button, Group, Loader, Stack } from '@mantine/core'
import { generateSigner, publicKey, sol, some } from '@metaplex-foundation/umi'
import { useUmi } from '../solana/umi-provider-context.tsx'
import {
  DefaultGuardSetMintArgs,
  fetchCandyGuard,
  fetchCandyMachine,
  getMerkleProof,
  getMerkleRoot,
  mintV1,
} from '@metaplex-foundation/mpl-core-candy-machine'
import { base58 } from '@metaplex-foundation/umi/serializers'
import { useQuery } from '@tanstack/react-query'

const allowList = [
  'BLSY4UjKk3T2fop3U6iMEguzirASTFBWpgZaGgzHoFmk',
  'BeEMuaaQCQPodQdaA7W6Rmsu7761vCabN4Tth6jA4VCP',
  '9BsCWaNtVKmRJbKJUMCjdfpABAKkaBptYB4qCuXnqx5D',
]
const merkleRoot = getMerkleRoot(allowList)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function FeatureHomeConnected(_props: WalletConnectionLoaderRenderer) {
  const { umi } = useUmi()
  const merkleProof = getMerkleProof(allowList, umi.identity.publicKey)
  const candyMachine = publicKey('Au3AaL5i52jKJvFMZE37etmeyeWR7G2RT28kyi3eRvaE')

  const queryCm = useQuery({
    queryKey: ['cm', candyMachine],
    queryFn: async () => {
      return await fetchCandyMachine(umi, candyMachine).then(async (cmResult) => {
        const cmGuard = await fetchCandyGuard(umi, cmResult.mintAuthority)
        return { cmResult, cmGuard }
      })
    },
  })

  async function mintWithProof() {}

  async function mint({ groupName, mintArgs }: { groupName: string; mintArgs: Partial<DefaultGuardSetMintArgs> }) {
    const collection = queryCm.data?.cmResult.collectionMint
    if (!collection) {
      throw new Error('Collection not found')
    }

    const assetKeypair = generateSigner(umi)
    console.log('assetKeypair', assetKeypair, { groupName, mintArgs })
    const mintTx = mintV1(umi, {
      candyMachine,
      collection,
      asset: assetKeypair,
      mintArgs,
      group: some(groupName),
    })
    // If we have wl, we need to add the merkle proof

    const mintTx2 = await mintTx.sendAndConfirm(umi, {
      confirm: { commitment: 'confirmed' },
      // send: { skipPreflight: true },
    })
    console.log(`mintTx`, base58.deserialize(mintTx2.signature)[0])
  }

  const groups = queryCm.data?.cmGuard.groups ?? []
  return (
    <Stack align="flex-start">
      {queryCm.isLoading ? (
        <Loader />
      ) : (
        <Stack>
          <Group>
            <Button
              onClick={() => {
                mint({
                  groupName: 'grp4',
                  // Create a proper mintArgs object using a function
                  mintArgs: {
                    botTax: some({
                      lamports: sol(0.1),
                      lastInstruction: true,
                    }),
                    tokenPayment: some({
                      // amount: 5,
                      mint: publicKey('HzwqbKZw8HxMN6bF2yFZNrht3c2iXXzpKcFu7uBEDKtr'),
                      destinationAta: publicKey('ENS1QqyEUPHT7seiftyEiVYbzorWy1pieFDxC6oWRZm'),
                    }),
                  },
                })
              }}
            >
              Group 4
            </Button>
            {/*{groups.map((group) => (*/}
            {/*  <Stack key={group.label}>*/}
            {/*    <Button*/}
            {/*      key={group.label}*/}
            {/*      onClick={() => {*/}
            {/*        mint({*/}
            {/*          groupName: group.label,*/}
            {/*          // Create a proper mintArgs object using a function*/}
            {/*          mintArgs: {*/}
            {/*            botTax: some({*/}
            {/*              lamports: sol(0.1),*/}
            {/*              lastInstruction: true,*/}
            {/*            }),*/}
            {/*            solPayment: some({*/}
            {/*              // TODO: Why is this not working?*/}
            {/*              lamports: sol(0.1),*/}
            {/*              destination: publicKey('BLSY4UjKk3T2fop3U6iMEguzirASTFBWpgZaGgzHoFmk'),*/}
            {/*            }),*/}
            {/*            allowList: some({ merkleRoot }),*/}
            {/*          },*/}
            {/*        })*/}
            {/*      }}*/}
            {/*    >*/}
            {/*      {group.label}*/}
            {/*    </Button>*/}
            {/*    /!*<pre>{JSON.stringify(group, null, 2)}</pre>*!/*/}
            {/*  </Stack>*/}
            {/*))}*/}
          </Group>

          <Box component="pre" fz="xs">
            {JSON.stringify(
              {
                candyMachine: queryCm.data?.cmResult,
                candyGuard: queryCm.data?.cmGuard,
              },
              null,
              2,
            )}
          </Box>
        </Stack>
      )}
    </Stack>
  )
}
