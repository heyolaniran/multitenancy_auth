import Cryptr from 'cryptr';

export function decrypt(data: string, key: string): string {
  const cryptr = new Cryptr(key);

  return cryptr.decrypt(data);
}
