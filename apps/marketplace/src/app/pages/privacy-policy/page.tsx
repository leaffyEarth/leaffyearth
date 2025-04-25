import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | LeaffyEarth Marketplace</title>
        <meta name="description" content="Privacy policy for LeaffyEarth Marketplace - your premium destination for plants and designer pots." />
      </Head>
      
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-8xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                Privacy Policy
              </h1>
              <div className="w-24 h-1 bg-emerald-600 mx-auto"></div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8 md:p-10 space-y-8">
              <div className="prose prose-emerald max-w-none">
                <p className="text-gray-600 italic">
                  Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>

                <section className="mt-8">
                  <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-4">1. Introduction</h2>
                  <p className="text-gray-700 mb-4">
                    At LeaffyEarth Marketplace, we respect your privacy and are committed to protecting your personal data. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                  </p>
                  <p className="text-gray-700">
                    Please read this Privacy Policy carefully. By accessing or using our Platform, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy.
                  </p>
                </section>

                <section className="mt-8">
                  <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
                  <p className="text-gray-700 mb-4">
                    We collect several types of information from and about users of our Platform, including:
                  </p>
                  <h3 className="text-xl font-serif font-semibold text-gray-900 mt-6 mb-3">2.1 Personal Information</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Name and contact information (email address, phone number, shipping address)</li>
                    <li>Account credentials (username, password)</li>
                    <li>Payment information (credit card details, billing address)</li>
                    <li>Profile information (preferences, interests)</li>
                    <li>Communication preferences</li>
                  </ul>

                  <h3 className="text-xl font-serif font-semibold text-gray-900 mt-6 mb-3">2.2 Usage Information</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Log data (IP address, browser type, pages visited, time spent)</li>
                    <li>Device information (hardware model, operating system, unique device identifiers)</li>
                    <li>Location information (general location based on IP address)</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>

                  <h3 className="text-xl font-serif font-semibold text-gray-900 mt-6 mb-3">2.3 Transaction Information</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Purchase history</li>
                    <li>Product preferences</li>
                    <li>Shipping and delivery information</li>
                    <li>Returns and refunds</li>
                  </ul>
                </section>

                <section className="mt-8">
                  <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
                  <p className="text-gray-700 mb-4">
                    We use the information we collect for various purposes, including:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>To provide, maintain, and improve our Platform and services</li>
                    <li>To process your transactions and send you related information</li>
                    <li>To send you marketing and promotional communications (with your consent)</li>
                    <li>To respond to your comments, questions, and requests</li>
                    <li>To personalize your experience on our Platform</li>
                    <li>To monitor and analyze trends, usage, and activities in connection with our Platform</li>
                    <li>To detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                    <li>To comply with legal obligations</li>
                  </ul>
                </section>

                <section className="mt-8">
                  <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-4">4. Sharing Your Information</h2>
                  <p className="text-gray-700 mb-4">
                    We may share your information with:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li><strong>Service Providers:</strong> Third-party vendors, service providers, contractors, or agents who perform services on our behalf.</li>
                    <li><strong>Business Partners:</strong> Partners with whom we offer co-branded services or joint marketing activities.</li>
                    <li><strong>Analytics Providers:</strong> Companies that help us understand how our Platform is used.</li>
                    <li><strong>Legal Requirements:</strong> In response to a request for information if we believe disclosure is in accordance with applicable law, regulation, or legal process.</li>
                    <li><strong>Business Transfers:</strong> In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                  </ul>
                  <p className="text-gray-700 mt-4">
                    We do not sell, rent, or trade your personal information to third parties for their marketing purposes.
                  </p>
                </section>

                <section className="mt-8">
                  <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-4">5. Data Security</h2>
                  <p className="text-gray-700 mb-4">
                    We implement appropriate technical and organizational measures to protect the security of your personal information. 
                    However, please be aware that no method of transmission over the Internet or electronic storage is 100% secure, 
                    and we cannot guarantee absolute security.
                  </p>
                  <p className="text-gray-700">
                    We encourage you to take steps to protect your personal information, including using strong passwords, 
                    not sharing your account credentials, and being cautious about the information you provide in public areas of our Platform.
                  </p>
                </section>

                <section className="mt-8">
                  <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-4">6. Your Rights and Choices</h2>
                  <p className="text-gray-700 mb-4">
                    Depending on your location, you may have certain rights regarding your personal information, including:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li><strong>Access:</strong> The right to access the personal information we hold about you.</li>
                    <li><strong>Correction:</strong> The right to request correction of inaccurate or incomplete personal information.</li>
                    <li><strong>Deletion:</strong> The right to request deletion of your personal information in certain circumstances.</li>
                    <li><strong>Restriction:</strong> The right to request restriction of processing of your personal information in certain circumstances.</li>
                    <li><strong>Data Portability:</strong> The right to receive your personal information in a structured, commonly used, and machine-readable format.</li>
                    <li><strong>Objection:</strong> The right to object to processing of your personal information in certain circumstances.</li>
                    <li><strong>Withdraw Consent:</strong> The right to withdraw consent at any time where we rely on consent to process your personal information.</li>
                  </ul>
                  <p className="text-gray-700 mt-4">
                    To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
                  </p>
                </section>

                <section className="mt-8">
                  <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-4">7. Cookies and Tracking Technologies</h2>
                  <p className="text-gray-700 mb-4">
                    We use cookies and similar tracking technologies to track activity on our Platform and hold certain information. 
                    Cookies are files with a small amount of data which may include an anonymous unique identifier.
                  </p>
                  <p className="text-gray-700 mb-4">
                    You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, 
                    you may not be able to use some portions of our Platform.
                  </p>
                  <p className="text-gray-700">
                    We use cookies for the following purposes:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
                    <li>To keep you signed in</li>
                    <li>To understand how you use our Platform</li>
                    <li>To remember your preferences</li>
                    <li>To improve your experience</li>
                    <li>To personalize content and advertisements</li>
                  </ul>
                </section>

                <section className="mt-8">
                  <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-4">8. Children's Privacy</h2>
                  <p className="text-gray-700">
                    Our Platform is not intended for children under 16 years of age. We do not knowingly collect personal information from children under 16. 
                    If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us. 
                    If we become aware that we have collected personal information from children without verification of parental consent, 
                    we take steps to remove that information from our servers.
                  </p>
                </section>

                <section className="mt-8">
                  <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-4">9. International Data Transfers</h2>
                  <p className="text-gray-700">
                    Your information may be transferred to, and maintained on, computers located outside of your state, province, country, or other governmental jurisdiction 
                    where the data protection laws may differ from those of your jurisdiction. If you are located outside India and choose to provide information to us, 
                    please note that we transfer the information to India and process it there. Your consent to this Privacy Policy followed by your submission of such 
                    information represents your agreement to that transfer.
                  </p>
                </section>

                <section className="mt-8">
                  <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-4">10. Changes to This Privacy Policy</h2>
                  <p className="text-gray-700">
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. 
                    You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                  </p>
                </section>

                <section className="mt-8">
                  <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-4">11. Contact Us</h2>
                  <p className="text-gray-700">
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <p className="text-gray-700">
                      <strong>Email:</strong> privacy@leaffyearth.com<br />
                      <strong>Phone:</strong> +91 1234567890<br />
                      <strong>Address:</strong> 123 Garden Street, Mumbai, Maharashtra 400001, India
                    </p>
                  </div>
                </section>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link 
                href="/"
                className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 