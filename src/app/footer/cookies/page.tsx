'use client';
import React from 'react';

export default function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col items-start justify-center py-24 px-8 pt-32 mx-auto max-w-5xl bg-white rounded-xl shadow-lg">
      <h1 className="text-4xl md:text-5xl font-bold text-primary-600 mb-4 mt-8 uppercase">Cookie Preferences</h1>
      <p className="text-gray-500 mb-2">Last Updated: August 2025</p>
      <p className="mb-6 text-lg">
        GoMange uses cookies and similar technologies to enhance your browsing experience. You can manage your cookie preferences below.
      </p>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary-700 mb-2">Cookie Categories</h2>
        <div className="mb-4">
          <strong>Essential Cookies (Always Active)</strong>
          <ul className="list-disc pl-6 text-gray-800">
            <li>User authentication and security</li>
            <li>Shopping cart and booking functionality</li>
            <li>Load balancing and performance</li>
            <li>Basic website functionality</li>
          </ul>
        </div>
        <div className="mb-4">
          <strong>Performance & Analytics Cookies</strong>
          <ul className="list-disc pl-6 text-gray-800">
            <li>Google Analytics for usage statistics</li>
            <li>Performance monitoring and error tracking</li>
            <li>A/B testing for feature improvements</li>
            <li>Heat mapping for user experience optimization</li>
          </ul>
        </div>
        <div className="mb-4">
          <strong>Functional Cookies</strong>
          <ul className="list-disc pl-6 text-gray-800">
            <li>Language and region settings</li>
            <li>Restaurant favorites and saved searches</li>
            <li>Display preferences (map/list view)</li>
            <li>Accessibility settings</li>
          </ul>
        </div>
        <div className="mb-4">
          <strong>Marketing & Social Media Cookies</strong>
          <ul className="list-disc pl-6 text-gray-800">
            <li>Social media integration (Facebook, Instagram)</li>
            <li>Targeted advertising on other platforms</li>
            <li>Email campaign effectiveness tracking</li>
            <li>Affiliate and referral program tracking</li>
          </ul>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary-700 mb-2">Managing Your Preferences</h2>
        <div className="mb-4">
          <strong>Browser Settings:</strong>
          <ul className="list-disc pl-6 text-gray-800">
            <li>Chrome: Settings &gt; Privacy and security &gt; Cookies</li>
            <li>Firefox: Settings &gt; Privacy & Security</li>
            <li>Safari: Preferences &gt; Privacy</li>
            <li>Edge: Settings &gt; Cookies and site permissions</li>
          </ul>
        </div>
        <div className="mb-4">
          <strong>Your Choices:</strong>
          <ul className="list-disc pl-6 text-gray-800">
            <li>Accept All: Enable all cookies for full functionality</li>
            <li>Essential Only: Use only necessary cookies (may limit features)</li>
            <li>Custom Settings: Choose specific cookie categories</li>
            <li>Reject All: Decline all non-essential cookies</li>
          </ul>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary-700 mb-2">Third-Party Services</h2>
        <div className="mb-4">
          <strong>Analytics:</strong>
          <ul className="list-disc pl-6 text-gray-800">
            <li>Google Analytics: Tracks website usage and performance</li>
            <li>Hotjar: Records user sessions for experience improvement</li>
          </ul>
        </div>
        <div className="mb-4">
          <strong>Social Media:</strong>
          <ul className="list-disc pl-6 text-gray-800">
            <li>Facebook: Social sharing and advertising</li>
            <li>Instagram: Photo integration and sharing</li>
            <li>Twitter: Content sharing features</li>
          </ul>
        </div>
        <div className="mb-4">
          <strong>Maps & Location:</strong>
          <ul className="list-disc pl-6 text-gray-800">
            <li>Google Maps: Restaurant location display</li>
            <li>Location services: Nearby restaurant recommendations</li>
          </ul>
        </div>
        <div className="mb-4">
          <strong>Mobile App Tracking (under development)</strong>
          <ul className="list-disc pl-6 text-gray-800">
            <li>Device identifiers for analytics</li>
            <li>Push notification preferences</li>
            <li>Location services (with permission)</li>
            <li>App usage and performance data</li>
          </ul>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary-700 mb-2">Cookie Lifespan</h2>
        <ul className="list-disc pl-6 text-gray-800">
          <li>Session cookies: Deleted when you close your browser</li>
          <li>Persistent cookies: Stored for up to 2 years</li>
          <li>Third-party cookies: Managed by external services with their own policies</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary-700 mb-2">Impact of Cookie Choices</h2>
        <ul className="list-disc pl-6 text-gray-800">
          <li>Require repeated logins</li>
          <li>Reset your preferences</li>
          <li>Limit personalized recommendations</li>
          <li>Affect social sharing features</li>
          <li>Reduce advertising relevance</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary-700 mb-2">Updates</h2>
        <p className="text-gray-700">
          We may update our cookie practices and will notify you of significant changes. Check this page regularly for updates.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary-700 mb-2">Contact</h2>
        <p className="text-gray-700">
          Questions about cookies? Email us at{' '}
          <a href="mailto:support@gomange.rw" className="text-secondary-600 underline">support@gomange.rw</a>
        </p>
      </section>
    </div>
  );
}