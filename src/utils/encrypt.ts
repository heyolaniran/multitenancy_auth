import Cryptr from 'cryptr';

export function encrypt(data: string, key: string): string {
  const cryptr = new Cryptr(key);

  return cryptr.encrypt(data);
}
