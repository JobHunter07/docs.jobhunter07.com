"""Split DOCX PRD into chapter Markdown files.

Usage:
  python tools/split_docx_to_md.py "pdfs/Product Requirements Document for JobHunter07 (v0.02).docx" docs/prd/

This script:
- reads the .docx using python-docx
- concatenates paragraphs and preserves headings
- splits the document at top-level headings (Heading 1)
- writes numbered markdown files `01-chapter-title.md` into output directory

Requires: python-docx, markdownify

"""
import sys
import os
import re
from pathlib import Path

try:
    from docx import Document
except Exception as e:
    print("Missing python-docx. Install with: pip install python-docx")
    raise


def slugify(s):
    s = s.strip().lower()
    s = re.sub(r"[^a-z0-9]+","-", s)
    s = re.sub(r"-+","-", s)
    return s.strip("-")


def para_to_md(p):
    # Preserve inline formatting (bold/italic) at run level and return markdown
    pieces = []
    for run in p.runs:
        text = run.text.replace('\u00a0', ' ')
        if not text:
            continue
        # Escape backticks and markdown-sensitive characters minimally
        # (users may further refine)
        if run.bold and run.italic:
            pieces.append(f"***{text}***")
        elif run.bold:
            pieces.append(f"**{text}**")
        elif run.italic:
            pieces.append(f"*{text}*")
        else:
            pieces.append(text)
    if not pieces:
        return ''
    return ''.join(pieces) + '\n\n'


def paragraph_contains_image_xml(p):
    # quick check for r:embed in the run xml
    return 'r:embed="' in p._p.xml


def run(infile, outdir):
    doc = Document(infile)
    outdir = Path(outdir)
    outdir.mkdir(parents=True, exist_ok=True)
    assets_dir = outdir / 'assets'
    assets_dir.mkdir(parents=True, exist_ok=True)

    # Map relationship ids to saved filenames
    rid_to_file = {}
    image_count = 0

    chapters = []
    current = { 'title': 'preface', 'content': '' }

    for p in doc.paragraphs:
        style = p.style.name if p.style is not None else ''
        text = p.text.strip()
        if not text and not paragraph_contains_image_xml(p):
            # preserve empty lines as paragraph separators
            if current['content'] and not current['content'].endswith('\n\n'):
                current['content'] += '\n\n'
            continue
        # Heading detection
        if style.startswith('Heading') and '1' in style:
            # start new chapter
            chapters.append(current)
            current = { 'title': text, 'content': '' }
        else:
            # handle images embedded in paragraph via r:embed references
            para_md = para_to_md(p)
            # find rId references in paragraph XML and extract images
            xml = p._p.xml
            for match in re.finditer(r'r:embed="(rId[0-9]+)"', xml):
                rid = match.group(1)
                if rid in rid_to_file:
                    fname = rid_to_file[rid]
                else:
                    # try to resolve related part from document
                    try:
                        rel = doc.part.related_parts[rid]
                        if rel.content_type.startswith('image'):
                            image_count += 1
                            ext = rel.content_type.split('/')[-1]
                            fname = f'image_{image_count}.{ext}'
                            path = assets_dir / fname
                            with open(path, 'wb') as imgf:
                                imgf.write(rel.blob)
                            rid_to_file[rid] = fname
                        else:
                            fname = None
                    except Exception:
                        fname = None
                if fname:
                    # append image markdown reference
                    para_md += f'![](assets/{fname})\n\n'
            current['content'] += para_md

    chapters.append(current)

    # write files
    for i, ch in enumerate(chapters, start=1):
        title = ch['title'] or f'chapter-{i}'
        slug = slugify(title) or f'chapter-{i}'
        filename = f"{i:02d}-{slug}.md"
        path = outdir / filename
        with open(path, 'w', encoding='utf-8') as f:
            # write a polished header block
            f.write(f"# {title}\n\n")
            # Add metadata-ish front paragraph
            f.write(ch['content'].strip() + '\n')
        print('Wrote', path)


if __name__ == '__main__':
    if len(sys.argv) < 3:
        print('Usage: python tools/split_docx_to_md.py <in.docx> <outdir>')
        sys.exit(1)
    run(sys.argv[1], sys.argv[2])
