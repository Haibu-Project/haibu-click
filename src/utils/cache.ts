import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

export function setVerificationCode(email: string, code: string) {
  cache.set(email.toLowerCase().trim(), code);
}

export function getVerificationCode(email: string): string | undefined {
  return cache.get(email.toLowerCase().trim());
}

export function deleteVerificationCode(email: string) {
  cache.del(email.toLowerCase().trim());
}

export default cache;
