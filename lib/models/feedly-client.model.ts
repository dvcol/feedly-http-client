import type {
  BaseCacheOption,
  BaseInit,
  BaseOptions,
  BaseQuery,
  BaseRequest,
  BaseSettings,
  BaseTemplate,
  BaseTemplateOptions,
  ResponseOrTypedResponse,
} from '@dvcol/base-http-client';
import type { RecursiveRecord } from '@dvcol/common-utils/common/models';
import type { CancellablePromise } from '@dvcol/common-utils/http/fetch';

import { BaseApiHeaders, ClientEndpoint } from '@dvcol/base-http-client';

/**
 * API client settings.
 */
export type FeedlyClientSettings = BaseSettings<{
  /** Get this from your app settings. */
  client_id: string;
  /** Get this from your app settings. */
  client_secret: string;
  /** URI specified in your app settings. */
  redirect_uri: string;
  /** The consumer client identifier */
  useragent: string;
  /** The API version to use */
  version?: `v${number}`;
}>;

export interface FeedlyClientAuthentication {
  /**
   * The refresh token used to get a new access token.
   */
  refresh_token?: string;
  /**
   * The access token used to authenticate requests.
   */
  access_token?: string;
  /**
   * The time the access token was created.
   */
  created?: number;
  /**
   * The time the access token expires.
   */
  expires?: number;
  /**
   * Optional csrf token to prevent cross-site request forgery.
   */
  state?: string;
  /**
   * The plan of the user.
   */
  plan?: 'standard' | 'pro' | 'business';
}

/**
 * Trakt.tv API client options.
 */
export type FeedlyClientOptions = BaseOptions<FeedlyClientSettings, FeedlyApiResponse>;

/**
 * Represents options that can be used in a Trakt API template.
 */
export type FeedlyApiTemplateOptions<T extends string | number | symbol = string> = BaseTemplateOptions<T> & {
  /** If the method supports or requires authentication */
  auth?: boolean;
  /** The API version to use */
  version?: `v${number}`;
  /** If the method supports or requires pagination */
  pagination?: boolean;
};

export type FeedlyApiInit = BaseInit;

export type FeedlyApiTemplate<Parameter extends FeedlyApiParams = FeedlyApiParams> = BaseTemplate<Parameter, FeedlyApiTemplateOptions<keyof Parameter>>;

export interface FeedlyClientEndpoint<Parameter extends FeedlyApiParams = Record<string, never>, Response = unknown> {
  (param?: Parameter, init?: FeedlyApiInit): CancellablePromise<FeedlyApiResponse<Response>>;
}

export type FeedlyClientCachedEndpoint<Parameter extends FeedlyApiParams = Record<string, never>, Response = unknown> = {
  evict: (param?: Parameter, init?: BaseInit) => Promise<string | undefined>;
} & ((param?: Parameter, init?: BaseInit, cacheOptions?: BaseCacheOption) => CancellablePromise<FeedlyApiResponse<Response>>);

// eslint-disable-next-line ts/no-unsafe-declaration-merging  -- To allow type extension
export class FeedlyClientEndpoint<
  Parameter extends FeedlyApiParams = Record<string, never>,
  Response = unknown,
  Cache extends boolean = true,
> extends ClientEndpoint<Parameter, Response, Cache, FeedlyApiTemplateOptions<keyof Parameter>> {
  declare cached: Cache extends true ? Omit<this, 'cached'> & FeedlyClientCachedEndpoint<Parameter, Response> : never;
}

export type FeedlyApiRequest = BaseRequest;

export type FeedlyApiQuery<T = unknown> = BaseQuery<FeedlyApiRequest, T>;

export type FeedlyApiResponse<T = unknown> = ResponseOrTypedResponse<T>;

/**
 * Page defaults to 1 and limit to 10.
 *
 * @see [pagination]{@link https://trakt.docs.apiary.io/#introduction/pagination}
 */
export interface TraktApiPagination {
  /** Number of page of results to be returned. (defaults to 1) */
  page?: number;
  /** Number of results to return per page. (defaults to 10) */
  limit?: number;
}

export interface TraktApiParamsPagination {
  /**
   * An empty pagination will load 1 page of 10 items by default on paginated endpoints.
   * An empty pagination on optionally paginated endpoints will return the full response.
   *
   * @see [pagination]{@link https://trakt.docs.apiary.io/#introduction/pagination}
   */
  pagination?: TraktApiPagination;
}

export type FeedlyApiParams<
  T extends RecursiveRecord = RecursiveRecord,
  P extends true | false = true,
> = (P extends true ? T & TraktApiParamsPagination : T);

export interface IFeedlyApi<
  Parameter extends FeedlyApiParams = any,
  Response = unknown,
  Cache extends boolean = boolean,
> {
  [key: string]: FeedlyClientEndpoint<Parameter, Response, Cache> | IFeedlyApi<Parameter>;
}

export const FeedlyApiHeaders = {
  /** The user agent of the consumer client */
  UserAgent: BaseApiHeaders.UserAgent,
  /** The content type of the payload  */
  ContentType: BaseApiHeaders.ContentType,
  /** The authorization token bearer */
  Authorization: BaseApiHeaders.Authorization,
} as const;
