"""Consolidate only the marked preflight/roadmap region into one visual flow.
The rest of installation-guide.html, including its chosen animation, is preserved byte-for-byte."""
from pathlib import Path
Q=Path(__file__).resolve().parents[1]
page=Q/"installation-guide.html"
text=page.read_text()
fragment=(Q/"redesign/installation-preflight.html").read_text()
START="<!-- qa-installation-preflight:start -->"
END="<!-- qa-installation-preflight:end -->"
fragment=fragment.replace(START,START+"\n<style data-ig-preflight>\n"+(Q/"installation-preflight.css").read_text()+"\n</style>",1)
if START in text:
    a=text.index(START)
    b=text.index(END,a)+len(END)
else:
    marker='<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">'
    heading=text.index("First: turn your code")
    a=text.rfind(marker,0,heading)
    second=text.index(marker,heading)
    b=text.index(marker,second+len(marker))
    assert a>=0 and "How this page works" in text[second:b]
before,after=text[:a],text[b:]
text=before+fragment.rstrip()+after
js='<script type="module" src="/qa/installation-preflight.js"></script>'
if js not in text:text=text.replace('</body>',js+'\n</body>',1)
page.write_text(text)
print("Updated only the marked preflight region; preserved surrounding HTML.")
