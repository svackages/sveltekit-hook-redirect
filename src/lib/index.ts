import type { Handle } from '@sveltejs/kit';

type MovedPermanently = 301;
type Found = 302;
type SeeOther = 303;
type TemporaryRedirect = 307;
type PermanentRedirect = 308;
type RediretCodes = MovedPermanently | Found | SeeOther | TemporaryRedirect | PermanentRedirect;

type StringRedirect = {
	to: string,
	code?: RediretCodes,
}
export type StringRedirects = {
	[from: string]: StringRedirect;
}
export type RegexRedirect = {
	fromMatcher: RegExp,
	to: string,
	replace?: boolean,
	code?: RediretCodes,
}

interface RedirectHandle {
	(input: {
		redirects?: StringRedirects,
		matchers?: RegexRedirect[],
	} & Parameters<Handle>[0]): ReturnType<Handle>
}

const getUrl = ({ to }: StringRedirect | RegexRedirect, origin: string) => to.startsWith('http')
	? to
	: `${origin}${to}`
const getCode = ({ code }: StringRedirect | RegexRedirect) => code ?? 307;

export const RedirectHook: RedirectHandle = ({ event, resolve, redirects, matchers }) => {
	// Basic Error Handling
	if (redirects && redirects !== Object(redirects)) throw new Error("'redirects' need to be an object with key value pairs of [from]: {to, code?}")
	if (matchers && !Array.isArray(matchers)) throw new Error("'matchers' need to be an array of RegexRedirect")

	const { pathname, origin } = event.url;

	// Check in object first => faster
	const stringRedirect = redirects?.[pathname];
	if (stringRedirect) {
		return Response.redirect(
			getUrl(stringRedirect, origin),
			getCode(stringRedirect),
		);
	}

	// Check with regex pattern
	const regexRedirect = matchers?.find(({ fromMatcher }) => fromMatcher.test(pathname))
	if (regexRedirect) {
		const to = regexRedirect.replace
			? pathname.replace(regexRedirect.fromMatcher, regexRedirect.to)
			: regexRedirect.to;
		return Response.redirect(getUrl({ to }, origin), getCode(regexRedirect));
	}

	// Return if nothing was found
	return resolve(event);
};
