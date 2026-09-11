import { env } from '@/lib/env'
import type { PageMeta } from '@/types'

export const aboutPlatformSeo: PageMeta & { jsonLd: Record<string, unknown> } = {
  title: 'About Platform',
  description:
    'Discover SingleClik — the privacy-first platform bridging people and verified businesses. No phone sharing, secure in-app chat, trusted services.',
  keywords:
    'SingleClik about, about SingleClik platform, verified businesses, privacy first marketplace',
  author: 'SingleClik',
  publisher: 'SingleClik',
  path: '/about-platform',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About SingleClik Platform',
    description:
      'SingleClik was built to make connections easy, private and effective — bridging people and verified businesses.',
    url: `${env.siteUrl}/about-platform`,
  },
}

export const howItWorksSeo: PageMeta & { jsonLd: Record<string, unknown> } = {
  title: 'How It Works',
  description:
    'Learn how SingleClik works in 5 simple steps — post an enquiry, get responses from verified businesses, chat securely and close the deal.',
  keywords:
    'how SingleClik works, post enquiry, verified businesses, secure chat, close deal',
  author: 'SingleClik',
  publisher: 'SingleClik',
  path: '/how-it-works',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How SingleClik Works',
    description:
      'Simple 5-step process to get verified services without exposing private contact details.',
    step: [
      { '@type': 'HowToStep', name: 'Post an Enquiry' },
      { '@type': 'HowToStep', name: 'Businesses Respond' },
      { '@type': 'HowToStep', name: 'Chat Securely' },
      { '@type': 'HowToStep', name: 'Close the Deal' },
      { '@type': 'HowToStep', name: 'No Contact Sharing' },
    ],
  },
}

export const categoriesSeo: PageMeta & { jsonLd: Record<string, unknown> } = {
  title: 'Categories',
  description:
    'Browse 100+ verified service categories on SingleClik — app development, web development, digital marketing, design, SEO and more.',
  keywords:
    'SingleClik categories, service categories, verified businesses, app development, web development, digital marketing',
  author: 'SingleClik',
  publisher: 'SingleClik',
  path: '/categories',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'SingleClik Service Categories',
    url: `${env.siteUrl}/categories`,
  },
}

export const privacyTrustSeo: PageMeta & { jsonLd: Record<string, unknown> } = {
  title: 'Privacy & Trust',
  description:
    'Your privacy is our priority — zero phone number sharing, secure in-app communication and verified businesses you can trust on SingleClik.',
  keywords:
    'SingleClik privacy, secure chat, no phone sharing, verified businesses, data protection',
  author: 'SingleClik',
  publisher: 'SingleClik',
  path: '/privacy-trust',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy & Trust – SingleClik',
    url: `${env.siteUrl}/privacy-trust`,
  },
}

export const faqSeo: PageMeta & { jsonLd: Record<string, unknown> } = {
  title: 'FAQs & Help Center',
  description:
    'Find answers about SingleClik — privacy, in-app chat, pricing, trust, enquiries and data security. 24/7 help center and FAQs.',
  keywords: 'SingleClik FAQ, help center, support, privacy, in-app chat, verified businesses',
  author: 'SingleClik',
  publisher: 'SingleClik',
  path: '/faq',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Single Clik?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Single Clik is a privacy-first platform connecting users directly with verified local and digital businesses without revealing personal phone numbers.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Single Clik free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, browsing services, posting enquiries, and chatting with verified service providers is completely free for individual customers.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is my data secure?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We use industry-standard encryption and zero personal phone sharing to keep your identity and data confidential.',
        },
      },
    ],
  },
}

export const testimonialsSeo: PageMeta & { jsonLd: Record<string, unknown> } = {
  title: 'Reviews & Testimonials',
  description:
    'Read authentic reviews from individuals and verified businesses using SingleClik for secure, spam-free services.',
  author: 'SingleClik',
  publisher: 'SingleClik',
  path: '/testimonials',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Reviews – SingleClik',
    url: `${env.siteUrl}/testimonials`,
  },
}

export const joinBusinessSeo: PageMeta & { jsonLd: Record<string, unknown> } = {
  title: 'Join as Business',
  description:
    'Grow with SingleClik — register your verified business, receive quality enquiries and chat securely with customers. Download the app today.',
  keywords: 'join SingleClik business, register business, get enquiries, verified business',
  author: 'SingleClik',
  publisher: 'SingleClik',
  path: '/join-as-business',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Join SingleClik as Business',
    url: `${env.siteUrl}/join-as-business`,
  },
}
