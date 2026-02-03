Product Requirements Document (converted)

This directory contains Markdown chapters generated from `pdfs/Product Requirements Document for JobHunter07 (v0.02).docx`.

How to regenerate:

1. Install dependencies:

   pip install python-docx

2. Run the splitter script:

   python tools/split_docx_to_md.py "pdfs/Product Requirements Document for JobHunter07 (v0.02).docx" docs/prd/

Notes:
- The script splits at Word `Heading 1` styles to create per-chapter Markdown files.
- Formatting is minimal; images and complex elements are not extracted by this script.
- For a higher fidelity conversion install `pandoc` and run:

  pandoc "pdfs/Product Requirements Document for JobHunter07 (v0.02).docx" -f docx -t gfm -s -o temp/prd_full.md

