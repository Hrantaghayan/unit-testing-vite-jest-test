import { vi } from 'vitest';

export const promises = {
  writeFile: vi.fn((path, data) => {
    return new Promise((resolve, reject) => {
      console.log(`Mock writeFile called with path: ${path} and data: ${data}`);
      resolve();
    });
  })
}