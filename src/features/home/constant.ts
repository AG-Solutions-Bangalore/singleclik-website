export const ASSETS = {
  baseUrl: 'https://singleclik.com/api/public/assets/images/web_images/',
  logo: 'https://singleclik.com/api/public/assets/images/web_images/logo.webp',
  mobile: '/hero-phones.png',
  app: 'https://singleclik.com/api/public/assets/images/web_images/app.webp',
  about: 'https://singleclik.com/api/public/assets/images/web_images/about.webp',
  privacy: 'https://singleclik.com/api/public/assets/images/web_images/privacy.webp',
} as const

export const STATS = [
  {
    value: '100+',
    label: 'Categories',
    iconType: 'categories',
    color: 'text-brand bg-brand-softer dark:bg-brand-soft/90',
  },
  {
    value: '100+',
    label: 'Verified Businesses',
    iconType: 'business',
    color: 'text-accent-blue bg-accent-blue-soft dark:bg-accent-blue-soft/90',
  },
  {
    value: '98%',
    label: 'Satisfaction Rate',
    iconType: 'satisfaction',
    color: 'text-accent-orange bg-accent-orange-soft dark:bg-accent-orange-soft/90',
  },
  {
    value: '100%',
    label: 'Secure and Safe',
    iconType: 'shield',
    color: 'text-accent-amber bg-accent-amber-soft dark:bg-accent-amber-soft/90',
  },
] as const

export const ABOUT_PILLARS = [
  {
    title: 'Secure & Private',
    description: 'No numbers shared.',
    icon: 'lock',
    color: 'text-[#4F46E5] bg-[#EEF2FF] dark:bg-indigo-950/60 dark:text-indigo-400',
  },
  {
    title: 'Verified Network',
    description: 'Trusted businesses only.',
    icon: 'shield-check',
    color: 'text-[#10B981] bg-[#ECFDF5] dark:bg-emerald-950/60 dark:text-emerald-400',
  },
  {
    title: 'Built for Everyone',
    description: 'Simple. Fast. Reliable.',
    icon: 'users',
    color: 'text-[#F97316] bg-[#FFF7ED] dark:bg-orange-950/60 dark:text-orange-400',
  },
] as const

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Post an Enquiry',
    description: 'Tell us what service you need.',
    color: 'border-accent-blue text-accent-blue bg-accent-blue-soft',
    badgeBg: 'bg-accent-blue text-white',
    icon: 'file-text',
  },
  {
    step: '02',
    title: 'Businesses Respond',
    description: 'Relevant businesses will receive your enquiry.',
    color: 'border-accent-purple text-accent-purple bg-accent-purple-soft',
    badgeBg: 'bg-accent-purple text-white',
    icon: 'building',
  },
  {
    step: '03',
    title: 'Chat Securely',
    description: 'Discuss details in our built-in chat.',
    color: 'border-accent-green text-accent-green bg-accent-green-soft',
    badgeBg: 'bg-accent-green text-white',
    icon: 'message-circle',
  },
  {
    step: '04',
    title: 'Close the Deal',
    description: 'Finalize and close your enquiry.',
    color: 'border-accent-orange text-accent-orange bg-accent-orange-soft',
    badgeBg: 'bg-accent-orange text-white',
    icon: 'handshake',
  },
  {
    step: '05',
    title: 'No Contact Sharing',
    description: 'Your privacy is always protected.',
    color: 'border-accent-pink text-accent-pink bg-accent-pink-soft',
    badgeBg: 'bg-accent-pink text-white',
    icon: 'shield-check',
  },
] as const

export const TOP_CATEGORIES = [
  {
    id: 'app-dev',
    title: 'App Development',
    count: '1250+ Businesses',
    iconType: 'app',
    gradient: 'from-[#6366F1] to-[#4F46E5]',
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    count: '980+ Businesses',
    iconType: 'web',
    gradient: 'from-[#3B82F6] to-[#2563EB]',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    count: '1450+ Businesses',
    iconType: 'marketing',
    gradient: 'from-[#10B981] to-[#059669]',
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    count: '870+ Businesses',
    iconType: 'design',
    gradient: 'from-[#F97316] to-[#EA580C]',
  },
  {
    id: 'seo-services',
    title: 'SEO Services',
    count: '760+ Businesses',
    iconType: 'seo',
    gradient: 'from-[#14B8A6] to-[#0D9488]',
  },
  {
    id: 'content-writing',
    title: 'Content Writing',
    count: '650+ Businesses',
    iconType: 'writing',
    gradient: 'from-[#EC4899] to-[#DB2777]',
  },
  {
    id: 'more-categories',
    title: 'More Categories',
    count: 'See All',
    iconType: 'more',
    gradient: 'from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800',
  },
] as const

export const PRIVACY_POINTS = [
  'No phone number sharing',
  'Secure in-app communication',
  'Verified businesses you can trust',
  'Faster responses and better results',
  'All enquiries in one place',
] as const

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Rohit Sharma',
    role: 'Business Owner',
    rating: 5,
    quote:
      'Get my website developed exactly how I wanted. The in-app chat made everything so easy and professional.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'Priya Mehta',
    role: 'Entrepreneur',
    rating: 5,
    quote:
      'I love how I can connect without sharing my number. Got multiple responses and chose the best one.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'Arjun Dev',
    role: 'UI/UX Designer',
    rating: 5,
    quote:
      'Single Click is a game changer for freelancers like me. I get quality enquiries every day.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
  },
] as const

export const FAQS = [
  {
    id: 'faq-1',
    question: 'What is Single Click?',
    answer:
      'Single Click is a privacy-first platform connecting users directly with verified local and digital businesses. You can send enquiries and communicate without ever revealing your personal phone number.',
  },
  {
    id: 'faq-2',
    question: 'How does in-app chat work?',
    answer:
      'Once a business responds to your enquiry, you can discuss project details, share requirements, and negotiate directly within our secure in-app messaging interface.',
  },
  {
    id: 'faq-3',
    question: 'Is Single Click free to use?',
    answer:
      'Yes, browsing services, posting enquiries, and chatting with verified service providers is completely free for individual customers.',
  },
  {
    id: 'faq-4',
    question: 'Can I trust the businesses on Single Click?',
    answer:
      'Every business on Single Click undergoes a verification process to ensure credibility, security, and quality of service for our community.',
  },
  {
    id: 'faq-5',
    question: 'Can I customize my enquiry?',
    answer:
      'Yes, you can describe your exact project scope, timeline, budget range, and special preferences to receive tailored responses.',
  },
  {
    id: 'faq-6',
    question: 'Is my data secure?',
    answer:
      'We use industry-standard encryption protocols and zero personal phone sharing to guarantee that your private identity and data remain completely confidential.',
  },
] as const

export const FOOTER_SECTIONS = [
  {
    title: 'Navigation',
    links: [
      { label: 'Home', href: '#hero' },
      { label: 'About', href: '#about' },
      { label: 'Categories', href: '#categories' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Why Choose', href: '#privacy' },
      { label: 'Review', href: '#testimonials' },
    ],
  },
  {
    title: 'Support & Legal',
    links: [
      { label: 'Join as Business', href: '#cta' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Policy', href: '/privacy-policy' },
    ],
  },
] as const
