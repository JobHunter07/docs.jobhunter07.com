# Implementation Summary: Automated Markdown → PDF Generation

## What Was Implemented

This implementation adds automated PDF generation from Markdown files with version management and GitHub Actions workflows.

## Files Created

### 1. Folder Structure
- `/docs` - Directory for Markdown documentation files
- `/docs/images` - Directory for images embedded in documentation
- `/scripts` - Directory for build scripts

### 2. Core Files
- **VERSION.txt** - Contains the current version (starts at v0.00)
- **scripts/build-pdf.sh** - Bash script that merges all Markdown files in `/docs` alphabetically and generates a PDF using Pandoc + XeLaTeX
- **docs/01-introduction.md** - Sample Markdown file for testing
- **docs/README.md** - Documentation explaining the docs structure

### 3. GitHub Actions Workflows

#### A. `.github/workflows/preview-pdf.yml` (PR Preview Workflow)
**Trigger:** Pull request targeting main branch

**Behavior:**
- Installs Pandoc and LaTeX
- Runs build-pdf.sh to generate PDF
- Uploads PDF as artifact named "preview-pdf"
- Does NOT bump version

#### B. `.github/workflows/bump-and-build.yml` (Main Branch Merge Workflow)
**Trigger:** Push to main branch

**Behavior:**
- Reads VERSION.txt
- If version is v0.xx, increments by 0.01 (e.g., v0.00 → v0.01, v0.09 → v0.10)
- Commits updated VERSION.txt back to main
- Builds PDF with new version
- Uploads PDF as artifact named "JobHunter07-v{VERSION}"

**Version Bumping Logic:**
- Extracts numeric part after "v0."
- Removes leading zeros
- Increments by 1
- Formats back with leading zero (minimum 2 digits)
- Examples: 00→01, 01→02, 09→10, 10→11, 99→100

#### C. `.github/workflows/release-pdf.yml` (Release Workflow)
**Trigger:** GitHub release published

**Behavior:**
- Sets VERSION.txt to v1.00
- Commits updated VERSION.txt
- Builds PDF
- Uploads PDF to the release
- Uploads PDF as artifact named "JobHunter07-v1.00"

### 4. Configuration Updates
- **.gitignore** - Added `*.pdf` to exclude generated PDFs from version control
- **README.md** - Updated with comprehensive documentation about the PDF generation system

## How the Build Script Works

The `scripts/build-pdf.sh` script:

1. Reads version from VERSION.txt
2. Finds all .md files in /docs directory (non-recursive)
3. Sorts them alphabetically
4. Merges them using Pandoc with:
   - XeLaTeX engine for Unicode support
   - Table of contents (--toc)
   - Numbered sections
   - Resource path for images from /docs and /docs/images
5. Outputs: `JobHunter07-v{VERSION}.pdf`

## Usage Examples

### Adding Documentation
1. Create Markdown files in /docs with numbered prefixes (e.g., 01-intro.md, 02-setup.md)
2. Add images to /docs/images and reference them in Markdown
3. Open a PR to see preview PDF
4. Merge to main to create versioned PDF

### Version Progression
- Initial: v0.00
- After 1st merge: v0.01
- After 2nd merge: v0.02
- ...
- After 10th merge: v0.10
- ...
- After release: v1.00

## Testing

Version bumping logic was tested with the following cases:
- ✓ v0.00 → v0.01
- ✓ v0.01 → v0.02
- ✓ v0.09 → v0.10
- ✓ v0.10 → v0.11
- ✓ v0.98 → v0.99
- ✓ v1.00 → v1.00 (no bump for v1.x)

## Dependencies

The GitHub Actions workflows install:
- pandoc - Document converter
- texlive-xetex - XeLaTeX engine
- texlive-fonts-recommended - Font packages
- texlive-plain-generic - Generic TeX packages

These are only required for GitHub Actions; local development doesn't require them unless you want to test PDF generation locally.

## Benefits

1. **Automated Documentation**: No manual PDF generation needed
2. **Version Control**: All PDFs are versioned automatically
3. **PR Previews**: See PDF output before merging
4. **Release Management**: Clean v1.00 versioning for releases
5. **Single Source of Truth**: Markdown in Git is the source; PDFs are generated artifacts
