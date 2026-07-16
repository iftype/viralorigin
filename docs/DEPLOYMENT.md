# Oracle VM deployment

The public web app must call a relative `/api` URL. Nginx terminates the public request and proxies it to the API on `127.0.0.1:4000`, so the VM address is never compiled into the client bundle.

## GitHub configuration

Create a production environment and add these Actions secrets:

- `ORACLE_HOST`: VM host or IP.
- `ORACLE_USER`: SSH user.
- `ORACLE_SSH_KEY`: private deployment key.
- `ORACLE_SSH_PORT`: SSH port; use `22` unless changed.
- `ORACLE_DEPLOY_PATH`: absolute release directory, for example `/opt/origin`.

Add repository variable `ORACLE_DEPLOY_ENABLED=false` while provisioning. Change it to `true` only after the VM setup below is complete.

Do not put any of those values in `NEXT_PUBLIC_*`, committed `.env` files, workflow YAML, or client code. A public service address can still be discovered from network traffic; this design prevents accidental source and bundle exposure, not network discovery.

## VM prerequisites

1. Install Node.js 22, Corepack/pnpm, Nginx, rsync, and Git.
2. Copy `infra/nginx/origin.conf.example` into the Nginx site configuration and replace only the domain and deploy path.
3. Copy `infra/systemd/origin-api.service.example` to `~/.config/systemd/user/origin-api.service`, adjusting paths if needed.
4. Create `/opt/origin/shared/api.env` with API-only values such as database credentials and allowed origins.
5. Run `systemctl --user daemon-reload` and `systemctl --user enable origin-api`.
6. Configure TLS before exposing the service publicly.

The workflow uploads the static web output, compiled API, workspace lockfile, and release version. It installs only production API dependencies on the VM and restarts `origin-api`.
