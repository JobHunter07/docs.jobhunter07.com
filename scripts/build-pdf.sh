#!/bin/bash
set -euo pipefail

# Script to build PDF from Markdown files using Pandoc
# Reads version from VERSION.txt and generates JobHunter07-v{VERSION}.pdf

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
DOCS_DIR="$REPO_ROOT/docs"
VERSION_FILE="$REPO_ROOT/VERSION.txt"

# Check if VERSION.txt exists
if [ ! -f "$VERSION_FILE" ]; then
    echo "Error: VERSION.txt not found at $VERSION_FILE"
    exit 1
fi

# Read version from VERSION.txt
VERSION=$(cat "$VERSION_FILE" | tr -d '[:space:]')

if [ -z "$VERSION" ]; then
    echo "Error: VERSION.txt is empty"
    exit 1
fi

echo "Building PDF with version: $VERSION"

# Check if docs directory exists
if [ ! -d "$DOCS_DIR" ]; then
    echo "Error: docs directory not found at $DOCS_DIR"
    exit 1
fi

# Find all markdown files in docs directory (alphabetical order)
MD_FILES=$(find "$DOCS_DIR" -maxdepth 1 -name "*.md" -type f | sort)

if [ -z "$MD_FILES" ]; then
    echo "Warning: No markdown files found in $DOCS_DIR"
    echo "Creating a minimal placeholder document..."
    # Create a temporary file with placeholder content
    TEMP_MD=$(mktemp)
    echo "# JobHunter07 Documentation" > "$TEMP_MD"
    echo "" >> "$TEMP_MD"
    echo "No documentation files found." >> "$TEMP_MD"
    MD_FILES="$TEMP_MD"
fi

# Output PDF filename
OUTPUT_PDF="$REPO_ROOT/JobHunter07-$VERSION.pdf"

echo "Merging markdown files:"
echo "$MD_FILES" | tr ' ' '\n'

# Build PDF using Pandoc with XeLaTeX engine
# --pdf-engine=xelatex: Use XeLaTeX for better Unicode support
# --resource-path: Set path for images
# -o: Output file
pandoc $MD_FILES \
    --pdf-engine=xelatex \
    --resource-path="$DOCS_DIR:$DOCS_DIR/images" \
    -o "$OUTPUT_PDF" \
    --metadata title="JobHunter07 Documentation $VERSION" \
    --toc \
    --number-sections

echo "PDF generated successfully: $OUTPUT_PDF"

# Clean up temporary file if created
if [ -n "${TEMP_MD:-}" ] && [ -f "$TEMP_MD" ]; then
    rm -f "$TEMP_MD"
fi
