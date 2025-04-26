export interface FeedlyAuthenticationRequest {
  /**
   * Indicates the type of token requested.
   * At this time, this field will always have the value code
   */
  response_type?: 'code';
  /**
   * Indicates the client that is making the request.
   * The value passed in this parameter must exactly match the value set during the partnership program.
   */
  client_id: string;
  /**
   * Determines where the response is sent.
   * The value of this parameter must exactly match one of the values set during the partnership program (including case, and trailing ‘/’).
   * If it is a URL, it must use HTTPS. Make sure this parameter is URL-encoded!
   * On sandbox, the default list includes “http://localhost”, “http://localhost:8080” and “urn:ietf:wg:oauth:2.0:oob”.
   */
  redirect_uri: string;
  /**
   * Indicates the scope of the access request.
   * Currently, the only value supported is “https://cloud.feedly.com/subscriptions".
   */
  scope?: 'https://cloud.feedly.com/subscriptions';
  /**
   * Indicates any state which may be useful to your application upon receipt of the response.
   * The feedly Authorization Server roundtrips this parameter, so your application receives the same value it sent.
   * Possible uses include redirecting the user to the correct resource in your site, nonces, and cross-site-request-forgery mitigations.
   * Make sure this parameter is URL-encoded!
   */
  state?: string;
}

export interface FeedlyTokenRequest {
  /**
   * The code returned from the previous call.
   */
  code: string;
  /**
   * The clientId obtained during application registration.
   */
  client_id: string;
  /**
   * The client secret obtained during application registration.
   */
  client_secret: string;
  /**
   * The URI registered with the application (if you pass it as a URL parameter, be sure to URL-encode it!).
   */
  redirect_uri: string;
  /**
   * Indicates any state which may be useful to your application upon receipt of the response.
   * The feedly Authorization Server roundtrips this parameter, so your application receives the same value it sent.
   * Possible uses include redirecting the user to the correct resource in your site, nonces, and cross-site-request-forgery mitigations.
   */
  state?: string;
  /**
   * As defined in the OAuth2 specification, this field must be set to authorization_code.
   */
  grant_type?: 'authorization_code';
}

interface FeedlyBaseTokenResponse {
  /**
   * The feedly user id
   */
  id: string;
  /**
   * A token that may be used to access APIs.
   * Access tokens are have an expiration (see below)
   * @see expires_in
   */
  access_token: string;
  /**
   * The remaining lifetime on the access token (in seconds)
   */
  expires_in: number;
  /**
   * Indicates the type of token returned.
   * At this time, this field will always have the value of Bearer
   */
  token_type: 'Bearer';
  /**
   * Indicates the user plan (standard, pro or business)
   */
  plan: 'standard' | 'pro' | 'business';
}

export interface FeedlyTokenResponse extends FeedlyBaseTokenResponse {
  /**
   * A token that may be used to access APIs.
   * Access tokens are have an expiration (see below)
   * @see expires_in
   */
  refresh_token: string;

  /**
   * Indicates any state which may be useful to your application upon receipt of the response.
   */
  state?: string;
}

export interface FeedlyRefreshTokenRequest {
  /**
   * The refresh token returned in the previous code.
   * @see FeedlyTokenResponse
   */
  refresh_token: string;
  /**
   * The clientId obtained during application registration.
   */
  client_id: string;
  /**
   * The client secret obtained during application registration.
   */
  client_secret: string;
  /**
   * As defined in the OAuth2 specification, this field must be set to refresh_token
   */
  grant_type?: 'refresh_token';
}

export interface FeedlyRefreshTokenResponse extends FeedlyBaseTokenResponse {
  // No additional fields
}
