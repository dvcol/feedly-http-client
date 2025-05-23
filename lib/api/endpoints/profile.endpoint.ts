import type { FeedlyProfile } from '~/models/feedly-profile.model';

import { HttpMethod } from '@dvcol/common-utils/http';

import { FeedlyClientEndpoint } from '~/models';

/**
 * Once a user is authenticated, a profile is attached to her.
 * Feedly captures some basic information such as name, email, locale, etc.
 * Applications can access that profile information and update parts of it.
 *
 * @see [documentation]{@link https://web.archive.org/web/20230516223729/https://developer.feedly.com/v3/profile}
 */
export const profile = {
  get: new FeedlyClientEndpoint<Record<string, never>, FeedlyProfile, true>({
    method: HttpMethod.GET,
    url: '/profile',
    opts: {
      auth: true,
      cache: true,
    },
  }),
  /**
   * The fields provided will be merged with the existing profile, and overwrite existing values.
   * You do not need to pass the full profile.
   * Every time the user goes through OAuth, the profile is automatically updated with values from the OAuth provider.
   * So this should only be used to provide missing values.
   */
  post: new FeedlyClientEndpoint<Partial<FeedlyProfile>, FeedlyProfile, false>({
    method: HttpMethod.POST,
    url: '/profile',
    opts: {
      auth: true,
      cache: false,
    },
    body: {
      id: false,
      email: false,
      givenName: false,
      familyName: false,
      picture: false,
      gender: false,
      locale: false,
    },
  }),
};
