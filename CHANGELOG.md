# Changelog

All notable changes to the "spec-coder" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## v0.1.15

[compare changes](https://github.com/qirolab/nuxt-sanctum-authentication/compare/v0.1.14...v0.1.15)

### 🚀 Enhancements

- Add generic login response type ([1235bda](https://github.com/qirolab/nuxt-sanctum-authentication/commit/1235bda))
- Add example code for login callback ([9abfa83](https://github.com/qirolab/nuxt-sanctum-authentication/commit/9abfa83))

### ❤️ Contributors

- Harish Kumar <harish.pra22@gmail.com>

## v0.1.14

[compare changes](https://github.com/qirolab/nuxt-sanctum-authentication/compare/v0.1.13...v0.1.14)

### 🚀 Enhancements

- Add provider option to ModuleOptions ([ce5198e](https://github.com/qirolab/nuxt-sanctum-authentication/commit/ce5198e))
- Add client options to useSanctum login ([48ddc12](https://github.com/qirolab/nuxt-sanctum-authentication/commit/48ddc12))
- Improve type safety in `useSanctumFetch` ([5ca2ade](https://github.com/qirolab/nuxt-sanctum-authentication/commit/5ca2ade))

### 🩹 Fixes

- Handle MaybeArray for onRequest and onResponseError hooks ([6f174a6](https://github.com/qirolab/nuxt-sanctum-authentication/commit/6f174a6))
- Make submit options optional in SanctumForm ([57c6066](https://github.com/qirolab/nuxt-sanctum-authentication/commit/57c6066))
- Ensure `options` defaults to FetchOptions type ([29a4b3f](https://github.com/qirolab/nuxt-sanctum-authentication/commit/29a4b3f))

### 📖 Documentation

- Add link to nuxt-sanctum-authentication module ([adfeb90](https://github.com/qirolab/nuxt-sanctum-authentication/commit/adfeb90))

### ❤️ Contributors

- Harish Kumar <harish.pra22@gmail.com>

## v0.1.13

[compare changes](https://github.com/qirolab/nuxt-sanctum-authentication/compare/v0.1.12...v0.1.13)

### 🩹 Fixes

- Remove unnecessary try/catch block ([fddde74](https://github.com/qirolab/nuxt-sanctum-authentication/commit/fddde74))
- Handle token extraction error silently ([79ff2ab](https://github.com/qirolab/nuxt-sanctum-authentication/commit/79ff2ab))
- Log error when fetching authenticated user ([7f05734](https://github.com/qirolab/nuxt-sanctum-authentication/commit/7f05734))

### ❤️ Contributors

- Harish Kumar <harish.pra22@gmail.com>

## v0.1.12

[compare changes](https://github.com/qirolab/nuxt-sanctum-authentication/compare/v0.1.11...v0.1.12)

### 🚀 Enhancements

- Add extractNestedValue utility ([c46eb2d](https://github.com/qirolab/nuxt-sanctum-authentication/commit/c46eb2d))
- Add getAuthUser helper ([85525f7](https://github.com/qirolab/nuxt-sanctum-authentication/commit/85525f7))
- Add configurable token response key and logging ([3d650bf](https://github.com/qirolab/nuxt-sanctum-authentication/commit/3d650bf))
- Add responseKey option to SanctumModule ([40d6115](https://github.com/qirolab/nuxt-sanctum-authentication/commit/40d6115))
- Add userResponseWrapperKey to ModuleOptions ([4821f23](https://github.com/qirolab/nuxt-sanctum-authentication/commit/4821f23))
- Add fetchService and logger to getAuthUser ([ccfbceb](https://github.com/qirolab/nuxt-sanctum-authentication/commit/ccfbceb))
- Use getAuthUser to fetch user data ([fdbf3a5](https://github.com/qirolab/nuxt-sanctum-authentication/commit/fdbf3a5))
- Add HasApiTokens trait to user model ([15afb7c](https://github.com/qirolab/nuxt-sanctum-authentication/commit/15afb7c))
- Add token authentication ([15e51c2](https://github.com/qirolab/nuxt-sanctum-authentication/commit/15e51c2))
- Add token authentication routes ([e2f55da](https://github.com/qirolab/nuxt-sanctum-authentication/commit/e2f55da))

### 🩹 Fixes

- Allow null token value ([9783aaf](https://github.com/qirolab/nuxt-sanctum-authentication/commit/9783aaf))
- Use getAuthUser function to fetch user ([2016d7e](https://github.com/qirolab/nuxt-sanctum-authentication/commit/2016d7e))
- Update sanctum endpoints ([187fd3f](https://github.com/qirolab/nuxt-sanctum-authentication/commit/187fd3f))

### 🎨 Styles

- Set $wrap to 'data' in UserResource ([1793c98](https://github.com/qirolab/nuxt-sanctum-authentication/commit/1793c98))

### ❤️ Contributors

- Harish Kumar <harish.pra22@gmail.com>

## v0.1.11

[compare changes](https://github.com/qirolab/nuxt-sanctum-authentication/compare/v0.1.10...v0.1.11)

### 🚀 Enhancements

- Update profile form to patch request ([6bbd206](https://github.com/qirolab/nuxt-sanctum-authentication/commit/6bbd206))
- Add onRequestError callback to useSanctumForm ([ac396a6](https://github.com/qirolab/nuxt-sanctum-authentication/commit/ac396a6))

### 🩹 Fixes

- Update profile route to PATCH ([2a9ddad](https://github.com/qirolab/nuxt-sanctum-authentication/commit/2a9ddad))

### 🎨 Styles

- Ignore laravel-api fixtures in lint:fix ([2e090ca](https://github.com/qirolab/nuxt-sanctum-authentication/commit/2e090ca))

### ❤️ Contributors

- Harish Kumar <harish.pra22@gmail.com>

## v0.1.10

[compare changes](https://github.com/qirolab/nuxt-sanctum-authentication/compare/v0.1.9...v0.1.10)

### 🚀 Enhancements

- Add object-to-formdata helper ([1e2bcf4](https://github.com/qirolab/nuxt-sanctum-authentication/commit/1e2bcf4))
- Add SanctumForm interface ([5a963b6](https://github.com/qirolab/nuxt-sanctum-authentication/commit/5a963b6))
- Add objectToFormData helper to useSanctumForm ([a2b0197](https://github.com/qirolab/nuxt-sanctum-authentication/commit/a2b0197))

### 🩹 Fixes

- Remove object-to-formdata dependency ([c966a9b](https://github.com/qirolab/nuxt-sanctum-authentication/commit/c966a9b))
- Make ModuleOptions properties required ([72bd80d](https://github.com/qirolab/nuxt-sanctum-authentication/commit/72bd80d))
- Remove unnecessary cast ([27c9066](https://github.com/qirolab/nuxt-sanctum-authentication/commit/27c9066))

### 🏡 Chore

- **release:** V0.1.9 ([8cbbcb3](https://github.com/qirolab/nuxt-sanctum-authentication/commit/8cbbcb3))

### ❤️ Contributors

- Harish Kumar <harish.pra22@gmail.com>

## v0.1.9

[compare changes](https://github.com/qirolab/nuxt-sanctum-authentication/compare/v0.1.8...v0.1.9)

### 🚀 Enhancements

- Add object-to-formdata dependency ([8709c5e](https://github.com/qirolab/nuxt-sanctum-authentication/commit/8709c5e))

### ❤️ Contributors

- Harish Kumar <harish.pra22@gmail.com>

## v0.1.8

[compare changes](https://github.com/qirolab/nuxt-sanctum-authentication/compare/v0.1.7...v0.1.8)

### 🩹 Fixes

- Update object-to-formdata dependency ([3daee5f](https://github.com/qirolab/nuxt-sanctum-authentication/commit/3daee5f))

### ❤️ Contributors

- Harish Kumar <harish.pra22@gmail.com>

## v0.1.7

[compare changes](https://github.com/qirolab/nuxt-sanctum-authentication/compare/0.1.6...v0.1.7)

### 🚀 Enhancements

- Add lodash-es and object-to-formdata dependencies ([d7ff803](https://github.com/qirolab/nuxt-sanctum-authentication/commit/d7ff803))
- Add custom onRequest and onResponseError hooks ([7fc1cf6](https://github.com/qirolab/nuxt-sanctum-authentication/commit/7fc1cf6))
- Replace $sanctumFetch with a custom fetch service ([8f3731f](https://github.com/qirolab/nuxt-sanctum-authentication/commit/8f3731f))
- Add hasFile helper ([ba45fd2](https://github.com/qirolab/nuxt-sanctum-authentication/commit/ba45fd2))
- Add form type ([0bf4cf7](https://github.com/qirolab/nuxt-sanctum-authentication/commit/0bf4cf7))
- Create useSanctumForm composable ([fad10c9](https://github.com/qirolab/nuxt-sanctum-authentication/commit/fad10c9))
- Profile page form improvements ([17da722](https://github.com/qirolab/nuxt-sanctum-authentication/commit/17da722))
- Extract onRequest and onResponseError from options ([bf258a5](https://github.com/qirolab/nuxt-sanctum-authentication/commit/bf258a5))
- Add reset method to form ([bb2b188](https://github.com/qirolab/nuxt-sanctum-authentication/commit/bb2b188))
- Add reset method to useSanctumForm ([330b59c](https://github.com/qirolab/nuxt-sanctum-authentication/commit/330b59c))
- Add form validation and reset button ([56f8464](https://github.com/qirolab/nuxt-sanctum-authentication/commit/56f8464))
- Refactor useSanctumForm composable ([264260f](https://github.com/qirolab/nuxt-sanctum-authentication/commit/264260f))
- Add form API ([213f354](https://github.com/qirolab/nuxt-sanctum-authentication/commit/213f354))
- Add avatar to profile page ([4bb00bf](https://github.com/qirolab/nuxt-sanctum-authentication/commit/4bb00bf))
- Add avatar to User model ([600dafc](https://github.com/qirolab/nuxt-sanctum-authentication/commit/600dafc))
- Add avatar to user resource ([463edca](https://github.com/qirolab/nuxt-sanctum-authentication/commit/463edca))

### 🩹 Fixes

- Add empty object as first argument to createFetchService ([703b7e2](https://github.com/qirolab/nuxt-sanctum-authentication/commit/703b7e2))
- Change errors type to array ([9c4d8fe](https://github.com/qirolab/nuxt-sanctum-authentication/commit/9c4d8fe))
- Convert validation errors to array ([342c1df](https://github.com/qirolab/nuxt-sanctum-authentication/commit/342c1df))
- Change errors type to string ([19afa1b](https://github.com/qirolab/nuxt-sanctum-authentication/commit/19afa1b))
- UseSanctumForm: simplify validation errors ([fb71944](https://github.com/qirolab/nuxt-sanctum-authentication/commit/fb71944))
- Fix border-danger style ([d91eaee](https://github.com/qirolab/nuxt-sanctum-authentication/commit/d91eaee))
- Update host and apiUrl to localhost ([5a65216](https://github.com/qirolab/nuxt-sanctum-authentication/commit/5a65216))
- Store avatar in public disk ([86955e1](https://github.com/qirolab/nuxt-sanctum-authentication/commit/86955e1))
- Ignore test fixtures in lint command ([3fd73e6](https://github.com/qirolab/nuxt-sanctum-authentication/commit/3fd73e6))

### 💅 Refactors

- Remove user preview and change label name ([48a1f9b](https://github.com/qirolab/nuxt-sanctum-authentication/commit/48a1f9b))

### 📖 Documentation

- Add npm downloads badge ([3706e4c](https://github.com/qirolab/nuxt-sanctum-authentication/commit/3706e4c))
- Add support section ([a4fabcc](https://github.com/qirolab/nuxt-sanctum-authentication/commit/a4fabcc))

### 🏡 Chore

- Laravel api fixture ([039a7a7](https://github.com/qirolab/nuxt-sanctum-authentication/commit/039a7a7))

### 🎨 Styles

- Enable prettier-vscode as default formatter ([08159bb](https://github.com/qirolab/nuxt-sanctum-authentication/commit/08159bb))
- Remove arrow-parens rule ([89785cf](https://github.com/qirolab/nuxt-sanctum-authentication/commit/89785cf))

### ❤️ Contributors

- Harish Kumar <harish.pra22@gmail.com>

## v0.1.6

[compare changes](https://github.com/qirolab/nuxt-sanctum-authentication/compare/v0.1.5...v0.1.6)

### 📖 Documentation

- Add video tutorial and demo repository ([93fba0f](https://github.com/qirolab/nuxt-sanctum-authentication/commit/93fba0f))

### ❤️ Contributors

- Harish Kumar <harish.pra22@gmail.com>

## v0.1.5

[compare changes](https://github.com/qirolab/nuxt-sanctum-authentication/compare/v0.1.4...v0.1.5)

### 💅 Refactors

- Rename config key ([3d28b08](https://github.com/qirolab/nuxt-sanctum-authentication/commit/3d28b08))

### ❤️ Contributors

- Harish Kumar <harish.pra22@gmail.com>

## v0.1.4

[compare changes](https://github.com/qirolab/nuxt-sanctum-authentication/compare/v0.1.3...v0.1.4)

## v0.1.3

[compare changes](https://github.com/qirolab/nuxt-sanctum-authentication/compare/v0.1.2...v0.1.3)

### 💅 Refactors

- Rename useSanctumAuth to useSanctum ([18af17c](https://github.com/qirolab/nuxt-sanctum-authentication/commit/18af17c))
- Update useSanctum ([473a1d3](https://github.com/qirolab/nuxt-sanctum-authentication/commit/473a1d3))
- Update useSanctum ([66c5c74](https://github.com/qirolab/nuxt-sanctum-authentication/commit/66c5c74))

### 🏡 Chore

- **release:** V0.1.2 ([ccfc8d2](https://github.com/qirolab/nuxt-sanctum-authentication/commit/ccfc8d2))

### ❤️ Contributors

- Harish Kumar <harish.pra22@gmail.com>

## v0.1.2

[compare changes](https://github.com/qirolab/nuxt-sanctum-authentication/compare/v0.1.1...v0.1.2)

### 🚀 Enhancements

- Initial release ([86147f3](https://github.com/qirolab/nuxt-sanctum-authentication/commit/86147f3))
- Add module name ([9674fa0](https://github.com/qirolab/nuxt-sanctum-authentication/commit/9674fa0))

### 🩹 Fixes

- Add type annotation to fetchService ([86bfb28](https://github.com/qirolab/nuxt-sanctum-authentication/commit/86bfb28))
- Update module name and package name ([f4b7ad7](https://github.com/qirolab/nuxt-sanctum-authentication/commit/f4b7ad7))

### 💅 Refactors

- Remove version from module meta ([1cbcc69](https://github.com/qirolab/nuxt-sanctum-authentication/commit/1cbcc69))

### ❤️ Contributors

- Harish Kumar <harish.pra22@gmail.com>

## v0.1.0

- Initial release
- Automated CSRF token management
- Bearer token management
- Supports both CSR and SSR
- Compatible with Nuxt's `ofetch` client
- `useSanctumAuth` composable
- **Authentication:**
    - Login
    - Logout
    - Get current user
    - Refresh User
