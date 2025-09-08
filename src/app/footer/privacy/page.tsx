'use client';
import React from 'react';

export default function SupportPage() {
  return (
      <div className="min-h-screen flex flex-col items-start justify-center py-24 px-8 pt-32 mx-auto max-w-5xl bg-white rounded-xl shadow-lg">
      <h1 className="text-4xl md:text-5xl font-bold text-primary-600 mb-4 mt-8 uppercase">Support</h1>
      <p className="text-gray-500 mb-2">Last Updated: August 2025</p>
      <p className="mb-6 text-lg">
        Welcome to GoMange Support! We're here to help you make the most of Rwanda's premier restaurant discovery platform.
      </p>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary-700 mb-2">Quick Help</h2>
        <ul className="list-disc pl-6 text-base text-gray-800">
          <li>Can't find a restaurant? Use our search filters or browse by cuisine type and location</li>
          <li>Restaurant info incorrect? Click "Report an Issue" on the restaurant page</li>
          <li>Trouble with reviews? Check our Community Guidelines for review policies</li>
          <li>Account issues? Try password reset or contact us directly</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary-700 mb-2">Contact Options</h2>
        <div className="mb-4">
          <strong>Email Support (Primary):</strong>
          <ul className="list-disc pl-6">
            <li>General inquiries: <a href="mailto:support@gomange.rw" className="text-secondary-600-600-600 underline">support@gomange.rw</a></li>
            <li>Restaurant partnerships: <a href="mailto:partners@gomange.rw" className="text-secondary-600-600-600 underline">partners@gomange.rw</a></li>
          </ul>
        </div>
        <div className="mb-4">
          <strong>Response Times:</strong>
          <ul className="list-disc pl-6">
            <li>General inquiries: Within 24 hours</li>
            <li>Technical issues: Within 12 hours</li>
            <li>Business days: Monday-Friday, 8AM-6PM (CAT)</li>
          </ul>
        </div>
        <div className="mb-4">
          <strong>Phone Support:</strong>
          <ul className="list-disc pl-6">
            <li>Number: [ ]</li>
            <li>Hours: Monday-Friday, 9AM-5PM (CAT)</li>
            <li>Languages: English, Kinyarwanda, French</li>
          </ul>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary-700 mb-2">For Diners</h2>
        <ul className="list-disc pl-6">
          <li>Browse by cuisine type, location, or price range</li>
          <li>Use filters for dietary requirements</li>
          <li>Check opening hours before visiting</li>
          <li>Read recent reviews for current information</li>
        </ul>
        <h3 className="font-bold mt-4 mb-2 text-primary-700 ">Writing Reviews</h3>
        <ul className="list-disc pl-6">
          <li>Be honest and detailed in your reviews</li>
          <li>Include photos when possible</li>
          <li>Focus on food, service, and atmosphere</li>
          <li>Keep reviews respectful and constructive</li>
        </ul>
        <h3 className="font-bold mt-4 mb-2 text-primary-700">Account Management</h3>
        <ul className="list-disc pl-6">
          <li>Update your profile and preferences</li>
          <li>Manage your favourite restaurants</li>
          <li>Control email notifications</li>
          <li>Delete your account if needed</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary-700 mb-2">For Restaurants</h2>
        <ul className="list-disc pl-6">
          <li>Complete our restaurant onboarding form</li>
          <li>Provide accurate business information</li>
          <li>Upload high-quality photos</li>
          <li>Verify your listing within 48 hours</li>
        </ul>
        <h3 className="font-bold mt-4 mb-2 text-primary-700">Managing Your Listing</h3>
        <ul className="list-disc pl-6">
          <li>Access your dashboard to update information</li>
          <li>Respond to customer reviews professionally</li>
          <li>Keep menus and prices current</li>
          <li>Update special offers and events</li>
        </ul>
        <h3 className="font-bold mt-4 mb-2 text-primary-700">Advertising Opportunities</h3>
        <ul className="list-disc pl-6">
          <li>Featured listings on homepage</li>
          <li>Newsletter inclusion</li>
          <li>Social media promotion</li>
          <li>Event spotlight features</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary-700 mb-2">Technical Support</h2>
        <h3 className="font-bold mt-4 mb-2 text-primary-700">Website Issues</h3>
        <ul className="list-disc pl-6">
          <li>Clear your browser cache and cookies</li>
          <li>Try a different browser or device</li>
          <li>Check your internet connection</li>
          <li>Disable browser extensions temporarily</li>
        </ul>
        <h3 className="font-bold mt-4 mb-2 text-primary-700">Account Access</h3>
        <ul className="list-disc pl-6">
          <li>Use password reset if you've forgotten your login</li>
          <li>Check spam folder for verification emails</li>
          <li>Ensure you're using the correct email address</li>
          <li>Contact us if account is locked</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary-700 mb-2">Feedback & Suggestions</h2>
        <ul className="list-disc pl-6">
          <li>Feature requests and improvements</li>
          <li>Bug reports and technical issues</li>
          <li>Content suggestions and corrections</li>
          <li>Partnership and collaboration ideas</li>
        </ul>
        <p className="mt-2">Ways to Share Feedback:</p>
        <ul className="list-disc pl-6">
          <li>Email: <a href="mailto:support@gomange.rw" className="text-secondary-600-600 underline">support@gomange.rw</a></li>
          <li>Social media: @GoMangeRW</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary-700 mb-2">Community Guidelines</h2>
        <h3 className="font-bold mt-4 mb-2 text-primary-700">Review Standards</h3>
        <ul className="list-disc pl-6">
          <li>Reviews must be based on personal experience</li>
          <li>No fake or paid reviews</li>
          <li>Respectful language required</li>
          <li>No personal attacks on staff or other users</li>
        </ul>
        <h3 className="font-bold mt-4 mb-2 text-primary-700">Report Issues</h3>
        <ul className="list-disc pl-6">
          <li>Use the "Report" button on reviews</li>
          <li>Email us with specific details</li>
          <li>We investigate all reports promptly</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary-700 mb-2">Privacy & Security</h2>
        <h3 className="font-bold mt-4 mb-2 text-primary-700">Data Protection</h3>
        <ul className="list-disc pl-6">
          <li>Your personal information is secure</li>
          <li>We never sell your data to third parties</li>
          <li>You control your privacy settings</li>
          <li>Review our Privacy Policy for full details</li>
        </ul>
        <h3 className="font-bold mt-4 mb-2 text-primary-700">Report Security Issues</h3>
        <ul className="list-disc pl-6">
          <li>Email: <a href="mailto:support@gomange.rw" className="text-secondary-600-600 underline">support@gomange.rw</a></li>
          <li>Describe the issue clearly</li>
          <li>Include steps to reproduce if applicable</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary-700 mb-2">Business Partnerships</h2>
        <ul className="list-disc pl-6">
          <li>Restaurant Partners: Priority customer support</li>
          <li>Marketing and promotional support</li>
          <li>Performance analytics and insights</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary-700 mb-2">Accessibility Support</h2>
        <ul className="list-disc pl-6">
          <li>Website accessibility features (under development)</li>
          <li>Dedicated accessibility feedback channel</li>
        </ul>
        <p className="mt-2">Need Help?</p>
        <ul className="list-disc pl-6">
          <li>Email: <a href="mailto:support@gomange.rw" className="text-secondary-600-600 underline">support@gomange.rw</a></li>
          <li>Phone: [ ]</li>
          <li>Alternative format requests</li>
          <li>Accessibility feature suggestions</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary-700 mb-2">System Status</h2>
        <ul className="list-disc pl-6">
          <li>Website: Normal operation</li>
          <li>Mobile app: Under development</li>
          <li>Email notifications: Normal operation</li>
          <li>Restaurant dashboard: Normal operation</li>
        </ul>
        <h3 className="font-bold mt-4 mb-2 text-primary-700">Maintenance Windows</h3>
        <ul className="list-disc pl-6">
          <li>Emergency maintenance: As needed with advance notice</li>
          <li>Status updates: Posted on homepage and social media</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary-700 mb-2">Stay Connected</h2>
        <ul className="list-disc pl-6">
          <li>Website: gomange.rw</li>
          <li>Email newsletters: Subscribe on homepage</li>
          <li>Social media: @GoMangeRW</li>
          <li>Business updates: <a href="mailto:partners@gomange.rw" className="text-secondary-600-600-600 underline">partners@gomange.rw</a></li>
        </ul>
        <p className="mt-2">Office Location: Kigali, Rwanda</p>
        <p className="mt-2">Business Hours: Monday-Friday: 8AM-6PM (CAT) <br /> Saturday: 9AM-2PM (CAT) <br /> Sunday: Closed</p>
      </section>
      <div className="mt-8 text-center text-lg font-semibold italic text-primary-700">
        Thank you for using GoMange - Taste the Experience!
      </div>
    </div>
  );
}