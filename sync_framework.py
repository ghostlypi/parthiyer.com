"""Compatibility command; the framework and update logic live in site-framework."""
import argparse
import json
import os
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parent


def sync_framework(targets=None, check=False):
    config = json.loads((ROOT / 'web.json').read_text())
    framework = (ROOT / (os.environ.get('WEB_FRAMEWORK_HOME') or config['framework']['path'])).resolve()
    if targets is None:
        sibling = ROOT.parent / 'feeling'
        targets = [sibling] if (sibling / 'index.html').is_file() else []
    command = [sys.executable, str(framework / 'web.py'), 'update', str(ROOT)]
    command.extend(str(Path(target).resolve()) for target in targets)
    if check:
        command.append('--check')
    subprocess.run(command, check=True)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true')
    selection = parser.add_mutually_exclusive_group()
    selection.add_argument('--local', action='store_true')
    selection.add_argument('--target', action='append', type=Path)
    args = parser.parse_args()
    try:
        sync_framework([] if args.local else args.target, check=args.check)
    except subprocess.CalledProcessError as error:
        raise SystemExit(error.returncode)
