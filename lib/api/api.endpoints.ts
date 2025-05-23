import { authentication } from '~/api/endpoints/authentication.endpoint.js';
import { boards } from '~/api/endpoints/boards.endpoint';
import { collections } from '~/api/endpoints/collections.endpoint';
import { markers } from '~/api/endpoints/markers.endpoint';
import { profile } from '~/api/endpoints/profile.endpoint';
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
  markers,
  profile,
};

export type FeedlyApi = typeof feedly;
