export const PAGES = {
  MARKETPLACE: 'Marketplace',
  MESSAGES: 'Messages',
  PROFILE: 'Profile',
  COMMUNITY: 'Community',
  CREATE_LISTING: 'CreateListing',
  GEMINI_CHAT: 'GeminiChat',
} as const;

export type Page = typeof PAGES[keyof typeof PAGES];
