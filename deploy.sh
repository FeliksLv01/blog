#!/usr/bin/env sh
set -eu

gh workflow run .github/workflows/main.yaml --ref main
