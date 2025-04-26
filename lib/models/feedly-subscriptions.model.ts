import type { FeedlyCategory } from '~/models/feedly-entry.model';

/**
 * Both added and updated are automatically set by the server, when the feed is added and updated respectively.
 * These values are optional: they might not be present for older subscriptions. sortId is an optional legacy value imported from Google Reader (mostly).
 * It is ignored by the server. visualUrl is optional, it is not available for all feeds.
 */
export interface FeedlySubscription {
  /**
   * The id of the subscription.
   */
  id: string;
  /**
   * The title of the subscription.
   */
  title: string;
  /**
   * Array of categories the subscription belongs to.
   */
  categories: FeedlyCategory[];
  /**
   * The sort id of the subscription.
   * This is an optional legacy value imported from Google Reader (mostly).
   */
  sortid?: string;
  /**
   * Timestamp of when the subscription was added.
   * This value is optional: it might not be present for older subscriptions.
   */
  added?: number;
  /**
   * Timestamp of when the subscription was last updated.
   * This value is optional: it might not be present for older subscriptions.
   */
  updated?: number;
  /**
   * The website of the subscription.
   */
  website?: string;
  /**
   * The visual URL of the subscription.
   * This is optional, it is not available for all feeds.
   */
  visualUrl?: string;

}

/**
 * Only the id field is mandatory.
 * If title is not present, the feed title will be used.
 * If categories is missing, the feed will automatically be added to the uncategorized category (“global.uncategorized”).
 * Global categories are automatically assigned. If you try to pass them, the server will return an HTTP/400 - bad request response.
 */
export interface FeedlySubscriptionRequest extends Partial<FeedlySubscription> {
  /**
   * The id of the subscription.
   * Only the id field is mandatory.
   */
  id: string;
}
