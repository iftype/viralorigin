# Branch and release strategy

## Branches

- `develop`: the integration branch. Feature work lands here first and every push runs the full monorepo CI.
- `main`: the protected release branch. Only reviewed pull requests from `develop` should merge here.
- Short-lived work can use `feat/*`, `fix/*`, or `chore/*` and target `develop`.

## Release flow

1. Work is committed with Conventional Commit prefixes such as `feat:`, `fix:`, and `chore:`.
2. A pull request moves the tested state from `develop` to `main`.
3. A push to `main` runs CI again, then semantic-release creates the next Git tag and GitHub Release.
4. GitHub Pages continues to publish the web app while the Oracle deployment gate is disabled.
5. When repository variable `ORACLE_DEPLOY_ENABLED` is `true`, the same release is copied to the Oracle VM and the API service is restarted.

## Version policy

- `fix:` creates a patch release.
- `feat:` creates a minor release.
- `BREAKING CHANGE:` in a commit body creates a major release.
- Git tags and GitHub Releases are the production version source of truth; package manifests remain private workspace metadata.
