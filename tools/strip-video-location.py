"""Blank out GPS location text inside an MP4/MOV file (in place).

Apple devices store location as ISO 6709 text such as "+32.8504-117.2725+012.345/".
This overwrites any such text with zeros-equivalent padding so the file still plays.
Usage: python3 -I tools/strip-video-location.py <file.mp4> [...]
"""
import re
import sys

PATTERN = re.compile(rb'[+-]\d{2}\.\d{3,}[+-]\d{3}\.\d{3,}(?:[+-]\d+\.\d+)?/')

for path in sys.argv[1:]:
    data = bytearray(open(path, 'rb').read())
    hits = 0
    for m in PATTERN.finditer(bytes(data)):
        data[m.start():m.end()] = b'+00.0000+000.0000/'.ljust(m.end() - m.start(), b' ')[: m.end() - m.start()]
        hits += 1
    open(path, 'wb').write(data)
    print(f'{hits} location tag(s) blanked in {path}')
