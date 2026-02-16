# Trip Card Explorer

Small React + TypeScript app that displays trip cards loaded from a local mock JSON API.

## How To Run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Open the app at the local URL shown by Vite (typically `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Data Source

- Data is fetched from `public/data.json` using `fetch`.
- The payload shape is an array of trips with:
  - `id`
  - `name`
  - `image`
  - `short_description`
  - `long_description`
  - `rating`

## Features Implemented

- Async data fetch with loading and error states
- Responsive grid of trip cards
- Card content:
  - image (with local placeholder fallback)
  - name
  - rating
  - short description
  - `More Info` modal trigger
- Modal with full trip details
- Search by trip name
- Sort-by-rating toggle
- SASS-based layout and responsive styling

## Design Decisions

- **Type-safe data model**: `Trip` interface aligns with the required data contract.
- **Mock API behavior**: app uses `fetch('/data.json')` instead of static import to reflect API-style loading/error handling.
- **Component split**:
  - `App` manages data fetch/filter/sort state.
  - `TripList` handles responsive grid rendering.
  - `TripCard` handles summary presentation + CTA.
  - `MoreInfoModal` handles detail view.
- **Styling approach**: SASS (`src/styles/app.scss`) handles layout and responsiveness; Material UI components provide accessible primitives and consistent theming.

## Trade-offs

- Material UI + SASS together is pragmatic and fast for delivery, but introduces dual styling approaches (`sx` + classes) instead of a single styling system.
- Client-side search/sort is simple and performant for this dataset size, but would need server-side pagination/filtering for larger datasets.
- Data validation is intentionally lightweight (basic shape guard) to keep the sample app small.
