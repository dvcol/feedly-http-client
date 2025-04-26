/**
 * The board id format is:
 *
 * user/:userId/tag/:uuid
 *
 * Alternative:
 *
 * user/:userId/tag/:label
 */
export type FeedlyBoardId = `user/${string}/tag/${string}`;

export interface FeedlyBoard {
  /**
   * The board id
   */
  id: FeedlyBoardId;
  /**
   * The EPOCH timestamp when this board was created
   */
  created: number;
  /**
   * The board label.
   */
  label: string;
  /**
   * If true, the label, description, cover etc can be changed by the user.
   * If false, this board cannot be changed.
   */
  customizable: boolean;
  /**
   * True for enterprise boards, false for personal boards
   */
  enterprise: boolean;
  /**
   * The board description.
   */
  description?: string;
  /**
   * The URL of the cover image, if one was uploaded
   */
  cover?: string;
  /**
   * If true, this board is publicly shared.
   *
   * @plan pro
   */
  isPublic?: boolean;
  /**
   * If true, notes are also visible to followers (public boards only)
   *
   * @plan pro
   */
  showNotes?: boolean;
  /**
   * If true, highlights are also visible to followers (public boards only)
   *
   * @plan pro
   */
  showHighlights?: boolean;
  /**
   * The public URL for this board (public boards only)
   */
  htmlUrl?: string;
  /**
   * The public feed id for this board (public boards only)
   */
  streamId?: string;
}

export interface FeedlyBoardRequest {
  /**
   * If true, return enterprise boards followed by the user as well as personal ones.
   */
  withEnterprise?: boolean;
}
