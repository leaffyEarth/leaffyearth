import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>Terms and Conditions | LeaffyEarth Marketplace</title>
        <meta name="description" content="Terms and conditions for using LeaffyEarth Marketplace - your premium destination for plants and designer pots." />
      </Head>
      
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-8xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                Terms and Conditions
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
                    Welcome to LeaffyEarth Marketplace. These Terms and Conditions govern your use of our website and services. 
                    By accessing or using our platform, you agree to be bound by these terms.
                  </p>
                  <p className="text-gray-700">
                    LeaffyEarth Marketplace ("we," "our," or "us") provides a platform for purchasing premium plants and designer pots. 
                    Please read these terms carefully before using our services.
                  </p>
                </section>

                <section className="mt-8">
                  <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-4">2. Definitions</h2>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li><strong>"Platform"</strong> refers to the LeaffyEarth Marketplace website and mobile applications.</li>
                    <li><strong>"User"</strong> refers to any individual or entity that accesses or uses our Platform.</li>
                    <li><strong>"Content"</strong> refers to all information, text, graphics, photos, and other materials available on our Platform.</li>
                    <li><strong>"Products"</strong> refers to plants, pots, and other items available for purchase on our Platform.</li>
                  </ul>
                </section>

                <section className="mt-8">
                  <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-4">3. Account Registration</h2>
                  <p className="text-gray-700 mb-4">
                    To access certain features of our Platform, you may be required to create an account. You agree to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Provide accurate, current, and complete information during registration.</li>
                    <li>Maintain and update your account information to keep it accurate, current, and complete.</li>
                    <li>Maintain the security of your account credentials and notify us immediately of any unauthorized access.</li>
                    <li>Be responsible for all activities that occur under your account.</li>
                  </ul>
                </section>

                <section className="mt-8">
                  <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-4">4. Product Information</h2>
                  <p className="text-gray-700 mb-4">
                    We strive to provide accurate descriptions and images of our Products. However, we do not warrant that:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Product descriptions or other content is accurate, complete, reliable, current, or error-free.</li>
                    <li>The colors you see on your screen will match the actual colors of the Products.</li>
                    <li>All Products will be available at all times.</li>
                  </ul>
                  <p className="text-gray-700 mt-4">
                    We reserve the right to discontinue any Product at any time and to limit quantities of any Products.
                  </p>
                </section>

                <section className="mt-8">
                  <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-4">5. Pricing and Payment</h2>
                  <p className="text-gray-700 mb-4">
                    All prices are displayed in Indian Rupees (₹) and are subject to change without notice. We reserve the right to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Modify or discontinue any Product without notice.</li>
                    <li>Refuse service to anyone for any reason at any time.</li>
                    <li>Limit the quantities of any Products that we offer.</li>
                  </ul>
                  <p className="text-gray-700 mt-4">
                    Payment must be made in full at the time of purchase. We accept various payment methods as indicated on our Platform.
                  </p>
                </section>

                <section className="mt-8">
                  <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-4">6. Shipping and Delivery</h2>
                  <p className="text-gray-700 mb-4">
                    We strive to deliver Products in a timely manner. However, we are not responsible for delivery delays beyond our control.
                  </p>
                  <p className="text-gray-700">
                    Risk of loss and title for Products purchased pass to you upon delivery of the Products to the carrier.
                  </p>
                </section>

                <section className="mt-8">
                  <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-4">7. Returns and Refunds</h2>
                  <p className="text-gray-700 mb-4">
                    We want you to be satisfied with your purchase. If you are not completely satisfied, you may return the Product within 7 days of delivery.
                  </p>
                  <p className="text-gray-700">
                    Refunds will be issued to the original payment method used for the purchase. Shipping costs are non-refundable.
                  </p>
                </section>

                <section className="mt-8">
                  <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-4">8. Intellectual Property</h2>
                  <p className="text-gray-700 mb-4">
                    All content on our Platform, including text, graphics, logos, images, and software, is the property of LeaffyEarth Marketplace 
                    or its content suppliers and is protected by international copyright, trademark, and other intellectual property laws.
                  </p>
                  <p className="text-gray-700">
                    You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, 
                    store, or transmit any of the material on our Platform without our prior written consent.
                  </p>
                </section>

                <section className="mt-8">
                  <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
                  <p className="text-gray-700">
                    To the maximum extent permitted by law, LeaffyEarth Marketplace shall not be liable for any indirect, incidental, special, 
                    consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss 
                    of data, use, goodwill, or other intangible losses resulting from your access to or use of or inability to access or use the Platform.
                  </p>
                </section>

                <section className="mt-8">
                  <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-4">10. Changes to Terms</h2>
                  <p className="text-gray-700">
                    We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms 
                    on this page and updating the "Last updated" date. Your continued use of the Platform after any such changes constitutes your 
                    acceptance of the new Terms.
                  </p>
                </section>

                <section className="mt-8">
                  <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-4">11. Contact Us</h2>
                  <p className="text-gray-700">
                    If you have any questions about these Terms, please contact us at:
                  </p>
                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <p className="text-gray-700">
                      <strong>Email:</strong> support@leaffyearth.com<br />
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