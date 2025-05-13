import "@testing-library/jest-dom";
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

Object.defineProperty(globalThis, "import.meta", {
  value: {
    env: {
      VITE_APP_CLIENT_ID: "mock-client-id",
      VITE_APP_TENANT_ID: "mock-tenant-id",
      VITE_APP_BASE_URL_AUDIT: "http://localhost",
      VITE_APP_TIMEOUT: "5000",
      VITE_APP_SUBSCRIPTION_KEY: "mock-subscription-key",
    },
  },
});

// Mock de `localStorage`
const localStorageMock: Storage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  key: jest.fn(),
  length: 0,
};

Object.defineProperty(globalThis, "localStorage", {
  value: localStorageMock,
});
