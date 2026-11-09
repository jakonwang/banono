#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$ROOT_DIR/frontend"
CMS_DIR="$ROOT_DIR/cms"
CMS_PUBLIC_DIR="$CMS_DIR/public"
CMS_UPLOAD_DIR="$CMS_PUBLIC_DIR/uploads"
CMS_DATABASE_FILE="$CMS_DIR/.tmp/data.db"
BACKUP_DIR="$ROOT_DIR/backups"
APP_NAME="banono-cms"
BRANCH="${BRANCH:-main}"
HEALTH_URL="${HEALTH_URL:-http://127.0.0.1:1337/api/public/site}"
RELEASE_ID="$(date +%Y%m%d-%H%M%S)"

echo "[1/8] Checking deployment tools"
command -v git >/dev/null 2>&1 || { echo "git not found"; exit 1; }
command -v node >/dev/null 2>&1 || { echo "Node.js not found"; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "npm not found"; exit 1; }
command -v pm2 >/dev/null 2>&1 || { echo "pm2 not found. Run deploy-banono.sh first."; exit 1; }

echo "[2/8] Backing up database and uploads"
mkdir -p "$BACKUP_DIR/$RELEASE_ID"
if [ -f "$CMS_DATABASE_FILE" ]; then
  cp "$CMS_DATABASE_FILE" "$BACKUP_DIR/$RELEASE_ID/data.db"
fi
if [ -d "$CMS_UPLOAD_DIR" ]; then
  cp -a "$CMS_UPLOAD_DIR" "$BACKUP_DIR/$RELEASE_ID/uploads"
fi

echo "[3/8] Pulling latest code from $BRANCH"
cd "$ROOT_DIR"
git restore --staged --worktree -- cms/public 2>/dev/null || true
git fetch origin "$BRANCH"
git merge --ff-only "origin/$BRANCH"

echo "[4/8] Building frontend"
cd "$FRONTEND_DIR"
npm ci
npm run build

echo "[5/8] Updating CMS static public files"
mkdir -p "$CMS_PUBLIC_DIR"
find "$CMS_PUBLIC_DIR" -mindepth 1 -maxdepth 1 ! -name uploads -exec rm -rf {} +
cp -r "$FRONTEND_DIR/dist/." "$CMS_PUBLIC_DIR/"

echo "[6/8] Building CMS"
cd "$CMS_DIR"
npm ci
npm run build

echo "[7/8] Restarting PM2 service"
if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
  pm2 restart "$APP_NAME" --update-env
else
  pm2 start npm --name "$APP_NAME" -- start
fi
pm2 save

echo "[8/8] Checking service health"
for attempt in $(seq 1 30); do
  if curl --fail --silent --show-error "$HEALTH_URL" >/dev/null; then
    echo "Update completed: $(git -C "$ROOT_DIR" rev-parse --short HEAD)"
    echo "Backup saved to: $BACKUP_DIR/$RELEASE_ID"
    exit 0
  fi
  sleep 2
done

echo "Health check failed: $HEALTH_URL"
echo "Run: pm2 logs $APP_NAME --lines 100"
exit 1
