# poa-arbeidssokerregistrering

Arbeidssøkerregistrering

## Demo

[https://arbeid.labs.nais.io/arbeid/registrering](https://arbeid.labs.nais.io/arbeid/registrering)

# Utvikling

Bruk Node.js 16.
Dersom du ikke kjører i mock-modus må du ha koblet til [naisdevice](https://doc.nais.io/device/) for å nå noen av endepunktene.

-   klon repo
-   innstaller avhengigheter `npm i`
-   kjør tester `npm t`
-   start utviklingsserver `npm run dev`
-   åpne nettleseren på `http://localhost:3000/arbeid/registrering`

## Deploye kun til dev

Ved å prefikse branch-navn med `dev/`, så vil branchen kun deployes i dev.

```
git checkout -b dev/<navn på branch>
```

## Ekstern dokumentasjon

-   [Next.js](https://nextjs.org/)
-   [testing-library](https://testing-library.com/)

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles via issues her på github.

# For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen [#team-paw-dev](https://nav-it.slack.com/archives/CLTFAEW75)
