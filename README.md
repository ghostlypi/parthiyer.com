# parthiyer.com

This static site uses the sibling [`site-framework`](../site-framework/README.md)
repository for shared CSS, theme switching, the ampule loader, and build tasks.
Feeling uses the same framework and remains independently deployable.

```sh
./web tasks
./web check
./web build
./web serve --port 8000
```

`web.json` defines project settings. `build` runs
`python3 publish.py --generate-only` to generate articles and policies, refreshes
the early inline loaders, and packages the site into `dist/`. The existing
article generator needs the Python `Markdown` package. The framework itself has
no third-party Python dependencies. Build does not commit, push, or deploy.

To change common UI, edit `../site-framework/assets/`, then update both sites:

```sh
python3 ../site-framework/web.py update . ../feeling
python3 ../site-framework/web.py update . ../feeling --check
```

`./web update` updates only this site. `sync_framework.py` remains a compatibility
command that updates both sibling checkouts by default (`--local` limits it to
this one). The existing `publish.py` publishing flow refreshes inline loaders
from this site's installed framework before its normal commit/push step.

Shared files listed in `framework-manifest.json` are generated. Site-specific
styles stay in `css/style.css`, `css/light-mode.css`, `css/vertical-tabs.css`, and
the existing page styles. The local styles import the common CSS foundation.
Framework updates preserve them and the site's content, data, and images.

Commit shared source changes in the framework repository, then the resulting
asset and inline-loader updates in both site repositories. `./web update --check`
reports upstream drift without writing; `./web check` checks the installed
version. `python3 sync_loader.py --check` also works without the sibling checkout.

The old animation is preserved unchanged in [`loading.html`](loading.html),
with its original CSS/JS archived in `legacy/`. The active pages use the ampule.
