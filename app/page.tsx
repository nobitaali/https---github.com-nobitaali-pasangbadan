import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Star, TrendingUp, Users, Clock, Shield } from "lucide-react";
import FeaturedDestinations from "@/components/home/featured-destinations";
import PopularPackages from "@/components/home/popular-packages";
import Testimonials from "@/components/home/testimonials";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
            alt="Beautiful travel destination with mountains and water"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Discover the World's <span className="text-primary">Adventure</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Explore breathtaking destinations, create unforgettable memories, and
              embark on journeys that will transform your perspective.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="text-md">
                <Link href="/packages">Explore Packages</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-md bg-transparent border-white hover:bg-white hover:text-black">
                <Link href="/destinations">View Destinations</Link>
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mt-12 bg-white p-4 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">Select Destination</option>
                  <option value="bali">Bali, Indonesia</option>
                  <option value="paris">Paris, France</option>
                  <option value="tokyo">Tokyo, Japan</option>
                  <option value="santorini">Santorini, Greece</option>
                </select>
              </div>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">Duration</option>
                  <option value="3-5">3-5 days</option>
                  <option value="6-10">6-10 days</option>
                  <option value="11-15">11-15 days</option>
                  <option value="15+">15+ days</option>
                </select>
              </div>
              <Button className="w-full py-3 flex items-center justify-center gap-2">
                <Search className="h-5 w-5" />
                <span>Search</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Wanderlust</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer exceptional travel experiences with attention to every detail, ensuring your journey is memorable for all the right reasons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <TrendingUp className="h-10 w-10 mb-4 text-primary" />,
                title: "Curated Experiences",
                description: "Handpicked destinations and expertly crafted itineraries for unique travel experiences."
              },
              {
                icon: <Shield className="h-10 w-10 mb-4 text-primary" />,
                title: "Safe & Secure",
                description: "Your safety is our priority with trusted partners and 24/7 support throughout your journey."
              },
              {
                icon: <Users className="h-10 w-10 mb-4 text-primary" />,
                title: "Expert Guides",
                description: "Knowledgeable local guides who provide authentic cultural insights and hidden gems."
              },
              {
                icon: <Star className="h-10 w-10 mb-4 text-primary" />,
                title: "Best Price Guarantee",
                description: "Competitive pricing with no hidden fees and special offers for unforgettable adventures."
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <FeaturedDestinations />

      {/* Popular Packages */}
      <PopularPackages />

      {/* Newsletter Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Inspired for Your Next Trip</h2>
          <p className="max-w-2xl mx-auto mb-8 text-primary-foreground/90">
            Subscribe to our newsletter and receive exclusive offers, travel tips, and destination insights.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button size="lg" variant="secondary">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
}