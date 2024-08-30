# Nuxt Sanctum Authentication

## Table of Contents
- [Introduction](#introduction)
    - [Key Features](#key-features)
- [Installation](#installation)
    - [Minimum Requirements](#minimum-requirements)
    - [Installing the Nuxt Module](#installing-the-nuxt-module)
    - [Manual Installation](#manual-installation)
    - [Required Configuration](#required-configuration)
- [SPA Cookie Authentication](#spa-cookie-authentication)
    - [Configuration](#configuration)
      - [Domain Configuration](#domain-configuration)
    - [How It Works](#how-it-works)
      - [Post-Login Behavior](#post-login-behavior)
    - [Laravel Configuration](#laravel-configuration)
- [API Token Authentication](#api-token-authentication)
    - [Configuration](#configuration-1)
    - [How It Works](#how-it-works-1)
    - [Laravel Configuration](#laravel-configuration-1)
      - [Key Considerations:](#key-considerations)
- [Module Configuration](#module-configuration)
    - [Required Configuration](#required-configuration-1)
    - [Advanced Configuration Options](#advanced-configuration-options)
    - [Overriding Configuration](#overriding-configuration)
- [Composables Overview](#composables-overview)
    - [`useSanctumAuth()`](#usesanctumauth)
    - [`useCurrentUser()`](#usecurrentuser)
    - [`useSanctumFetch()`](#usesanctumfetch)
    - [`useSanctumOptions()`](#usesanctumoptions)
    - [`useTokenStorage()`](#usetokenstorage)
- [Middleware](#middleware)
    - [Available Middlewares](#available-middlewares)
      - [`$auth` Middleware](#auth-middleware)
      - [`$guest` Middleware](#guest-middleware)
  - [Customizing Middleware Names](#customizing-middleware-names)
    - [How to Rename Middlewares](#how-to-rename-middlewares)
    - [Example with Custom Middleware Names](#example-with-custom-middleware-names)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

# **Introduction**

The `nuxt-sanctum-authentication` module provides a simple and efficient way to integrate Laravel Sanctum with Nuxt 3, making authentication in your application straightforward and secure. This module is designed to work effortlessly in both Server-Side Rendering (SSR) and Client-Side Rendering (CSR) environments, ensuring that your authentication process is consistent and reliable no matter how your app is rendered.

### Key Features

* **Seamless CSR and SSR Support:** The module is built to function smoothly in both client-side and server-side rendering modes, ensuring that your authentication setup works regardless of how your app is rendered.

* **Automatic CSRF Token Management:** The module automatically handles CSRF tokens, which are essential for protecting your app from cross-site request forgery attacks. This includes managing both the CSRF token headers and cookies, so you don't have to manage them manually.

* **Bearer Token Management:** The module takes care of managing Bearer tokens, which are used for secure access to protected resources. This ensures that the right authentication tokens are included in your requests automatically.

* **Pre-configured Authentication Middleware:** The module includes a middleware that's ready to use, allowing you to protect pages that require user authentication with minimal setup.

* **Integration with Nuxt's** `ofetch` Client: The module is fully compatible with Nuxt's `ofetch` client, making it easy to make authenticated HTTP requests in your application.

> **Important:** Before using this module, make sure that Laravel Sanctum is correctly configured on your backend. For more detailed setup instructions, refer to the [Laravel Sanctum documentation](https://laravel.com/docs/11.x/sanctum).

---

# **Installation**

### **Installing the Nuxt Module**

To install the `nuxt-sanctum-authentication` module and automatically register it in your `nuxt.config.ts`, run the following command:

```bash
npx nuxi@latest module add @qirolab/nuxt-sanctum-authentication
```

This command will add the module to your project and handle the registration process, saving you the hassle of manual setup.

### **Manual Installation**

If you prefer a manual approach, you can install the `nuxt-sanctum-authentication` module using your package manager of choice. Below are the commands for different package managers:

```bash
# Using pnpm
pnpm add @qirolab/nuxt-sanctum-authentication

# Using yarn
yarn add @qirolab/nuxt-sanctum-authentication

# Using npm
npm i @qirolab/nuxt-sanctum-authentication
```

After installing the module, you need to register it manually in your `nuxt.config.ts` file. Add the module to the `modules` array like this:

```javascript
export default defineNuxtConfig({
    modules: ['nuxt-sanctum-authentication'],
});
```

### **Required Configuration**

Once the module is installed and registered, you need to configure it by adding specific options to your `nuxt.config.ts`. This configuration will point the module to your Laravel API:

```javascript
export default defineNuxtConfig({
    // nuxt-sanctum-authentication options
    sanctumAuth: {
        apiUrl: 'http://laravel-api.test', // Replace with your Laravel API URL
    },
});
```

In the `apiUrl` field, replace `'http://laravel-api.test'` with the actual URL of your Laravel API. This configuration is essential for the module to correctly interact with your backend.

That's it! Your Nuxt app is now equipped with Laravel Sanctum authentication, ready to provide a seamless and secure user experience ✨.

---

## **SPA Cookie Authentication**

The `nuxt-sanctum-authentication` module is specifically designed to seamlessly integrate with Laravel Sanctum's SPA (Single Page Application) cookie-based authentication. This setup provides a secure and efficient way to manage user authentication in your Nuxt 3 application.

### **Configuration**

To enable SPA cookie-based authentication, you need to set the `sanctumAuth.authMode` property to `cookie` in your `nuxt.config.ts` file:

```javascript
export default defineNuxtConfig({
    sanctumAuth: {
        apiUrl: 'http://laravel-api.test', // Your Laravel API URL
        authMode: 'cookie',
    },
});
```

#### **Domain Configuration**

For this authentication mode to work correctly, your Nuxt and Laravel applications must share the same top-level domain. Here's an example setup:

* **Nuxt Application**: `domain.com`

* **Laravel Application**: `api.domain.com`


This ensures that cookies can be shared across both applications, which is
crucial for maintaining the user's authentication state.

### **How It Works**

Once the module is configured, you can authenticate users by sending their credentials to the designated login endpoint. Here's how you can do it:

```javascript
const { login } = useSanctumAuth();

const credentials = {
    email: "john@doe.com",
    password: "password",
    remember: true,
};

await login(credentials);
```

When the `login` method is called with the user's credentials, the module will handle the authentication process, including obtaining a CSRF token and setting the necessary cookies.

#### **Post-Login Behavior**

After a successful login, the user will be automatically redirected to the route specified in `sanctumAuth.redirect.redirectToAfterLogin`. From this point on, the module will manage the authentication state, including requesting a CSRF cookie from the API and ensuring that it is included as an `XSRF` header in all subsequent requests.

### **Laravel Configuration**

To ensure that your Laravel backend properly supports SPA cookie authentication with Nuxt, you need to configure Laravel as follows:

1. **Stateful Domains**: Register your Nuxt application's domain in the `SANCTUM_STATEFUL_DOMAINS` environment variable.

2. **CORS Configuration**:

    * Add your Nuxt domain to the `allowed_origins` list in `config/cors.php`.

    * Set `support_credentials` to `true` in `config/cors.php`.

3. **Sanctum Middleware**: Enable Sanctum's `statefulApi` middleware to handle stateful API requests.

4. **Session Domain**: Use the top-level domain for the session by setting `SESSION_DOMAIN=.domain.com` in your environment file. During development, you can use `localhost`.


By following these steps, your Laravel application will be fully configured to support SPA cookie authentication with your Nuxt 3 frontend.

For more detailed instructions, refer to the official Laravel documentation on [SPA Authentication](https://laravel.com/docs/11.x/sanctum#spa-authentication).

---

## **API Token Authentication**

Token-based authentication is generally not recommended for Single Page Applications (SPAs). However, it can be quite useful in specific scenarios, such as mobile or desktop applications, where maintaining a session-based authentication system is less feasible.

### **Configuration**

To enable API token-based authentication in your Nuxt 3 application, you need to configure the `sanctumAuth.authMode` property to use `token` in your `nuxt.config.ts` file:

```javascript
export default defineNuxtConfig({
    sanctumAuth: {
        apiUrl: 'http://laravel-api.test', // Your Laravel API URL
        authMode: 'token',
    },
});
```

### **How It Works**

Once token-based authentication is enabled, you can authenticate users by sending their credentials to the specified login endpoint. Here's an example of how you can perform this operation:

```javascript
const { login } = useSanctumAuth();

const credentials = {
    email: "john@doe.com",
    password: "password",
    remember: true,
};

await login(credentials);
```

When the `login` method is invoked, the credentials are sent to the backend API. Upon successful authentication, the API will return a plain token. This token is then stored by the module and is automatically included in the `Authorization` header for all subsequent requests, ensuring that authenticated API calls are properly authorized.

### **Laravel Configuration**

To support token-based authentication on the backend, your Laravel API needs to have appropriate login and logout routes defined in your `api.php` routes file:

```php
Route::post('/login', StoreTokenAuthenticationController::class)
->middleware(['guest']);

Route::post('/logout', DestroyTokenAuthenticationController::class
->middleware(['auth:sanctum']);
```

#### **Key Considerations:**

1. **CSRF Protection**: Ensure that the API requests are not originating from a domain listed in the `SANCTUM_STATEFUL_DOMAINS` environment variable. If they are, you may encounter a CSRF mismatch error, which occurs because Laravel Sanctum is expecting session-based authentication for stateful domains.

2. **Token Format**: The login endpoint should return a JSON response containing a `token` key. The token should be a plain string, representing the user's access token. Here's an example of the expected response format:


```json
{
    "token": "<plain_token_value>"
}
```

By following this setup, your Nuxt 3 application will be able to authenticate users using API tokens, and the module will handle storing and sending the token with each API request.

For more detailed information and further configuration options, you can refer to the official Laravel documentation on [API Token Authentication](https://laravel.com/docs/11.x/sanctum#api-token-authentication).

---

## **Module Configuration**

### Required **Configuration**

The only required configuration option is `apiUrl`:

```javascript
sanctumAuth: {
    apiUrl: 'http://laravel-api.test',
}
```

### **Advanced Configuration Options**

Here are the available configuration options:

| Option | Description | Default | Example |
| --- | --- | --- | --- |
| **apiUrl** | The base URL of the Laravel API. | *Required* | `'http://api.domcain.com'` |
| **authMode** | The authentication mode. | `'cookie'` | `'cookie'` or `'token'` |
| **appOriginUrl** | The current application URL for the Referrer header. (Optional) | *None* | `'http://domain.com'` |
| **userStateKey** | The key to use to store the authenticated user in the `useState` variable. | `'sanctum.authenticated.user'` | `'sanctum.authenticated.user'` |
| **token.storageKey** | The key to store the token in storage. | `'AUTH_TOKEN'` | `'AUTH_TOKEN'` |
| **token.provider** | The storage provider to use for the token. | `'cookie'` | `'cookie'` or `'localStorage'` |
| **fetchClientOptions.retryAttempts** | Number of retry attempts for failed requests. | `false` | `3` or `false` |
| **csrf.cookieName** | Name of the CSRF cookie. | `'XSRF-TOKEN'` | `'XSRF-TOKEN'` |
| **csrf.headerName** | Name of the CSRF header. | `'X-XSRF-TOKEN'` | `'X-XSRF-TOKEN'` |
| **sanctumEndpoints.csrf** | Endpoint to request a new CSRF token. | `'/sanctum/csrf-cookie'` | `'/sanctum/csrf-cookie'` |
| **sanctumEndpoints.login** | Endpoint to authenticate the user. | `'/login'` | `'/login'` |
| **sanctumEndpoints.logout** | Endpoint to log out the user. | `'/logout'` | `'/logout'` |
| **sanctumEndpoints.user** | Endpoint to fetch current user data. | `'/api/user'` | `'/api/user'` |
| **redirect.enableIntendedRedirect** | Keep the requested route after login. | `false` | `true` or `false` |
| **redirect.loginPath** | Path to redirect when access requires authentication. | `'/login'` | `'/login'` or `false'` |
| **redirect.guestOnlyRedirect** | URL to redirect to when guest access is required. | `'/'` | `'/'` or `false'` |
| **redirect.redirectToAfterLogin** | URL to redirect to after a successful login. | `'/'` | `'/'` or `false'` |
| **redirect.redirectToAfterLogout** | URL to redirect to after logout. | `'/'` | `'/'` or `false'` |
| **middlewareNames.auth** | Middleware name for authenticated users. | `'$auth'` | `'$auth'` |
| **middlewareNames.guest** | Middleware name for guest users. | `'$guest'` | `'$guest'` |
| **logLevel** | Log level for the logger. | `3` | `3` |

### **Overriding Configuration**

You can easily override any of the above configuration options in your `nuxt.config.ts` file to suit your application's needs:

```javascript
export default defineNuxtConfig({
    // List of Nuxt modules to be included
    modules: ['nuxt-sanctum-authentication'],

    sanctumAuth: {
        // The base URL of your Laravel API
        apiUrl: 'http://laravel-api.test',

        // Authentication mode: 'cookie' for SPA cookie authentication, 'token' for API token authentication
        authMode: 'cookie',

        // The key used to store the authenticated user in the `useState` variable
        userStateKey: 'sanctum.authenticated.user',

        token: {
            // The key to store the token in the browser's storage
            storageKey: 'AUTH_TOKEN',

            // The storage provider to use for the token: 'cookie' or 'localStorage'
            provider: 'cookie',
        },

        fetchClientOptions: {
            // Number of retry attempts for failed HTTP requests, set to false to disable retries
            retryAttempts: false,
        },

        csrf: {
            // Name of the CSRF cookie used to protect against cross-site request forgery
            cookieName: 'XSRF-TOKEN',

            // Name of the CSRF header sent with requests
            headerName: 'X-XSRF-TOKEN',
        },

        sanctumEndpoints: {
            // Endpoint to request a new CSRF token from the server
            csrf: '/sanctum/csrf-cookie',

            // Endpoint used for user authentication
            login: '/login',

            // Endpoint used to log out users
            logout: '/logout',

            // Endpoint to retrieve the currently authenticated user's data
            user: '/api/user',
        },

        redirect: {
            // Preserve the originally requested route, redirecting users there after login
            enableIntendedRedirect: false,

            // Path to redirect users when a page requires authentication
            loginPath: '/login',

            // URL to redirect users to when guest-only access is required
            guestOnlyRedirect: '/',

            // URL to redirect to after a successful login
            redirectToAfterLogin: '/',

            // URL to redirect to after logging out
            redirectToAfterLogout: '/',
        },

        middlewareNames: {
            // Middleware name for routes that require authentication
            auth: '$auth',

            // Middleware name for routes that require the user to be a guest
            guest: '$guest',
        },

        // Sets the logging level: 1 for errors only, 3 for all logs
        logLevel: 3,
    },
});
```

This configuration file provides a comprehensive setup for the `nuxt-sanctum-authentication` module, allowing you to customize how authentication is handled and how the module interacts with your application.

---

# **Composables Overview**

The `nuxt-sanctum-authentication` module equips you with a set of powerful composables designed to simplify Laravel Sanctum authentication in your Nuxt 3 application. These composables provide access to key features like user management, authentication state, API request handling, and configuration management. Below is a detailed explanation of each composable:

---

## `useSanctumAuth()`

### **Purpose**

`useSanctumAuth()` is the primary composable for managing authentication within your application. It consolidates various authentication-related functionalities, including logging in, logging out, and accessing the current authenticated user.

### **Properties**

* `options`:

    * This computed property gives you access to the module's configuration options, such as API endpoints and other settings. It mirrors the output of `useSanctumOptions()` but is conveniently accessible within `useSanctumAuth()`.

* `user`:

    * The `user` property holds the data of the currently authenticated user. This property is reactive, meaning any changes to the user's state (e.g., login or logout) are automatically reflected in your application.

* `isLoggedIn`:

    * A boolean property that indicates whether a user is currently authenticated. It returns `true` if the user is logged in and `false` otherwise.


### **Methods**

* `login(credentials)`:

    * This method is used to authenticate a user with the given credentials. The `credentials` argument should be an object containing the necessary fields, such as `email` and `password`, as required by your Laravel backend.

    * Upon successful login, the `user` property is updated with the authenticated user's data, and the `isLoggedIn` flag is set to `true`.

    * Example:

        ```javascript
        const { login } = useSanctumAuth();

        const userCredentials = {
            email: 'user@mail.com',
            password: '123123',
        };

        await login(userCredentials);
        ```

* `logout()`:

    * This method logs out the authenticated user. It clears the user data, sets the `isLoggedIn` flag to `false`, and ensures the user's session is terminated on the backend.

    * Example:

        ```javascript
        const { logout } = useSanctumAuth();

        await logout();
        ```

* `refreshUser()`:

    * This method lets you manually refresh the current user's data by re-fetching it from the backend. It is handy in scenarios where the user's information might have changed without a full reload of the application.

    * Example:

        ```javascript
        const { refreshUser } = useSanctumAuth();

        await refreshUser();
        ```


## `useCurrentUser()`

### **Purpose**

`useCurrentUser()` is a dedicated composable for accessing the current authenticated user. It is handy when you need to access user data across various components without needing the full functionality of `useSanctumAuth()`.

### **Features**

* **Typed User Support**:

    * The composable supports generic types, allowing you to define the shape of the user object as needed. This is particularly beneficial in TypeScript projects where you want strong typing for user data.

    * Example:

        ```javascript
        interface User {
            id: number;
            email: string;
            name: string;
        }

        const user = useCurrentUser<User>();
        ```

* **Reactive User Data**:

    * The `user` property is reactive, meaning that any changes to the authenticated user will automatically update wherever `useCurrentUser()` is used in your application.

* **Returns** `null` if Unauthenticated:

    * If no user is authenticated, `useCurrentUser()` returns `null`, making it easy to conditionally render content based on the user's authentication status.


---

## `useSanctumFetch()`

### **Purpose**

`useSanctumFetch()` provides a pre-configured `ofetch` client tailored for use with Laravel Sanctum. This composable simplifies making API requests that require CSRF token management and cookie handling.

### **Features**

* **CSRF Token Handling**:

    * The `ofetch` client provided by `useSanctumFetch()` automatically manages the CSRF token, ensuring that all requests to your Laravel backend are secure and authenticated.

* **Cookie Management**:

    * The client also handles cookies, particularly the CSRF token cookie, which is necessary for maintaining session security in Laravel.

* **Integration with** `useAsyncData()`:

    * You can use `useSanctumFetch()` in combination with Nuxt 3's `useAsyncData()` to handle data fetching in a reactive and efficient manner.

    * Example:

        ```javascript
        const { data, pending, error, refresh } = await useAsyncData(
            'users', () => useSanctumFetch('/api/users')
        );
        ```

* **$Fetch Interface Compatibility**:

    * The client implements the `$Fetch` interface, meaning you can use it as you would with a regular `ofetch` client. This provides flexibility in how you structure and make API requests in your application.

    * For more advanced usage, refer to the [ofetch documentation](https://github.com/unjs/ofetch?tab=readme-ov-file#%EF%B8%8F-create-fetch-with-default-options).


### **Base URL Configuration**

All requests made with `useSanctumFetch()` will be sent to the `apiUrl` specified in your module's configuration. This ensures that all API calls are correctly routed to your Laravel backend.

---

## `useSanctumOptions()`

### **Purpose**

`useSanctumOptions()` provides direct access to the module's configuration settings. It is a convenient alternative to using Nuxt 3's `useRuntimeConfig()` to retrieve configuration values.

### **Features**

* **Quick Configuration Access**:

    * Instead of manually retrieving configuration options via `useRuntimeConfig()`, `useSanctumOptions()` provides a straightforward way to access settings like API endpoints, authentication modes, and more.

    * Example:

        ```javascript
        const options = useSanctumOptions();

        console.log(options.apiUrl); // Outputs runtimeConfig.public.sanctumAuth.apiUrl
        ```

* **Centralized Configuration Management**:

    * By using this composable, you ensure that all parts of your application access the same configuration settings, reducing the risk of inconsistencies.


---

## `useTokenStorage()`

### **Purpose**

`useTokenStorage()` is a specialized composable for managing authentication tokens, particularly in applications using token-based authentication (`authMode: 'token'`).

### **Features**

* **Set Token**:

    * The composable allows you to store a new authentication token in your application. This is essential for maintaining user sessions in token-based authentication setups.

    * Example:

        ```javascript
        const nuxtApp = useNuxtApp();

        useTokenStorage(nuxtApp).set('token-value');
        ```

* **Get Token**:

    * You can also retrieve the stored authentication token, enabling you to include it in API requests or other operations that require the token.

    * Example:

        ```javascript
        const nuxtApp = useNuxtApp();

        const token = useTokenStorage(nuxtApp).get();
        ```

* **Integrated with Nuxt App**:

    * `useTokenStorage()` is designed to work seamlessly within the Nuxt 3 environment, ensuring that tokens are stored and retrieved correctly across your application.


---

# **Middleware**

To help you manage access control in your Nuxt 3 application, the `nuxt-sanctum-authentication` module includes two built-in middleware. These middlewares are essential for securing pages that should be restricted based on the user's authentication status, ensuring that only authorized users can access certain areas of your application.

## **Available Middlewares**

### `$auth` Middleware

#### **Purpose**

The `$auth` middleware is designed to protect pages that require a user to be authenticated. When applied to a route, it checks whether the user is currently logged in. If the user is not authenticated, they will be redirected to a specified login page or another route defined in your application.

#### **Usage Example**

To use the `$auth` middleware, simply add it to the `middleware` property of a page component or define it in the route configuration:

```javascript
definePageMeta({
  middleware: ['$auth'],
});
```

This ensures that only authenticated users can access the page. If an unauthenticated user tries to access a page guarded by `$auth`, they will be redirected according to the logic defined in your application (typically to the login page).

### `$guest` Middleware

#### **Purpose**

The `$guest` middleware is intended for pages that should only be accessible to guest users—those who are not logged in. This is particularly useful for routes like login or registration pages, where you don't want authenticated users to have access.

#### **Usage Example**

To apply the `$guest` middleware, include it in the `middleware` property of the relevant page component or route configuration:

```javascript
definePageMeta({
  middleware: ['$guest'],
});
```

When an authenticated user attempts to access a page protected by `$guest`, they will be redirected to another page, typically the home page or a dashboard.

## **Customizing Middleware Names**

The default names for these middlewares are `$auth` and `$guest`, but you have the flexibility to rename them to suit your project's conventions or preferences. This can be done through the module's configuration settings.

### **How to Rename Middlewares**

To rename the `$auth` and `$guest` middlewares, you can specify new names in the `middlewareNames` option within the `sanctumAuth` configuration in your `nuxt.config.ts` or `nuxt.config.js` file. Here's how you can do it:

```javascript
export default defineNuxtConfig({
    modules: ['nuxt-sanctum-authentication'],

    sanctumAuth: {
        apiUrl: 'http://laravel-api.test',  // Your Laravel API base URL

        middlewareNames: {
            auth: '$auth',    // Custom name for the auth middleware
            guest: '$guest',  // Custom name for the guest middleware
        },
    },
});
```

In this example, you can replace `'$auth'` and `'$guest'` with any other names you prefer. Once renamed, you will need to use the new names in your page components or route configurations.

### **Example with Custom Middleware Names**

```javascript
export default defineNuxtConfig({
    modules: ['nuxt-sanctum-authentication'],

    sanctumAuth: {
        apiUrl: 'http://laravel-api.test',

        middlewareNames: {
            auth: 'authenticated',  // Renamed auth middleware
            guest: 'guestOnly',     // Renamed guest middleware
        },
    },
});
```

Now, to use these custom middleware names in your pages:

```javascript
definePageMeta({
  middleware: ['authenticated'], // Applies the renamed auth middleware
});
```

```javascript
definePageMeta({
  middleware: ['guestOnly'], // Applies the renamed guest middleware
});
```

By leveraging these middlewares, you can effectively manage user access to different parts of your application, ensuring that only the right users see the right content.

---

# **Error Handling**

While the `nuxt-sanctum-authentication` module focuses on providing a secure authentication layer and a configured API client, it does not include built-in error handling for API responses. However, here are some useful tips for managing errors effectively.

When your Laravel backend returns an error (such as *403, 404, 500,* etc.), the module will throw it as an exception, typically of the generic `Error` type.

### **Checking Error Types**

To determine the specific type of error you've encountered, you can use the following approach:

`components/LoginForm.vue`

```javascript
import { FetchError } from 'ofetch';
const { login } = useSanctumAuth();

const userCredentials = {
    email: 'user@mail.com',
    password: '123123',
};

async function onCredentialsFormSubmit() {
    try {
        await login(userCredentials);
    } catch (e) {
        if (e instanceof FetchError && e.response?.status === 422) {
            // You can extract validation errors from the response
            // and display them in your form
            console.log(e.response?._data.errors);
        }
    }
}
```

This method is useful, but it can become cumbersome, especially when dealing with validation errors across multiple forms and components.

## **Contributing**

Contributions to the `nuxt-sanctum-authentication` module are welcome! Whether it's bug fixes, feature enhancements, or documentation improvements, feel free to submit a pull request.

### **Development Setup**

1. Fork the repository.
2. Clone your forked repository.
3. Install dependencies: `npm install` or `yarn install`.
4. Make your changes and commit them with a clear and descriptive message.
5. Push your changes to your forked repository.
6. Submit a pull request.

---

## **License**

The `nuxt-sanctum-authentication` module is open-source software licensed under the MIT license.
