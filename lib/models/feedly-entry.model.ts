import type { FeedlyTag } from '~/models/feedly-tag.model';

export interface FeedlyContent {
  /**
   * The article content.
   */
  content: string;
  /**
   * The content direction.
   * Can be either "ltr" for left-to-right or "rtl" for right-to-left.
   */
  direction: 'ltr' | 'rtl';
}

export interface FeedlyLink {
  /**
   * The feed website URL.
   */
  href: string;
  /**
   * The type of the feed.
   */
  type?: string;
}

export interface FeedlyOrigin {
  /**
   * The feed id.
   */
  streamId: string;
  /**
   * The feed title.
   */
  title: string;
  /**
   * The feed website URL.
   */
  htmlUrl: string;
}

export interface FeedlyVisual {
  /**
   * The image URL.
   */
  url: string;
  /**
   * The image width.
   */
  width: number;
  /**
   * The image height.
   */
  height: number;
  /**
   * The image MIME type.
   */
  contentType: string;
}

export type FeedlyCategoryId = `user/${string}/category/${string}`;

export interface FeedlyCategory {
  /**
   * The category id.
   */
  id: FeedlyCategoryId;
  /**
   * The category label.
   */
  label: string;
}

export interface FeedlySearchPart {
  /**
   * The search part id.
   */
  id: string;
  /**
   * The search part label.
   */
  label: string;
}

export interface FeedlySearchTerms {
  /**
   * The search terms used to create this priority.
   */
  parts: FeedlySearchPart[];
}

export type FeedlyPriorityId = `user/${string}/priority/${string}`;

export interface FeedlyPriority {
  /**
   * The priority id.
   */
  id: FeedlyPriorityId;
  /**
   * The priority label.
   */
  label: string;
  /**
   * The search terms used to create this priority.
   */
  searchTerms?: FeedlySearchTerms;
  /**
   * The timestamp when the article was tagged by the user.
   */
  actionTimestamp?: number;
  /**
   * The stream id.
   */
  streamId?: string;
  /**
   * The stream label.
   */
  streamLabel?: string;
}

export interface FeedlyMeme {
  /**
   * The meme id.
   */
  id: string;
  /**
   * The meme label.
   */
  label: string;
  /**
   * The meme score.
   */
  score: number;
  /**
   * Whether the meme is featured.
   */
  featured: boolean;
}

export interface FeedlySentence {
  /**
   * The position of the sentence in the article.
   */
  position: number;
  /**
   * The score of the sentence.
   */
  score: number;
  /**
   * The text of the sentence.
   */
  text: string;
}

export interface FeedlyTopic {
  /**
   * The topic id.
   */
  id: string;
  /**
   * The topic type.
   */
  type: string;
  /**
   * The topic label.
   */
  label: string;
  /**
   * The topic score.
   */
  score: number;
  /**
   * The salience level of the topic.
   */
  salienceLevel: 'about' | 'mention';
}

export interface FeedlyMention {
  text: string;
}

export interface FeedlyEntity {
  /**
   * Whether the entity is disambiguated.
   */
  disambiguated: boolean;
  /**
   * The entity type.
   */
  type: string;
  /**
   * The entity id.
   */
  id: string;
  /**
   * The entity label.
   */
  label: string;
  /**
   * The mentions of the entity.
   */
  mentions: FeedlyMention[];
  /**
   * The salience level of the entity.
   */
  salienceLevel: 'about' | 'mention';
}

export type FeedlyFeedId = `feed/${string}`;

export interface FeedlyRelated {
  /**
   * The entry id.
   */
  entryId: string;
  /**
   * The feed id.
   */
  feedId: FeedlyFeedId;
  /**
   * The feed title.
   */
  feedTitle: string;
  /**
   * Whether the entry is unread.
   */
  unread: boolean;
}

export interface FeedlyEntry {
  /**
   * The unique, immutable ID for this particular article.
   */
  id: string;
  /**
   * The article’s title. This string does not contain any HTML markup.
   */
  title?: string;
  /**
   * The article content.
   * This object typically has two values: “content” for the content itself, and “direction” (“ltr” for left-to-right, “rtl” for right-to-left).
   * The content itself contains sanitized HTML markup.
   */
  content?: FeedlyContent;
  /**
   * The article summary.
   *
   * This object typically has two values: “content” for the content itself, and “direction” (“ltr” for left-to-right, “rtl” for right-to-left).
   * The content itself contains sanitized HTML markup.
   */
  summary?: FeedlyContent;
  /**
   * The author’s name.
   */
  author?: string;
  /**
   * The immutable timestamp, in ms, when this article was processed by the feedly Cloud servers.
   */
  crawled: number;
  /**
   * The timestamp, in ms, when this article was re-processed and updated by the feedly Cloud servers.
   */
  recrawled?: number;
  /**
   * The timestamp, in ms, when this article was published, as reported by the RSS feed (often inaccurate).
   */
  published: number;
  /**
   * The timestamp, in ms, when this article was updated, as reported by the RSS feed.
   */
  updated?: number;
  /**
   * A list of alternate links for this article.
   * Each link object contains a media type and a URL.
   * Typically, a single object is present, with a link to the original web page.
   */
  alternate?: FeedlyLink[];
  /**
   * The feed from which this article was crawled.
   * If present, “streamId” will contain the feed id, “title” will contain the feed title, and “htmlUrl” will contain the feed’s website.
   */
  origin?: FeedlyOrigin;
  /**
   * A list of keyword strings extracted from the RSS entry.
   */
  keywords?: string[];
  /**
   * An image URL for this entry.
   * If present, “url” will contain the image URL, “width” and “height” its dimension, and “contentType” its MIME type.
   */
  visual?: FeedlyVisual;
  /**
   * Was this entry read by the user?
   * If an Authorization header is not provided, this will always return false.
   * If an Authorization header is provided, it will reflect if the user has read this entry or not.
   */
  unread?: boolean;
  /**
   * A list of tag objects (“id” and “label”) that the user added to this entry.
   * This value is only returned if an Authorization header is provided, and at least one tag has been added.
   * If the entry has been explicitly marked as read (not the feed itself), the “global.read” tag will be present.
   */
  tags?: FeedlyTag[];
  /**
   * A list of category objects (“id” and “label”) that the user associated with the feed of this entry.
   * This value is only returned if an Authorization header is provided.
   */
  categories?: FeedlyCategory[];
  /**
   * An indicator of how popular this entry is.
   * The higher the number, the more readers have read, saved or shared this particular entry.
   * This value changes over time.
   */
  engagement?: number;
  /**
   * A normalized indicator for the relative popularity of this entry compared to past data from the same source.
   * A value below 1.0 indicates this entry is less popular, on average.
   * A value above 1.0 indicates this entry is more popular.
   * Because this value is normalized, it can be used to compare entries from other sources, and is used for engagement ranking.
   * This value changes over time.
   */
  engagementRate?: number;
  /**
   * For tagged articles, contains the timestamp when the article was tagged by the user.
   * This will only be returned when the entry is returned through the streams API.
   */
  actionTimestamp?: number;
  /**
   * A list of media links (videos, images, sound etc) provided by the feed.
   * Some entries do not have a summary or content, only a collection of media links.
   */
  enclosure?: FeedlyLink[];
  /**
   * The article fingerprint.
   * This value might change if the article is updated.
   */
  fingerprint?: string;
  /**
   * The unique id of this post in the RSS feed (not necessarily a URL!).
   */
  originId?: string;
  /**
   * An internal search id.
   */
  sid?: string;
  /**
   * A list of priority filters that match this entry (pro+ and team only).
   */
  priorities?: FeedlyPriority[];
  /**
   * A list of memes: clusters of entries from popular sources that are about the same subject.
   * The meme id can be used to retrieve the other articles about the same subject.
   */
  memes?: FeedlyMeme[];
  /**
   * For pro+ and enterprise sources, Feedly will extract one or two important sentences from the entry content, to be used for summary or highlights.
   * The text does not include any HTML tags.
   *
   * @plan pro+ and enterprise
   */
  leoSummary?: {
    sentences: FeedlySentence[];
  };
  /**
   * A list of detected topics in this article.
   * This feature is only available for pro+ and enterprise feeds.
   * Salience level can either be about (if the article is about this topic), or mention (if the article only mentions this topic).
   *
   * @plan pro+ and enterprise
   */
  commonTopics?: FeedlyTopic[];
  /**
   * A list of detected entities in this article.
   * This feature is only available for pro+ and enterprise feeds.
   * Mentions will list the text fragments that refer to each entity.
   *
   * @plan pro+ and enterprise
   */
  entities?: FeedlyEntity[];
  /**
   * A list of related or similar entries.
   * This data is only available for pro+ and enterprise users, if similar=true is passed to the streams API.
   *
   * @plan pro+ and enterprise
   */
  related?: FeedlyRelated[];
  /**
   * A list of near-duplicate entries.
   * This data is only available for pro+ and enterprise users, if similar=true is passed to the streams API.
   *
   * @plan pro+ and enterprise
   */
  duplicates?: FeedlyRelated[];
}

export type FeedlyEntryRequest = Pick<FeedlyEntry, 'title' | 'origin' | 'alternate' | 'published'> & (Pick<FeedlyEntry, 'content'> | Pick<FeedlyEntry, 'summary'> | Pick<FeedlyEntry, 'enclosure'>) & Partial<Omit<FeedlyEntry, 'title' | 'origin' | 'alternate' | 'published' | 'content' | 'summary' | 'enclosure'>>;
