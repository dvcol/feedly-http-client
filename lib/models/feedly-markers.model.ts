import type { FeedlyCategoryId } from '~/models/feedly-entry.model';
import type { FeedlyFeedId } from '~/models/feedly-feed.model';
import type { FeedlyTagId } from '~/models/feedly-tag.model';

export interface FeedlyMarkersCountRequest {
  /**
   * Let’s the server know if this is a background auto-refresh or not.
   * In case of very high load on the service, the server can deny access to background requests and give priority to user facing operations.
   */
  autorefresh?: boolean;
  /**
   * Timestamp used as a lower time limit, instead of the default 30 days.
   */
  newerThan?: number;
  /**
   * A user or system category can be passed to restrict the unread count response to feeds in this category.
   */
  streamId?: string;
}

export interface FeedlyMarkersCount {
  /**
   * The feed id or category id
   */
  id: FeedlyFeedId | FeedlyCategoryId;
  /**
   * Number of unread entries in this feed or category.
   */
  count: number;
  /**
   * The EPOCH timestamp of the newest entry in this feed or category.
   */
  updated: number;
}

export interface FeedlyMarkerCounts {
  /**
   * Array of unread counts for each feed or category.
   */
  unreadCounts: FeedlyMarkersCount[];
  /**
   * The EPOCH timestamp of the newest entry.
   */
  updated: number;
}

export interface FeedlyMarkerReadEntriesRequest {
  /**
   * The action to perform.
   * Must be `markAsRead` for this endpoint.
   */
  action?: 'markAsRead';
  /**
   * The type of entity to mark as read.
   * Must be `entries` for this endpoint.
   */
  type?: 'entries';
  /**
   * An array of entry ids to mark as read.
   */
  entryIds: string[];
}

export interface FeedlyMarkerUnreadEntriesRequest {
  /**
   * The action to perform.
   * Must be `keepUnread` for this endpoint.
   */
  action?: 'keepUnread';
  /**
   * The type of entity to mark as unread.
   * Must be `entries` for this endpoint.
   */
  type?: 'entries';
  /**
   * An array of entry ids to mark as unread.
   */
  entryIds: string[];
}

export interface FeedlyMarkerSavedEntriesRequest {
  /**
   * The action to perform.
   * Must be `markAsSaved` for this endpoint.
   */
  action?: 'markAsSaved';
  /**
   * The type of entity to mark as saved.
   * Must be `entries` for this endpoint.
   */
  type?: 'entries';
  /**
   * An array of entry ids to mark as saved.
   */
  entryIds: string[];
}

export interface FeedlyMarkerUnsavedEntriesRequest {
  /**
   * The action to perform.
   * Must be `markAsUnsaved` for this endpoint.
   */
  action?: 'markAsUnsaved';
  /**
   * The type of entity to mark as unsaved.
   * Must be `entries` for this endpoint.
   */
  type?: 'entries';
  /**
   * An array of entry ids to mark as unsaved.
   */
  entryIds: string[];
}

 type FeedlyMarkerReadRequest = {
   /**
    * The action to perform.
    * Must be `markAsRead` for this endpoint.
    */
   action?: 'markAsRead';
 } & ({
   /**
    * The id of the last entry that was read.
    */
   lastReadEntryId: string;
 } | {
   /**
    * The EPOCH timestamp from which to mark entries as read.
    * Note: This is less accurate than using the `lastReadEntryId` parameter.
    */
   asOf: number;
 });

export type FeedlyMarkerReadFeedsRequest = {
  /**
   * The type of entity to mark as read.
   * Must be `feeds` for this endpoint.
   */
  type?: 'feeds';
  /**
   * An array of feed ids to mark as read.
   */
  feedIds: FeedlyFeedId[];
} & FeedlyMarkerReadRequest;

export type FeedlyMarkerReadCategoriesRequest = {
  /**
   * The type of entity to mark as read.
   * Must be `categories` for this endpoint.
   */
  type?: 'categories';
  /**
   * An array of category ids to mark as read.
   */
  categoryIds: FeedlyCategoryId[];
} & FeedlyMarkerReadRequest;

export type FeedlyMarkerReadTagsRequest = {
  /**
   * The type of entity to mark as read.
   * Must be `tags` for this endpoint.
   */
  type?: 'tags';
  /**
   * An array of tag ids to mark as read.
   */
  tagIds: FeedlyTagId[];
} & FeedlyMarkerReadRequest;

export interface FeedlyMarkerUndoCategoriesRequest {
  /**
   * The action to perform.
   * Must be `undoMarkAsRead` for this endpoint.
   */
  action?: 'undoMarkAsRead';
  /**
   * The type of entity to undo.
   * Must be `entries` for this endpoint.
   */
  type?: 'categories';
  /**
   * An array of category ids to mark as read.
   */
  categoryIds: FeedlyCategoryId[];
}

export interface FeedlyMarkerUndoFeedRequest {
  /**
   * The action to perform.
   * Must be `undoMarkAsRead` for this endpoint.
   */
  action?: 'undoMarkAsRead';
  /**
   * The type of entity to undo.
   * Must be `entries` for this endpoint.
   */
  type?: 'feeds';
  /**
   * An array of feed ids to mark as read.
   */
  feedIds: FeedlyFeedId[];
}

export interface FeedlyMarkerLatestRequest {
  /**
   * The timestamp in milliseconds.
   *
   * @default 30 days
   */
  newerThan?: number;
}

export interface FeedlyMarkerLatestRead {
  /**
   * Array of entry ids that have been read.
   */
  entries: string[];
  /**
   * Array of entry ids that have been marked as unread.
   * Note: only entries before the read marker will be returned here.
   */
  unread: string[];
  /**
   * Array of feed ids that have been marked as read and the timestamp of the last read entry.
   */
  feeds: { id: FeedlyFeedId; asOf: number }[];
  /**
   * The timestamp of the last read entry.
   */
  updated: number;
}

export interface FeedlyMarkerLatestTagged {
  /**
   * Records of tagged entries indexed by tag id.
   * Node: Tags without any new entry will not be returned.
   */
  taggedEntries: {
    [id: FeedlyTagId]: string[];
  };
}
