/**
 * The format for a tag id is user/:userId/tag/:label.
 * The label of a tag is initially set to the last part of the id.
 * The label cannot contain any of the following characters: “, <, >, ?, &, /, \, ^
 */
export type FeedlyTagId = `user/${string}/tag/${string}`;

export interface FeedlyTag {
  /**
   * The tag id.
   */
  id: FeedlyTagId;
  /**
   * The tag label.
   */
  label?: string;
  /**
   * The tag description.
   */
  description?: string;
}

export interface FeedlyTagRequest {
  /**
   * The id(s) for the tag(s).
   */
  ids: string | FeedlyTagId[];
  /**
   * The entry id to tag.
   */
  entryId: string;
}

export interface FeedlyTagsRequest {
  /**
   * The id(s) for the tag(s).
   */
  ids: string | FeedlyTagId[];
  /**
   * The entry id(s) to tag.
   */
  entryIds: string | string[];

}

export interface FeedlyTagLabelRequest {
  /**
   * The id of the tag.
   */
  id: FeedlyTagId;
  /**
   * The new label of the tag.
   */
  label: string;
}
