import type { FeedlyClientSettings } from '~/models/feedly-client.model';

import { Config } from '~/config';

export const clientSettingsMock: FeedlyClientSettings = {
  client_id: 'client_id',
  client_secret: 'client_secret',

  redirect_uri: 'chrome-extension://redirect_uri/views/options/index.html',

  endpoint: Config.Endpoint,
  version: Config.Version,

  useragent: 'my-user-agent',
};
