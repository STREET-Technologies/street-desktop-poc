# STREET desktop discovery PoC

A throwaway customer shopping concept, prepared for local exploration and hosted discussion previews. The question: can a desktop Street combine a useful shopping destination with the feeling of discovering a neighbourhood?

## Run

Requires Node.js 18 or newer. No dependency installation or credentials.

```sh
cd street-desktop-poc
npm start
```

Open http://localhost:4317. Use the floating bottom arrows (or left/right arrow keys outside form fields) to compare three layouts:

| Concept | URL | Question |
| --- | --- | --- |
| The best of both | http://localhost:4317/?variant=hybrid | Can a neighbourhood story lead naturally into shopping? |
| Shopping first | http://localhost:4317/?variant=shop | Is a familiar catalogue with persistent filters the more useful entry point? |
| The local explorer | http://localhost:4317/?variant=local | Does meeting the neighbourhood and its shops make the products more interesting? |

The hybrid is the starting recommendation. The other two deliberately change the hierarchy so we can compare the balance rather than just compare colours. None has been validated with customers yet.

## Deploy to Vercel

Import `STREET-Technologies/street-desktop-poc` as a new Vercel project. Use repository root (`./`) and the **Other** framework preset. The checked-in `vercel.json` sets `npm run build` and the `dist` output directory. No environment variables or runtime server are required.

The build runs unit tests first, then copies only the browser app and assets into `dist/`. The local Node server, tests, screenshots and research notes are not served. Vercel serves the static output; it does not run `npm start`.

Share the deployed root URL or link directly to `/?variant=hybrid`, `/?variant=shop` or `/?variant=local`. Each visitor has their own in-memory bag and saved items, which reset on reload. No backend connection or customer data is involved.

To check the publish output locally:

```sh
npm run build
python3 -m http.server 4318 --bind 127.0.0.1 --directory dist
```

Then open http://localhost:4318. Search-engine exclusion is configured both in HTML and response headers. Use Vercel deployment protection if discussion access should be restricted.

## Try it

- Search for `knit`, save a product, then open Saved.
- Open a product, choose a size and add it to the bag.
- Change quantity, remove an item, and preview the checkout boundary.
- Add from a different shop to see the single-shop bag prompt.
- Explore Neighbourhoods, choose an area, then open a concept shop.
- Switch layouts and reload: the layout survives in the URL; bag and saved state reset.

All shops are fictional and products, prices and availability are illustrative. Choosing an area changes editorial imagery and context, not the sample catalogue. No API, auth, analytics, storage, payment or order calls are made. Checkout explains the next step and stops. The prototype switcher is intentionally always present in this standalone PoC, including hosted previews. This is a discussion demo, not a customer storefront. Hosted pages request search-engine exclusion; that does not restrict access to people with the URL.

## What a real desktop Street would take

The existing source supports treating this as another customer client of the platform. It does not prove that every mobile flow is browser-ready. This is a code-based feasibility pass, not a live API integration test.

| Area | Existing code to reuse or follow | Web work to investigate |
| --- | --- | --- |
| Shops and catalogue | `street-client-app/lib/app/features/home/data/source/store_api_data_source.dart`: `/vendors`, `/vendors/:id/products`, product detail, outlet-scoped catalogue and facets | Web routes, loading/error states, pagination, URL-based search/filter state, accessible keyboard interactions |
| Local search | Same source: `/search`, coordinates, location-required and out-of-area responses | Address entry, delivery eligibility, guest browsing, location permission fallback; neighbourhood choice must not imply delivery coverage |
| Bag | `street-client-app/lib/app/features/cart/domain/entity/cart_entity.dart` and `presentation/bloc/cart_bloc.dart` | Preserve one outlet per bag, variant identity, revalidate stock/prices, decide guest/session persistence. Prototype uses one fictional outlet per shop. |
| Sign-in | `street-client-app/lib/app/features/auth/data/source/auth_data_source_real_impl.dart` | Browser authentication, social sign-in redirects, session/token storage and security review |
| Orders and pricing | `street-client-app/lib/app/features/orders/data/source/order_api_data_source.dart`: orders, delivery price, order pricing and order details | Trace payment implementation, build and verify browser checkout, address validation, server-authoritative totals and failure recovery |
| Browser access | `street-backend/src/main.ts`: explicit origin allowlist already includes street.london and localhost | Choose the storefront hostname, check actual browser requests and auth headers on staging. An additional hostname needs allowlist review. |
| Discoverability and app handoff | Existing marketing site has the Street visual system and neighbourhood photography | Decide relationship to street.london, shareable product/shop pages, indexable eligible content and app handoff |

Recommended next experiment, after choosing a direction: a small read-only staging slice covering address → eligible shops → outlet catalogue → product detail. This would test the largest assumptions without opening checkout. Keep the existing Shopify integration and backend as the source of truth; investigate API gaps before proposing backend changes.

A production storefront is a separate project with auth, checkout, accounts, orders/tracking, analytics/consent, accessibility, security and cross-browser QA. It cannot be estimated responsibly from this visual PoC alone. A dedicated responsive web interface is the initial recommendation for exploring desktop navigation and shareable pages; compare that against reusing Flutter web before choosing an implementation stack.

## Checks and assets

`npm test` checks filtering, size validation, integer-money basket totals, variant separation, and explicit shop switching. Browser smoke checks cover the shopping journey and layout switching. Screenshots live in `output/playwright/`.

Hanson font and London photography were copied from `street.london/public/`. The expanded hybrid hero uses the existing `img/hero-bg.png` campaign photograph (copied as `assets/high-street-style.png`) rather than the video poster, with Street lime used behind the headline emphasis and on its primary shopping action. Barlow (400, 500, 600, 700, Latin subset) is self-hosted from the same Google Fonts assets used by the marketing site. Both surfaces share Hanson/Barlow, Street lime, cream, black, and the 8px/12px control/surface shapes; the PoC keeps shopping-specific density and navigation. Decorative heading labels, image stamps and repeated product badges have been removed.

Illustrative product photos were downloaded from Unsplash:

- Knit: `photo-1434389677669-e08b4cac3105`
- Trainers: `photo-1549298916-b41d501d3772`
- Chair: `photo-1598300042247-d088f8ab3a91`
- Jewellery: `photo-1611652022419-a9419f74343d`
- Backpack: `photo-1553062407-98eeb64c6a62`
- Outerwear: `photo-1544923246-77307dd654cb`

Asset licensing, brand/product accuracy and product copy need review before any public use. These images are visual references, not a product feed.

Tracked in [TT-503](https://linear.app/street/issue/TT-503/street-desktop-poc-explore-customer-shopping-on-desktop). No layout verdict has been recorded yet; the prototype is ready for comparison. Source: [STREET-Technologies/street-desktop-poc](https://github.com/STREET-Technologies/street-desktop-poc). The PoC is independent of the existing platform repositories.
