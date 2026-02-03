JobHunter07 Pandoc LaTeX Template

Overview

This template implements the JobHunter07 brand system for Pandoc ? PDF workflows. It is LaTeX-based and optimized for use with XeLaTeX or LuaLaTeX (for fontspec support). The template provides:

- Title page with compass watermark, logo, and cover image support
- Table of contents styling
- Chapter and section styling using the JobHunter07 palette and typography
- Callout boxes (Hunt Tips) and pull quotes
- Headers and footers with version injection and page numbers
- Subtle motifs (compass, footprint separator, forest silhouette via TikZ)

Files

- `jobhunter07.tex` — the LaTeX template (this file)
- `assets/` — place optional assets here: logo, cover image, or custom PNGs

Pandoc variables supported

You can pass these metadata keys to Pandoc and they will be injected into the template:

- `title` — main document title
- `subtitle` — subtitle displayed under title
- `author` — author string
- `version` — version string shown on title page and footer
- `date` — date shown on title page
- `logo` — path to a small logo image (optional)
- `cover-image` — path to a cover / hero image shown on the title page (optional)

Example commands

Recommended (XeLaTeX) for full typography:

pandoc input.md -o output.pdf --template=pandoc-templates/jobhunter07.tex --pdf-engine=xelatex \
  --metadata=title:"Product Requirements — JobHunter07" \
  --metadata=subtitle:"Field Guide and Requirements" \
  --metadata=author:"JobHunter Team" \
  --metadata=version:"0.2" \
  --metadata=logo:pandoc-templates/assets/logo.png \
  --metadata=cover-image:pandoc-templates/assets/forest-path.jpg

Fallback (pdfLaTeX):

pandoc input.md -o output.pdf --template=pandoc-templates/jobhunter07.tex --pdf-engine=pdflatex \
  --metadata=title:"..." --metadata=version:"0.2"

Notes

- For best visual fidelity install the recommended fonts (Montserrat, Lora, Fira Code) or allow fontspec to pick system alternatives.
- If Pandoc is available you can also convert DOCX ? Markdown first then apply this template.
- To extract images from DOCX or preserve complex Word formatting consider using Pandoc directly or extending the `tools/` scripts.

Output location and helper

By convention generated PDFs are stored in the repository `pdfs/` folder so versions and changes are tracked. A small helper script is included to simplify generation:

- `tools/generate_pdf.ps1` — PowerShell script that runs Pandoc and writes the PDF into `pdfs/`. Example:

  powershell -ExecutionPolicy Bypass -File tools/generate_pdf.ps1 -input input.md -outputName "prd-v0.2.pdf"

You may remove generated PDFs from `pdfs/` manually when they are no longer needed.


