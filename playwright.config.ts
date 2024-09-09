import path from 'node:path'

import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'


dotenv.config({ path: path.resolve(__dirname, '.env') })

const environment = process.env.NEXT_PUBLIC_NODE_ENV || 'development'

export default defineConfig({
  forbidOnly: environment !== 'development',
  fullyParallel: true,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  reporter: 'html',
  retries: environment !== 'development' ? 2 : 0,
  testDir: './src/',
  testMatch: '**/*.e2e.ts',
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },
  workers: environment !== 'development' ? 1 : undefined,
})
