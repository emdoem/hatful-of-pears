# HatfulOfPears

This will be an app for calculating dance competition results at swing dance festivals.
Calculations will be based on Skating System (https://en.wikipedia.org/wiki/Skating_system). I will try to handle most of popular cases (solo competions, leaders and followers judged separately or as couples).

A static deployment to calculate dance competition finals:
https://hatful-of-pears.vercel.app/

Eventually a mobile app (or app opened in phone's browser) would gather scores from judges directly and results could go live to users visiting app as guests.

CompetitionCreator component handles state and manages partial form components to gather data for the final calculations.
ScoreTable is a reusable component that will eventually handle editing data that was already input.
ScoreInput is a form component that will eventually become user interface for the judges - the crucial part is to allow assigning each position only once (no ties from a single judge).

Using shadcn UI components with zod and react-hook-form to handle form logic.

Ideally, unit tests will serve as documentation for the business logic.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). 
This was probably an overkill, as Next.js isn't the first choice for Single Page Apps, but I hoped to expand the functionality later on.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
