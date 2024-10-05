'use client'

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button, buttonVariants} from "@/components/ui/button";
import React from "react";
import requestTeamInvite from "@/app/requestTeamInvite";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {AlertCircle, Check} from "lucide-react";

const RegistrationForm: React.FC<{ loginURL?: string, mailPlaceholder?: string }> = ({ loginURL, mailPlaceholder }) => {

  const [state, setState] = React.useState<null | 'loading' | 'success' | 'error'>(null)
  const [error, setError] = React.useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setState('loading')
    const result = await requestTeamInvite(e.currentTarget['email'].value)
    if (result === 'success') {
      setState('success')
    } else {
      setError(result.error)
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="gap-4">
      <Alert variant="success" className="text-start mb-4">
        <Check className="h-4 w-4" />
        <AlertTitle>Einladung versendet</AlertTitle>
        <AlertDescription>
          Du erhältst in Kürze eine Einladung per E-Mail.
        </AlertDescription>
      </Alert>
        { loginURL && <a href={loginURL} className={buttonVariants({ variant: "default" })}>Zur Anmeldung</a> }
      </div>
    )
  }

  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      { state === 'error' && (
        <Alert variant="destructive" className="text-start">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Fehler</AlertTitle>
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      )}
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder={mailPlaceholder ?? "me@example.com"}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={state === 'loading'}>
        Einladung anfordern
      </Button>
    </form>
  )
}

export default RegistrationForm
