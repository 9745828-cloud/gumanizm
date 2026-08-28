#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
npm run build
cp dist/index.html dist/404.html
rm -rf /tmp/gumanizm-pages
mkdir -p /tmp/gumanizm-pages
cp -R dist/. /tmp/gumanizm-pages/
cd /tmp/gumanizm-pages
git init
git checkout -b gh-pages
git config user.email "9745828-cloud@users.noreply.github.com"
git config user.name "9745828-cloud"
git add -A
git commit -m "deploy: GitHub Pages $(date -u +%Y-%m-%dT%H:%MZ)"
git remote add origin https://github.com/9745828-cloud/gumanizm.git
git push -f origin gh-pages
echo "Deployed → https://9745828-cloud.github.io/gumanizm/"
