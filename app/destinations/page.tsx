import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Search, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Destinations | Wanderlust",
  description: "Explore our handpicked destinations around the world.",
};

// Mock data for destinations
const destinations = [
  {
    id: 1,
    name: "Bali",
    country: "Indonesia",
    image: "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "Discover tropical paradise with stunning beaches, lush rice terraces, and vibrant cultural experiences.",
    rating: 4.8,
    continent: "Asia",
    activities: ["Beach", "Culture", "Adventure"],
  },
  {
    id: 2,
    name: "Santorini",
    country: "Greece",
    image: "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "Experience the iconic white buildings, breathtaking sunsets, and crystal-clear waters of the Aegean Sea.",
    rating: 4.9,
    continent: "Europe",
    activities: ["Romantic", "Beach", "Sightseeing"],
  },
  {
    id: 3,
    name: "Kyoto",
    country: "Japan",
    image: "https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "Immerse yourself in Japanese history with ancient temples, traditional gardens, and authentic cuisine.",
    rating: 4.7,
    continent: "Asia",
    activities: ["Culture", "History", "Food"],
  },
  {
    id: 4,
    name: "Machu Picchu",
    country: "Peru",
    image: "https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "Explore the ancient Incan citadel nestled high in the Andes Mountains with breathtaking views.",
    rating: 4.9,
    continent: "South America",
    activities: ["History", "Hiking", "Adventure"],
  },
  {
    id: 5,
    name: "Paris",
    country: "France",
    image: "https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "The City of Light captivates with its iconic landmarks, world-class cuisine, and rich cultural heritage.",
    rating: 4.6,
    continent: "Europe",
    activities: ["Culture", "Food", "Romantic"],
  },
  {
    id: 6,
    name: "Cape Town",
    country: "South Africa",
    image: "https://images.pexels.com/photos/259447/pexels-photo-259447.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "Experience dramatic landscapes, diverse wildlife, and vibrant culture at the southern tip of Africa.",
    rating: 4.7,
    continent: "Africa",
    activities: ["Adventure", "Nature", "Wine"],
  },
  {
    id: 7,
    name: "New York City",
    country: "USA",
    image: "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "The city that never sleeps offers iconic landmarks, cultural diversity, and endless entertainment options.",
    rating: 4.5,
    continent: "North America",
    activities: ["Urban", "Culture", "Food"],
  },
  {
    id: 8,
    name: "Sydney",
    country: "Australia",
    image: "https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "Stunning harbor views, iconic architecture, and beautiful beaches make this city a must-visit destination.",
    rating: 4.8,
    continent: "Oceania",
    activities: ["Beach", "Urban", "Nature"],
  },
];

const continents = ["All", "Asia", "Europe", "North America", "South America", "Africa", "Oceania"];
const activities = ["All", "Beach", "Culture", "Adventure", "Food", "History", "Nature", "Urban", "Romantic", "Hiking", "Sightseeing"];

export default function DestinationsPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="relative overflow-hidden rounded-xl mb-16">
          <div className="relative h-[300px] md:h-[400px]">
            <Image
              src="https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="Destinations around the world"
              fill
              style={{ objectFit: "cover" }}
            />
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-center p-4">
            <div className="max-w-3xl">
              <Globe className="h-16 w-16 mx-auto mb-4 text-white/80" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Discover Dream Destinations</h1>
              <p className="text-lg text-white/90 mb-8">
                Explore our handpicked selection of stunning destinations around the world, each offering unique experiences and unforgettable memories.
              </p>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search destinations..."
                  className="pl-10 bg-white/90 backdrop-blur-sm border-none h-12"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <Tabs defaultValue="All" className="w-full">
            <h2 className="text-xl font-semibold mb-4">Filter by continent</h2>
            <TabsList className="mb-8 flex flex-wrap h-auto bg-transparent space-x-2">
              {continents.map((continent) => (
                <TabsTrigger
                  key={continent}
                  value={continent}
                  className="my-1 data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  {continent}
                </TabsTrigger>
              ))}
            </TabsList>

            <h2 className="text-xl font-semibold mb-4">Filter by activity</h2>
            <div className="flex flex-wrap gap-2 mb-8">
              {activities.map((activity) => (
                <Button
                  key={activity}
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                >
                  {activity}
                </Button>
              ))}
            </div>

            {/* Destinations Grid */}
            <TabsContent value="All" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {destinations.map((destination) => (
                  <Link href={`/destinations/${destination.id}`} key={destination.id}>
                    <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 group">
                      <div className="relative h-60 overflow-hidden">
                        <Image
                          src={destination.image}
                          alt={`${destination.name}, ${destination.country}`}
                          fill
                          style={{ objectFit: "cover" }}
                          className="group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm font-medium">
                          ★ {destination.rating}
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-semibold">{destination.name}</h3>
                        </div>
                        <div className="flex items-center text-muted-foreground mb-3">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{destination.country}</span>
                        </div>
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                          {destination.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {destination.activities.slice(0, 3).map((activity, index) => (
                            <span
                              key={index}
                              className="text-xs bg-muted px-2 py-1 rounded-full"
                            >
                              {activity}
                            </span>
                          ))}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        >
                          Explore
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>

            {/* Repeat for other continents - for brevity, just showing one example */}
            <TabsContent value="Asia" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {destinations
                  .filter((d) => d.continent === "Asia")
                  .map((destination) => (
                    <Link href={`/destinations/${destination.id}`} key={destination.id}>
                      <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 group">
                        <div className="relative h-60 overflow-hidden">
                          <Image
                            src={destination.image}
                            alt={`${destination.name}, ${destination.country}`}
                            fill
                            style={{ objectFit: "cover" }}
                            className="group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm font-medium">
                            ★ {destination.rating}
                          </div>
                        </div>
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-semibold">{destination.name}</h3>
                          </div>
                          <div className="flex items-center text-muted-foreground mb-3">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">{destination.country}</span>
                          </div>
                          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                            {destination.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {destination.activities.slice(0, 3).map((activity, index) => (
                              <span
                                key={index}
                                className="text-xs bg-muted px-2 py-1 rounded-full"
                              >
                                {activity}
                              </span>
                            ))}
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                          >
                            Explore
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
              </div>
            </TabsContent>

            {/* Other continents would go here */}
          </Tabs>
        </div>
      </div>
    </div>
  );
}