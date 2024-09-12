import path from 'node:path'

import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'


const PLAYWRIGHT_TEST_TIMEOUT_SECONDS = 120
const PLAYWRIGHT_EXPECT_TIMEOUT_SECONDS = 10
const PLAYWRIGHT_RETRIES = 3

dotenv.config({ path: path.resolve(__dirname, '.env') })

const environment = process.env.NEXT_PUBLIC_NODE_ENV || 'development'

export default defineConfig({
  expect: {
    timeout: PLAYWRIGHT_EXPECT_TIMEOUT_SECONDS * 1000
  },
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
  retries: environment !== 'development' ? PLAYWRIGHT_RETRIES : 0,
  testDir: './src/',
  testMatch: '**/*.e2e.ts',
  timeout: PLAYWRIGHT_TEST_TIMEOUT_SECONDS * 1000,
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },
  workers: environment !== 'development' ? 1 : undefined,
})
