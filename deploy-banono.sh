#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$ROOT_DIR/frontend"
CMS_DIR="$ROOT_DIR/cms"
CMS_PUBLIC_DIR="$CMS_DIR/public"
CMS_TMP_DIR="$CMS_DIR/.tmp"
CMS_ENV_FILE="$CMS_DIR/.env"
APP_NAME="banono-cms"
PORT="${PORT:-1337}"

echo "[1/8] Checking Node.js and npm"
command -v node >/dev/null 2>&1 || { echo "Node.js not found. Please install Node.js 20 first."; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "npm not found. Please install npm first."; exit 1; }

echo "[2/8] Installing frontend dependencies"
cd "$FRONTEND_DIR"
npm install

echo "[3/8] Building frontend"
npm run build

echo "[4/8] Installing CMS dependencies"
cd "$CMS_DIR"
npm install

echo "[5/8] Preparing CMS directories"
mkdir -p "$CMS_PUBLIC_DIR" "$CMS_TMP_DIR"
find "$CMS_PUBLIC_DIR" -mindepth 1 -maxdepth 1 ! -name uploads -exec rm -rf {} +
cp -r "$FRONTEND_DIR/dist/"* "$CMS_PUBLIC_DIR/"

echo "[6/8] Creating CMS .env if missing"
if [ ! -f "$CMS_ENV_FILE" ]; then
  cat > "$CMS_ENV_FILE" <<EOF
HOST=0.0.0.0
PORT=$PORT
APP_KEYS=banono_app_key_1,banono_app_key_2,banono_app_key_3,banono_app_key_4
API_TOKEN_SALT=banono_api_token_salt_2026
ADMIN_JWT_SECRET=banono_admin_jwt_secret_2026
TRANSFER_TOKEN_SALT=banono_transfer_token_salt_2026
JWT_SECRET=banono_jwt_secret_2026
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
NODE_ENV=production
EOF
fi

echo "[7/8] Building CMS"
npm run build

echo "[8/8] Starting CMS with PM2"
if ! command -v pm2 >/dev/null 2>&1; then
  npm install -g pm2
fi

pm2 delete "$APP_NAME" >/dev/null 2>&1 || true
pm2 start npm --name "$APP_NAME" -- start
pm2 save

echo
echo "Deployment completed."
echo "Frontend: http://127.0.0.1:$PORT/"
echo "Admin:    http://127.0.0.1:$PORT/admin"
echo
echo "If you use BaoTa reverse proxy, proxy your domain to:"
echo "http://127.0.0.1:$PORT"
