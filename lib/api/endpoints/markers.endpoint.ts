import type {
  FeedlyMarkerCounts,
  FeedlyMarkerLatestRead,
  FeedlyMarkerLatestRequest,
  FeedlyMarkerLatestTagged,
  FeedlyMarkerReadCategoriesRequest,
  FeedlyMarkerReadEntriesRequest,
  FeedlyMarkerReadFeedsRequest,
  FeedlyMarkerReadTagsRequest,
  FeedlyMarkerSavedEntriesRequest,
  FeedlyMarkersCountRequest,
  FeedlyMarkerUndoCategoriesRequest,
  FeedlyMarkerUndoFeedRequest,
  FeedlyMarkerUnreadEntriesRequest,
  FeedlyMarkerUnsavedEntriesRequest,
} from '~/models/feedly-markers.model';

import { HttpMethod } from '@dvcol/common-utils/http';

import { FeedlyClientEndpoint } from '~/models';

/**
 * The Feedly API offers sophisticated read tracking at a category level, at a feed level or at an entry level.
 *
 * Entries older than 31 days are automatically marked as read.
 *
 * @see [documentation]{@link https://web.archive.org/web/20220619225046/https://developer.feedly.com/v3/markers}
 */
export const markers = {
  /**
   * The response will contain an entry for every feed and category in the account (unless a streamId is passed).
   * Unread counts are capped at 1,000 for each individual feed (the server will stop counting once it reaches this number).
   * The total unread count will appear in the “global.all” category. The updated fields is the timestamp of the newest entry for each feed or category.
   */
  counts: new FeedlyClientEndpoint<FeedlyMarkersCountRequest, FeedlyMarkerCounts, true>({
    method: HttpMethod.GET,
    url: '/markers/counts',
    opts: {
      auth: true,
      cache: true,
      parameters: {
        query: {
          autorefresh: false,
          newerThan: false,
          streamId: false,
        },
      },
    },
  }),
  entries: {
    read: new FeedlyClientEndpoint<FeedlyMarkerReadEntriesRequest, Record<string, never>, false>({
      method: HttpMethod.POST,
      url: '/markers',
      opts: {
        auth: true,
        cache: false,
      },
      body: {
        action: true,
        type: true,
        entryIds: true,
      },
      seed: {
        action: 'markAsRead',
        type: 'entries',
      },
    }),
    unread: new FeedlyClientEndpoint<FeedlyMarkerUnreadEntriesRequest, Record<string, never>, false>({
      method: HttpMethod.POST,
      url: '/markers',
      opts: {
        auth: true,
        cache: false,
      },
      body: {
        action: true,
        type: true,
        entryIds: true,
      },
      seed: {
        action: 'keepUnread',
        type: 'entries',
      },
    }),
    save: new FeedlyClientEndpoint<FeedlyMarkerSavedEntriesRequest, Record<string, never>, false>({
      method: HttpMethod.POST,
      url: '/markers',
      opts: {
        auth: true,
        cache: false,
      },
      body: {
        action: true,
        type: true,
        entryIds: true,
      },
      seed: {
        action: 'markAsSaved',
        type: 'entries',
      },
    }),
    unsave: new FeedlyClientEndpoint<FeedlyMarkerUnsavedEntriesRequest, Record<string, never>, false>({
      method: HttpMethod.POST,
      url: '/markers',
      opts: {
        auth: true,
        cache: false,
      },
      body: {
        action: true,
        type: true,
        entryIds: true,
      },
      seed: {
        action: 'markAsUnsaved',
        type: 'entries',
      },
    }),
  },
  feeds: {
    read: new FeedlyClientEndpoint<FeedlyMarkerReadFeedsRequest, Record<string, never>, false>({
      method: HttpMethod.POST,
      url: '/markers',
      opts: {
        auth: true,
        cache: false,
      },
      body: {
        action: true,
        type: true,
        feedIds: true,
        lastReadEntryId: false,
        asOf: false,
      },
      seed: {
        action: 'markAsRead',
        type: 'feeds',
      },
    }),
    /**
     * This is a one-time undo operation.
     * t will revert to the previous mark-as-read marker, if there is one, for the specified feeds or categories.
     */
    undo: new FeedlyClientEndpoint<FeedlyMarkerUndoFeedRequest, Record<string, never>, false>({
      method: HttpMethod.POST,
      url: '/markers',
      opts: {
        auth: true,
        cache: false,
      },
      body: {
        action: true,
        type: true,
        feedIds: true,
      },
      seed: {
        action: 'undoMarkAsRead',
        type: 'feeds',
      },
    }),
  },
  category: {
    read: new FeedlyClientEndpoint<FeedlyMarkerReadCategoriesRequest, Record<string, never>, false>({
      method: HttpMethod.POST,
      url: '/markers',
      opts: {
        auth: true,
        cache: false,
      },
      body: {
        action: true,
        type: true,
        categoryIds: true,
        lastReadEntryId: false,
        asOf: false,
      },
      seed: {
        action: 'markAsRead',
        type: 'categories',
      },
    }),
    /**
     * This is a one-time undo operation.
     * t will revert to the previous mark-as-read marker, if there is one, for the specified feeds or categories.
     */
    undo: new FeedlyClientEndpoint<FeedlyMarkerUndoCategoriesRequest, Record<string, never>, false>({
      method: HttpMethod.POST,
      url: '/markers',
      opts: {
        auth: true,
        cache: false,
      },
      body: {
        action: true,
        type: true,
        categoryIds: true,
      },
      seed: {
        action: 'undoMarkAsRead',
        type: 'categories',
      },
    }),
  },
  tags: {
    read: new FeedlyClientEndpoint<FeedlyMarkerReadTagsRequest, Record<string, never>, false>({
      method: HttpMethod.POST,
      url: '/markers',
      opts: {
        auth: true,
        cache: false,
      },
      body: {
        action: true,
        type: true,
        tagIds: true,
        lastReadEntryId: false,
        asOf: false,
      },
      seed: {
        action: 'markAsRead',
        type: 'tags',
      },
    }),
  },
  latest: {
    reads: new FeedlyClientEndpoint<FeedlyMarkerLatestRequest, FeedlyMarkerLatestRead, true>({
      method: HttpMethod.GET,
      url: '/markers/reads',
      opts: {
        auth: true,
        cache: true,
        parameters: {
          query: {
            newerThan: false,
          },
        },
      },
    }),
    tags: new FeedlyClientEndpoint<FeedlyMarkerLatestRequest, FeedlyMarkerLatestTagged, true>({
      method: HttpMethod.GET,
      url: '/markers/tags',
      opts: {
        auth: true,
        cache: true,
        parameters: {
          query: {
            newerThan: false,
          },
        },
      },
    }),
  },
};
