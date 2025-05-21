import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 5,
    testimonial: "Our Bali trip was absolutely incredible! The itinerary was perfect with a great balance of adventure and relaxation. Our guide was knowledgeable and friendly, making the experience unforgettable.",
    trip: "Bali Adventure"
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Toronto, Canada",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 5,
    testimonial: "The Greek Islands tour exceeded all my expectations. Every detail was well planned, from the accommodations to the local experiences. I've already booked my next trip with Wanderlust!",
    trip: "Greek Islands Discovery"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    location: "Melbourne, Australia",
    image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4,
    testimonial: "Japan was a dream come true! The cultural immersion was incredible, and our guide's insights made each site visit meaningful. The only reason for 4 stars is I wish we had one more day in Kyoto!",
    trip: "Japan Heritage Tour"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Travelers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Read genuine reviews from travelers who have experienced our carefully crafted journeys and exceptional service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <div className="relative h-14 w-14 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm font-medium">{testimonial.trip}</p>
                </div>
                
                <p className="text-muted-foreground flex-grow">
                  "{testimonial.testimonial}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}