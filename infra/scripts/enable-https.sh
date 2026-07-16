#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 2 ]]; then
  echo "Usage: $0 DOMAIN EMAIL [ADDITIONAL_DOMAIN ...]" >&2
  exit 1
fi

primary_domain="$1"
email="$2"
shift 2
domains=("$primary_domain" "$@")

for domain in "${domains[@]}"; do
  if [[ ! "$domain" =~ ^[A-Za-z0-9.-]+$ ]]; then
    echo "Invalid domain: $domain" >&2
    exit 1
  fi
done

if [[ ! "$email" =~ ^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$ ]]; then
  echo "Invalid email address." >&2
  exit 1
fi

domain_args=()
for domain in "${domains[@]}"; do
  domain_args+=("-d" "$domain")
done

sudo sed -i -E "s/server_name [^;]+;/server_name ${domains[*]};/" \
  /etc/nginx/sites-available/origin
sudo nginx -t
sudo systemctl reload nginx

sudo certbot --nginx \
  --non-interactive \
  --agree-tos \
  --redirect \
  --email "$email" \
  "${domain_args[@]}"

sudo certbot renew --dry-run --no-random-sleep-on-renew

echo "HTTPS is enabled for: ${domains[*]}"
echo "Certbot renewal is managed automatically by the snap systemd timer."
