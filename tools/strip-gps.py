"""Remove GPS location data from JPEG files (in place).

Usage: python3 -I tools/strip-gps.py <file.jpg> [...]

If a photo has no rotation flag, the whole EXIF block is removed.
If it does, only the GPS section is wiped so the photo still displays upright.
"""
import struct
import sys

TYPE_SIZES = {1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 7: 1, 9: 4, 10: 8}


def segments(data):
    """Yield (start, end, marker) for each JPEG header segment before the image data."""
    pos = 2
    while pos < len(data) - 4 and data[pos] == 0xFF:
        marker = data[pos + 1]
        if marker == 0xDA:  # start of image data
            return
        length = struct.unpack('>H', data[pos + 2:pos + 4])[0]
        yield pos, pos + 2 + length, marker
        pos += 2 + length


def strip(path):
    data = bytearray(open(path, 'rb').read())
    for start, end, marker in list(segments(data)):
        if marker != 0xE1 or data[start + 4:start + 10] != b'Exif\x00\x00':
            continue
        tiff = start + 10
        bo = '<' if data[tiff:tiff + 2] == b'II' else '>'
        u16 = lambda p: struct.unpack(bo + 'H', data[p:p + 2])[0]
        u32 = lambda p: struct.unpack(bo + 'I', data[p:p + 4])[0]
        ifd0 = tiff + u32(tiff + 4)
        orientation, gps_entry = 1, None
        for k in range(u16(ifd0)):
            e = ifd0 + 2 + 12 * k
            tag = u16(e)
            if tag == 0x0112:
                orientation = u16(e + 8)
            elif tag == 0x8825:
                gps_entry = e
        if gps_entry is None:
            return 'no gps'
        if orientation == 1:
            del data[start:end]
            open(path, 'wb').write(data)
            return 'removed exif'
        # Keep EXIF (for rotation) but wipe the GPS section
        gps = tiff + u32(gps_entry + 8)
        for k in range(u16(gps)):
            e = gps + 2 + 12 * k
            size = TYPE_SIZES.get(u16(e + 2), 1) * u32(e + 4)
            if size > 4:
                off = tiff + u32(e + 8)
                data[off:off + size] = bytes(size)
            data[e:e + 12] = bytes(12)
        data[gps:gps + 2] = bytes(2)
        open(path, 'wb').write(data)
        return 'wiped gps'
    return 'no exif'


if __name__ == '__main__':
    for p in sys.argv[1:]:
        print(f'{strip(p):13} {p}')
