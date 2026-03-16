#!/bin/bash
COMPONENTS=(
  "accordion" "alert-dialog" "alert" "aspect-ratio" "avatar" "badge" 
  "breadcrumb" "button-group" "button" "carousel" "chart" "checkbox" 
  "code-block" "code-snippet" "collapsible" "command" "context-menu" 
  "data-table" "date-picker" "dialog" "drawer" "dropdown-menu" "empty" 
  "field" "form" "grid" "input" "label" "menubar" "navigation-menu" 
  "pagination" "popover" "progress" "radio-group" "resizable" "scroll-area" 
  "select" "separator" "sheet" "show-more" "sidebar" "skeleton" "slider" 
  "sonner" "spinner" "star-rating" "switch" "table" "tabs" "textarea" 
  "theme-switcher" "timezone" "toggle-group" "toggle" "tooltip"
)

BASE_URL="https://raw.githubusercontent.com/AgusMayol/optics/main/registry/optics"
DEST_DIR="tmp/optics"

mkdir -p "$DEST_DIR"

for comp in "${COMPONENTS[@]}"; do
  # Try .jsx first, then .js if it fails
  STATUS=$(curl -L -o "$DEST_DIR/$comp.jsx" -w "%{http_code}" --silent "$BASE_URL/$comp.jsx")
  if [ "$STATUS" -ne 200 ]; then
    rm "$DEST_DIR/$comp.jsx"
    STATUS=$(curl -L -o "$DEST_DIR/$comp.js" -w "%{http_code}" --silent "$BASE_URL/$comp.js")
    if [ "$STATUS" -ne 200 ]; then
      rm "$DEST_DIR/$comp.js"
      echo "  Failed: $comp (Tried .jsx and .js)"
    else
      echo "  Success: $comp.js"
    fi
  else
    echo "  Success: $comp.jsx"
  fi
done

echo "Download process finished."
