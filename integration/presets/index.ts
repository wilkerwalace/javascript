import { longRunningApplication } from '../models/longRunningApplication';
import { envs } from './envs';
import { next } from './next';
import { react } from './react';
import { remix } from './remix';

export const longRunningApps = {
  next: {
    appRouterWithEmailCodes: longRunningApplication('approuter-all-enabled', next.appRouter, envs.withEmailCodes),
    // appRouterEmailLink: longRunningApplication(next.appRouter, instances.withEmailLinks),
  },
  react: {
    viteWithEmailCodes: longRunningApplication('all-enabled', react.vite, envs.withEmailCodes),
    viteEmailLink: longRunningApplication('email-link', react.vite, envs.withEmailLinks),
  },
  remix: {
    remixNode: longRunningApplication('remix-node', remix.remixNode, envs.withEmailCodes),
    // remixNodeEmailLink: longRunningApplication('remix-node', remix.remixNode, instances.withEmailLinks),
  },
};

export const appConfigs = {
  next,
  react,
  envs,
  remix,
  longRunning: longRunningApps,
} as const;
