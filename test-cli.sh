#!/bin/bash

# Test script for ShadPanel CLI
# Usage: ./test-cli.sh

set -e

echo "🧪 Testing ShadPanel CLI locally..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get the directory of this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Test directory
TEST_DIR="$SCRIPT_DIR/../shadpanel-test-$(date +%s)"

echo -e "${BLUE}1. Creating test directory: $TEST_DIR${NC}"
mkdir -p "$TEST_DIR"

echo -e "${BLUE}2. Running CLI with tsx...${NC}"
cd "$SCRIPT_DIR"
node --loader tsx cli/index.ts init "$TEST_DIR"

echo -e "${BLUE}3. Checking generated files...${NC}"
if [ -f "$TEST_DIR/package.json" ]; then
  echo -e "${GREEN}✓ package.json created${NC}"
else
  echo "✗ package.json not found"
  exit 1
fi

if [ -d "$TEST_DIR/app" ]; then
  echo -e "${GREEN}✓ app/ directory created${NC}"
else
  echo "✗ app/ directory not found"
  exit 1
fi

if [ -d "$TEST_DIR/components" ]; then
  echo -e "${GREEN}✓ components/ directory created${NC}"
else
  echo "✗ components/ directory not found"
  exit 1
fi

echo ""
echo -e "${GREEN}✓ CLI test successful!${NC}"
echo ""
echo "Test project created at: $TEST_DIR"
echo ""
echo "To test the generated project:"
echo "  cd $TEST_DIR"
echo "  npm install"
echo "  npm run dev"
