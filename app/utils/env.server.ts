import { z } from 'zod'

const schema = z.object({
	NODE_ENV: z.enum(['production', 'development', 'test'] as const),
	STRIPE_WEBHOOK_ENDPOINT_SECRET: z.string(),
	STRIPE_SECRET_KEY: z.string(),
	STRIPE_PUBLIC_KEY: z.string(),
	CLOUDINARY_NAME: z.string(),
	CLOUDINARY_KEY: z.string(),
	CLOUDINARY_SECRET: z.string(),
	// DATABASE_PATH: z.string(),
	// DATABASE_URL: z.string(),
	// SESSION_SECRET: z.string(),
	// INTERNAL_COMMAND_TOKEN: z.string(),
	// HONEYPOT_SECRET: z.string(),
	// CACHE_DATABASE_PATH: z.string(),
	// If you plan on using Sentry, uncomment this line
	// SENTRY_DSN: z.string(),
	// If you plan to use Resend, uncomment this line
	// RESEND_API_KEY: z.string(),
	// If you plan to use GitHub auth, remove the default:
	// GITHUB_CLIENT_ID: z.string().default('MOCK_GITHUB_CLIENT_ID'),
	// GITHUB_CLIENT_SECRET: z.string().default('MOCK_GITHUB_CLIENT_SECRET'),
	// GITHUB_TOKEN: z.string().default('MOCK_GITHUB_TOKEN'),
})

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof schema> {}
	}
}

export function init() {
	const parsed = schema.safeParse(process.env)

	if (parsed.success === false) {
		console.error(
			'❌ Invalid environment variables:',
			parsed.error.flatten().fieldErrors,
		)

		throw new Error('Invalid environment variables')
	}
}

/**
 * This is used in both `entry.server.ts` and `root.tsx` to ensure that
 * the environment variables are set and globally available before the app is
 * started.
 *
 * NOTE: Do *not* add any environment variables in here that you do not wish to
 * be included in the client.
 * @returns all public ENV variables
 */
export function getEnv() {
	return {
		MODE: process.env.NODE_ENV,
		STRIPE_WEBHOOK_ENDPOINT_SECRET: process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET,
		STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
		STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
		CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
		CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
		CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
	}
}

type ENV = ReturnType<typeof getEnv>

declare global {
	var ENV: ENV
	interface Window {
		ENV: ENV
	}
}
