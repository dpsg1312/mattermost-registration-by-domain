# mattermost-registration-by-domain

A small self-service page for joining a Mattermost team. Users enter their email address. If it belongs to an allowed domain, the app asks the Mattermost API to send them a team invite.

Built with Next.js. The UI is in German.

## Configuration

Set these environment variables (see `.env.example`):

| Variable           | Required | Description                                                                            |
|--------------------|----------|----------------------------------------------------------------------------------------|
| `ALLOWED_DOMAINS`  | yes      | Comma-separated list of allowed email domains, e.g. `example.org,example.com`          |
| `API_URL`          | yes      | Mattermost invite endpoint, e.g. `https://chat.example.org/api/v4/teams/<team_id>/invite/email` |
| `API_TOKEN`        | yes      | Bearer token (bot or personal access token) allowed to invite to the team              |
| `DOMAIN_HINT`      | no       | Extra text shown when someone enters an email from a domain that isn't allowed         |
| `MAIL_PLACEHOLDER` | no       | Placeholder text for the email input                                                   |
| `LOGIN_URL`        | no       | Shows an "Anmelden" link for users who already have an account                         |
| `IMAGE_URL`        | no       | Logo or image shown next to the form                                                   |

The variables are read at request time, so you can change them without rebuilding the image.

## Run with Docker

```bash
docker run -p 3000:3000 --env-file .env ghcr.io/dpsg1312/mattermost-registration-by-domain:latest
```

Or use the included `compose.yml`, which reads its settings from `stack.env` and expects an external `proxy` network.

## Development

```bash
yarn install
cp .env.example .env.local   # fill in values
yarn dev
```

Then open http://localhost:3000.
