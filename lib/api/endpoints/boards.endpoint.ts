import type { FeedlyBoard, FeedlyBoardRequest } from '~/models/feedly-board.model';

import { HttpMethod } from '@dvcol/common-utils/http';

import { FeedlyClientEndpoint } from '~/models';

/**
 * This API manages personal boards, aka tags. It provides additional features compared to the tags API:
 *
 * the ability to upload a cover picture
 * the ability to make a board public, and to share notes and highlights (Pro only)
 * The board id format is:
 *
 * user/:userId/tag/:uuid
 *
 * Alternative:
 *
 * user/:userId/tag/:label
 *
 * Examples:
 *
 * user/af190c49-0ac8-4f08-9f83-805f1a3bc142/tag/c805fcbf-3acf-4302-a97e-d82f9d7c897f user/af190c49-0ac8-4f08-9f83-805f1a3bc142/tag/marketing
 *
 * When creating a new board, the server will auto-generate an id if one isn’t provided.
 *
 * Note that the following characters cannot be used in the label part of a tag id: “, <, >, ?, &, /, \, ^
 *
 * @see [documentation]{@link https://web.archive.org/web/20230322140800/https://developer.feedly.com/v3/boards}
 */
export const boards = {
  get: new FeedlyClientEndpoint<FeedlyBoardRequest, FeedlyBoard[], true>({
    method: HttpMethod.GET,
    url: '/boards',
    opts: {
      auth: true,
      cache: true,
      parameters: {
        query: {
          withEnterprise: false,
        },
      },
    },
  }),
  post: new FeedlyClientEndpoint<FeedlyBoardRequest, Record<string, never>, false>({
    method: HttpMethod.POST,
    url: '/boards',
    opts: {
      auth: true,
      cache: false,
    },
    body: {
      id: true,
      label: false,
      description: false,
      isPublic: false,
      showNotes: false,
      showHighlights: false,
    },
  }),
};
