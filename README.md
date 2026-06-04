# K Nevada Camp Website

Modern camp promotion website foundation built with React, TypeScript, and Vite.

The current draft is a mobile-first camp promotion site for the 2027 Nevada AI STEM Global Winter Camp. Final branding, photos, phone number, Kakao channel, and detailed application flow can be replaced later without changing the core project architecture.

## Tech Stack

- React
- TypeScript
- Vite
- Responsive CSS
- Static deployment for Netlify

## Getting Started

Install dependencies:

```bash
npm install
```

Run the local development server:

```bash
npm run dev
```

For phone preview, connect the phone to the same Wi-Fi or hotspot as this PC and open the Network URL shown by Vite. In the current environment, the LAN preview URL is:

```text
http://192.168.123.101:5174
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Folder Architecture

```text
src/
  assets/         Temporary hero images and future campaign visuals
  components/
    forms/        Application and contact form components
    layout/       App shell, header, footer
    sections/     Page sections and landing modules
    ui/           Reusable shared UI components
  config/         Site-level settings and navigation
  data/           Structured camp content
  pages/          Page-level composition
  styles/         Global styles and design tokens
```

## Customization Notes

- Update `src/config/siteConfig.ts` for site name, navigation, phone link, Kakao link, and application email.
- Update `src/data/campContent.ts` for camp dates, activities, schedule, pricing, and homepage copy.
- Replace `src/assets/hero-nevada-stem.png` when final camp imagery is ready.
- Add new reusable components under `src/components/ui`.
- Add full landing sections under `src/components/sections` when final references and content are ready.

## Contact Link Setup

Current placeholders:

- Phone: `tel:+821000000000`
- Kakao: `https://open.kakao.com/o/REPLACE_WITH_KAKAO_CHAT_CODE`
- Application email: `apply@k-nevada-camp.com`

After the real phone number, Kakao channel/open chat URL, and receiving email are ready, replace those values in `src/config/siteConfig.ts`.

## Netlify Deployment

The project includes `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

Deploy steps:

1. Push this repository to GitHub.
2. Create a new Netlify site from the GitHub repository.
3. Use `npm run build` as the build command.
4. Use `dist` as the publish directory.
5. Connect the final custom domain through Gabia DNS after the Netlify site is ready.

## Future Features

- Email-based application form
- Google Form integration
- FAQ section
- Curriculum section
- Gallery
- Announcement board
- Mentor/team introduction
- Contact section
