#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$ROOT_DIR/frontend"
CMS_DIR="$ROOT_DIR/cms"
CMS_PUBLIC_DIR="$CMS_DIR/public"
APP_NAME="banono-cms"

echo "[1/6] Pulling latest code"
cd "$ROOT_DIR"
if ! git diff --quiet -- cms/public/index.html || ! git diff --cached --quiet -- cms/public/index.html; then
  echo "Local generated cms/public/index.html differs; restoring it before pull"
  git restore --staged --worktree -- cms/public/index.html
fi
git pull --ff-only origin main

echo "[2/6] Building frontend"
cd "$FRONTEND_DIR"
npm ci
npm run build

echo "[3/6] Updating CMS static public files"
mkdir -p "$CMS_PUBLIC_DIR"
cp -r "$FRONTEND_DIR/dist/." "$CMS_PUBLIC_DIR/"

echo "[4/6] Building CMS"
cd "$CMS_DIR"
npm ci
npm run build

echo "[5/6] Restarting PM2 service"
if ! command -v pm2 >/dev/null 2>&1; then
  echo "pm2 not found. Please run deploy-banono.sh first."
  exit 1
fi
pm2 restart "$APP_NAME"

echo "[6/6] Done"
echo "Service restarted: $APP_NAME"
