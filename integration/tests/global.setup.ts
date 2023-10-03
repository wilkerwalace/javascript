/* eslint-disable turbo/no-undeclared-env-vars */
import { test as setup } from '@playwright/test';

import { constants } from '../constants';
import type { LongRunningApplication } from '../models/longRunningApplication';
import { stateFile } from '../models/stateFile';
import { longRunningApps } from '../presets';
import { fs } from '../scripts';

/**
 * State cannot be shared using playwright,
 * so we save the state in a file using a strategy similar to `storageState`
 */
const startAllLongRunningApps = async (apps: LongRunningApplication[]) => {
  await fs.remove(constants.TMP_DIR);
  return Promise.all(apps.map(async app => stateFile.addLongRunningApp(app.name, await app.init())));
};

const getAppIdFromEnv = () => process.env.APP_ID;
const getAppUrlFromEnv = () => process.env.APP_URL;
const getAppPortFromEnv = () => (process.env.APP_PORT ? Number.parseInt(process.env.SERVER_PORT) : undefined);

const parseAppFromEnv = () => {
  const appId = getAppIdFromEnv();
  const appUrl = getAppUrlFromEnv();
  const appPort = getAppPortFromEnv();
  console.log({ appId, appUrl, appPort });

  if ((appUrl && !appPort) || (!appUrl && appPort)) {
    throw new Error('APP_URL and APP_PORT must be used together');
  }

  if (appId && appUrl) {
    throw new Error('APP_ID cannot be used with APP_URL and APP_PORT');
  }

  return { appId, appUrl, appPort };
};

const getLongRunningApp = (appId: string): LongRunningApplication => {
  const objProperties = appId.split('.').filter(Boolean);
  // traverse obj using reduce
  const app = objProperties.reduce((acc, prop) => {
    return acc ? acc[prop] : undefined;
  }, longRunningApps);
  if (!app) {
    throw new Error(`Could not find long running app with id ${appId}`);
  }
  // ensure that this is a LongRunningApplication instance
  return app;
};

setup('start long running apps', async () => {
  const apps = Object.values(longRunningApps)
    .map(type => Object.values(type))
    .flat();

  const { appId, appUrl, appPort } = parseAppFromEnv();
  let app;
  if (appId) {
    const app = getLongRunningApp(appId);
    console.log(app);
  }
  throw new Error('skata');
  await startAllLongRunningApps(apps);
  console.log('Long running apps started');
});
