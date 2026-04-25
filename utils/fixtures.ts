import { test as base } from '@playwright/test';
import { RequestHandler } from './requests-handler';
import { APIlogger} from './logger'
import { config } from '../api-test.config';

export type TestOption = {
    api: RequestHandler
    config: typeof config
}

export const test = base.extend<TestOption>({
    api: async ({request},use) => {
        const logger = new APIlogger()
        const requestHandler = new RequestHandler(request,config.apiUrl,logger)
        await use(requestHandler)
    },
    config: async ({},use) => {
        await use (config)
    }

})