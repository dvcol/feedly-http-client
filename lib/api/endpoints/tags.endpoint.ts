import type { FeedlyTag, FeedlyTagLabelRequest, FeedlyTagRequest, FeedlyTagsRequest } from '~/models/feedly-tag.model';

import { HttpMethod } from '@dvcol/common-utils/http';

import { FeedlyClientEndpoint } from '~/models';

/**
 * Consider using the boards API to create and update tags.
 *
 * Tags allow users to collect individual entries. The format for a tag id is user/:userId/tag/:label.
 * The label of a tag is initially set to the last part of the id. The label cannot contain any of the following characters: “, <, >, ?, &, /, \, ^
 *
 * @see [documentation]{@link https://web.archive.org/web/20230322140759/https://developer.feedly.com/v3/tags}
 */
export const tags = {
  get: new FeedlyClientEndpoint<Record<string, never>, FeedlyTag[], true>({
    method: HttpMethod.GET,
    url: '/tags',
    opts: {
      auth: true,
      cache: true,
    },
  }),
  entry: new FeedlyClientEndpoint<FeedlyTagRequest, Record<string, never>, false>({
    method: HttpMethod.PUT,
    url: '/tags/:ids',
    opts: {
      auth: true,
      cache: false,
      parameters: {
        path: {
          ids: true,
        },
      },
    },
    body: {
      entryId: true,
    },
    transform: data => ({ ...data, ids: Array.isArray(data.ids) ? data.ids.join(',') : data.ids }),
  }),
  entries: new FeedlyClientEndpoint<FeedlyTagsRequest, Record<string, never>, false>({
    method: HttpMethod.PUT,
    url: '/tags/:ids',
    opts: {
      auth: true,
      cache: false,
      parameters: {
        path: {
          ids: true,
        },
      },
    },
    body: {
      entryIds: true,
    },
    transform: data => ({ ids: Array.isArray(data.ids) ? data.ids.join(',') : data.ids, entryIds: Array.isArray(data.entryIds) ? data.entryIds.join(',') : data.entryIds }),
  }),
  label: new FeedlyClientEndpoint<FeedlyTagLabelRequest, Record<string, never>, false>({
    method: HttpMethod.POST,
    url: '/tags/:id',
    opts: {
      auth: true,
      cache: false,
      parameters: {
        path: {
          id: true,
        },
      },
    },
    body: {
      label: true,
    },
  }),
  delete: {
    tag: new FeedlyClientEndpoint<Pick<FeedlyTagRequest, 'ids'>, Record<string, never>, false>({
      method: HttpMethod.DELETE,
      url: '/tags/:ids',
      opts: {
        auth: true,
        cache: false,
        parameters: {
          path: {
            ids: true,
          },
        },
      },
      transform: data => ({ ids: Array.isArray(data.ids) ? data.ids.join(',') : data.ids }),
    }),
    entries: new FeedlyClientEndpoint<FeedlyTagsRequest, Record<string, never>, false>({
      method: HttpMethod.DELETE,
      url: '/tags/:ids/:entryIds',
      opts: {
        auth: true,
        cache: false,
        parameters: {
          path: {
            ids: true,
            entryIds: true,
          },
        },
      },
      transform: data => ({
        ids: Array.isArray(data.ids) ? data.ids.join(',') : data.ids,
        entryIds: Array.isArray(data.entryIds) ? data.entryIds.join(',') : data.entryIds,
      }),
    }),
  },
};
