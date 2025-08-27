# Next.js Project Best Practices

This document outlines key best practices to ensure smooth development and exporting of Next.js projects, based on our experience. Please refer to these guidelines for future projects.

## 1. Favicon Implementation (The Foolproof Method)

To ensure the favicon works consistently across all browsers, local development, and after deployment, please follow this two-step process:

1.  **Place `favicon.ico` in `/public`**: The actual icon file, named exactly `favicon.ico`, should be placed directly in the `public` folder. Browsers are highly optimized to look for this specific file in this specific location.
2.  **Link it in `layout.tsx`**: In the main `src/app/layout.tsx` file, add a `<link>` tag pointing directly to this file.

This combination is the most robust method and avoids issues with browser caching and server-side rendering quirks.

**Example `layout.tsx`:**
```tsx
<head>
    <link rel="icon" href="/favicon.ico" sizes="any" />
    {/* Other head elements */}
</head>
```

## 2. Next.js Image Component Modern Usage

The `<Image>` component from `next/image` has been updated in recent versions of Next.js. To avoid legacy warnings and ensure compatibility, please use the modern syntax.

-   **Old Way (Deprecated):** `layout="fill"` and `objectFit="cover"`
-   **New Way (Correct):** Use the boolean `fill` prop and the Tailwind CSS `className="object-cover"`.

**Example:**

**Incorrect (Legacy):**
```jsx
<Image
  src="/banner.jpg"
  alt="Banner"
  layout="fill"
  objectFit="cover"
/>
```

**Correct (Modern):**
```jsx
<Image
  src="/banner.jpg"
  alt="Banner"
  fill
  className="object-cover"
/>
```

## 3. Initial Project Setup in a New Environment

When you export a project and set it up locally (e.g., in Cursor), the first command you need to run in the terminal is `npm install`. This downloads all the necessary dependencies (like Next.js itself) listed in `package.json`, which are required to run the development server.
