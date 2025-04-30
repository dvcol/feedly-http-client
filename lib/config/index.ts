export const Config = Object.freeze({
  Endpoint: 'https://cloud.feedly.com' as const,
  Website: 'https://feedly.com' as const,
  Version: 'v3' as const,
}) satisfies {
  Endpoint: string;
  Website: string;
  Version: `v${number}`;
};
