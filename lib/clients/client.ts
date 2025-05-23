import type { BaseInit } from '@dvcol/base-http-client';

import type {
  FeedlyAuthenticationRequest,
  FeedlyRefreshTokenRequest,
  FeedlyRefreshTokenResponse,
  FeedlyTokenRequest,
  FeedlyTokenResponse,
} from '~/models/feedly-authentication.model';
import type { FeedlyClientAuthentication, FeedlyClientOptions, IFeedlyApi } from '~/models/feedly-client.model';

import { randomHex } from '@dvcol/common-utils/common/crypto';

import { feedly } from '~/api/api.endpoints';
import { FeedlyInvalidParameterError } from '~/models';

import { BaseFeedlyClient } from './base-client';

/**
 * Parses an API authentication response to mutate the {@link FeedlyClientAuthentication} object.
 * @param response - The response from the Feedly API.
 * @param auth - The current authentication object.
 */
export function parseAuthResponse(response: FeedlyTokenResponse | FeedlyRefreshTokenResponse, auth: FeedlyClientAuthentication = {}): FeedlyClientAuthentication {
  return {
    ...auth,
    refresh_token: 'refresh_token' in response ? response.refresh_token : auth.refresh_token,
    access_token: response.access_token,
    created: Date.now(),
    expires: Date.now() + (response.expires_in * 1000),
  };
}

/**
 * FeedlyClient is a wrapper around the FeedlyApi to provide basic authentication and state management.
 *
 * @class FeedlyClient
 *
 * @extends {BaseFeedlyClient}
 */
export class FeedlyClient extends BaseFeedlyClient {
  /**
   * The url to redirect to after the user has authorized the application.
   */
  get redirectUri() {
    return this.settings.redirect_uri;
  }

  /**
   * Indicates if the client has a valid session.
   */
  get authenticated() {
    if (!this.auth.access_token) return false;
    return (this.auth.expires === undefined || this.auth.expires > Date.now());
  }

  /**
   * Creates an instance of FeedlyClient, with the necessary endpoints and settings.
   * @param settings - The settings for the client.
   * @param authentication - The authentication for the client.
   * @param api - The API endpoints for the client.
   */
  constructor(settings: FeedlyClientOptions, authentication: FeedlyClientAuthentication = {}, api: IFeedlyApi = feedly) {
    super(settings, authentication, api);
  }

  async redirect({ redirect, redirect_uri, ...request }: Partial<FeedlyAuthenticationRequest> & { redirect?: BaseInit['redirect'] } = {}) {
    this.updateAuth(auth => ({ ...auth, state: request.state ?? randomHex() }));
    return this.authentication.authorize(
      {
        client_id: this.settings.client_id,
        redirect_uri: redirect_uri ?? this.settings.redirect_uri,
        state: this.auth.state,
        ...request,
      },
      redirect ? { redirect } : undefined,
    );
  }

  redirectUrl({ redirect_uri, ...request }: Partial<FeedlyAuthenticationRequest> = {}) {
    this.updateAuth(auth => ({ ...auth, state: request.state ?? randomHex() }));
    return this.authentication.authorize
      .resolve({
        client_id: this.settings.client_id,
        redirect_uri: redirect_uri ?? this.settings.redirect_uri,
        state: this.auth.state,
        ...request,
      })
      .toString();
  }

  async token({ code, ...request }: Omit<Partial<FeedlyTokenRequest>, 'code'> & Pick<FeedlyTokenRequest, 'code'>) {
    if (!code) throw new FeedlyInvalidParameterError('Missing `code` parameter');

    const response = await this.authentication.token({
      code,
      client_id: this.settings.client_id,
      client_secret: this.settings.client_secret,
      redirect_uri: this.settings.redirect_uri,
      ...request,
    });

    const body = await response.json();
    this.updateAuth(auth => parseAuthResponse(body, auth));
    return this.auth;
  }

  async refresh({ refresh_token = this.auth.refresh_token, ...request }: Partial<FeedlyRefreshTokenRequest> = {}) {
    if (!refresh_token) throw new FeedlyInvalidParameterError('No refresh token found.');

    const response = await this.authentication.refresh({
      refresh_token,
      client_id: this.settings.client_id,
      client_secret: this.settings.client_secret,
      ...request,
    });

    const body = await response.json();
    this.updateAuth(auth => parseAuthResponse(body, auth));
    return this.auth;
  }

  async revoke() {
    if (!this.auth.access_token) throw new FeedlyInvalidParameterError('No access token found.');
    if (this.auth.expires !== undefined && this.auth.expires > Date.now()) await this.authentication.revoke();
    this.updateAuth({});
  }

  async restore({ refresh_token, ...auth }: FeedlyClientAuthentication = {}): Promise<FeedlyClientAuthentication> {
    if (refresh_token && auth.expires !== undefined && auth.expires < Date.now()) return this.refresh({ refresh_token });

    this.updateAuth({ refresh_token, ...auth });
    return this.auth;
  }
}
