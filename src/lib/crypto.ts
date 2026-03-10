import { randomBytes, createCipheriv, createDecipheriv, createHash } from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;

function getSecretKey(): Buffer {
  const secret = process.env.GAME_SECRET_KEY || 'stemly-default-secret-key-change-in-production!';
  // Derive a 32-byte key from the secret using SHA-256
  return createHash('sha256').update(secret).digest();
}

export function encryptWord(word: string): string {
  const key = getSecretKey();
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  
  const encrypted = Buffer.concat([cipher.update(word, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();
  
  // Combine: iv (16) + authTag (16) + ciphertext
  const token = Buffer.concat([iv, authTag, encrypted]);
  return token.toString('base64url');
}

export function decryptWord(token: string): string {
  const key = getSecretKey();
  const data = Buffer.from(token, 'base64url');
  
  if (data.length < IV_LENGTH + AUTH_TAG_LENGTH + 1) {
    throw new Error('Invalid token: too short');
  }
  
  const iv = data.subarray(0, IV_LENGTH);
  const authTag = data.subarray(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH);
  const encrypted = data.subarray(IV_LENGTH + AUTH_TAG_LENGTH);
  
  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);
  
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted.toString('utf8');
}
