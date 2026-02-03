# JobHunter07-Planning

## Overview

This repository contains planning documentation for the JobHunter07 project, with automated PDF generation using Pandoc.

## Features

- **Automated PDF Generation**: Markdown files in `/docs` are automatically compiled into a PDF
- **Version Management**: Automatic version bumping for development (v0.xx) and releases (v1.00)
- **GitHub Actions Integration**: PDF generation on PR preview, main branch merges, and releases

## Repository Structure

```
/docs               - Markdown documentation files
  /images          - Images for documentation
/scripts           - Build scripts
  build-pdf.sh     - PDF generation script
VERSION.txt        - Current version number
```

## How It Works

### PR Preview
When you open a pull request targeting `main`:
- A preview PDF is generated using the current version
- The PDF is uploaded as a GitHub Actions artifact named "preview-pdf"
- No version bumping occurs

### Main Branch Merge
When changes are merged to `main`:
- If the current version is v0.xx, it's automatically incremented by 0.01 (e.g., v0.00 → v0.01)
- The updated version is committed back to the repository
- A PDF is generated with the new version number
- The PDF is uploaded as a GitHub Actions artifact

### Release
When a GitHub Release is published:
- The version is set to v1.00
- A PDF is generated and attached to the release
- The PDF is also uploaded as a GitHub Actions artifact

## Adding Documentation

1. Create or edit Markdown files in the `/docs` directory
2. Files are processed in alphabetical order (use prefixes like `01-`, `02-` to control order)
3. Place images in `/docs/images` and reference them in your Markdown
4. Open a PR to see a preview PDF
5. Merge to main to create a versioned PDF

## Requirements

The PDF generation uses:
- Pandoc
- XeLaTeX (from TeX Live)

These are automatically installed in the GitHub Actions workflows.