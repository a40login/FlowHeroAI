/**
 * Copyright (c) 2024 FlowHero
 *
 * This file is included by both the frontend and backend. Depending on the build time,
 * the values may differ.
 */

/**
 * Centralized version and configuration information for the FlowHero app.
 */
export const Release = {
  // Tenant identifier: 'dev' for development, 'open' for public/GitHub, customize as needed
  TenantSlug: 'flowhero',

  App: {
    versionCode: '1.0.0',       // Update sequentially as needed
    versionName: 'FlowHero 1',
    releaseNotes: '',
  },

  // Feature flags and compatibility options
  Features: {
    BACKEND_REVALIDATE_INTERVAL: 6 * 60 * 60 * 1000, // 6 hours
    LIGHTER_ANIMATIONS: false,
  },

  // Used to trigger data revalidation (e.g., model refresh)
  Monotonics: {
    Aix: 1,
    NewsVersion: 1,
  },

  // Frontend: technology levels/features
  TechLevels: {
    Flow: '1.0', Engine: '1.0', UI: '1.0', API: '1.0',
  },

  // Supported AI functions (customize as needed)
  AiFunctions: [
    'auto-flow', 'auto-diagram', 'auto-ui',
    'chat-call', 'chat-summary', 'chat-title',
    'create-attach-prompts', 'create-image-prompt', 'create-persona',
    'diff-whole',
    'fixup',
    'reason-flow', 'reason-merge', 'reason-react',
  ],

  /**
   * Explicit build info declaration for frontend/backend.
   */
  buildInfo: (_type: 'frontend' | 'backend') => ({
    deploymentType: process.env.NEXT_PUBLIC_DEPLOYMENT_TYPE,
    pkgVersion: process.env.NEXT_PUBLIC_BUILD_PKGVER,
    gitSha: process.env.NEXT_PUBLIC_BUILD_HASH,
    timestamp: process.env.NEXT_PUBLIC_BUILD_TIMESTAMP,
  }),

  IsNodeDevBuild: process.env.NODE_ENV === 'development',

} as const;
