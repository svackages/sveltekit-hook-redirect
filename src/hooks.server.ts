import { RedirectHook, type RegexRedirect, type StringRedirects } from "$lib";
import type { Handle } from "@sveltejs/kit";

const redirects: StringRedirects = {
    '/about': {
        to: '/about-new',
        code: 301,
    },
    '/temporary-redirect': {
        to: '/',
    },
};

const matchers: RegexRedirect[] = [
    {
        fromMatcher: /^\/products\/(\d+)$/,
        to: '/products-new/$1',
        replace: true,
    },
    {
        fromMatcher: /^\/blog.*/,
        to: 'https://dev.to/dreitzner',
        code: 307,
    },
]

export const handle: Handle = ({ event, resolve }) => RedirectHook({ event, resolve, redirects, matchers });