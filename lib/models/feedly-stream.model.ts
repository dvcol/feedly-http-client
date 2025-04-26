import type { FeedlyEntry, FeedlyLink } from '~/models/feedly-entry.model';

export interface FeedlyStreamRequest {
  /**
   * The id of the stream to fetch.
   */
  id: string;
  /**
   * Optional integer number of entries to return.
   *
   * @default 20
   * @max 250
   */
  count?: number;
  /**
   * Rank: newest, oldest, or engagement (sort by popularity).
   *
   * @default newest
   */
  ranked?: 'newest' | 'oldest' | 'engagement';
  /**
   * If true, only unread articles will be returned.
   * Reminder: entries older than 31 days are automatically marked as read.
   * This flag requires the authorization header. It is ignored for tag streams.
   *
   * @default false
   */
  unreadOnly?: boolean;
  /**
   * Timestamp in ms.
   * Cannot be older than 31 days ago.
   */
  newerThan?: number;
  /**
   * A continuation id is used to page through the entry ids.
   * You can also pass a timestamp in ms, which will act as an “older than” limit.
   */
  continuation?: string;
  /**
   * If true, muted articles will be included in the response.
   *
   * @default false
   * @plan pro
   */
  showMuted?: boolean;
  /**
   * If true, only prioritized articles will be returned.
   *
   * @default false
   * @plan pro+ and team
   */
  importantOnly?: boolean;
  /**
   * If true, entries may be decorated with a related section listing related entry ids, and a duplicates section listing near-duplicate entry ids.
   *
   * @default false
   * @plan pro+ and team
   */
  similar?: boolean;
}

export interface FeedlyStream {
  /**
   * The stream id.
   */
  id: string;
  /**
   * The stream title.
   * This is only available for single feeds.
   */
  title?: string;
  /**
   * The text direction (“ltr” for left-to-right languages, “rtl” for right-to-left languages).
   * This is only available for single feeds.
   */
  direction?: 'ltr' | 'rtl';
  /**
   * The timestamp of the most recent entry for this stream (regardless of continuation, newerThan, etc).
   */
  updated?: number;
  /**
   * The continuation id to pass to the next stream call, for pagination.
   * This id guarantees that no entry will be duplicated in a stream (meaning, there is no need to de-duplicate entries returned by this call).
   * If this value is not returned, it means the end of the stream has been reached.
   */
  continuation?: string;
  /**
   * Array of links to the stream itself.
   */
  self?: FeedlyLink[];
  /**
   * Array of feed website URL and type.
   * This is only available for single feeds.
   */
  alternate?: FeedlyLink[];
  /**
   * The entries in the stream.
   */
  items: FeedlyEntry[];
}

export interface FeedlyStreamIdsRequest {
  /**
   * The id of the stream to fetch.
   * A feedId, a categoryId, a tagId or a system category ids can be used as stream ids.
   */
  id: string;
  /**
   * Optional integer number of entry ids to return.
   *
   * @default 20
   * @max 250
   */
  count?: number;
  /**
   * Rank: newest, oldest, or engagement (sort by popularity).
   *
   * @default newest
   */
  ranked?: 'newest' | 'oldest' | 'engagement';
  /**
   * If true, only unread articles will be returned.
   * Reminder: entries older than 31 days are automatically marked as read.
   * This flag requires the authorization header. It is ignored for tag streams.
   *
   * @default false
   */
  unreadOnly?: boolean;
  /**
   * Timestamp in ms.
   * Cannot be older than 31 days ago.
   */
  newerThan?: number;
  /**
   * A continuation id is used to page through the entry ids.
   * You can also pass a timestamp in ms, which will act as an “older than” limit.
   */
  continuation?: string;
}

export interface FeedlyStreamIds {
  /**
   * List of IDs which can be used with the entries API to retrieve the content.
   */
  ids: string[];
  /**
   * The continuation id to pass to the next stream call, for pagination.
   * This id guarantees that no entry will be duplicated in a stream (meaning, there is no need to de-duplicate entries returned by this call).
   * If this value is not returned, it means the end of the stream has been reached.
   */
  continuation?: string;
}
