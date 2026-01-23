import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  marketplace: z.enum(['TOKOPEDIA', 'SHOPEE', 'BUKALAPAK', 'LAZADA']),
  competitorUrl: z.string().url('Invalid URL'),
  targetPrice: z.number().optional(),
});
