import { notFound } from "next/navigation";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import dynamic from "next/dynamic";

const MapPin = dynamic(() => import("lucide-react").then(mod => mod.MapPin));
const Calendar = dynamic(() => import("lucide-react").then(mod => mod.Calendar));
const Users = dynamic(() => import("lucide-react").then(mod => mod.Users));
const Clock = dynamic(() => import("lucide-react").then(mod => mod.Clock));
const Globe = dynamic(() => import("lucide-react").then(mod => mod.Globe));
const Star = dynamic(() => import("lucide-react").then(mod => mod.Star));

import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { data: destination, error } = await supabase
    .from("packages")
    .select("name, description, country, rating, image")
    .eq("id", params.id)
    .single();

  if (error || !destination) {
    return {
      title: "Package Not Found",
      description: "Package not available",
    };
  }

  return {
    title: `${destination.name} - Travel Package`,
    description: destination.description,
    keywords: `travel, package, ${destination.country}, ${destination.name}`,
    openGraph: {
      title: destination.name,
      description: destination.description,
      images: [
        {
          url: destination.image,
          alt: destination.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: destination.name,
      description: destination.description,
      images: [destination.image],
    },
  };
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function generateStaticParams() {
  // Ambil semua id packages dari supabase untuk generate static paths
  const { data, error } = await supabase.from("packages").select("id");
  if (error || !data) return [];
  console.log("data", data);
  return data.map((pkg) => ({ id: pkg.id }));
}

export default async function DestinationPage({ params }: { params: { id: string } }) {
  const { data: destination, error } = await supabase
    .from("packages")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !destination) {
    notFound();
  }

  // Jika fields seperti activities, highlights, included disimpan sebagai JSON string,
  // kamu bisa parsing dengan JSON.parse(destination.activities)

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
                  {destination.highlights?.map((highlight: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <Star className="h-5 w-5 mr-2 text-yellow-500" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-semibold mb-4">What&apos;s Included</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {destination.included?.map((item: string, index: number) => (
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
                  {destination.activities.map((activity: string, index: number) => (
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
