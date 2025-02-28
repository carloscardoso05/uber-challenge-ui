<template>
  <Toaster />
  <div class="h-screen w-screen flex flex-col">
    <header class="flex w-full justify-end">
      <Button variant="outline" class="m-2" size="icon" @click="toggleDark()">
        <Icon icon="solar:moon-linear" class="hidden dark:block" />
        <Icon icon="material-symbols:sunny-outline-rounded" class="dark:hidden" />
      </Button>
    </header>
    <Card class="max-w-xl m-auto">
      <CardHeader>
        <CardTitle class="text-4xl">Email Sender</CardTitle>
        <CardDescription>
          Send a email using our email service that abstracts the use of AWS SES and Twillio
          SendGrid
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AutoForm
          :schema="emailSchema"
          :form="form"
          @submit="sendEmail"
          :field-config="{
            body: {
              component: 'textarea',
            },
          }"
        >
          <div class="flex justify-end">
            <Button type="submit" class="mt-6 bg-primary" :disabled="isInvalid || isFetching">
              Send email
              <Icon v-if="isFetching" icon="line-md:loading-loop" />
              <Icon v-else icon="fluent:send-20-filled" />
            </Button>
          </div>
        </AutoForm>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Icon } from '@iconify/vue'
import { useDark, useFetch, useToggle } from '@vueuse/core'
import { useForm } from 'vee-validate'
import AutoForm from './components/ui/auto-form/AutoForm.vue'
import Button from './components/ui/button/Button.vue'
import { emailSchema } from './models/email.model'
import { toTypedSchema } from '@vee-validate/zod'
import { computed } from 'vue'
import Toaster from './components/ui/toast/Toaster.vue'
import { toast } from './components/ui/toast'

const url = '/api/send/'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const { post, isFetching } = useFetch(url, { immediate: false })

const form = useForm({
  validationSchema: toTypedSchema(emailSchema),
})

const isInvalid = computed(() => {
  try {
    emailSchema.parse(form.values)
    return false
  } catch {
    return true
  }
})

async function sendEmail() {
  toast({ title: 'Sending email' })
  try {
    await post(form.values).execute(true)
    toast({ title: 'Email sent successfully', class: 'bg-green-700' })
  } catch {
    toast({ title: 'Failed to send email', variant: 'destructive' })
  }
}
</script>

<style>
html.dark {
  color-scheme: dark;
}
</style>
