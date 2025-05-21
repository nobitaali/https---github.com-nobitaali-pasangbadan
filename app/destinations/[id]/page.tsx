import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Users, Clock, Globe, Star } from "lucide-react";

// Mock data for destinations (in a real app, this would come from a database)
const destinations = [
  {
    id: "1",
    name: "Bali",
    country: "Indonesia",
    image: "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg",
    description: "Discover tropical paradise with stunning beaches, lush rice terraces, and vibrant cultural experiences.",
    longDescription: "Bali, the Island of the Gods, is a Indonesian paradise that blends spectacular mountain scenery and beautiful beaches with warm and friendly people, a vibrant culture and out of this world resorts. Whether you're looking to surf, temple-hop, go diving, or just relax in a spa, Bali offers something for everyone.",
    rating: 4.8,
    price: 1299,
    duration: "7 days",
    groupSize: "2-12",
    continent: "Asia",
    activities: ["Beach", "Culture", "Adventure"],
    highlights: [
      "Visit ancient temples",
      "Explore rice terraces",
      "Surf at premium spots",
      "Experience local cuisine",
    ],
    included: [
      "Hotel accommodation",
      "Daily breakfast",
      "Airport transfers",
      "Guided tours",
    ]
  },
  {
    id: "2",
    name: "Santorini",
    country: "Greece",
    image: "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg",
    description: "Experience the iconic white buildings, breathtaking sunsets, and crystal-clear waters of the Aegean Sea.",
    longDescription: "Santorini is one of the most picturesque islands in the world. Known for its white-washed, cube-shaped buildings adorned with blue accents, stunning sunsets and breathtaking views, Santorini is the perfect destination for a romantic getaway or a luxury vacation.",
    rating: 4.9,
    price: 1599,
    duration: "6 days",
    groupSize: "2-10",
    continent: "Europe",
    activities: ["Romantic", "Beach", "Sightseeing"],
    highlights: [
      "Watch famous sunsets",
      "Visit volcanic beaches",
      "Wine tasting tours",
      "Boat trips to caldera",
    ],
    included: [
      "Luxury accommodation",
      "Breakfast and dinner",
      "Wine tasting session",
      "Island tour",
    ]
  },
  {
    id: "3",
    name: "Kyoto",
    country: "Japan",
    image: "https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg",
    description: "Immerse yourself in Japanese history with ancient temples, traditional gardens, and authentic cuisine.",
    longDescription: "Kyoto, once the capital of Japan, is a city steeped in history and tradition. With over 1,600 Buddhist temples, 400 Shinto shrines, and 17 UNESCO World Heritage sites, Kyoto is one of the world's most culturally rich cities. Experience the magic of cherry blossoms, traditional tea ceremonies, and zen gardens.",
    rating: 4.7,
    price: 1899,
    duration: "8 days",
    groupSize: "2-15",
    continent: "Asia",
    activities: ["Culture", "History", "Food"],
    highlights: [
      "Visit ancient temples",
      "Tea ceremony experience",
      "Geisha district tour",
      "Japanese cooking class",
    ],
    included: [
      "Traditional ryokan stay",
      "Daily breakfast",
      "JR Pass",
      "Guided cultural tours",
    ]
  }
];

export async function generateStaticParams() {
  return destinations.map((destination) => ({
    id: destination.id,
  }));
}

export default function DestinationPage({ params }: { params: { id: string } }) {
  const destination = destinations.find(d => d.id === params.id);

  if (!destination) {
    notFound();
  }

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-xl mb-12">
          <div className="relative h-[400px] md:h-[500px]">
            <Image
              src={destination.image}
              alt={`${destination.name}, ${destination.country}`}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                  {destination.name}
                </h1>
                <div className="flex items-center text-white/90 mb-6">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="text-lg">{destination.country}</span>
                  <div className="mx-4">•</div>
                  <Star className="h-5 w-5 mr-2" />
                  <span className="text-lg">{destination.rating} Rating</span>
                </div>
                <p className="text-xl text-white/90">
                  {destination.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">About the Destination</h2>
                <p className="text-muted-foreground mb-6">
                  {destination.longDescription}
                </p>
                
                <h3 className="text-xl font-semibold mb-4">Highlights</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {destination.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-center">
                      <Star className="h-5 w-5 mr-2 text-yellow-500" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-semibold mb-4">What's Included</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {destination.included.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <Globe className="h-5 w-5 mr-2 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Activities</h2>
                <div className="flex flex-wrap gap-2">
                  {destination.activities.map((activity, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-full"
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="text-3xl font-bold mb-6">
                  ${destination.price}
                  <span className="text-lg text-muted-foreground font-normal">
                    /person
                  </span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-primary" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-primary" />
                    <span>{destination.groupSize} people</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-primary" />
                    <span>Multiple departures</span>
                  </div>
                </div>

                <Button className="w-full mb-3">Book Now</Button>
                <Button variant="outline" className="w-full">
                  Ask a Question
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}