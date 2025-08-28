import fileToBase64 from '@/forms/img';
import '@testing-library/jest-dom';
import { describe, expect } from 'vitest';

function makeFile(data: string | Uint8Array, name: string, type: string): File {
  const bytes =
    typeof data === 'string' ? new TextEncoder().encode(data) : data;
  return new File([bytes as BlobPart], name, { type });
}

describe('fileToBase64', () => {
  test('rejects when type is not PNG/JPEG', async () => {
    const file = makeFile('gif', 'test.gif', 'image/gif');
    await expect(fileToBase64(file)).rejects.toThrow('Only PNG/JPEG');
  });

  test('rejects when size exceeds default 2MB', async () => {
    const huge = new Uint8Array(3 * 1024 * 1024);
    const file = makeFile(huge, 'huge.png', 'image/png');
    await expect(fileToBase64(file)).rejects.toThrow('File > 2 MB');
  });

  test('respects custom maxMB limit', async () => {
    const tooBig = new Uint8Array(1 * 1024 * 1024 + 1);
    const file = makeFile(tooBig, 'big.jpg', 'image/jpeg');

    await expect(fileToBase64(file, 1)).rejects.toThrow('File > 1 MB');
  });
});
