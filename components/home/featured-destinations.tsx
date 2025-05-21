import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const destinations = [
  {
    id: 1,
    name: "Bali, Indonesia",
    image: "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "Discover tropical paradise with stunning beaches, lush rice terraces, and vibrant cultural experiences.",
    rating: 4.8,
    featured: true
  },
  {
    id: 2,
    name: "Santorini, Greece",
    image: "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "Experience the iconic white buildings, breathtaking sunsets, and crystal-clear waters of the Aegean Sea.",
    rating: 4.9,
    featured: true
  },
  {
    id: 3,
    name: "Kyoto, Japan",
    image: "https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "Immerse yourself in Japanese history with ancient temples, traditional gardens, and authentic cuisine.",
    rating: 4.7,
    featured: true
  },
  {
    id: 4,
    name: "Machu Picchu, Peru",
    image: "https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "Explore the ancient Incan citadel nestled high in the Andes Mountains with breathtaking views.",
    rating: 4.9,
    featured: true
  },
];

export default function FeaturedDestinations() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Featured Destinations</h2>
            <p className="text-muted-foreground max-w-2xl">
              Explore our handpicked selection of stunning destinations around the world, each offering unique experiences and unforgettable memories.
            </p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link href="/destinations">View All Destinations</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination) => (
            <Link href={`/destinations/${destination.id}`} key={destination.id}>
              <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={destination.image}
                    alt={destination.name}
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
                    <span className="text-sm">{destination.name.split(",")[1]?.trim()}</span>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {destination.description}
                  </p>
                  <Button size="sm" variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Explore
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}