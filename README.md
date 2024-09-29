# Nuxt Sanctum Authentication

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@qirolab/nuxt-sanctum-authentication/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@qirolab/nuxt-sanctum-authentication
[npm-downloads-src]: https://img.shields.io/npm/dm/@qirolab/nuxt-sanctum-authentication.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@qirolab/nuxt-sanctum-authentication
[license-src]: https://img.shields.io/npm/l/@qirolab/nuxt-sanctum-authentication.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@qirolab/nuxt-sanctum-authentication
[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com


## **Introduction**

The nuxt-sanctum-authentication module seamlessly integrates Laravel Sanctum
with Nuxt 3 to provide a simple and secure authentication process for your
application. It works efficiently in both Server-Side Rendering (SSR) and
Client-Side Rendering (CSR) environments, ensuring consistent and reliable
authentication regardless of how your app is rendered.


## Key features

- **Seamless CSR and SSR Support**: Works smoothly in both client-side and server-side rendering modes.
- **Automatic CSRF Token Management**: Automatically handles CSRF tokens to protect your app from cross-site request forgery attacks.
- **Bearer Token Management**: Manages Bearer tokens for secure access to protected resources.
- **Integration with Nuxt's ofetch Client**: Fully compatible with Nuxt's ofetch client for making authenticated HTTP requests in your application.

<br />

> **Important**: Before using this module, make sure that Laravel Sanctum is correctly configured on your backend. For more detailed setup instructions, refer to the [Laravel Sanctum documentation](https://laravel.com/docs/11.x/sanctum).

## Documentation

For full documentation, including setup instructions and API reference, visit the **[Nuxt Sanctum Authentication Documentation](https://qirolab.github.io/nuxt-sanctum-authentication/)**.

## Video Tutorial

Watch the step-by-step guide on how to use the `nuxt-sanctum-authentication` module in this **[Video Tutorial](https://www.youtube.com/watch?v=CLjd0_o67OA)**.

## Demo Repository

To explore the source code, check out the **[Nuxt Sanctum Authentication Demo Repository](https://github.com/qirolab/nuxt-sanctum-authentication-demo)**.
- For **Cookie-Based SPA Authentication**, see the `main` branch.
- For **API Token Authentication**, check out the `api-token-authentication` branch.


## Contributing

Contributions to the `nuxt-sanctum-authentication` module are welcome! Whether it's bug fixes, feature enhancements, or documentation improvements, feel free to submit a pull request.

### Development Setup

1. Fork the repository.
2. Clone your forked repository.
3. Install dependencies: `npm install` or `yarn install`.
4. Make your changes and commit them with a clear and descriptive message.
5. Push your changes to your forked repository.
6. Submit a pull request.

---

## License

The `nuxt-sanctum-authentication` module is open-source software licensed under the MIT license.
