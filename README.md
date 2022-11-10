![svackage logo](https://raw.githubusercontent.com/svackages/persistent-store/main/logo.png)

![npm version](https://img.shields.io/npm/v/@svackages/sveltkit-hook-redirect)
![license](https://img.shields.io/github/license/svackages/sveltkit-hook-redirect)
# sveltkit-hook-redirect
⚠ This might change a bit with SvelteKit 1.0 ⚠

A sveltkit hook that makes redirects easy 👍

## Features ✨
- Fully typed
- Simple string redirects (e.g. `/about` => `/about-new`)
- Absolute redirects (e.g. `/blog` => `https://blog.my-fancy.page`)
- Choose your redirect type (e.g. `MovedPermanently = 301`)
- More complex regex redirects (e.g. `/products/{id}` => `/products-new/{id}/details`)
- Mix and match both types

## How to use
### Simple string redirects
```typescript
import { RedirectHook, type StringRedirects } from "@svackages/sveltkit-hook-redirect";
import type { Handle } from "@sveltejs/kit";

const redirects: StringRedirects = {
    '/about': {
        to: '/about-new',
        code: 301,
    },
    '/temporary-redirect': {
        to: '/',
    },
}

export const handle: Handle = ({ event, resolve }) => RedirectHook({ event, resolve, redirects });
```
```javascript
import { StringRedirects } from "@svackages/sveltkit-hook-redirect";

/** @type {import(@svackages/sveltkit-hook-redirect).StringRedirects} */
const redirects = {
    '/about': {
        to: '/about-new',
        code: 301,
    },
    '/temporary-redirect': {
        to: '/',
    },
}

/** @type {import('@sveltejs/kit').Handle} */
export const handle = ({ event, resolve }) => RedirectHook({ event, resolve, redirects });
```
### With Regex Matcher
```typescript
import { RedirectHook, type StringRedirects } from "@svackages/sveltkit-hook-redirect";
import type { Handle } from "@sveltejs/kit";

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

export const handle: Handle = ({ event, resolve }) => RedirectHook({ event, resolve, matchers });
```
```javascript
import { RedirectHook } from "@svackages/sveltkit-hook-redirect";

/** @type {import(@svackages/sveltkit-hook-redirect).RegexRedirect[]} */
const matchers = [
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

/** @type {import('@sveltejs/kit').Handle} */
export const handle = ({ event, resolve }) => RedirectHook({ event, resolve, matchers });
```

