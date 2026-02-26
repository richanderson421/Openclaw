#!/usr/bin/env bash
set -euo pipefail

TOKEN_FILE="/home/richanderson421/.openclaw/credentials/vercel_token.txt"
PROJECT_ID="prj_sVC8qgume0BH0KMyi5rvxEuPshrW"

if [[ ! -f "$TOKEN_FILE" ]]; then
  echo "Missing token file: $TOKEN_FILE" >&2
  exit 1
fi

VERCEL_TOKEN="$(tr -d '\n' < "$TOKEN_FILE")"
if [[ -z "$VERCEL_TOKEN" ]]; then
  echo "Vercel token file is empty" >&2
  exit 1
fi

resp="$(curl -sS -X POST "https://api.vercel.com/v13/deployments" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H 'Content-Type: application/json' \
  -d "{\"project\":\"$PROJECT_ID\",\"target\":\"production\"}")"

url="$(echo "$resp" | jq -r '.url // empty')"
id="$(echo "$resp" | jq -r '.id // empty')"

if [[ -z "$url" ]]; then
  echo "Deploy request did not return a URL. Raw response:" >&2
  echo "$resp" >&2
  exit 1
fi

echo "Deployment created: $id"
echo "URL: https://$url"
