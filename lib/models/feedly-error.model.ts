import type { FeedlyApiResponse } from '~/models/feedly-client.model';

export const FeedlyErrorTypes = {
  FeedlyApiError: 'FeedlyApiError',
  FeedlyApiResponseError: 'FeedlyApiResponseError',
  FeedlyUnauthorizedError: 'FeedlyUnauthorizedError',
  FeedlyForbiddenError: 'FeedlyForbiddenError',
  FeedlyRateLimitError: 'FeedlyRateLimitError',
  FeedlyInvalidParameterError: 'FeedlyInvalidParameterError',
  FeedlyExpiredTokenError: 'FeedlyExpiredTokenError',
  FeedlyInvalidCsrfError: 'FeedlyInvalidCsrfError',
};

export class FeedlyApiError<T = unknown> extends Error {
  /**
   * Inner error that this error wraps.
   */
  readonly error?: Error | FeedlyApiResponse<T>;

  constructor(message: string, error?: Error | FeedlyApiResponse<T>) {
    super(message);
    this.name = FeedlyErrorTypes.FeedlyApiError;
    this.error = error;
  }
}

export class FeedlyUnauthorizedError<T = unknown> extends FeedlyApiError<T> {
  constructor(message?: string, error?: Error | FeedlyApiResponse<T>) {
    super(message = 'Unauthorized', error);
    this.name = FeedlyErrorTypes.FeedlyUnauthorizedError;
  }
}

export class FeedlyForbiddenError<T = unknown> extends FeedlyApiError<T> {
  constructor(message?: string, error?: Error | FeedlyApiResponse<T>) {
    super(message = 'Forbidden', error);
    this.name = FeedlyErrorTypes.FeedlyForbiddenError;
  }
}

export class FeedlyRateLimitError<T = unknown> extends FeedlyApiError<T> {
  constructor(message?: string, error?: Error | FeedlyApiResponse<T>) {
    super(message = 'Rate limit reached', error);
    this.name = FeedlyErrorTypes.FeedlyRateLimitError;
  }
}

export class FeedlyInvalidParameterError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = FeedlyErrorTypes.FeedlyInvalidParameterError;
  }
}

export class FeedlyExpiredTokenError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = FeedlyErrorTypes.FeedlyExpiredTokenError;
  }
}

export class FeedlyInvalidCsrfError extends Error {
  readonly state?: string;
  readonly expected?: string;
  constructor({ state, expected }: { state?: string; expected?: string } = {}) {
    super(`Invalid CSRF (State): expected '${expected}', but received ${state}`);
    this.name = FeedlyErrorTypes.FeedlyInvalidCsrfError;
    this.state = state;
    this.expected = expected;
  }
}

export class FeedlyApiResponseError<T = unknown> extends Error {
  /** Inner response that this error wraps. */
  readonly response: FeedlyApiResponse<T>;
  constructor(message: string, response: FeedlyApiResponse<T>) {
    super(message);
    this.name = FeedlyErrorTypes.FeedlyApiResponseError;
    this.response = response;
  }
}

export function parseError<T = unknown>(error: Error | FeedlyApiResponse<T>): typeof error | FeedlyApiResponseError<T> {
  if (error instanceof Response) return new FeedlyApiResponseError(error.statusText, error);
  return error;
}
