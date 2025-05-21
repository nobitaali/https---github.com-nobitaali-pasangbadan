"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Edit, Trash } from "lucide-react";

interface Destination {
  _id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  continent: string;
  activities: string[];
  rating: number;
}

export default function AdminPage() {
  const { toast } = useToast();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    description: "",
    image: "",
    continent: "",
    activities: "",
    rating: 0,
  });

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await fetch('/api/destinations');
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setDestinations(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch destinations",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const destinationData = {
      ...formData,
      activities: formData.activities.split(',').map(a => a.trim()),
    };

    try {
      let response;
      if (isEditing && selectedId) {
        response = await fetch('/api/destinations', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ _id: selectedId, ...destinationData }),
        });
      } else {
        response = await fetch('/api/destinations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(destinationData),
        });
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      toast({
        title: "Success",
        description: `Destination ${isEditing ? 'updated' : 'created'} successfully.`,
      });

      setFormData({
        name: "",
        country: "",
        description: "",
        image: "",
        continent: "",
        activities: "",
        rating: 0,
      });
      setIsEditing(false);
      setSelectedId(null);
      fetchDestinations();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save destination",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (destination: Destination) => {
    setFormData({
      name: destination.name,
      country: destination.country,
      description: destination.description,
      image: destination.image,
      continent: destination.continent,
      activities: destination.activities.join(', '),
      rating: destination.rating,
    });
    setSelectedId(destination._id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/destinations?id=${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      toast({
        title: "Success",
        description: "Destination has been deleted successfully.",
      });

      fetchDestinations();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete destination",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

          {/* Create/Edit Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {isEditing ? "Edit Destination" : "Create New Destination"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Destination Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="continent">Continent</Label>
                  <Input
                    id="continent"
                    value={formData.continent}
                    onChange={(e) =>
                      setFormData({ ...formData, continent: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="activities">Activities (comma-separated)</Label>
                  <Input
                    id="activities"
                    value={formData.activities}
                    onChange={(e) =>
                      setFormData({ ...formData, activities: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="rating">Rating (0-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({ ...formData, rating: parseFloat(e.target.value) })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                  />
                </div>

                <Button type="submit">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  {isEditing ? "Update Destination" : "Add Destination"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Destinations List */}
          <Card>
            <CardHeader>
              <CardTitle>Manage Destinations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {destinations.map((destination) => (
                  <div
                    key={destination._id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <h3 className="font-semibold">{destination.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {destination.country}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(destination)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(destination._id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}