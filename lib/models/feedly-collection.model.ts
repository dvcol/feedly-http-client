import type { FeedlySubscription } from '~/models/feedly-subscriptions.model';

export interface FeedlyCollectionRequest {
  /**
   * If true, return reading and tag stats for the past 31 days.
   *
   * @default false
   */
  withStats?: boolean;
  /**
   * If true, return enterprise collections followed by the user as well as personal ones.
   *
   * @default false
   */
  withEnterprise?: boolean;
}

export interface FeedlyCollection {
  /**
   * The id of the collection.
   */
  id: string;
  /**
   * The created timestamp of the collection.
   */
  created?: number;
  /**
   * The label of the collection.
   *
   * @default The collection name.
   */
  label: string;
  /**
   * The description of the collection (if any).
   */
  description?: string;
  /**
   * The cover image URL of the collection (if any).
   */
  cover?: string;
  /**
   * The list of feeds in this collection.
   */
  feeds: FeedlySubscription[];
}

/**
 * `label` is required for new collections, optional when editing an existing collection.
 * `id` if missing, the server will generate one (new collection).
 */
export interface FeedlyCollectionCreateRequest extends Partial<FeedlyCollection> {
  /**
   * If true, the existing cover for this collection will be removed.
   */
  deleteCover?: boolean;
}

export interface FeedlyCollectionFeedRequest {
  /**
   * The id of the collection to add the feed to.
   */
  collectionId: string;
  /**
   * The id of the feed to add to the collection.
   */
  id: string;
  /**
   * The feed title.
   * If missing, the default feed title will be used
   */
  title?: string;
}

export interface FeedlyCollectionFeedsRequest {
  /**
   * The id of the collection to add the feed to.
   */
  collectionId: string;
  /**
   * The id of the feed to add to the collection.
   */
  id: string;
  /**
   * The feed title.
   * If missing, the default feed title will be used
   */
  title?: string;
}

export interface FeedlyCollectionDeleteFeedRequest {
  /**
   * The id of the collection to delete the feed from.
   */
  collectionId: string;
  /**
   * The id of the feed to delete from the collection.
   */
  id: string;
  /**
   * If true, feeds with not categories will be moved to the “uncategorized” global category;
   * @default false (orphan feeds are removed)
   */
  keepOrphanFeeds?: boolean;
}
