import type { FeedlyStream, FeedlyStreamIds, FeedlyStreamIdsRequest, FeedlyStreamRequest } from '~/models/feedly-stream.model';

import { HttpMethod } from '@dvcol/common-utils/http';

import { FeedlyClientEndpoint } from '~/models';

/**
 * The streams APIs are the core of the Feedly API. They return a list of entry ids or [entry content](@link https://web.archive.org/web/20230322140759/https://developer.feedly.com/v3/entries) for :
 * - a single feed
 * - or a category (personal or team collection of feeds)
 * - or a tag (personal or team)
 * - or a [global resource](@link https://web.archive.org/web/20230322140759/https://developer.feedly.com/cloud/#global-resource-ids), e.g. all personal categories, all team tags, all annotated entries etc
 *
 * The streams APIs offer pagination through the continuation value (except when using engagement ranking).
 * This can be used to fetch the next page of entry content or ids.
 * If the server doesn’t return a continuation value in its response, you’ve reached the end of the stream (or the stream doesn’t support pagination).
 *
 * The value used to order entries depends on the type of stream:
 *
 * for feeds and categories, sorting is based on the crawled timestamp of each entry (not published!).
 * for all other types of streams (tags, annotated, prioritized etc), the sorting is based on the actionTimestamp of each entry. This is to reflect the order of tagging or annotating entries.
 * If you use unreadOnly=true, the API will only return the past 31 days of entries, no matter what the other options say, because entries older than 31 days are automatically marked as read. If you want to fetch more than 31 days of entries, you have to use unreadOnly=false.
 *
 * If you pass unreadOnly=false, muted entries will not be included unless you also pass includeMuted=true.
 *
 * @see [documentation]{@link https://web.archive.org/web/20230322140759/https://developer.feedly.com/v3/streams}
 */
export const streams = {
  /**
   * Authorization is optional; it is required for category and tag streams.
   *
   * Un-authenticated calls to this API will not return pagination, and are limited to 50 articles.
   */
  contents: new FeedlyClientEndpoint<FeedlyStreamRequest, FeedlyStream, true>({
    method: HttpMethod.GET,
    url: '/streams/:id/contents',
    opts: {
      auth: true,
      cache: true,
      pagination: true,
      parameters: {
        path: {
          id: true,
        },
        query: {
          count: false,
          ranked: false,
          unreadOnly: false,
          newerThan: false,
          continuation: false,
          showMuted: false,
          importantOnly: false,
          similar: false,
        },
      },
    },

  }),
  /**
   * Authorization is optional; it is required for category and tag streams.
   *
   * Un-authenticated calls to this API will not return pagination, and are limited to 50 articles.
   */
  ids: new FeedlyClientEndpoint<FeedlyStreamIdsRequest, FeedlyStreamIds, true>({
    method: HttpMethod.GET,
    url: '/streams/:id/ids',
    opts: {
      auth: true,
      cache: true,
      pagination: true,
      parameters: {
        path: {
          id: true,
        },
        query: {
          count: false,
          ranked: false,
          unreadOnly: false,
          newerThan: false,
          continuation: false,
        },
      },
    },
  }),
};
