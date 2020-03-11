# Contributing Guide

Hey! First of all, We would like to thank you for contributing to kluntje. Before submitting your contribution, please make sure to take a moment and read through the following guidelines:

- [Code of Conduct](https://github.com/kluntje/kluntje/blob/master/.github/CODE_OF_CONDUCT.md)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Commit Messages](#commit-messages)

## Setup your local develop environment

### Correct Node/npm version

Check that you have the correct node version installed. You can either use [nvm](https://github.com/nvm-sh/nvm) to switch to/ install the version specified to in `.nvmrc` or manually install the correct version.

### Project bootstrapping

Install all required dependencies in project root

```bash
$ npm install
```

Bootstrap the project

```bash
$ npm run bootstrap
```

Finally run your first build

```bash
$ npm run build
```

### Develop

You can than go ahead and apply your changes. Please follow the advice given in our [Pull Request Guidelines](#pull-request-guidelines).

### Commiting

When you are done build the project once

```bash
$ npm run build
```

And run all tests

```bash
$ npm run test
```

#### Documentation

We strongly suggest to document your code at least with proper [JSDoc](https://github.com/jsdoc/jsdoc) annotations.
The following script will parse your source for `JSDoc` annotations and automatically add your changes to the documentation.

```bash
$ node ./scripts/jsdoc2md.js
```

Once everything is done conclude your development task with a commit

```bash
$ npm run commit
```

This will take you through a step by step guide and you will be required to fill out all questions (see [Commit Messages](#commit-messages)).

Next steps would be to push to origin and create a pull request.


## Pull Request Guidelines

- The `master` branch is just a snapshot of the latest stable release. All development should be done in dedicated branches. **Do not submit PRs against the `master` branch.**

- Checkout develop-branch, and merge back against that branch.

- Work in the `src` folder and **DO NOT** checkin generated artifacts.

- It's OK to have multiple small commits as you work on the PR - GitHub will automatically squash it before merging.

- Make sure `npm test` passes.

- If adding a new feature:
  - Add accompanying test case.
  - Provide a convincing reason to add this feature. Ideally, you should open a suggestion issue first and have it approved before working on it.

- If fixing bug:
  - If you are resolving a special issue, add `(closes #xxxx[,#xxxx])` (#xxxx is the issue id) in your PR title for a better release log, e.g. `fixed event-binding (closes #34)`.
  - use the provided PR-template to provide a detailed description of the bug in the PR.
  - Add appropriate test coverage if applicable.


### Commit Messages

> This is adapted from [vuejs commit convention](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md).

Commit messages should follow the commit message convention so that changelogs can be automatically generated. Commit messages will be automatically validated upon commit. If you are not familiar with the commit message convention, you can use `npm run commit` instead of `git commit`, which provides an interactive CLI for generating proper commit messages.


Messages must be matched by the following regex:

``` js
/^(revert: )?(feat|fix|polish|docs|style|refactor|perf|test|workflow|ci|chore|types)(\(.+\))?: .{1,50}/
```

#### Examples

Appears under "Features" header, `core` subheader:

```
feat(core): add 'props' option to constructor args
```

Appears under "Bug Fixes" header, `js-utils` subheader, with a link to issue #28:

```
fix(js-utils): fix ie11 issue with addClass

close #28
```
