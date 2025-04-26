import type {
  FeedlyCollection,
  FeedlyCollectionCreateRequest,
  FeedlyCollectionDeleteFeedRequest,
  FeedlyCollectionFeedRequest,
  FeedlyCollectionRequest,
} from '~/models/feedly-collection.model';

import { HttpMethod } from '@dvcol/common-utils/http';

import { FeedlyClientEndpoint } from '~/models';

/**
 * This API manages personal collections of feed subscriptions, aka categories. It provides an alternative, category-centric view of feed subscriptions and categories using a single API.
 *
 * The collection id format is:
 *
 * user/:userId/category/:uuid
 *
 * Or:
 *
 * user/:userId/category/:label
 *
 * Example:
 *
 * user/af190c49-0ac8-4f08-9f83-805f1a3bc142/category/c805fcbf-3acf-4302-a97e-d82f9d7c897f user/af190c49-0ac8-4f08-9f83-805f1a3bc142/category/Marketing
 *
 * When creating a new personal collection, the server will auto-generate an id if one isn’t provided
 *
 * @see [documentation]{@link https://web.archive.org/web/20230516223725/https://developer.feedly.com/v3/collections}
 */
export const collections = {
  get: new FeedlyClientEndpoint<FeedlyCollectionRequest, FeedlyCollection[], true>({
    method: HttpMethod.GET,
    url: '/collections',
    opts: {
      auth: true,
      cache: true,
      parameters: {
        query: {
          withStats: false,
          withEnterprise: false,
        },
      },
    },
  }),
  post: new FeedlyClientEndpoint<FeedlyCollectionCreateRequest, [FeedlyCollection], false>({
    method: HttpMethod.POST,
    url: '/collections',
    opts: {
      auth: true,
      cache: false,
    },
    body: {
      label: false,
      id: false,
      description: false,
      feeds: false,
      deleteCover: false,
    },
  }),
  collection: {
    get: new FeedlyClientEndpoint<{ id: string }, [FeedlyCollection], true>({
      method: HttpMethod.GET,
      url: '/collections/:id',
      opts: {
        auth: true,
        cache: true,
        parameters: {
          path: {
            id: true,
          },
        },
      },
    }),
    post: new FeedlyClientEndpoint<Omit<FeedlyCollectionCreateRequest, 'id'> & { id: string }, [FeedlyCollection], false>({
      method: HttpMethod.POST,
      url: '/collections/:id',
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
        label: false,
        description: false,
        feeds: false,
        deleteCover: false,
      },
    }),
    feeds: {
      put: new FeedlyClientEndpoint<FeedlyCollectionFeedRequest, Record<string, never>, false>({
        method: HttpMethod.PUT,
        url: '/collections/:collectionId/feeds',
        opts: {
          auth: true,
          cache: false,
          parameters: {
            path: {
              collectionId: true,
            },
          },
        },
        body: {
          id: true,
          title: false,
        },
      }),
      delete: new FeedlyClientEndpoint<FeedlyCollectionDeleteFeedRequest, Record<string, never>, false>({
        method: HttpMethod.DELETE,
        url: '/collections/:collectionId/feeds/:id',
        opts: {
          auth: true,
          cache: false,
          parameters: {
            path: {
              collectionId: true,
              id: true,
            },
            query: {
              keepOrphanFeeds: false,
            },
          },
        },
      }),
    },
  },
};
