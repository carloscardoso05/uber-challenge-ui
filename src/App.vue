<template>
  <div class="h-screen w-screen flex flex-col">
    <header class="flex w-full justify-end">
      <Button variant="outline" class="m-2" size="icon" :onclick="() => toggleDark()">
        <Icon icon="solar:moon-linear" class="hidden dark:block"></Icon>
        <Icon icon="material-symbols:sunny-outline-rounded" class="dark:hidden"></Icon>
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
        <div>
          <Label for="email-input">Receiver email</Label>
          <Input type="email" id="email-input" placeholder="example@domain.com" />
        </div>
        <div>
          <Label for="subject-input">Subject</Label>
          <Input type="text" id="subject-input" placeholder="Enter email subject" />
        </div>
        <div>
          <Label for="message-input">Message</Label>
          <Textarea id="message-input" placeholder="Type your message here..." />
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Icon } from '@iconify/vue'
import { useDark, useToggle } from '@vueuse/core'
import Button from './components/ui/button/Button.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
