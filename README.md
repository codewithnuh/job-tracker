# Next.js template

This is a Next.js template with shadcn/ui.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Environment

Duplicate `.env.example` to `.env.local` (or whichever env file your environment loads) and update the `API_URL`/`NEXT_PUBLIC_API_URL` values so the frontend and any server actions know where to proxy requests. Using those vars keeps `next.config.mjs`, `lib/swr/fetcher.ts`, and the auth helpers pointing at the right backend without hard-coded `localhost:3001` strings.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```
