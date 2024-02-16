# How to use this?

- `finmid/github-cache-action` is the repository that builds the action itself. It depends on the
  `finmid/github-actions-toolkit` repository that creates different action libraries.
- Clone this repository and run `npm i` to install the dependencies.
- Clone the `finmid/github-actions-toolkit` repository in the root of this repository. This repository depends
  on the customized cache library of the toolkit you've just cloned.
- Checkout `local-cache` branch of the `github-actions-toolkit` repository and sync changes with the upstream.
- Execute `npm i`, `npm run bootstrap` and `npm run build` in the `github-actions-toolkit`.
- Execute `npm run build` in this repository. As a result you should see new builds in the `dist` folder.