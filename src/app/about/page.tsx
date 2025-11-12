'use client'

import { useState } from 'react'
import { Navbar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Briefcase, Calendar, Target, Heart, Zap } from 'lucide-react'

export default function AboutPage() {
  const [location, setLocation] = useState('San Francisco')

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar location={location} setLocation={setLocation} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                About NetworkPro
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                Connecting professionals worldwide, one connection at a time
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground">
                NetworkPro is dedicated to empowering professionals around the world by providing a platform
                to connect, collaborate, and grow their careers. We believe that meaningful professional
                relationships are the foundation of success, and we're here to make those connections easier
                than ever.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              <Card>
                <CardHeader>
                  <Users className="h-12 w-12 mb-4 text-blue-500" />
                  <CardTitle>Global Network</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Connect with professionals from diverse industries and locations across the globe.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Calendar className="h-12 w-12 mb-4 text-green-500" />
                  <CardTitle>Events & Workshops</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Discover and attend networking events, conferences, and workshops to expand your knowledge.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Briefcase className="h-12 w-12 mb-4 text-purple-500" />
                  <CardTitle>Career Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Explore job listings and career opportunities tailored to your skills and interests.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Target className="h-12 w-12 mb-4 text-red-500" />
                  <CardTitle>Targeted Connections</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Find and connect with professionals who match your industry, interests, and goals.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Heart className="h-12 w-12 mb-4 text-pink-500" />
                  <CardTitle>Save & Organize</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Keep track of interesting profiles, events, and opportunities with our favorites feature.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Zap className="h-12 w-12 mb-4 text-yellow-500" />
                  <CardTitle>Real-time Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Stay informed with instant notifications about new connections, events, and opportunities.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Story Section */}
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  NetworkPro was founded in 2024 with a simple vision: to make professional networking
                  accessible, meaningful, and effective for everyone. We recognized that in an increasingly
                  connected world, the ability to build and maintain professional relationships is more
                  important than ever.
                </p>
                <p>
                  Our platform is built on the belief that everyone has something valuable to offer and
                  something to learn from others. Whether you're a seasoned executive, an emerging professional,
                  or somewhere in between, NetworkPro provides the tools and opportunities you need to succeed.
                </p>
                <p>
                  Today, NetworkPro serves thousands of professionals across the globe, facilitating connections
                  that lead to collaborations, career opportunities, and lasting professional relationships.
                  We're proud to be part of your professional journey.
                </p>
              </div>
            </div>

            {/* Values Section */}
            <div className="max-w-3xl mx-auto mt-16">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Authenticity</h3>
                  <p className="text-muted-foreground">
                    We believe in fostering genuine connections based on real interests and mutual value.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Inclusivity</h3>
                  <p className="text-muted-foreground">
                    Everyone deserves access to professional opportunities, regardless of background or location.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Growth</h3>
                  <p className="text-muted-foreground">
                    We're committed to continuous improvement, both for our platform and for our community.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Community</h3>
                  <p className="text-muted-foreground">
                    Together, we're stronger. We foster a supportive community where everyone can thrive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold">Join Our Community</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground">
                Start building meaningful professional connections today
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
