import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, ExternalLink, ArrowLeft, Lock, Info, Users, Clock, AlertCircle } from 'lucide-react'
import { Seo } from '@/components/seo'
import { privacySeo } from '../seo/privacy.seo'

export const PrivacyPolicyPage = () => {
  // Ensure we scroll to top when page opens
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Seo {...privacySeo} />

      <main className="min-h-screen bg-gradient-to-b from-[#F7F9FF] via-bg to-bg dark:from-[#0B1120] dark:via-bg dark:to-bg py-10 lg:py-16 text-fg">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Back to Home Link */}
          <div className="mb-6">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-dark transition-colors"
              title="Return to Single Clik Homepage"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </a>
          </div>

          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-xl dark:border-slate-800 dark:bg-slate-900 relative overflow-hidden"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand/10 blur-3xl" />

            <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand-softer px-3.5 py-1 text-xs font-bold text-brand-dark dark:bg-brand-soft/30 dark:text-white">
              <ShieldCheck className="h-4 w-4 text-brand" />
              <span>Legal & Compliance</span>
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-fg">
              Privacy Policy
            </h1>

            <p className="mt-3 text-sm sm:text-base text-muted max-w-3xl leading-relaxed">
              This privacy policy applies to the <strong className="text-fg font-semibold">SINGLE CLIK</strong> app (hereby referred to as "Application") for mobile devices that was created by <strong className="text-fg font-semibold">Govind Garg</strong> (hereby referred to as "Service Provider") as a Free service. This service is intended for use "AS IS".
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-muted border-t border-slate-100 dark:border-slate-800 pt-4">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-brand" />
                Effective Date: <strong>2024-10-01</strong>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-emerald-500" />
                Privacy Protected
              </span>
            </div>
          </motion.div>

          {/* Policy Sections */}
          <div className="mt-8 space-y-8">
            {/* Section 1: Information Collection and Use */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-brand dark:bg-blue-950/60">
                  <Info className="h-5 w-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-fg">
                  Information Collection and Use
                </h2>
              </div>

              <div className="mt-4 space-y-3.5 text-sm sm:text-base text-muted leading-relaxed">
                <p>
                  The Application collects information when you download and use it. This information may include details such as:
                </p>

                <ul className="list-disc pl-6 space-y-1.5 text-fg/90">
                  <li>Your device's Internet Protocol address (e.g. IP address)</li>
                  <li>The pages of the Application that you visit, the time and date of your visit, and the time spent on those pages</li>
                  <li>The time spent on the Application</li>
                  <li>The operating system you use on your mobile device</li>
                </ul>

                <p className="pt-2">
                  The Application <strong>does not</strong> gather precise information about the location of your mobile device.
                </p>

                <p>
                  The Service Provider may use the information you provided to contact you from time to time to provide you with important information, required notices, and marketing promotions.
                </p>

                <p>
                  For a better experience, while using the Application, the Service Provider may require you to provide us with certain personally identifiable information. The information that the Service Provider requests will be retained by them and used as described in this privacy policy.
                </p>
              </div>
            </motion.section>

            {/* Section 2: Third Party Access */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60">
                  <ExternalLink className="h-5 w-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-fg">
                  Third Party Access
                </h2>
              </div>

              <div className="mt-4 space-y-3.5 text-sm sm:text-base text-muted leading-relaxed">
                <p>
                  Only aggregated, anonymized data is periodically transmitted to external services to aid the Service Provider in improving the Application and their service. The Service Provider may share your information with third parties in the ways that are described in this privacy statement.
                </p>

                <p>
                  Please note that the Application utilizes third-party services that have their own Privacy Policy about handling data. Below are the links to the Privacy Policy of the third-party service providers used by the Application:
                </p>

                <div className="my-3">
                  <a
                    href="https://www.google.com/policies/privacy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-brand hover:bg-brand-softer transition-colors dark:border-slate-800 dark:bg-slate-800"
                  >
                    <span>Google Play Services Privacy Policy</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>

                <p className="pt-2 font-medium text-fg">
                  The Service Provider may disclose User Provided and Automatically Collected Information:
                </p>

                <ul className="list-disc pl-6 space-y-1.5 text-fg/90">
                  <li>as required by law, such as to comply with a subpoena, or similar legal process;</li>
                  <li>when they believe in good faith that disclosure is necessary to protect their rights, protect your safety or the safety of others, investigate fraud, or respond to a government request;</li>
                  <li>with their trusted services providers who work on their behalf, do not have an independent use of the information we disclose to them, and have agreed to adhere to the rules set forth in this privacy statement.</li>
                </ul>
              </div>
            </motion.section>

            {/* Section 3: Opt-Out Rights & Data Retention */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="grid gap-6 md:grid-cols-2"
            >
              {/* Opt-out Rights */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-fg">
                    Opt-Out Rights
                  </h3>
                  <p className="mt-3 text-sm text-muted leading-relaxed">
                    You can stop all collection of information by the Application easily by uninstalling it. You may use the standard uninstall processes as may be available as part of your mobile device or via the mobile application marketplace or network.
                  </p>
                </div>
              </div>

              {/* Data Retention Policy */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-fg">
                    Data Retention Policy
                  </h3>
                  <p className="mt-3 text-sm text-muted leading-relaxed">
                    The Service Provider will retain User Provided data for as long as you use the Application and for a reasonable time thereafter. If you'd like them to delete User Provided Data that you have provided via the Application, please contact them at <a href="mailto:singleclik.com@gmail.com" className="font-semibold text-brand underline underline-offset-2">singleclik.com@gmail.com</a> and they will respond in a reasonable time.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Section 4: Children */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60">
                  <Users className="h-5 w-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-fg">
                  Children
                </h2>
              </div>

              <div className="mt-4 space-y-3 text-sm sm:text-base text-muted leading-relaxed">
                <p>
                  The Service Provider does not use the Application to knowingly solicit data from or market to children under the age of 13.
                </p>
                <p>
                  The Application does not address anyone under the age of 13. The Service Provider does not knowingly collect personally identifiable information from children under 13 years of age. In the case the Service Provider discover that a child under 13 has provided personal information, the Service Provider will immediately delete this from their servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact the Service Provider at <a href="mailto:singleclik.com@gmail.com" className="font-semibold text-brand underline underline-offset-2">singleclik.com@gmail.com</a> so that they will be able to take the necessary actions.
                </p>
              </div>
            </motion.section>

            {/* Section 5: Security & Changes */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="grid gap-6 md:grid-cols-2"
            >
              {/* Security */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60">
                    <Lock className="h-4 w-4" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-fg">Security</h3>
                </div>
                <p className="mt-3.5 text-sm text-muted leading-relaxed">
                  The Service Provider is concerned about safeguarding the confidentiality of your information. The Service Provider provides physical, electronic, and procedural safeguards to protect information the Service Provider processes and maintains.
                </p>
              </div>

              {/* Changes */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600 dark:bg-sky-950/60">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-fg">Changes</h3>
                </div>
                <p className="mt-3.5 text-sm text-muted leading-relaxed">
                  This Privacy Policy may be updated from time to time for any reason. The Service Provider will notify you of any changes to the Privacy Policy by updating this page with the new Privacy Policy. You are advised to consult this Privacy Policy regularly for any changes, as continued use is deemed approval of all changes.
                </p>
              </div>
            </motion.section>

            {/* Section 6: Consent */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-fg">
                Your Consent
              </h2>
              <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed">
                By using the Application, you are consenting to the processing of your information as set forth in this Privacy Policy now and as amended by us.
              </p>
            </motion.section>
          </div>
        </div>
      </main>
    </>
  )
}
