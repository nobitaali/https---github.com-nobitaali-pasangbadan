"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Calendar, Search, SlidersHorizontal } from "lucide-react";

export default function PackagesClient({ packages }: { packages: any[] }) {
  const [searchText, setSearchText] = useState("");
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("Recommended");

  // fungsi toggleItem dan filtering sama seperti sebelumnya...

  function toggleItem(item: string, list: string[], setList: (v: string[]) => void) {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  }

  const filteredPackages = useMemo(() => {
    let filtered = packages;

    if (searchText.trim()) {
      filtered = filtered.filter((pkg) =>
        pkg.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedDurations.length > 0) {
      filtered = filtered.filter((pkg) =>
        selectedDurations.includes(pkg.duration)
      );
    }

    if (selectedActivities.length > 0) {
      filtered = filtered.filter((pkg) =>
        selectedActivities.every((act) => pkg.activities.includes(act))
      );
    }

    switch (sortOption) {
      case "Price: Low to High":
        filtered = filtered.slice().sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        filtered = filtered.slice().sort((a, b) => b.price - a.price);
        break;
      case "Duration: Short to Long":
        filtered = filtered.slice().sort(
          (a, b) =>
            parseInt(a.duration) - parseInt(b.duration)
        );
        break;
      case "Rating: High to Low":
        filtered = filtered.slice().sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  }, [packages, searchText, selectedDurations, selectedActivities, sortOption]);

  const durations = ["1-3 Days", "4-7 Days", "8-14 Days", "15+ Days"];
  const activities = ["Adventure", "Beach", "Culture", "Food", "Hiking", "History", "Nature", "Photography", "Romantic", "Wildlife"];

  return   (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header dengan search */}
        <div className="relative overflow-hidden rounded-xl mb-16">
          <div className="relative h-[300px] md:h-[400px]">
            <Image
              src="https://images.pexels.com/photos/2859169/pexels-photo-2859169.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="Tour packages around the world"
              fill
              style={{ objectFit: "cover" }}
            />
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-center p-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Curated Tour Packages</h1>
              <p className="text-lg text-white/90 mb-8">
                Discover our expertly designed travel packages, each crafted to deliver exceptional experiences and unforgettable memories.
              </p>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search tour packages..."
                  className="pl-10 bg-white/90 backdrop-blur-sm border-none h-12"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary"
                  onClick={() => {
                    setSearchText("");
                    setSelectedDurations([]);
                    setSelectedActivities([]);
                    setSortOption("Recommended");
                  }}
                >
                  Reset All
                </Button>
              </div>

              {/* Duration */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Duration</h3>
                <div className="space-y-2">
                  {durations.map((duration) => (
                    <div key={duration} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`duration-${duration}`}
                        checked={selectedDurations.includes(duration)}
                        onChange={() => toggleItem(duration, selectedDurations, setSelectedDurations)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor={`duration-${duration}`} className="ml-2 text-sm text-foreground">
                        {duration}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activities */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Activities</h3>
                <div className="space-y-2">
                  {activities.map((activity) => (
                    <div key={activity} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`activity-${activity}`}
                        checked={selectedActivities.includes(activity)}
                        onChange={() => toggleItem(activity, selectedActivities, setSelectedActivities)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor={`activity-${activity}`} className="ml-2 text-sm text-foreground">
                        {activity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full mt-6" onClick={() => { /* Optional: bisa implement filter apply logic jika mau */ }}>
                Apply Filters
              </Button>
            </div>
          </div>

          {/* Packages Grid */}
          <div className="lg:col-span-3">
            {/* Sort Options */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <p className="text-muted-foreground mb-4 sm:mb-0">
                Showing <span className="font-medium text-foreground">{filteredPackages.length}</span> packages
              </p>
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Sort by:</span>
                <select
                  className="text-sm border-0 bg-transparent focus:ring-0 cursor-pointer"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Duration: Short to Long</option>
                  <option>Rating: High to Low</option>
                </select>
              </div>
            </div>

            {/* Packages */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPackages.map((pkg) => (
                <Link href={`/packages/${pkg.id}`} key={pkg.id}>
                  <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 group">
                    <div className="relative h-52 overflow-hidden">
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
                      <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded text-sm font-medium">
                        ★ {pkg.rating}
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="text-lg font-semibold mb-2 line-clamp-1">{pkg.name}</h3>

                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-xs">{pkg.location}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          <span className="text-xs">{pkg.duration}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Users className="h-4 w-4 mr-1" />
                          <span className="text-xs">{pkg.groupSize}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="text-xs">{new Date(pkg.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {pkg.activities.map((activity: string, index: number) => (
                          <span
                            key={index}
                            className="text-xs bg-muted px-2 py-0.5 rounded-full"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>

                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {pkg.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">From</p>
                          <div className="flex items-baseline">
                            {pkg.discount > 0 ? (
                              <>
                                <span className="text-lg font-bold">${Math.round(pkg.price * (1 - pkg.discount / 100))}</span>
                                <span className="line-through text-muted-foreground ml-2 text-sm">${pkg.price}</span>
                              </>
                            ) : (
                              <span className="text-lg font-bold">${pkg.price}</span>
                            )}
                          </div>
                        </div>

                        <Button size="sm" variant="default">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredPackages.length === 0 && (
              <p className="mt-12 text-center text-muted-foreground">No packages found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  
  );
}
