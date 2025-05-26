import { LaunchOptions, selectors } from 'playwright';

selectors.setTestIdAttribute('data-qa');

export const browserOptions: LaunchOptions = {
  slowMo: 0,
  headless: true,
  args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
  firefoxUserPrefs: {
    'media.navigator.streams.fake': true,
    'media.navigator.permission.disabled': true,
  },
};
