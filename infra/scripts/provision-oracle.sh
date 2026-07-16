#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
deploy_user="${SUDO_USER:-$USER}"
deploy_group="$(id -gn "$deploy_user")"
deploy_root="/opt/origin"

if ! sudo -n true 2>/dev/null; then
  echo "Passwordless sudo is required." >&2
  exit 1
fi

sudo apt-get update
sudo DEBIAN_FRONTEND=noninteractive apt-get install -y \
  ca-certificates curl gnupg iptables-persistent nginx rsync

if ! sudo iptables -C INPUT -p tcp -m multiport --dports 80,443 -j ACCEPT 2>/dev/null; then
  reject_rule="$(sudo iptables -L INPUT --line-numbers -n | awk '$2 == "REJECT" { print $1; exit }')"
  if [[ -n "$reject_rule" ]]; then
    sudo iptables -I INPUT "$reject_rule" -p tcp -m multiport --dports 80,443 -j ACCEPT
  else
    sudo iptables -A INPUT -p tcp -m multiport --dports 80,443 -j ACCEPT
  fi
fi
sudo netfilter-persistent save

if ! command -v node >/dev/null 2>&1 || [[ "$(node --version)" != v22.* ]]; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

sudo corepack enable
sudo corepack install --global pnpm@11.1.0

if ! snap list certbot >/dev/null 2>&1; then
  sudo snap install --classic certbot
fi
sudo ln -sfn /snap/bin/certbot /usr/local/bin/certbot

sudo install -d -o "$deploy_user" -g "$deploy_group" "$deploy_root"
sudo install -d -o "$deploy_user" -g "$deploy_group" \
  "$deploy_root/apps/web/out" \
  "$deploy_root/apps/api" \
  "$deploy_root/shared"
sudo chown -R "$deploy_user:$deploy_group" "$deploy_root/apps"

if [[ ! -f "$deploy_root/apps/web/out/index.html" ]]; then
  sudo tee "$deploy_root/apps/web/out/index.html" >/dev/null <<'HTML'
<!doctype html>
<html lang="ko">
  <head><meta charset="utf-8"><title>Meme Origin Timeline</title></head>
  <body><main><h1>Meme Origin Timeline</h1><p>배포 준비가 완료되었습니다.</p></main></body>
</html>
HTML
  sudo chown "$deploy_user:$deploy_group" "$deploy_root/apps/web/out/index.html"
fi

if [[ ! -f "$deploy_root/shared/api.env" ]]; then
  umask 077
  printf 'HOST=127.0.0.1\nPORT=4000\n' > "$deploy_root/shared/api.env"
fi

if [[ ! -f /etc/nginx/sites-available/origin ]]; then
  sudo install -m 644 "$repo_root/infra/nginx/origin.conf.example" \
    /etc/nginx/sites-available/origin
  sudo sed -i 's/server_name example.com;/server_name _;/' \
    /etc/nginx/sites-available/origin
fi
sudo ln -sfn /etc/nginx/sites-available/origin /etc/nginx/sites-enabled/origin
if [[ -e /etc/nginx/sites-enabled/default ]]; then
  sudo rm /etc/nginx/sites-enabled/default
fi

install -d -m 700 "$HOME/.config/systemd/user"
install -m 644 "$repo_root/infra/systemd/origin-api.service.example" \
  "$HOME/.config/systemd/user/origin-api.service"
sudo loginctl enable-linger "$deploy_user"

sudo nginx -t
sudo systemctl enable --now nginx
systemctl --user daemon-reload
systemctl --user enable origin-api

echo "Oracle VM prerequisites are ready."
echo "Run infra/scripts/enable-https.sh after DNS points to this VM."
