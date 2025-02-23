import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!, {
  tls: { rejectUnauthorized: false }, 
});

export async function setVerificationCode(email: string, code: string, ttlSeconds: number = 300) {
  await redis.setex(email.toLowerCase().trim(), ttlSeconds, code);
}

export async function getVerificationCode(email: string) {
  return await redis.get(email.toLowerCase().trim());
}

export async function deleteVerificationCode(email: string) {
  await redis.del(email.toLowerCase().trim());
}

export default redis;
