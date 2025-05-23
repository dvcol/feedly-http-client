export interface FeedlyExternalLogin {
  /**
   * The unique, immutable user id.
   */
  id: string;
  /**
   * The external login provider.
   */
  provider: string;
  /**
   * Full name of the user.
   */
  fullName: string;
  /**
   * The unique, immutable user id for the provider.
   */
  providerId: string;
  /**
   * The picture URL for this user, extracted from the OAuth profile.
   */
  picture: string;
  /**
   * Whether the user has verified this login.
   */
  verified: boolean;
}

export interface FeedlyProfile {
  /**
   * The unique, immutable user id.
   */
  id: string;
  /**
   * The email address extracted from the OAuth profile.
   * Not always available, depending on the OAuth method used.
   */
  email?: string;
  /**
   * The given (first) name.
   * Not always available.
   */
  givenName?: string;
  /**
   * The family (last) name.
   * Not always available.
   */
  familyName?: string;
  /**
   * The full name.
   * Not always available.
   */
  fullName?: string;
  /**
   * The picture URL for this user, extracted from the OAuth profile.
   */
  picture?: string;
  /**
   * Gender ('male' or 'female').
   */
  gender?: 'male' | 'female';
  /**
   * The locale, extracted from the OAuth profile.
   */
  locale?: string;
  /**
   * The Google user id, if the user went through Google’s OAuth flow.
   */
  google?: string;
  /**
   * The Google Reader user id.
   * If present, this indicates a user who migrated from Google Reader.
   */
  reader?: string;
  /**
   * The Twitter handle (legacy).
   */
  twitter?: string;
  /**
   * The Twitter user id, if the user went through the Twitter OAuth flow.
   */
  twitterUserId?: string;
  /**
   * The Facebook user id, if the user went through the Facebook OAuth flow.
   */
  facebookUserId?: string;
  /**
   * The WordPress user id, if the user went through the WordPress OAuth flow.
   */
  wordPressId?: string;
  /**
   * The Windows Live user id, if the user went through the Windows Live OAuth flow.
   */
  windowsLiveId?: string;
  /**
   * Whether the user used the Windows Live OAuth flow.
   */
  windowsLivePartialOAuth?: boolean;
  /**
   * The analytics “wave”.
   * Format is: “yyyy.ww” where yyyy is the year, ww is the week number.
   * E.g. “2014.02” means this user joined on the second week of 2014.
   * See http://www.epochconverter.com/date-and-time/weeknumbers-by-year.php for week number definitions.
   */
  wave?: `${number}.${number}`;
  /**
   * The client application used to create this account.
   */
  client?: string;
  /**
   * The client name/version used to create this account.
   */
  source?: string;
  /**
   * The timestamp, in ms, when this account was created.
   * Not set for accounts created before 10/2/2013.
   */
  created?: number;
  /**
   * The feedly pro subscription.
   * Values include FeedlyProMonthly, FeedlyProYearly, FeedlyProLifetime etc.
   * @plan pro
   */
  product?: string;
  /**
   * For expiring subscriptions only; the timestamp, in ms, when this subscription will expire.
   * @plan pro
   */
  productExpiration?: number;
  /**
   * For expiring subscriptions only; values include Active, PastDue, Canceled, Unpaid, Deleted, Expired.
   * @plan pro
   */
  subscriptionStatus?: string;
  /**
   * True if the user has activated the Evernote integration.
   * @plan pro
   */
  isEvernoteConnected?: boolean;
  /**
   * True if the user has activated the Pocket integration.
   * @plan pro
   */
  isPocketConnected?: boolean;

  /**
   * Whether the user has activated the twitter integration.
   */
  twitterConnected?: boolean;
  /**
   * Whether the user has activated the reddit integration.
   */
  redditConnected?: boolean;
  /**
   * Whether the user has activated the dropbox integration.
   */
  dropboxConnected?: boolean;
  /**
   * Whether the user has activated the instapaper integration.
   */
  instapaperConnected?: boolean;
  /**
   * Whether the user has activated the apple integration.
   */
  appleConnected?: boolean;
  /**
   * Whether the user has activated the openId integration.
   */
  openIdConnected?: boolean;
  /**
   * Whether the user has activated the evernote integration.
   */
  evernoteConnected?: boolean;
  /**
   * Whether the user has activated the pocket integration.
   */
  pocketConnected?: boolean;
  /**
   * Whether the user has activated the windows live integration.
   */
  windowsLiveConnected?: boolean;
  /**
   * Whether the user has activated the facebook integration.
   */
  facebookConnected?: boolean;
  /**
   * Array of external logins.
   */
  logins?: FeedlyExternalLogin[];
}
