import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  Globe,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  ArrowRight,
  RefreshCw,
} from 'lucide-react'
import { StoreBadge } from '@/components/ui/store-badge'

interface CategoryItem {
  id: number
  category: string
  category_image?: string
}

interface SubcategoryItem {
  id: number
  subcategory: string
  category_id: number
}

export const BusinessRegisterForm = () => {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    company_name: '',
    mobile: '',
    whatsapp: '',
    email: '',
    category: '',
    subcategory: '',
    area: '',
    website: '',
    about_us: '',
  })

  const [sameAsMobile, setSameAsMobile] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(true)

  // API State
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [subcategories, setSubcategories] = useState<SubcategoryItem[]>([])
  const [loadingCategories, setLoadingCategories] = useState(false)
  const [loadingSubcategories, setLoadingSubcategories] = useState(false)

  // Submission State
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Fetch Categories on Mount
  useEffect(() => {
    let isMounted = true
    const fetchCategories = async () => {
      setLoadingCategories(true)
      try {
        const res = await fetch('https://singleclik.com/api/public/api/fetch-categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({}),
        })
        const data = await res.json()
        if (isMounted && data?.data && Array.isArray(data.data)) {
          setCategories(data.data)
        }
      } catch (err) {
        console.error('Failed to load categories', err)
      } finally {
        if (isMounted) setLoadingCategories(false)
      }
    }

    fetchCategories()
    return () => {
      isMounted = false
    }
  }, [])

  // Fetch Subcategories when Category changes
  useEffect(() => {
    if (!formData.category) {
      setSubcategories([])
      return
    }

    let isMounted = true
    const fetchSubcategories = async () => {
      setLoadingSubcategories(true)
      try {
        const res = await fetch('https://singleclik.com/api/public/api/fetch-subcategories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ category_id: Number(formData.category) }),
        })
        const data = await res.json()
        if (isMounted && data?.data && Array.isArray(data.data)) {
          setSubcategories(data.data)
        }
      } catch (err) {
        console.error('Failed to load subcategories', err)
      } finally {
        if (isMounted) setLoadingSubcategories(false)
      }
    }

    fetchSubcategories()
    return () => {
      isMounted = false
    }
  }, [formData.category])

  // Handle Input Changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => {
      const updated = { ...prev, [name]: value }
      if (name === 'mobile' && sameAsMobile) {
        updated.whatsapp = value
      }
      if (name === 'category') {
        updated.subcategory = '' // Reset subcategory when category changes
      }
      return updated
    })
    if (submitError) setSubmitError(null)
  }

  // Handle Same as Mobile Toggle
  const handleSameAsMobileToggle = (checked: boolean) => {
    setSameAsMobile(checked)
    if (checked) {
      setFormData((prev) => ({ ...prev, whatsapp: prev.mobile }))
    }
  }

  // Form Validation & Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    // Basic Validation
    if (!formData.name.trim()) {
      setSubmitError('Please enter your contact person name.')
      return
    }
    if (!formData.company_name.trim()) {
      setSubmitError('Please enter your business or company name.')
      return
    }
    if (!/^\d{10}$/.test(formData.mobile.replace(/\D/g, ''))) {
      setSubmitError('Please enter a valid 10-digit mobile number.')
      return
    }
    if (formData.whatsapp && !/^\d{10}$/.test(formData.whatsapp.replace(/\D/g, ''))) {
      setSubmitError('Please enter a valid 10-digit WhatsApp number.')
      return
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setSubmitError('Please enter a valid email address.')
      return
    }
    if (!formData.area.trim()) {
      setSubmitError('Please enter your business location / area.')
      return
    }
    if (!formData.category) {
      setSubmitError('Please select a business category.')
      return
    }
    if (!agreeTerms) {
      setSubmitError('Please accept the Terms & Conditions to proceed.')
      return
    }

    setSubmitting(true)

    try {
      const payload: Record<string, any> = {
        name: formData.name.trim(),
        company_name: formData.company_name.trim(),
        mobile: formData.mobile.replace(/\D/g, ''),
        whatsapp: (formData.whatsapp || formData.mobile).replace(/\D/g, ''),
        email: formData.email.trim(),
        profile_type: 'Business',
        category: Number(formData.category),
        area: formData.area.trim(),
        about_us: formData.about_us.trim(),
      }

      if (formData.subcategory) {
        payload.subcategory = Number(formData.subcategory)
        payload.sub_category = Number(formData.subcategory)
      }
      if (formData.website.trim()) {
        payload.website = formData.website.trim()
      }

      const res = await fetch('https://singleclik.com/api/public/api/sign-up-business', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (data && (data.code === 200 || data.code === 201)) {
        setSubmitSuccess(true)
      } else {
        setSubmitError(
          data?.msg ||
          data?.message ||
          'Registration failed. Please verify your details or try again.'
        )
      }
    } catch (err: any) {
      console.error('Registration error:', err)
      setSubmitError('Network error connecting to the registration server. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      company_name: '',
      mobile: '',
      whatsapp: '',
      email: '',
      category: '',
      subcategory: '',
      area: '',
      website: '',
      about_us: '',
    })
    setSubmitSuccess(false)
    setSubmitError(null)
    setSameAsMobile(false)
  }

  return (
    <div className="relative w-full">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-10 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3.5 py-1 text-xs font-semibold text-brand mb-2.5">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Join Single Clik for Business</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-fg">
            Register Your Business
          </h1>
          <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Connect directly with verified local clients, receive high-intent enquiries, and grow
            your business on India&apos;s privacy-first service platform.
          </p>
        </div>

        {/* 2-Column Grid: Left Card & Right Form Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Benefits & App Download (Compact, natural height) */}
          <div className="lg:col-span-4">
            <div className="rounded-3xl border border-border bg-surface/70 p-5 sm:p-6 backdrop-blur-md shadow-sm">
              <h2 className="text-lg font-bold text-fg flex items-center gap-2">
                <Building2 className="h-5 w-5 text-brand" />
                Why Partner With Us?
              </h2>
              <p className="mt-2.5 text-xs text-slate-600 dark:text-slate-300">
                Grow your local presence with verified business credibility and direct customer
                conversations.
              </p>

              <div className="mt-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-brand">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-fg">Direct Customer Enquiries</h3>
                    <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      Get real, filtered leads directly in your inbox without middlemen.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-fg">Verified Trust Badge</h3>
                    <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      Earn customer confidence with a verified profile badge and genuine ratings.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-fg">Zero Commission Model</h3>
                    <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      Keep 100% of your earnings. No hidden transaction cuts or surprise deductions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Already registered note */}
              <div className="mt-6 pt-5 border-t border-border/60">
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  Already registered? Open the Single Clik Business App on your phone to log in and
                  manage your enquiries.
                </p>
                <div className="mt-5.5 flex flex-wrap gap-2">
                  <StoreBadge store="play" />
                  <StoreBadge store="app" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3-Column Registration Form Card */}
          <div className="lg:col-span-8">
            <div className="rounded-3xl border border-border bg-bg/95 p-5 sm:p-7 shadow-xl backdrop-blur-xl transition-all">
              {submitSuccess ? (
                /* Thanks Message View */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 px-4"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 mb-4 ring-8 ring-emerald-500/10">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-fg">
                    Thank You for Registering!
                  </h2>
                  <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    We have received your business details. Our team will review your information
                    and get in touch with you shortly.
                  </p>

                  <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="inline-flex items-center gap-2 rounded-xl bg-surface border border-border px-4 py-2.5 text-xs sm:text-sm font-semibold text-fg hover:bg-surface-2 transition-colors shadow-sm"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span>Submit Another Response</span>
                    </button>
                    <a
                      href="/"
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md hover:opacity-95 transition-all"
                    >
                      <span>Back to Home</span>
                    </a>
                  </div>
                </motion.div>
              ) : (
                /* Main Form with 3 Columns in each Row */
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div>
                    <h2 className="text-lg font-bold text-fg">Business Registration Details</h2>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Please provide your business details below.
                    </p>
                  </div>

                  {/* Error Banner */}
                  {submitError && (
                    <div
                      role="alert"
                      className="flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-600 dark:text-red-400 animate-in fade-in"
                    >
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <div className="flex-1 font-medium">{submitError}</div>
                    </div>
                  )}

                  {/* 3-Column Inputs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                    {/* Col 1: Contact Person Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-semibold text-fg mb-1"
                      >
                        Contact Person Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full rounded-xl border border-border bg-surface pl-9 pr-3 py-2 text-xs text-fg placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Col 2: Business / Company Name */}
                    <div>
                      <label
                        htmlFor="company_name"
                        className="block text-xs font-semibold text-fg mb-1"
                      >
                        Business / Company Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
                        <input
                          id="company_name"
                          name="company_name"
                          type="text"
                          required
                          value={formData.company_name}
                          onChange={handleChange}
                          placeholder="e.g. Apex Legal Services"
                          className="w-full rounded-xl border border-border bg-surface pl-9 pr-3 py-2 text-xs text-fg placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Col 3: Mobile Number */}
                    <div>
                      <label
                        htmlFor="mobile"
                        className="block text-xs font-semibold text-fg mb-1"
                      >
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
                        <input
                          id="mobile"
                          name="mobile"
                          type="tel"
                          maxLength={10}
                          required
                          value={formData.mobile}
                          onChange={handleChange}
                          placeholder="10-digit mobile"
                          className="w-full rounded-xl border border-border bg-surface pl-9 pr-3 py-2 text-xs text-fg placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Col 4: WhatsApp Number */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label
                          htmlFor="whatsapp"
                          className="block text-xs font-semibold text-fg"
                        >
                          WhatsApp Number <span className="text-red-500">*</span>
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer text-[10px] text-muted hover:text-fg">
                          <input
                            type="checkbox"
                            checked={sameAsMobile}
                            onChange={(e) => handleSameAsMobileToggle(e.target.checked)}
                            className="rounded border-border text-brand focus:ring-brand h-2.5 w-2.5"
                          />
                          <span>Same as mobile</span>
                        </label>
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
                        <input
                          id="whatsapp"
                          name="whatsapp"
                          type="tel"
                          maxLength={10}
                          required
                          disabled={sameAsMobile}
                          value={formData.whatsapp}
                          onChange={handleChange}
                          placeholder="10-digit WhatsApp"
                          className={`w-full rounded-xl border border-border bg-surface pl-9 pr-3 py-2 text-xs text-fg placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all ${sameAsMobile ? 'opacity-70 cursor-not-allowed bg-surface-2' : ''
                            }`}
                        />
                      </div>
                    </div>

                    {/* Col 5: Email Address */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold text-fg mb-1"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="business@example.com"
                          className="w-full rounded-xl border border-border bg-surface pl-9 pr-3 py-2 text-xs text-fg placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Col 6: Area / Location / City */}
                    <div>
                      <label
                        htmlFor="area"
                        className="block text-xs font-semibold text-fg mb-1"
                      >
                        Area / Location / City <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
                        <input
                          id="area"
                          name="area"
                          type="text"
                          required
                          value={formData.area}
                          onChange={handleChange}
                          placeholder="e.g. Anna Nagar, Chennai"
                          className="w-full rounded-xl border border-border bg-surface pl-9 pr-3 py-2 text-xs text-fg placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Col 7: Business Category */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label
                          htmlFor="category"
                          className="block text-xs font-semibold text-fg"
                        >
                          Category <span className="text-red-500">*</span>
                        </label>
                        {loadingCategories && (
                          <span className="text-[10px] text-brand flex items-center gap-1">
                            <Loader2 className="h-3 w-3 animate-spin" /> Loading
                          </span>
                        )}
                      </div>
                      <select
                        id="category"
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs text-fg focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all cursor-pointer"
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.category}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Col 8: Sub Category */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label
                          htmlFor="subcategory"
                          className="block text-xs font-semibold text-fg"
                        >
                          Sub Category <span className="text-[10px] text-muted font-normal">(Opt)</span>
                        </label>
                        {loadingSubcategories && (
                          <span className="text-[10px] text-brand flex items-center gap-1">
                            <Loader2 className="h-3 w-3 animate-spin" /> Loading
                          </span>
                        )}
                      </div>
                      <select
                        id="subcategory"
                        name="subcategory"
                        disabled={!formData.category || loadingSubcategories}
                        value={formData.subcategory}
                        onChange={handleChange}
                        className={`w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs text-fg focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all cursor-pointer ${!formData.category ? 'opacity-60 cursor-not-allowed bg-surface-2' : ''
                          }`}
                      >
                        <option value="">
                          {!formData.category
                            ? 'Select Category First'
                            : subcategories.length === 0 && !loadingSubcategories
                              ? 'None Available'
                              : 'Select Subcategory'}
                        </option>
                        {subcategories.map((sub) => (
                          <option key={sub.id} value={sub.id}>
                            {sub.subcategory}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Col 9: Website URL */}
                    <div>
                      <label
                        htmlFor="website"
                        className="block text-xs font-semibold text-fg mb-1"
                      >
                        Website URL <span className="text-[10px] text-muted font-normal">(Opt)</span>
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
                        <input
                          id="website"
                          name="website"
                          type="url"
                          value={formData.website}
                          onChange={handleChange}
                          placeholder="https://example.com"
                          className="w-full rounded-xl border border-border bg-surface pl-9 pr-3 py-2 text-xs text-fg placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Col 10: About Business / About Us (Spans all 3 cols) */}
                    <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                      <label
                        htmlFor="about_us"
                        className="block text-xs font-semibold text-fg mb-1"
                      >
                        About Business / About Us{' '}
                        <span className="text-[10px] text-muted font-normal">(Optional)</span>
                      </label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-2.5 h-4 w-4 text-muted pointer-events-none" />
                        <textarea
                          id="about_us"
                          name="about_us"
                          rows={2}
                          value={formData.about_us}
                          onChange={handleChange}
                          placeholder="Briefly describe your business, services offered, key highlights..."
                          className="w-full rounded-xl border border-border bg-surface pl-9 pr-3 py-2 text-xs text-fg placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all resize-y"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="pt-0.5">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="mt-0.5 rounded border-border text-brand focus:ring-brand h-3.5 w-3.5"
                      />
                      <span className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        I agree to Single Clik&apos;s{' '}
                        <a
                          href="/privacy-policy"
                          target="_blank"
                          rel="noreferrer"
                          className="text-brand hover:underline font-semibold"
                        >
                          Terms of Service
                        </a>{' '}
                        and consent to Single Clik contacting me regarding business listing.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-20% flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 py-2.5 px-5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Submitting Details...</span>
                        </>
                      ) : (
                        <>
                          <span>Register Business</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
