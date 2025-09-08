'use client';
import React from 'react';

export default function SupportPage() {
  return (
   <div className="min-h-screen flex flex-col items-start justify-center py-24 px-8 pt-32 mx-auto max-w-5xl bg-white rounded-xl shadow-lg">
      <h1 className="text-4xl md:text-5xl font-bold text-primary-600 mb-4 mt-8 uppercase">GoMange Community Guidelines</h1>
      <p className="text-gray-500 mb-2">Last Updated: August 2025</p>
      <p className="mb-6 text-lg">
        Welcome to the GoMange community! These guidelines help us maintain a respectful, helpful environment for everyone discovering great food in Rwanda.
      </p>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary-700 mb-2">Our Community Values</h2>
        <ul className="list-disc pl-6 text-gray-800">
          <li><strong>Helpful:</strong> Share honest experiences that help others make good dining decisions</li>
          <li><strong>Respectful:</strong> Treat restaurant owners, staff, and fellow users with courtesy</li>
          <li><strong>Authentic:</strong> Write reviews based on your genuine experiences</li>
          <li><strong>Local:</strong> Celebrate Rwanda's diverse food culture and growing restaurant scene</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary-700 mb-2">Review Guidelines</h2>
        <div className="mb-4">
          <strong>Good Reviews Include:</strong>
          <ul className="list-disc pl-6 text-gray-800">
            <li>Your actual dining experience</li>
            <li>Specific details about food, service, and atmosphere</li>
            <li>Fair assessment of value for money</li>
            <li>Helpful tips for other diners</li>
            <li>Photos of your meal (when appropriate)</li>
            <li>Mention of dietary accommodations if relevant</li>
          </ul>
        </div>
        <div className="mb-4">
          <strong>Not Allowed:</strong>
          <ul className="list-disc pl-6 text-gray-800">
            <li>Fake reviews - Only review places you've actually visited</li>
            <li>Personal attacks - Criticize the service, not individual staff members</li>
            <li>Discriminatory content - No hate speech based on gender, religion, etc.</li>
            <li>Off-topic rants - Keep reviews focused on the dining experience</li>
            <li>Spam or self-promotion - No advertising your own business</li>
            <li>Revenge reviews - Don't use reviews to settle personal disputes</li>
          </ul>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary-700 mb-2">Writing Helpful Reviews</h2>
        <div className="mb-4">
          <strong>Be Specific:</strong>
          <ul className="list-disc pl-6 text-gray-800">
            <li>Instead of "food was good" → "the brochette was perfectly grilled and flavourful"</li>
            <li>Instead of "bad service" → "waited 45 minutes for our order without updates"</li>
          </ul>
        </div>
        <div className="mb-4">
          <strong>Be Fair:</strong>
          <ul className="list-disc pl-6 text-gray-800">
            <li>Consider context (busy night, new restaurant, etc.)</li>
            <li>Mention both positives and negatives when relevant</li>
            <li>Remember that one bad experience doesn't define a restaurant</li>
          </ul>
        </div>
        <div className="mb-4">
          <strong>Be Constructive:</strong>
          <ul className="list-disc pl-6 text-gray-800">
            <li>Focus on how restaurants can improve</li>
            <li>Acknowledge when staff try to fix problems</li>
            <li>Update reviews if restaurants address your concerns</li>
          </ul>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary-700 mb-2">Photo Guidelines</h2>
        <div className="mb-4">
          <strong>Great Photos:</strong>
          <ul className="list-disc pl-6 text-gray-800">
            <li>Well-lit food and restaurant images</li>
            <li>Showcase the actual dishes you ordered</li>
            <li>Respectful interior shots that don't disrupt other diners</li>
            <li>Clean, appetizing presentation</li>
          </ul>
        </div>
        <div className="mb-4">
          <strong>Please Avoid:</strong>
          <ul className="list-disc pl-6 text-gray-800">
            <li>Blurry or poorly lit images</li>
            <li>Photos of other people without permission</li>
            <li>Images that don't relate to your dining experience</li>
            <li>Inappropriate or offensive content</li>
          </ul>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary-700 mb-2">Respectful Interactions</h2>
        <div className="mb-4">
          <strong>When Responding to Other Reviews:</strong>
          <ul className="list-disc pl-6 text-gray-800">
            <li>Be polite even when you disagree</li>
            <li>Share your own experience rather than attacking others</li>
            <li>Help fellow diners with questions about restaurants</li>
          </ul>
        </div>
        <div className="mb-4">
          <strong>When Restaurant Owners Respond:</strong>
          <ul className="list-disc pl-6 text-gray-800">
            <li>Appreciate their engagement with feedback</li>
            <li>Give them a chance to address concerns</li>
            <li>Update your review if they make improvements</li>
          </ul>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary-700 mb-2">Reporting Issues</h2>
        <div className="mb-4">
          <strong>Report reviews or comments that:</strong>
          <ul className="list-disc pl-6 text-gray-800">
            <li>Contain false information</li>
            <li>Include personal attacks or hate speech</li>
            <li>Appear to be fake or spam</li>
            <li>Violate any of these guidelines</li>
          </ul>
        </div>
        <div className="mb-4">
          <strong>How to Report:</strong>
          <ul className="list-disc pl-6 text-gray-800">
            <li>Use the "Report" button on reviews</li>
            <li>Email us at <a href="mailto:support@gomange.rw" className="text-secondary-600 underline">support@gomange.rw</a></li>
            <li>Include specific details about the violation</li>
          </ul>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary-700 mb-2">Consequences for Violations</h2>
        <ul className="list-disc pl-6 text-gray-800">
          <li>First violation: Warning and review removal</li>
          <li>Repeated violations: Temporary account suspension</li>
          <li>Serious violations: Permanent account ban</li>
        </ul>
        <p className="mt-2 text-gray-700">
          We prefer education over punishment, but maintain the right to remove content and restrict access for guideline violations.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary-700 mb-2">For Restaurant Owners</h2>
        <div className="mb-4">
          <strong>Responding to Reviews:</strong>
          <ul className="list-disc pl-6 text-gray-800">
            <li>Thank customers for positive feedback</li>
            <li>Address negative reviews professionally and constructively</li>
            <li>Offer to resolve issues privately when appropriate</li>
            <li>Don't argue with reviewers publicly</li>
            <li>Focus on improving your service based on feedback</li>
          </ul>
        </div>
        <div className="mb-4">
          <strong>Prohibited Actions:</strong>
          <ul className="list-disc pl-6 text-gray-800">
            <li>Creating fake positive reviews</li>
            <li>Asking friends/family to post fake reviews</li>
            <li>Offering incentives for positive reviews</li>
            <li>Personally attacking reviewers</li>
            <li>Creating multiple accounts</li>
          </ul>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary-700 mb-2">Special Considerations</h2>
        <div className="mb-4">
          <strong>Cultural Sensitivity:</strong>
          <ul className="list-disc pl-6 text-gray-800">
            <li>Respect Rwanda's diverse food traditions</li>
            <li>Be open to trying new cuisines and preparations</li>
            <li>Avoid comparing everything to food from other countries</li>
            <li>Appreciate local ingredients and cooking methods</li>
          </ul>
        </div>
        <div className="mb-4">
          <strong>Supporting Local Business:</strong>
          <ul className="list-disc pl-6 text-gray-800">
            <li>Remember that restaurants are often family businesses</li>
            <li>Consider the challenges of running a restaurant</li>
            <li>Celebrate success stories and improvements</li>
            <li>Help promote hidden gems you discover</li>
          </ul>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary-700 mb-2">Content Ownership</h2>
        <ul className="list-disc pl-6 text-gray-800">
          <li>You own your reviews and photos</li>
          <li>By posting, you give GoMange permission to display your content</li>
          <li>We may feature exceptional reviews in our marketing (with credit)</li>
          <li>You can delete your content anytime through your account</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary-700 mb-2">Updates to Guidelines</h2>
        <p className="text-gray-700">
          We may update these guidelines as our community grows. We'll notify users of significant changes and post updates here.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-primary-700 mb-2">Questions or Feedback</h2>
        <p className="text-gray-700">
          Have questions about these guidelines? Contact us:<br />
          <span className="font-medium">Email:</span> <a href="mailto:support@gomange.rw" className="text-secondary-600 underline">support@gomange.rw</a><br />
          Include "Community Guidelines" in your subject line
        </p>
      </section>
      <div className="mt-8 text-lg font-semibold  text-primary-700">
        Remember: Great reviews help everyone - diners find amazing meals, restaurants improve their service, and Rwanda's food scene continues to grow. 
      </div>
       <div className="mt-8 text-lg font-semibold italic text-primary-700">
       Thank you for being part of the GoMange community!
      </div>
    </div>
  );
}