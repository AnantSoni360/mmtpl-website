import arcjet, { tokenBucket } from '@arcjet/next';

// This arcjet instance will rate limit 10 requests per IP per minute
export const aj = arcjet({
  key: process.env.ARCJET_KEY || 'ajkey_dummy', // fallback for dev
  rules: [
    tokenBucket({
      mode: 'LIVE',
      refillRate: 10, // 10 tokens per refill
      interval: 60, // 60 seconds
      capacity: 10, // Max 10 tokens in bucket
    }),
  ],
});
