# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.3](https://github.com/kluntje/kluntje/tree/develop/packages/core/compare/@kluntje/core@1.1.2...@kluntje/core@1.1.3) (2022-03-14)


### Bug Fixes

* **core:** accessible ui definitions to make preservable after updateUI ([5184748](https://github.com/kluntje/kluntje/tree/develop/packages/core/commit/5184748dbdd29fa53e0054cac9fe4bddaa6e4601))





## [1.1.2](https://github.com/kluntje/kluntje/tree/develop/packages/core/compare/@kluntje/core@1.1.1...@kluntje/core@1.1.2) (2021-09-15)

**Note:** Version bump only for package @kluntje/core





## [1.1.1](https://github.com/kluntje/kluntje/tree/develop/packages/core/compare/@kluntje/core@1.1.0...@kluntje/core@1.1.1) (2021-09-06)

**Note:** Version bump only for package @kluntje/core





# [1.1.0](https://github.com/kluntje/kluntje/tree/develop/packages/core/compare/@kluntje/core@1.0.4...@kluntje/core@1.1.0) (2021-04-28)


### Bug Fixes

* **core:** fixed issue with decorated ui and mq-based rendering ([fc43d86](https://github.com/kluntje/kluntje/tree/develop/packages/core/commit/fc43d8612c334eb88cf5db496187a5dac5c42f17))
* **core:** reinitiallize decorated props, when updateUI method is called ([9bf956c](https://github.com/kluntje/kluntje/tree/develop/packages/core/commit/9bf956c9e4e8a41a3c085c27946f0823564db489))


### Features

* **all:** added exports for all kluntje-specific events ([4bfbdbd](https://github.com/kluntje/kluntje/tree/develop/packages/core/commit/4bfbdbd74a04fd0dd8696ef22736a25a7e7749c7)), closes [#43](https://github.com/kluntje/kluntje/tree/develop/packages/core/issues/43)
* **core:** additionally export INITIALIZED_EVENT constant containing event-name as string ([d947758](https://github.com/kluntje/kluntje/tree/develop/packages/core/commit/d947758b39b8e70425d4221892edb322c676ef23))





## [1.0.4](https://github.com/kluntje/kluntje/tree/develop/packages/core/compare/@kluntje/core@1.0.3...@kluntje/core@1.0.4) (2021-02-24)

**Note:** Version bump only for package @kluntje/core





## [1.0.3](https://github.com/kluntje/kluntje/tree/develop/packages/core/compare/@kluntje/core@1.0.2...@kluntje/core@1.0.3) (2020-03-15)


### Bug Fixes

* **core:** fixed import error in prop.ts ([e73d7b1](https://github.com/kluntje/kluntje/tree/develop/packages/core/commit/e73d7b13de4665f16fc2ef26fab53d99044637ac))





## [1.0.2](https://github.com/kluntje/kluntje/tree/develop/packages/core/compare/@kluntje/core@1.0.1...@kluntje/core@1.0.2) (2020-03-11)

**Note:** Version bump only for package @kluntje/core





## [1.0.1](https://github.com/kluntje/kluntje/tree/develop/packages/core/compare/@kluntje/core@1.0.0...@kluntje/core@1.0.1) (2020-03-06)

**Note:** Version bump only for package @kluntje/core





# 1.0.0 (2020-03-06)


### Bug Fixes

* **core:** shadowDOM with string template ([08234b2](https://github.com/kluntje/kluntje/commit/08234b2eabd2da94eae54fb8e8c85494e74c1afb))


### Features

* **core:** add `tag` decorator for simpler, declarative custom element definition ([8666d5f](https://github.com/kluntje/kluntje/commit/8666d5f99eae5016f5ab8c1188a57450fbcbcb51))
* **core:** add props feature to base component ([342a621](https://github.com/kluntje/kluntje/commit/342a621a39538112d72b3b8ece4625fe5c41787b))
* **core:** add support for HTMLTemplateElement as the rendering template ([9df111b](https://github.com/kluntje/kluntje/commit/9df111b68444a2f6afc4c34859440b4449c1d204))
* **core:** polish minor changes ([a3a09f9](https://github.com/kluntje/kluntje/commit/a3a09f9099c42f515f9076967e94e5cbe8f29ae4))


### BREAKING CHANGES

* **core:** `preserveChilds` is called `preserveChildren` now
