#!/bin/bash
SOURCE_DIR="tmp/optics"
TARGET_DIR="src/client/components/ui/optics"

mkdir -p "$TARGET_DIR"

echo "Moving and renaming files..."
for file in "$SOURCE_DIR"/*.jsx; do
  [ -e "$file" ] || continue
  filename=$(basename "$file" .jsx)
  cp "$file" "$TARGET_DIR/$filename.tsx"
done

for file in "$SOURCE_DIR"/*.js; do
  [ -e "$file" ] || continue
  filename=$(basename "$file" .js)
  cp "$file" "$TARGET_DIR/$filename.ts"
done

echo "Fixing imports in all .tsx and .ts files..."
find "$TARGET_DIR" -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/registry/optics/lib/utils|@/client/lib/utils|g'
find "$TARGET_DIR" -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/registry/optics/lib/get-strict-context|./lib/get-strict-context|g'
find "$TARGET_DIR" -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/registry/optics/hooks/use-controlled-state|./hooks/use-controlled-state|g'
find "$TARGET_DIR" -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/registry/optics/button|./button|g'
find "$TARGET_DIR" -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/lib/utils|@/client/lib/utils|g'

echo "Setup complete."
