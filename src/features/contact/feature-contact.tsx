import { Alert, Button, Container, Grid, Group, Loader, Stack, Textarea, TextInput } from '@mantine/core'
import { UiPage } from '../../ui'
import { useForm } from '@mantine/form'
import { useMutation } from '@tanstack/react-query'

interface FormValues {
  name: string
  email: string
  message: string
}

function useFormSubmitMutation() {
  return useMutation({
    mutationFn: async (values: FormValues) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return values
    },
  })
}

export default function FeatureContact() {
  const mutationSubmit = useFormSubmitMutation()
  const form = useForm<FormValues>({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validate: {
      name: (value) => (value ? null : 'Name is required'),
      email: (value) => (value ? null : 'Email is required'),
      message: (value) => (value ? null : 'Message is required'),
    },
  })
  return (
    <UiPage title="Contact">
      <Container>
        <Stack>
          <Alert title="Contact" color="blue">
            This is an example of a form submission.
          </Alert>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <form
                onSubmit={form.onSubmit(async (values) => {
                  await mutationSubmit.mutateAsync(values)
                })}
              >
                <Stack>
                  <TextInput
                    error={form.errors.name}
                    label="Name"
                    placeholder="Enter your name"
                    readOnly={mutationSubmit.isPending}
                    required
                    {...form.getInputProps('name')}
                  />
                  <TextInput
                    error={form.errors.email}
                    label="Email"
                    placeholder="Enter your email"
                    readOnly={mutationSubmit.isPending}
                    required
                    {...form.getInputProps('email')}
                  />
                  <Textarea
                    error={form.errors.message}
                    label="Message"
                    placeholder="Enter your message"
                    readOnly={mutationSubmit.isPending}
                    required
                    {...form.getInputProps('message')}
                  />
                  <Group justify="flex-end">
                    <Button type="submit" disabled={!form.isValid} loading={mutationSubmit.isPending}>
                      Submit
                    </Button>
                  </Group>
                </Stack>
              </form>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              {mutationSubmit.isPending ? (
                <Loader />
              ) : mutationSubmit.data ? (
                <Alert title="Form submitted" color="green">
                  <pre>{JSON.stringify(mutationSubmit.data, null, 2)}</pre>
                </Alert>
              ) : (
                <Alert color="blue">Form not submitted</Alert>
              )}
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </UiPage>
  )
}
