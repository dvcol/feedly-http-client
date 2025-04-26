import type { FeedlyEntry, FeedlyEntryRequest } from '~/models/feedly-entry.model';

import { HttpMethod } from '@dvcol/common-utils/http';

import { FeedlyClientEndpoint } from '~/models';

/**
 * @see [documentation]{@link https://web.archive.org/web/20230322140800/https://developer.feedly.com/v3/entries}
 */
export const entries = {
  get: new FeedlyClientEndpoint<{ id: string }, FeedlyEntry, true>({
    method: HttpMethod.GET,
    url: '/entries/:id',
    opts: {
      auth: true,
      cache: true,
      parameters: {
        path: {
          id: true,
        },
      },
    },
  }),
  /**
   * This call is useful to inject entries not coming from a feed, into a user’s account.
   * The entries created will only be available through the tag streams of the respective tags passed.
   */
  post: new FeedlyClientEndpoint<FeedlyEntryRequest, FeedlyEntry, false>({
    method: HttpMethod.POST,
    url: '/entries',
    opts: {
      auth: true,
      cache: false,
    },
    body: {
      title: true,
      origin: true,
      alternate: true,
      published: true,

      content: false,
      summary: false,
      enclosure: false,

      id: false,
      author: false,
      created: false,
      recrawled: false,
      updated: false,
      keywords: false,
      visual: false,
      unread: false,
      tags: false,
      categories: false,
      engagement: false,
      engagementRate: false,
      actionTimestamp: false,
      fingerprint: false,
      originId: false,
      sid: false,
      priorities: false,
      memes: false,
      leoSummary: false,
      commonTopics: false,
      entities: false,
      related: false,
      duplicates: false,
    },
  }),
};
