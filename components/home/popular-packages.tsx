import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const packages = [
  {
    id: 1,
    name: "Bali Adventure: Island Hopping",
    image: "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    location: "Bali, Indonesia",
    duration: "7 Days",
    groupSize: "10 People",
    price: 1299,
    discount: 15,
    startDate: "2025-05-15",
    featured: true,
    description: "Experience the best of Bali with this 7-day island hopping adventure, including temples, beaches, and local culture."
  },
  {
    id: 2,
    name: "Greek Islands Discovery",
    image: "https://images.pexels.com/photos/1430677/pexels-photo-1430677.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    location: "Santorini & Mykonos, Greece",
    duration: "10 Days",
    groupSize: "12 People",
    price: 2199,
    discount: 0,
    startDate: "2025-06-10",
    featured: true,
    description: "Explore the stunning Greek islands with this 10-day tour, including Santorini's sunset views and Mykonos' vibrant nightlife."
  },
  {
    id: 3,
    name: "Japan Heritage Tour",
    image: "https://images.pexels.com/photos/5340085/pexels-photo-5340085.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    location: "Tokyo, Kyoto & Osaka, Japan",
    duration: "12 Days",
    groupSize: "14 People",
    price: 2799,
    discount: 10,
    startDate: "2025-04-01",
    featured: true,
    description: "Immerse yourself in Japanese culture with this 12-day tour, visiting ancient temples, modern cities, and serene gardens."
  }
];

export default function PopularPackages() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Popular Tour Packages</h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover our most sought-after travel packages, carefully designed to provide exceptional experiences at remarkable destinations.
            </p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link href="/packages">View All Packages</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Link href={`/packages/${pkg.id}`} key={pkg.id}>
              <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  {pkg.discount > 0 && (
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1">
                      {pkg.discount}% OFF
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{pkg.location}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm">{pkg.duration}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="text-sm">{pkg.groupSize}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">{new Date(pkg.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {pkg.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Starting from</p>
                      <div className="flex items-baseline">
                        {pkg.discount > 0 ? (
                          <>
                            <span className="text-xl font-bold">${Math.round(pkg.price * (1 - pkg.discount / 100))}</span>
                            <span className="text-sm line-through text-muted-foreground ml-2">${pkg.price}</span>
                          </>
                        ) : (
                          <span className="text-xl font-bold">${pkg.price}</span>
                        )}
                      </div>
                    </div>
                    <Button size="sm" className="group-hover:bg-primary group-hover:text-white transition-colors">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}