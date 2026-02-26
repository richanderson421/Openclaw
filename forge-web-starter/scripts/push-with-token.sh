#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
TOKEN_FILE="/home/richanderson421/.openclaw/credentials/github_pat.txt"

if [[ ! -f "$TOKEN_FILE" ]]; then
  echo "Missing token file: $TOKEN_FILE" >&2
  exit 1
fi

TOKEN="$(tr -d '\n' < "$TOKEN_FILE")"
if [[ -z "$TOKEN" ]]; then
  echo "GitHub token file is empty" >&2
  exit 1
fi

AUTH="$(printf 'x-access-token:%s' "$TOKEN" | base64 -w0)"

cd "$REPO_ROOT"
branch="$(git rev-parse --abbrev-ref HEAD)"

git -c http.https://github.com/.extraheader="AUTHORIZATION: basic $AUTH" push origin "$branch"

echo "Pushed branch: $branch"
