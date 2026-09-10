# Civil Master Solution

Public-facing website for Civil Master Solution (CMS), an industrial flooring specialist in Thailand. The application presents CMS services, products, project references, news, and articles while integrating with the CMS backend for managed content and customer enquiries.

## Product branches

| Branch | Application |
|---|---|
| [`main`](https://github.com/Khant26/civil-master-solution/tree/main) | Public company website |
| [`api`](https://github.com/Khant26/civil-master-solution/tree/api) | Django CMS API contribution |

The original frontend repository and backend fork remain available. The combined repository provides one product-level entry point while retaining contribution attribution.

## Live site

https://www.civilmastersolution.com/

## Features

- Responsive company and service pages
- Product catalogue and product enquiry workflow
- News, articles, and rich-content rendering
- Project-reference showcase
- English and Thai language support
- API-backed content with TanStack Query
- Embedded contact information, map, and chatbot interface

## Tech stack

- React 19 and Vite 7
- React Router
- TanStack Query and Axios
- Tailwind CSS
- TipTap HTML rendering
- Swiper

## Local setup

Requirements: Node.js 20 or newer and npm.

```bash
git clone https://github.com/Khant26/civil-master-solution.git
cd civil-master-solution
npm ci
cp .env.example .env
npm run dev
```

Set `VITE_API_URL` to the CMS API base URL. Do not commit `.env` files or credentials.

## Available commands

```bash
npm run dev      # Start the development server
npm run lint     # Run ESLint
npm run build    # Create a production build
npm run preview  # Preview the production build
```

## Quality checks

Pull requests and pushes to the default branch run dependency installation, linting, and a production build through GitHub Actions.

## Deployment

The generated static site is written to `dist/`. Configure the production host with the correct `VITE_API_URL` at build time and ensure client-side routes fall back to `index.html`.

## Current limitations

- No automated component or end-to-end tests are included yet.
- Production behavior depends on a compatible CMS backend and its CORS configuration.
- The build currently reports non-blocking dependency CSS/browser-data maintenance warnings.

## License

No open-source license is currently declared. All rights are reserved unless a license is added by the repository owner.
