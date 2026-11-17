#!/usr/bin/env bash
# Starter Playwright MCP (nettleser-verktøyet Claude bruker til å se på nettsiden).
# Bruker Chromium som allerede er installert i skyøkten (/opt/pw-browsers), så ingenting lastes ned.
# Lokalt, uten /opt/pw-browsers, bruker serveren sin egen nettleser.
#
#   scripts/playwright-mcp.sh                 → stdio (slik .mcp.json starter den)
#   scripts/playwright-mcp.sh --port 8931     → HTTP, til testing
#
# Mobil: verktøyet browser_resize, eller start med --device "iPhone 15".
set -euo pipefail

VERSION="0.0.85"
args=(--headless --isolated --viewport-size "1440x900" --output-dir "${TMPDIR:-/tmp}/playwright-mcp")

chrome="$(ls -d /opt/pw-browsers/chromium-*/chrome-linux*/chrome 2>/dev/null | sort -V | tail -n 1 || true)"
if [[ -n "$chrome" ]]; then
  # I skycontaineren kjører vi som root, og da kan ikke Chromium bruke sandkassen sin.
  args+=(--executable-path "$chrome" --no-sandbox)
fi

exec npx -y "@playwright/mcp@${VERSION}" "${args[@]}" "$@"
