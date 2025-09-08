'use client';
import React from 'react';

export default function TermsPage() {
  return (
   <div className="min-h-screen flex flex-col items-start justify-center py-24 px-8 pt-32 mx-auto max-w-5xl bg-white rounded-xl shadow-lg">
      <h1 className="text-4xl md:text-5xl font-bold text-primary-600 mb-4 mt-8 uppercase">Terms & Conditions</h1>
      <p className="text-gray-500 mb-2">Last Updated: August 2025</p>
      <p className="mb-6 text-lg">
        Welcome to GoMange, Rwanda's premier restaurant discovery platform. By accessing or using our website and services, you agree to be bound by these Terms & Conditions.
      </p>
      <ol className="space-y-4 text-base text-gray-800 list-decimal pl-6">
        <li>
          <strong>Acceptance of Terms</strong><br />
          By using GoMange, you acknowledge that you have read, understood, and agree to be bound by these terms. If you do not agree, please do not use our services.
        </li>
        <li>
          <strong>Service Description</strong><br />
          GoMange provides a platform for discovering restaurants, viewing menus, booking tables, placing orders, reading reviews, and connecting food enthusiasts in Rwanda. We facilitate connections between diners and restaurants but are not responsible for the actual dining experience.
        </li>
        <li>
          <strong>User Responsibilities</strong>
          <ul className="list-disc pl-6">
            <li>Provide accurate information when creating accounts or submitting reviews</li>
            <li>Respect intellectual property rights of restaurants and other users</li>
            <li>Do not post false, misleading, or defamatory content</li>
            <li>Comply with all applicable laws and regulations in Rwanda</li>
          </ul>
        </li>
        <li>
          <strong>Restaurant Listings</strong>
          <ul className="list-disc pl-6">
            <li>Restaurant information is provided for informational purposes only</li>
            <li>We strive for accuracy but cannot guarantee all details are current</li>
            <li>Operating hours, menus, and prices may change without notice</li>
            <li>Contact restaurants directly to confirm current information</li>
          </ul>
        </li>
        <li>
          <strong>User-Generated Content</strong>
          <ul className="list-disc pl-6">
            <li>Users retain ownership of their reviews and photos</li>
            <li>By posting content, you grant GoMange a license to use, display, and distribute your content</li>
            <li>We reserve the right to remove content that violates our guidelines</li>
            <li>You are solely responsible for your posted content</li>
          </ul>
        </li>
        <li>
          <strong>Restaurant Partnerships</strong>
          <ul className="list-disc pl-6">
            <li>Restaurant partners must provide accurate business information</li>
            <li>Partners are responsible for maintaining current menu and pricing data</li>
            <li>GoMange reserves the right to terminate partnerships for policy violations</li>
            <li>Featured placement and advertising are subject to separate agreements</li>
          </ul>
        </li>
        <li>
          <strong>Prohibited Activities</strong>
          <ul className="list-disc pl-6">
            <li>Posting fake reviews or manipulating ratings</li>
            <li>Using the platform for illegal activities</li>
            <li>Attempting to hack, disrupt, or damage our systems</li>
            <li>Collecting user data without permission</li>
            <li>Creating multiple accounts to circumvent restrictions</li>
          </ul>
        </li>
        <li>
          <strong>Limitation of Liability</strong><br />
          GoMange is not liable for:
          <ul className="list-disc pl-6">
            <li>Food poisoning, allergic reactions, or other health issues</li>
            <li>Disputes between users and restaurants</li>
            <li>Inaccurate restaurant information</li>
            <li>Service interruptions or technical issues</li>
            <li>Business losses resulting from platform changes</li>
          </ul>
        </li>
        <li>
          <strong>Privacy</strong><br />
          Your privacy is important to us. Please review our Privacy Policy to understand how we collect and use your information.
        </li>
        <li>
          <strong>Governing Law</strong><br />
          These terms are governed by the laws of the Republic of Rwanda. Any disputes will be resolved in Rwandan courts.
        </li>
        <li>
          <strong>Changes to Terms</strong><br />
          We may update these terms periodically. Continued use of our services constitutes acceptance of any changes.
        </li>
      </ol>
      <div className="mt-8">
        <h2 className="text-xl font-bold text-primary-700 mb-2">Contact Information</h2>
        <p className="text-gray-700">
          For questions about these terms, contact us at{' '}
          <a href="mailto:support@gomange.rw" className="text-secondary-600 underline">support@gomange.rw</a>
        </p>
      </div>
    </div>
  );
}