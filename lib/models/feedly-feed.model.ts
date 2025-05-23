export type FeedlyFeedId = `feed/${string}`;

export interface FeedlyFeed {
  /**
   * The unique identifier of the feed.
   * Example: `feed/http://feeds.feedburner.com/design-milk`
   */
  id: FeedlyFeedId;

  /**
   * The title of the feed.
   * Example: `Design Milk`
   */
  title: string;

  /**
   * The URL of the feed's website.
   * Example: `http://design-milk.com`
   */
  website?: string;

  /**
   * The language of the feed content.
   * Example: `en`
   */
  language?: string;

  /**
   * A brief description of the feed.
   * Example: `Covering the intersection of technology, science, art, and culture.`
   */
  description?: string;

  /**
   * The estimated engagement level of the feed.
   */
  estimatedEngagement?: number;

  /**
   * The URL of the feed's icon.
   */
  iconUrl?: string;

  /**
   * The URL of the feed's visual representation.
   */
  visualUrl?: string;

  /**
   * The URL of the feed's cover image.
   */
  coverUrl?: string;

  /**
   * The feed's creation timestamp in milliseconds since the epoch.
   */
  created?: number;

  /**
   * The feed's last updated timestamp in milliseconds since the epoch.
   */
  updated?: number;

  /**
   * The feed's added date timestamp in milliseconds since the epoch.
   */
  addedDate?: number;

  /**
   * The velocity of the feed, representing the frequency of updates.
   */
  velocity?: number;

  /**
   * The number of subscribers to the feed.
   */
  subscribers?: number;

  /**
   * The topics associated with the feed.
   * Example: `['tech', 'gaming']`
   */
  topics?: string[];

  /**
   * The state of the feed, such as `dead.stale` or `dormant`.
   */
  state?: string;

  /**
   * The number of entries read in the past month.
   */
  numReadEntriesPastMonth?: number;

  /**
   * The number of long-read entries in the past month.
   */
  numLongReadEntriesPastMonth?: number;

  /**
   * The total reading time in milliseconds for the past month.
   */
  totalReadingTimePastMonth?: number;

  /**
   * The number of tagged entries in the past month.
   */
  numTaggedEntriesPastMonth?: number;

  /**
   * The Twitter screen name associated with the feed.
   */
  twitterScreenName?: string;

  /**
   * The number of Twitter followers for the associated account.
   */
  twitterFollowers?: number;

  /**
   * Indicates whether the feed is partial.
   */
  partial?: boolean;

  /**
   * The logo URL of the feed.
   */
  logo?: string;
}
