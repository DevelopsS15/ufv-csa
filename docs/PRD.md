# Production (PRD) Deployment and Scheduled Jobs

## Host

- Operating system: Ubuntu 22 LTS
- Memory: 4 GB RAM
- Storage: 64 GB
- Node.js: 24
- Timezone: `America/Vancouver`

This host is generously provisioned by the UFV CIS department to support the CSA's website and other computing needs. Deployments are manually handled by CSA executives or the Webmaster by executing [`next-deploy.sh`](../scripts/next-deploy.sh) on the production server.

## Scheduled Jobs

Both cron jobs run in the server's `America/Vancouver` timezone and require their corresponding authorization token to call the API.

| Schedule | Script | Purpose |
| --- | --- | --- |
| `0 9 * * *` | [event-reminder-cron.sh](../scripts/cron/event-reminder-cron.sh) | Checks for event reminders at 9am |
| `*/15 * * * *` | [ufv-news-cron.sh](../scripts/cron/ufv-news-cron.sh) | Check UFV news every 15 minutes |

After copying the scripts to the production host, replace each script's authorization placeholder with its corresponding token. Keep real tokens out of the repository.

The scripts call these local API routes:

- `http://localhost:3000/api/events/reminders`
- `http://localhost:3000/api/announcements/ufv-news`