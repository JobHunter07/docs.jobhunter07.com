# Quick Start Guide

## Adding Documentation

1. **Create Markdown files in `/docs`**
   ```bash
   # Use numbered prefixes to control order
   docs/01-introduction.md
   docs/02-requirements.md
   docs/03-design.md
   ```

2. **Add images to `/docs/images`**
   ```bash
   docs/images/architecture-diagram.png
   docs/images/workflow.png
   ```

3. **Reference images in Markdown**
   ```markdown
   ![Architecture Diagram](images/architecture-diagram.png)
   ```

## Workflow Behavior

### Pull Request
- **Trigger**: Open a PR targeting `main`
- **Action**: Preview PDF generated (no version bump)
- **Artifact**: "preview-pdf" in GitHub Actions
- **Download**: Go to PR → Actions tab → Download artifact

### Merge to Main
- **Trigger**: PR merged to `main`
- **Action**: Version auto-bumped (v0.00 → v0.01)
- **Artifact**: "JobHunter07-v{VERSION}"
- **Note**: VERSION.txt is committed automatically

### Release
- **Trigger**: Publish a GitHub Release
- **Action**: Version set to v1.00
- **Artifact**: PDF attached to release + uploaded as artifact
- **Access**: Release page → Assets → JobHunter07-v1.00.pdf

## Version Progression

```
Initial:           v0.00
After 1st merge:   v0.01
After 2nd merge:   v0.02
...
After 10th merge:  v0.10
...
After release:     v1.00
```

## Local Testing

To test PDF generation locally:

1. **Install dependencies**
   ```bash
   # Ubuntu/Debian
   sudo apt-get install pandoc texlive-xetex texlive-fonts-recommended texlive-plain-generic
   
   # macOS
   brew install pandoc
   brew install --cask mactex
   ```

2. **Run the build script**
   ```bash
   bash scripts/build-pdf.sh
   ```

3. **Output**
   ```
   JobHunter07-v0.00.pdf  # Generated in repository root
   ```

## Tips

- Use numbered prefixes (01-, 02-) to control document order
- Keep images in `/docs/images` for proper referencing
- Use standard Markdown formatting (headings, lists, tables, code blocks)
- PDFs are automatically excluded from git (in .gitignore)
- Each PR shows a preview before merging
- Releases always use v1.00 for consistency

## Troubleshooting

**Q: PDF not generated in PR?**
- Check the Actions tab for error messages
- Ensure Markdown files exist in `/docs`
- Verify Pandoc/LaTeX installation in workflow logs

**Q: Version not bumping?**
- Only merges to `main` trigger version bumps
- Only v0.xx versions auto-bump
- Check VERSION.txt format (should be v0.XX)

**Q: Images not showing in PDF?**
- Ensure images are in `/docs/images`
- Use relative path: `![Alt](images/filename.png)`
- Verify image file exists and is committed
