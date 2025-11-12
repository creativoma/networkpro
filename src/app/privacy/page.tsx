'use client'

import { useState } from 'react'
import { Navbar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PrivacyPage() {
  const [location, setLocation] = useState('San Francisco')

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar location={location} setLocation={setLocation} />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: November 12, 2025</p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Introduction</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                NetworkPro ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your information when you use our
                platform. Please read this privacy policy carefully.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none space-y-3">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <p>We collect information that you provide directly to us, including:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Name and contact information (email address)</li>
                <li>Professional information (job title, company, industry, experience)</li>
                <li>Profile information (bio, location, skills, education)</li>
                <li>Messages and communications with other users</li>
                <li>Event registrations and attendance</li>
              </ul>

              <h3 className="text-lg font-semibold mt-4">Automatically Collected Information</h3>
              <p>When you use our Service, we automatically collect certain information, including:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Log data (IP address, browser type, pages visited)</li>
                <li>Device information (device type, operating system)</li>
                <li>Usage data (features used, time spent on platform)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Create and manage your account</li>
                <li>Facilitate connections between professionals</li>
                <li>Send you updates, newsletters, and promotional materials</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, prevent, and address technical issues and fraudulent activity</li>
                <li>Comply with legal obligations</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Information Sharing and Disclosure</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none space-y-3">
              <p>We may share your information in the following situations:</p>

              <h3 className="text-lg font-semibold">With Other Users</h3>
              <p>
                Profile information you choose to make public will be visible to other users of the platform.
                This includes your name, profession, company, bio, skills, and other profile details.
              </p>

              <h3 className="text-lg font-semibold">With Service Providers</h3>
              <p>
                We may share your information with third-party service providers who perform services on our
                behalf, such as hosting, data analysis, customer service, and marketing.
              </p>

              <h3 className="text-lg font-semibold">For Legal Reasons</h3>
              <p>
                We may disclose your information if required to do so by law or in response to valid requests
                by public authorities (e.g., a court or government agency).
              </p>

              <h3 className="text-lg font-semibold">Business Transfers</h3>
              <p>
                If we are involved in a merger, acquisition, or sale of assets, your information may be
                transferred as part of that transaction.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                We implement appropriate technical and organizational measures to protect your personal
                information against unauthorized access, alteration, disclosure, or destruction. However,
                no method of transmission over the Internet or electronic storage is 100% secure, and we
                cannot guarantee absolute security.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Your Rights and Choices</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>You have the following rights regarding your personal information:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Access:</strong> You can request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> You can update or correct your personal information</li>
                <li><strong>Deletion:</strong> You can request that we delete your personal information</li>
                <li><strong>Opt-out:</strong> You can opt out of receiving promotional communications</li>
                <li><strong>Data Portability:</strong> You can request a copy of your data in a structured format</li>
              </ul>
              <p className="mt-3">
                To exercise these rights, please contact us at privacy@networkpro.com
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Cookies and Tracking Technologies</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                We use cookies and similar tracking technologies to track activity on our Service and hold
                certain information. Cookies are files with small amounts of data that are sent to your
                browser and stored on your device. You can instruct your browser to refuse all cookies or
                to indicate when a cookie is being sent.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Data Retention</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                We retain your personal information for as long as necessary to provide you with our services
                and as described in this Privacy Policy. We will also retain and use your information to the
                extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                Our Service is not intended for individuals under the age of 18. We do not knowingly collect
                personal information from children under 18. If you are a parent or guardian and believe your
                child has provided us with personal information, please contact us.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>International Data Transfers</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                Your information may be transferred to and maintained on servers located outside of your
                country where data protection laws may differ. By using our Service, you consent to the
                transfer of your information to these locations.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Changes to This Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by
                posting the new Privacy Policy on this page and updating the "Last updated" date. You are
                advised to review this Privacy Policy periodically for any changes.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <p className="font-medium">
                Email: privacy@networkpro.com<br />
                Address: 123 Professional Way, San Francisco, CA 94102
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
