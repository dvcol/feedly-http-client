import type { FeedlyApi } from '~/api/api.endpoints';
import type {
  FeedlyApiParams,
  FeedlyApiQuery,
  FeedlyApiResponse,
  FeedlyApiTemplate,
  FeedlyClientAuthentication,
  FeedlyClientOptions,
  FeedlyClientSettings,
  IFeedlyApi,
} from '~/models/feedly-client.model';

import { BaseClient, BaseHeaderContentType, injectCorsProxyPrefix, parseUrl } from '@dvcol/base-http-client';

import { FeedlyApiHeaders } from '~/models/feedly-client.model';
import { FeedlyExpiredTokenError, FeedlyForbiddenError, FeedlyInvalidParameterError, FeedlyRateLimitError, FeedlyUnauthorizedError, parseError } from '~/models/feedly-error.model';

/**
 * Checks if the fetch response is OK and handles redirects.
 *
 * @private
 *
 * @param  response - The fetch response.
 *
 * @returns  The same response object if OK.
 *
 * @throws Throws the response if not OK.
 */
export function isResponseOk(response: Response) {
  if (response.status === 401) throw new FeedlyUnauthorizedError(response.statusText, response);
  if (response.status === 403) throw new FeedlyForbiddenError(response.statusText, response);
  if (response.status === 429) throw new FeedlyRateLimitError(response.statusText, response);
  if (!response.ok || response.status >= 400) throw parseError(response);
  return response;
}

/** Needed to type Object assignment */
// eslint-disable-next-line ts/no-unsafe-declaration-merging  -- To allow type extension
export interface BaseFeedlyClient extends FeedlyApi {}

/**
 * Represents a Feedly API client with common functionality.
 *
 * @class BaseClient
 */
// eslint-disable-next-line ts/no-unsafe-declaration-merging  -- To allow type extension
export class BaseFeedlyClient extends BaseClient<FeedlyApiQuery, FeedlyApiResponse, FeedlyClientSettings, FeedlyClientAuthentication> implements FeedlyApi {
  /**
   * Creates an instance of BaseFeedlyClient.
   * @param options - The options for the client.
   * @param authentication - The authentication for the client.
   * @param api - The API endpoints for the client.
   */
  constructor(options: FeedlyClientOptions, authentication: FeedlyClientAuthentication = {}, api: IFeedlyApi = {}) {
    super(options, authentication, api);
  }

  /**
   * Parses the template to construct the headers for a Feedly API request.
   *
   * @protected
   *
   * @template T - The type of the parameters.
   *
   * @param template - The template for the API endpoint.
   *
   * @returns {HeadersInit} The parsed request headers.
   *
   * @throws {Error} Throws an error if OAuth is required and the access token is missing.
   */
  protected _parseHeaders<T extends FeedlyApiParams = FeedlyApiParams>(template: FeedlyApiTemplate<T>): HeadersInit {
    const headers: HeadersInit = {
      [FeedlyApiHeaders.UserAgent]: this.settings.useragent,
      [FeedlyApiHeaders.ContentType]: BaseHeaderContentType.Json,
    };

    if (template.opts?.auth === true && !this.auth.access_token) {
      throw new FeedlyInvalidParameterError('OAuth required: access_token is missing');
    } else if (template.opts?.auth && this.auth.access_token) {
      if (this.auth.expires !== undefined && this.auth.expires > Date.now()) {
        headers[FeedlyApiHeaders.Authorization] = `OAuth ${this.auth.access_token}`;
      } else {
        throw new FeedlyExpiredTokenError('OAuth required: access_token has expired');
      }
    }

    return headers;
  }

  /**
   * Parses the parameters and constructs the URL for a Feedly API request.
   *
   * @protected
   *
   * @template T - The type of the parameters.
   *
   * @param template - The template for the API endpoint.
   * @param {T} params - The parameters for the API call.
   *
   * @returns {string} The URL for the Feedly API request.
   *
   * @throws {Error} Throws an error if mandatory parameters are missing or if a filter is not supported.
   */
  protected _parseUrl<T extends FeedlyApiParams = FeedlyApiParams>(template: FeedlyApiTemplate<T>, params: T): URL {
    const _template = injectCorsProxyPrefix(template, this.settings);
    return parseUrl<T>(_template, params, `${this.settings.endpoint}/${template.opts?.version ?? this.settings.version ?? 'v3'}`);
  }

  /**
   * Parses the response from the API before returning from the call.
   * @param response - The response from the API.
   * @returns {FeedlyApiResponse} The parsed response.
   * @protected
   */

  protected _parseResponse(response: Response): FeedlyApiResponse {
    isResponseOk(response);
    return response;
  }
}
