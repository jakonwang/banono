#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$ROOT_DIR/frontend"
CMS_DIR="$ROOT_DIR/cms"
CMS_PUBLIC_DIR="$CMS_DIR/public"
APP_NAME="banono-cms"

echo "[1/5] Building frontend"
cd "$FRONTEND_DIR"
npm install
npm run build

echo "[2/5] Updating CMS static public files"
mkdir -p "$CMS_PUBLIC_DIR"
find "$CMS_PUBLIC_DIR" -mindepth 1 -maxdepth 1 ! -name uploads -exec rm -rf {} +
cp -r "$FRONTEND_DIR/dist/"* "$CMS_PUBLIC_DIR/"

echo "[3/5] Building CMS"
cd "$CMS_DIR"
npm install
npm run build

echo "[4/5] Restarting PM2 service"
if ! command -v pm2 >/dev/null 2>&1; then
  echo "pm2 not found. Please run deploy-banono.sh first."
  exit 1
fi
pm2 restart "$APP_NAME"

echo "[5/5] Done"
echo "Service restarted: $APP_NAME"
