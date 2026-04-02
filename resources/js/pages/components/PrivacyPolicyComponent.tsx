import React from 'react';

const PrivacyPolicyComponent = () => {
  const sections = [
    {
      title: 'Information We Collect',
      content:
        'We may collect personal information such as your name, email address, phone number, billing details, shipping address, and account activity when you create an account, place an order, or contact us.',
    },
    {
      title: 'How We Use Your Information',
      content:
        'Your information is used to process orders, improve your experience, provide customer support, send important account updates, prevent fraud, and personalize the platform.',
    },
    {
      title: 'Cookies & Tracking',
      content:
        'We use cookies and similar technologies to keep you signed in, remember your preferences, analyze traffic, and improve site performance. You can disable cookies in your browser settings if you prefer.',
    },
    {
      title: 'Sharing of Information',
      content:
        'We do not sell your personal information. We may share limited information with trusted third parties such as payment providers, shipping companies, analytics services, and legal authorities when required.',
    },
    {
      title: 'Data Security',
      content:
        'We take reasonable security measures to protect your data, including encrypted connections, secure authentication, and restricted access to sensitive information.',
    },
    {
      title: 'Your Rights',
      content:
        'You may request access to, correction of, or deletion of your personal data at any time. You may also opt out of promotional emails through your account settings or unsubscribe links.',
    },
    {
      title: 'Changes to This Policy',
      content:
        'We may update this Privacy Policy from time to time. If major changes are made, we will notify users through the website or by email.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-24 lg:px-12">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">
              Legal Information
            </span>

            <h1 className="mt-6 text-5xl font-black leading-tight text-white md:text-6xl">
              Privacy
              <span className="block bg-gradient-to-r from-indigo-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Your privacy matters to us. This policy explains what information we collect,
              how we use it, and the choices you have regarding your data when using our
              platform.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-400">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                Last Updated: April 1, 2026
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                Effective Immediately
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <aside className="h-fit rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl lg:sticky lg:top-8">
            <h2 className="mb-5 text-lg font-bold text-white">Contents</h2>

            <nav className="space-y-3">
              {sections.map((section, index) => (
                <a
                  key={section.title}
                  href={`#section-${index}`}
                  className="block rounded-2xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main Policy Sections */}
          <div className="space-y-8">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-white">Introduction</h2>
              <p className="mt-4 text-base leading-8 text-slate-300">
                By using our platform, you agree to the collection and use of information in
                accordance with this Privacy Policy. We are committed to protecting your
                personal information and being transparent about how it is handled.
              </p>
            </div>

            {sections.map((section, index) => (
              <div
                key={section.title}
                id={`section-${index}`}
                className="group rounded-3xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:border-indigo-400/30 hover:bg-white/[0.07]"
              >
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-lg font-bold text-white shadow-lg shadow-indigo-500/20">
                    {index + 1}
                  </div>

                  <h3 className="text-2xl font-bold text-white group-hover:text-indigo-300">
                    {section.title}
                  </h3>
                </div>

                <p className="pl-16 text-base leading-8 text-slate-300">
                  {section.content}
                </p>
              </div>
            ))}

            {/* Contact Box */}
            <div className="rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 p-8 shadow-2xl shadow-indigo-500/10">
              <h3 className="text-2xl font-bold text-white">Questions About Your Privacy?</h3>
              <p className="mt-4 max-w-2xl text-slate-300 leading-8">
                If you have questions, concerns, or requests regarding this Privacy Policy or
                your personal data, please contact our support team and we will respond as
                quickly as possible.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-300">
                  support@yourwebsite.com
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-300">
                  Available Monday – Friday
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PrivacyPolicyComponent;