import { authentication } from '~/api/endpoints/authentication.endpoint.js';
import { boards } from '~/api/endpoints/boards.endpoint';
import { collections } from '~/api/endpoints/collections.endpoint';
import { streams } from '~/api/endpoints/streams.endpoint';
import { subscriptions } from '~/api/endpoints/subscriptions.endpoint';
import { tags } from '~/api/endpoints/tags.endpoint';

export const feedly = {
  authentication,
  streams,
  subscriptions,
  collections,
  tags,
  boards,
};

export type FeedlyApi = typeof feedly;
