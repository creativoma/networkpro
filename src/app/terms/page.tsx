'use client'

import { useState } from 'react'
import { Navbar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TermsPage() {
  const [location, setLocation] = useState('San Francisco')

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar location={location} setLocation={setLocation} />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: November 12, 2025</p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                By accessing and using NetworkPro (&quot;the Service&quot;), you accept and agree to be bound by the
                terms and provision of this agreement. If you do not agree to these terms, please do not use
                the Service.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>2. Use License</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none space-y-3">
              <p>
                Permission is granted to temporarily use NetworkPro for personal, non-commercial purposes.
                This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software contained on the Service</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>3. User Accounts</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none space-y-3">
              <p>
                When you create an account with us, you must provide accurate, complete, and current
                information. Failure to do so constitutes a breach of the Terms, which may result in
                immediate termination of your account.
              </p>
              <p>
                You are responsible for safeguarding the password that you use to access the Service and
                for any activities or actions under your password. You agree not to disclose your password
                to any third party.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>4. Content Standards</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none space-y-3">
              <p>
                Users are responsible for all content they post on NetworkPro. Content must not:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Contain any material which is defamatory, obscene, indecent, or unlawful</li>
                <li>Infringe any copyright, trademark, or other intellectual property rights</li>
                <li>Be likely to deceive any person or be used to impersonate any person</li>
                <li>Promote discrimination based on race, sex, religion, nationality, disability, or age</li>
                <li>Contain any advertising or promote any services without our prior written consent</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>5. Professional Conduct</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                NetworkPro is a professional networking platform. Users are expected to maintain professional
                conduct when interacting with other members. Harassment, spam, or any form of abuse will not
                be tolerated and may result in account suspension or termination.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>6. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                The Service and its original content, features, and functionality are and will remain the
                exclusive property of NetworkPro and its licensors. The Service is protected by copyright,
                trademark, and other laws. Our trademarks may not be used in connection with any product or
                service without our prior written consent.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>7. Termination</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                We may terminate or suspend your account immediately, without prior notice or liability, for
                any reason whatsoever, including without limitation if you breach the Terms. Upon termination,
                your right to use the Service will immediately cease.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>8. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                In no event shall NetworkPro, nor its directors, employees, partners, agents, suppliers, or
                affiliates, be liable for any indirect, incidental, special, consequential or punitive damages,
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
                resulting from your access to or use of or inability to access or use the Service.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>9. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
                If a revision is material we will try to provide at least 30 days notice prior to any new
                terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>10. Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="font-medium">
                Email: legal@networkpro.com<br />
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
