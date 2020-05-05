Due to recent changes to [GitHub Pages](https://pages.github.com/), the `master` branch of this repository is used to serve the web page at [1138-4EB.github.io/elide](https://1138-4eb.github.io/elide/). The content is automatically generated and pushed from travis-ci each time a commit is pushed to this branch (`pages`). There is also a daily cron job, which is run if no build is done in the last 24h.

1. The [wiki](https://github.com/1138-4EB/elide/wiki) of this repo is cloned to a subir. Filenames and link syntax are modified and metadata is added.
2. Theme [beautifulhugo](https://github.com/halogenica/beautifulhugo) is cloned and [patched](/1138-4EB/elide/tree/pages/themes).
3. [Hugo :: A fast and modern static website engine](https://gohugo.io/) is downloaded and extracted.
4. `README.md` is moved to a temporal location and the previous content of `master` is removed.
5. Hugo is executed and `README.md` is restored.
6. If there is any difference between the new content and the content cloned before, it is committed and pushed.

The main script is based on [gist.github.com/domenic/ec8b0fc8ab45f39403dd](https://gist.github.com/domenic/ec8b0fc8ab45f39403dd).

Project resources are actually available in branch [stable](https://github.com/1138-4EB/elide/tree/stable).
