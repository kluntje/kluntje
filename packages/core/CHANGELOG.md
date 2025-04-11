# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.7](https://github.com/kluntje/kluntje/tree/develop/packages/core/compare/@kluntje/core@2.1.6...@kluntje/core@2.1.7) (2025-04-11)

**Note:** Version bump only for package @kluntje/core





## [2.1.6](https://github.com/kluntje/kluntje/tree/develop/packages/core/compare/@kluntje/core@2.1.5...@kluntje/core@2.1.6) (2025-04-04)

**Note:** Version bump only for package @kluntje/core





## [2.1.5](https://github.com/kluntje/kluntje/tree/develop/packages/core/compare/@kluntje/core@2.1.4...@kluntje/core@2.1.5) (2025-03-24)

**Note:** Version bump only for package @kluntje/core





## [2.1.4](https://github.com/kluntje/kluntje/tree/develop/packages/core/compare/@kluntje/core@2.1.3...@kluntje/core@2.1.4) (2025-03-18)

**Note:** Version bump only for package @kluntje/core





## [2.1.3](https://github.com/kluntje/kluntje/tree/develop/packages/core/compare/@kluntje/core@2.1.2...@kluntje/core@2.1.3) (2024-12-06)

**Note:** Version bump only for package @kluntje/core





## [2.1.2](https://github.com/kluntje/kluntje/tree/develop/packages/core/compare/@kluntje/core@2.1.1...@kluntje/core@2.1.2) (2024-12-05)

**Note:** Version bump only for package @kluntje/core





## [2.1.1](https://github.com/kluntje/kluntje/tree/develop/packages/core/compare/@kluntje/core@2.1.0...@kluntje/core@2.1.1) (2024-11-26)


### Bug Fixes

* **core:** prevent subclass from modifing parents ui/event map ([937f9c5](https://github.com/kluntje/kluntje/tree/develop/packages/core/commit/937f9c588b177a902042f1d2b4534c1a3e371fec))
* **core:** run the reactions for props with `reactOnInit` after the componet was setup ([e4e21b8](https://github.com/kluntje/kluntje/tree/develop/packages/core/commit/e4e21b88d4a774d39a894b5b80c8a91439c80782))





# [2.1.0](https://github.com/kluntje/kluntje/tree/develop/packages/core/compare/@kluntje/core@2.0.0...@kluntje/core@2.1.0) (2024-04-29)


### Bug Fixes

* **core:** add missing parentheses for the logic to work correctly ([44c323d](https://github.com/kluntje/kluntje/tree/develop/packages/core/commit/44c323d83da9ada6603e616d147e03003f477067))


### Features

* **core:** set up the prop/attribute accessors before the rendering, so the values can be used ([42fde56](https://github.com/kluntje/kluntje/tree/develop/packages/core/commit/42fde56a7387896d45f1aa10ad676345eb55e313))





# [2.0.0](https://github.com/kluntje/kluntje/tree/develop/packages/core/compare/@kluntje/core@1.3.0...@kluntje/core@2.0.0) (2024-01-17)


### Bug Fixes

* **core:** deep clone inherited decoratedUiEls in case e.g. same ui element gets new events ([4faad74](https://github.com/kluntje/kluntje/tree/develop/packages/core/commit/4faad745d424437ed804184c0cf6892a28c2941e)), closes [#93](https://github.com/kluntje/kluntje/tree/develop/packages/core/issues/93)
* **core:** fix decoratedUiEls being modified during inheritance ([a84e9e3](https://github.com/kluntje/kluntje/tree/develop/packages/core/commit/a84e9e3d51b0e9ed3286a1a0bb35315fa67109b3)), closes [#93](https://github.com/kluntje/kluntje/tree/develop/packages/core/issues/93)
* **core:** props defaultValue could always ba an array reflect that to the TS type ([6364f9e](https://github.com/kluntje/kluntje/tree/develop/packages/core/commit/6364f9e33790a0e3b837835ce72e5e6616c8eff7))
* **core:** updated minimal nodeJs version to allow usage of structuredClone ([84317b9](https://github.com/kluntje/kluntje/tree/develop/packages/core/commit/84317b9a6e38112290d8f7368dac6e407bc62331))


### Code Refactoring

* **core:** use stricter access modifiers in core-component ([368e8a7](https://github.com/kluntje/kluntje/tree/develop/packages/core/commit/368e8a7afc9d03184b7598b93c72234a6b669f6a))


### BREAKING CHANGES

* **core:** scricter access modifiers can result in errors when using those methods from
outside the component
* **core:** Minimal nodeJS version has changed to v18





# [1.3.0](https://github.com/kluntje/kluntje/tree/develop/packages/core/compare/@kluntje/core@1.2.2...@kluntje/core@1.3.0) (2023-04-14)


### Features

* **core:** add support for extending built-in elements to tag decorator ([7ca9ea0](https://github.com/kluntje/kluntje/tree/develop/packages/core/commit/7ca9ea0c72ee783085553b75898320f45dccb7ee))





## [1.2.2](https://github.com/kluntje/kluntje/tree/develop/packages/core/compare/@kluntje/core@1.2.1...@kluntje/core@1.2.2) (2022-05-06)

**Note:** Version bump only for package @kluntje/core





## [1.2.1](https://github.com/kluntje/kluntje/tree/develop/packages/core/compare/@kluntje/core@1.2.0...@kluntje/core@1.2.1) (2022-05-05)

**Note:** Version bump only for package @kluntje/core





# [1.2.0](https://github.com/kluntje/kluntje/tree/develop/packages/core/compare/@kluntje/core@1.1.3...@kluntje/core@1.2.0) (2022-05-05)


### Features

* **core:** added renderAsync Decorator ([36f2e90](https://github.com/kluntje/kluntje/tree/develop/packages/core/commit/36f2e909056d20f810b0fe86e8c1286335b3fd31))
* **js-utils|core:** add support for event options to onEvent and ctor`s events and  [@ui](https://github.com/ui)Events ([457132a](https://github.com/kluntje/kluntje/tree/develop/packages/core/commit/457132a6ac27bdec4ae0370d7a08ddd0530f9546))





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
