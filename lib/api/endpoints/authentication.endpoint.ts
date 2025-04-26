import type { FeedlyAuthenticationRequest, FeedlyRefreshTokenRequest, FeedlyRefreshTokenResponse, FeedlyTokenRequest, FeedlyTokenResponse } from '~/models/feedly-authentication.model';

import { HttpMethod } from '@dvcol/common-utils/http';

import { FeedlyClientEndpoint } from '~/models/feedly-client.model';

/**
 * @see [documentation]{@link https://web.archive.org/web/20230118033653/https://developer.feedly.com/v3/auth}
 */
export const authentication = {
  /**
   * The authentication scenario begins by redirecting a browser (full page or popup) to a Feedly Cloud URL with a set of query parameters that indicate the type of cloud API access the application requires.
   * Feedly handles the user authentication and consent, and the result is authorization code.
   * Feedly returns the code on the redirect of the response.
   *
   * This call must use the HTTPS endpoint. Feedly will return an error if you try to use the HTTP endpoint.
   *
   * The response will be sent to the redirect_uri specified in the request.
   * If the user approves the access request, then the response contains a code and the state parameter (if included in the request).
   * If the user does not approve the request the response contains an error message and the state parameter.
   * All responses are returned to the web server on the query string, as shown below:
   */
  authorize: new FeedlyClientEndpoint<FeedlyAuthenticationRequest, void, false>({
    method: HttpMethod.GET,
    url: '/auth/auth',
    init: {
      redirect: 'manual',
      credentials: 'omit',
    },
    opts: {
      cache: false,
      parameters: {
        query: {
          response_type: true,
          client_id: true,
          redirect_uri: true,
          scope: true,
          state: false,
        },
      },
    },
    seed: {
      response_type: 'code',
      scope: 'https://cloud.feedly.com/subscriptions',
    },
  }),
  /**
   * After you received the code, you may exchange it for an access token and a refresh token.
   * This call must use the HTTPS endpoint.
   * Feedly will return an error if you try to use the HTTP endpoint.
   */
  token: new FeedlyClientEndpoint<FeedlyTokenRequest, FeedlyTokenResponse, false>({
    method: HttpMethod.POST,
    url: '/auth/token',
    opts: {
      cache: false,
    },
    body: {
      code: true,
      client_id: true,
      client_secret: true,
      redirect_uri: true,
      grant_type: true,
      state: false,
    },
    seed: {
      grant_type: 'authorization_code',
    },
  }),
  /**
   * Your application may obtain a new access token by sending a refresh token to the feedly Authorization server.
   * This call must use the HTTPS endpoint.
   * Feedly will return an error if you try to use the HTTP endpoint.
   */
  refresh: new FeedlyClientEndpoint<FeedlyRefreshTokenRequest, FeedlyRefreshTokenResponse, false>({
    method: HttpMethod.POST,
    url: '/auth/token',
    opts: {
      cache: false,
    },
    body: {
      refresh_token: true,
      client_id: true,
      client_secret: true,
      grant_type: true,
    },
    seed: {
      grant_type: 'refresh_token',
    },
  }),

  revoke: new FeedlyClientEndpoint<Record<string, never>, void, false>({
    method: HttpMethod.POST,
    url: '/auth/logout',
    opts: {
      cache: false,
      auth: true,
    },
    body: {},
  }),
};
