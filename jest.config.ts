import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '@/components/(.*)$': '<rootDir>/components/$1', // to mapuje tylko katalog components
    '@/lib/(.*)$': '<rootDir>/lib/$1',
    '@/(.*)$': '<rootDir>/$1', // to mapuje wszystkie katalogi z folderu, można by dać zamiast tych 2 powyżej
  }
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)