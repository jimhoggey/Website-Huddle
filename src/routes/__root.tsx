import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'


import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Huddle — Youth Management App for Friday Night Youth Groups',
      },
      {
        name: 'description',
        content:
          'Huddle is the youth management app built for Friday night youth groups. Helps youth leaders manage run sheets, rosters, communication, and safety — so leaders lead with clarity and youth feel like they belong.',
      },
      {
        name: 'keywords',
        content:
          'Huddle, youth management app, youth group app, youth ministry software, youth leader app, Friday night youth group, youth group management, church youth group app, youth ministry tools, youth roster management',
      },
      {
        property: 'og:title',
        content: 'Huddle — Youth Management App for Friday Night Youth Groups',
      },
      {
        property: 'og:description',
        content:
          'The youth management app that helps leaders lead with clarity and youth feel like they belong. Manage run sheets, rosters, communication, and safety for your Friday night youth group.',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:site_name',
        content: 'Huddle',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: 'Huddle — Youth Management App for Friday Night Youth Groups',
      },
      {
        name: 'twitter:description',
        content:
          'The youth management app that helps leaders lead with clarity and youth feel like they belong.',
      },
    ],
    links: [
      // SVG first: browsers that support it scale cleanly on any display.
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      // .ico fallback carries 16/32/48px bitmaps for older browsers.
      { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    ],
  }),
  shellComponent: RootDocument,
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Huddle',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'Huddle is the youth management app built for Friday night youth groups. Helps youth leaders manage run sheets, rosters, communication, and safety.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'AUD',
    availability: 'https://schema.org/PreOrder',
  },
  keywords:
    'youth management app, youth group app, youth ministry software, Huddle, Friday night youth group',
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
