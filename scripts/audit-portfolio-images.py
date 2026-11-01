"""Audit all canonical preview files for broken images, duplicate content and near-identical layouts."""
import hashlib, json
from pathlib import Path
from PIL import Image
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
paths = sorted((ROOT / 'src/assets/portfolio').glob('*.webp'))
entries = []
for p in paths:
    with Image.open(p) as im:
        im.load()
        gray = np.asarray(im.crop((55, 145, 969, 710)).convert('L').resize((33, 32)), dtype=np.int16)
        bits = gray[:, 1:] > gray[:, :-1]
        fingerprint = np.packbits(bits.flatten()).tobytes().hex()
        entries.append({'slug': p.stem, 'path': str(p.relative_to(ROOT)), 'dimensions': list(im.size),
                        'sha256': hashlib.sha256(p.read_bytes()).hexdigest(), 'dhash': fingerprint})
near = []
for i, a in enumerate(entries):
    for b in entries[i + 1:]:
        distance = (int(a['dhash'], 16) ^ int(b['dhash'], 16)).bit_count()
        if distance <= 12:
            near.append({'first': a['slug'], 'second': b['slug'], 'distance': distance})
report = {'count': len(entries), 'unique_sha256': len({e['sha256'] for e in entries}),
          'near_similarity_threshold': '12 differing bits out of 1024, after cropping shared frame',
          'near_duplicate_candidates': near, 'assets': entries}
(ROOT / 'src/data/portfolio-image-audit.json').write_text(json.dumps(report, indent=2) + '\n')
assert len(entries) == 150, 'Expected exactly 150 original images'
assert report['unique_sha256'] == 150, 'Duplicate image bytes found'
assert all(e['dimensions'] == [1024, 768] for e in entries)
assert not near, f'Near-identical images require review: {near}'
print('Image audit passed: 150 readable assets, no exact duplicates or near-identical previews.')