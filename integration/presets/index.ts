import { longRunningApplication } from '../models/longRunningApplication';
import { instances } from './envs';
import { next } from './next';
import { react } from './react';
import { remix } from './remix';

export const longRunningApps = {
  next: {
    appRouterWithEmailCodes: longRunningApplication('approuter-all-enabled', next.appRouter, instances.withEmailCodes),
    // appRouterEmailLink: longRunningApplication(next.appRouter, instances.withEmailLinks),
  },
  react: {
    viteWithEmailCodes: longRunningApplication('all-enabled', react.vite, instances.withEmailCodes),
    viteEmailLink: longRunningApplication('email-link', react.vite, instances.withEmailLinks),
  },
  remix: {
    remixNode: longRunningApplication('remix-node', remix.remixNode, instances.withEmailCodes),
    // remixNodeEmailLink: longRunningApplication('remix-node', remix.remixNode, instances.withEmailLinks),
  },
};

export const appConfigs = {
  next,
  react,
  instances,
  remix,
  longRunning: longRunningApps,
} as const;
