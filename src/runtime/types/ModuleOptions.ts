export interface ModuleOptions {
  /**
   * The base URL of the Laravel API.
   * @example http://localhost:8000/api
   * @required
   */
  apiUrl: string;

  /**
   * The authentication mode.
   * @default 'cookie'
   */
  authMode?: 'cookie' | 'token';

  /**
   * The current application URL for the Referrer header. (Optional)
   * @example 'http://localhost:3000'
   */
  appOriginUrl?: string;

  /**
   * The key to use to store the authenticated user in the `useState` variable.
   * @default 'sanctum.authenticated.user'
   */
  userStateKey: string;

  /**
   * The key to store the token in the storage.
   * @default 'AUTH_TOKEN'
   */
  tokenStorageKey: string;

  /**
   * OFetch client specific options.
   */
  fetchClientOptions: {
    /**
     * The number of times to retry a request when it fails.
     * @default false
     */
    retryAttempts: number | false;
  };

  /**
   * CSRF token specific options.
   */
  csrf: {
    /**
     * Name of the CSRF cookie to extract from server response.
     * @default 'XSRF-TOKEN'
     */
    cookieName: string;

    /**
     * Name of the CSRF header to pass from client to server.
     * @default 'X-XSRF-TOKEN'
     */
    headerName: string;
  };

  /**
   * Laravel Sanctum API endpoints.
   */
  sanctumEndpoints: {
    /**
     * The endpoint to request a new CSRF token.
     * @default '/sanctum/csrf-cookie'
     */
    csrf: string;

    /**
     * The endpoint to send user credentials to authenticate.
     * @default '/login'
     */
    login: string;

    /**
     * The endpoint to destroy current user session.
     * @default '/logout'
     */
    logout: string;

    /**
     * The endpoint to fetch current user data.
     * @default '/api/user'
     */
    user: string;
  };

  /**
   * Behavior of the plugin redirects when user is authenticated or not.
   */
  redirect: {
    /**
     * Determines whether to keep the requested route when redirecting after login.
     * @default false
     */
    enableIntendedRedirect: boolean;

    /**
     * Path to redirect to when access requires user authentication.
     * If set to false, a 403 error is triggered.
     * @default '/login'
     */
    loginPath: string | false;

    /**
     * URL to redirect to when guest access is required (user must not be authenticated).
     * If set to false, the plugin will throw an 403 error.
     * @default '/'
     */
    guestOnlyRedirect: string | false;

    /**
     * URL to redirect to after a successful login.
     * If set to false, no redirection occurs.
     * @default '/'
     */
    redirectToAfterLogin: string | false;

    /**
     * URL to redirect to after logout.
     * If set to false, no redirection occurs.
     * @default '/'
     */
    redirectToAfterLogout: string | false;
  };

  middlewareNames: {
    /**
     * Middleware name for authenticated users.
     * @default '$auth'
     */
    auth: string;

    /**
     * Middleware name for guest users.
     * @default '$guest'
     */
    guest: string;
  };

  /**
   * The log level to use for the logger.
   *
   * 0: Fatal and Error
   * 1: Warnings
   * 2: Normal logs
   * 3: Informational logs
   * 4: Debug logs
   * 5: Trace logs
   *
   * @default 3
   */
  logLevel?: number;
}
