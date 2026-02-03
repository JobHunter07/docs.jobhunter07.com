# Documentation

This directory contains Markdown files that will be automatically compiled into a PDF using Pandoc.

## Structure

- Markdown files in this directory will be merged in alphabetical order
- Images should be placed in the `images/` subdirectory
- Use standard Markdown formatting

## PDF Generation

The PDF is automatically generated through GitHub Actions:
- **PR Preview**: When a PR is opened, a preview PDF is generated and uploaded as an artifact
- **Main Branch**: When changes are merged to main, the version is bumped and a PDF is generated
- **Releases**: When a release is published, the version is set to v1.00 and a PDF is generated

The generated PDF will be named `JobHunter07-v{VERSION}.pdf` based on the version in `VERSION.txt`.
