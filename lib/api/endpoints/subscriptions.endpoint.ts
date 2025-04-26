import type { FeedlySubscription, FeedlySubscriptionRequest } from '~/models/feedly-subscriptions.model';

import { HttpMethod } from '@dvcol/common-utils/http';

import { FeedlyClientEndpoint } from '~/models';

/**
 * This API is obsolete. Consider using the collections API instead.
 *
 * Users can subscribe to feeds and organize their subscriptions into categories.
 * The best practice is to first call the feeds API to determine if the feed contains RSS data. The feeds API will also return the feed title (which is customizable by the user), and the website.
 *
 * @see [documentation]{@link https://web.archive.org/web/20230520034631/https://developer.feedly.com/v3/subscriptions}
 */
export const subscriptions = {
  get: new FeedlyClientEndpoint<Record<string, never>, FeedlySubscription[], true>({
    method: HttpMethod.GET,
    url: '/subscriptions',
    opts: {
      auth: true,
      cache: true,
    },
  }),
  post: new FeedlyClientEndpoint<FeedlySubscriptionRequest, Record<string, never>, false>({
    method: HttpMethod.POST,
    url: '/subscriptions',
    opts: {
      auth: true,
      cache: false,
    },
    body: {
      id: true,
      title: false,
      categories: false,
      sortid: false,
      added: false,
      updated: false,
      website: false,
      visualUrl: false,
    },
  }),
  delete: new FeedlyClientEndpoint<{ id: string }, Record<string, never>, false>({
    method: HttpMethod.DELETE,
    url: '/subscriptions/:id',
    opts: {
      auth: true,
      cache: false,
      parameters: {
        path: {
          id: true,
        },
      },
    },
  }),
};
