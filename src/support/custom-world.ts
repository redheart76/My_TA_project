import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import * as messages from '@cucumber/messages';
import { BrowserContext, Page } from 'playwright';
import { generateUserData } from './test_data';

interface Configuration {
  email: string[];
  redirects: { [key: string]: string };
  xeroEmail: string;
  xeroDisconnectTestEmail: string;
  xeroSsoEmail: string;
  jiraUser: string;
}

export interface CucumberWorldConstructorParams {
  parameters: { [key: string]: string };
}

export interface ICustomWorld extends World {
  debug: boolean;
  feature?: messages.Pickle;
  context: BrowserContext | undefined;
  page: Page | undefined;
  testName?: string;
  environmentConfig?: Configuration;
  workerId?: number;
  getPage(): Page;
  userData?: ReturnType<typeof generateUserData>;
  apiResponse?: any;
  apiResponseBody?: any;
}

export class CustomWorld extends World implements ICustomWorld {
  constructor(options: IWorldOptions) {
    super(options);
  }
  debug = false;
  page = undefined;
  context = undefined;

  getPage(): Page {
    if (!this.page) {
      throw 'Page cannot be undefined';
    }

    return this.page;
  }
}

setWorldConstructor(CustomWorld);
