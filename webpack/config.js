import dotenv from 'dotenv'

import { version } from '../package.json'

dotenv.config()

export default {
  appName: process.env.APP_NAME || 'APP',
  appVersion: version,
  devServer: {
    host: process.env.DEV_HOST || 'localhost',
    port: process.env.DEV_PORT || 5000,
  },
}
