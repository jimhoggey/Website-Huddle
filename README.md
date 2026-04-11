# Huddle

**The youth management app built for Friday night youth groups.**

Huddle helps youth leaders manage run sheets, rosters, communication, and safety — so leaders lead with clarity and youth feel like they belong.

[![Netlify Status](https://api.netlify.com/api/v1/badges/80d34db4-5e83-4606-b8ce-900ac0ec1712/deploy-status)](https://app.netlify.com/sites/youthhuddle/deploys)

## About

Huddle is an all-in-one youth management platform designed for Friday night youth groups. It provides tools for:

- **Run sheets** — Plan and organize your youth group sessions
- **Rosters** — Manage leader and volunteer schedules
- **Attendance** — Track who's coming each week
- **Communication** — Keep leaders and families in the loop
- **Safety** — Built-in tools to support duty of care

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [TanStack Start](https://tanstack.com/start) |
| Frontend | React 19, TanStack Router |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| Language | TypeScript (strict mode) |
| Deployment | [Netlify](https://www.netlify.com/) |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v22+
- [pnpm](https://pnpm.io/) (or npm)

### Installation

```bash
# Clone the repository
git clone https://github.com/jimhoggey/youthhuddle.git
cd youthhuddle

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

The app will be available at `http://localhost:8888`.

### Environment Variables

Create a `.env` file in the project root with any required environment variables. See `.env.example` if available.

## Development

```bash
# Start local dev server
pnpm dev

# Production build
pnpm build
```

## Deployment

The app is deployed to Netlify automatically on push to the `main` branch. The Netlify configuration is defined in `netlify.toml`.

## Project Structure

```
src/
├── components/     # Reusable UI components
├── routes/         # File-based routing (TanStack Router)
├── styles.css      # Global styles and Tailwind config
public/             # Static assets
netlify.toml        # Netlify deployment configuration
```

## License

All rights reserved.
