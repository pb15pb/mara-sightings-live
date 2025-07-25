import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock, User, Search, Filter, AlertTriangle } from "lucide-react";

interface Sighting {
  id: string;
  species: string;
  guide: string;
  time: string;
  location: string;
  distance: string;
  behavior: string;
  priority: "normal" | "urgent";
}

const ActivityFeed = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("all");
  
  const sightings: Sighting[] = [
    {
      id: "1",
      species: "Lion",
      guide: "James Kimani",
      time: "2 minutes ago",
      location: "Mara River Crossing",
      distance: "0.8 km",
      behavior: "Pride hunting wildebeest",
      priority: "urgent"
    },
    {
      id: "2",
      species: "Leopard",
      guide: "Sarah Mutua",
      time: "15 minutes ago",
      location: "Acacia Grove",
      distance: "2.1 km",
      behavior: "Resting in tree shade",
      priority: "normal"
    },
    {
      id: "3",
      species: "Elephant",
      guide: "David Otieno",
      time: "32 minutes ago",
      location: "Mud Wallows",
      distance: "1.5 km",
      behavior: "Family group with calves",
      priority: "normal"
    },
    {
      id: "4",
      species: "Cheetah",
      guide: "Grace Wanjiku",
      time: "1 hour ago",
      location: "Open Plains",
      distance: "3.2 km",
      behavior: "Mother with 3 cubs",
      priority: "normal"
    }
  ];

  const filteredSightings = sightings.filter(sighting => {
    const matchesSearch = sighting.species.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sighting.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = speciesFilter === "all" || sighting.species.toLowerCase() === speciesFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-earth">
      {/* Header */}
      <header className="bg-card shadow-earth p-4 border-b border-border">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold">Activity Feed</h1>
              <p className="text-xs text-muted-foreground">Recent wildlife sightings</p>
            </div>
            <Badge variant="secondary" className="text-xs">
              {filteredSightings.length} sightings
            </Badge>
          </div>
          
          {/* Search and Filter */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search species or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mobile-input pl-10"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={speciesFilter} onValueChange={setSpeciesFilter}>
                <SelectTrigger className="flex-1 h-10">
                  <SelectValue placeholder="Filter by species" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Species</SelectItem>
                  <SelectItem value="lion">Lion</SelectItem>
                  <SelectItem value="leopard">Leopard</SelectItem>
                  <SelectItem value="elephant">Elephant</SelectItem>
                  <SelectItem value="cheetah">Cheetah</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      {/* Feed Content */}
      <div className="p-4 space-y-4">
        {filteredSightings.map((sighting) => (
          <div key={sighting.id} className="bg-card rounded-lg p-4 border border-border shadow-earth">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-safari rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">
                    {sighting.species.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{sighting.species}</h3>
                    {sighting.priority === "urgent" && (
                      <AlertTriangle className="w-4 h-4 text-destructive" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <User className="w-3 h-3" />
                    {sighting.guide}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {sighting.time}
                </div>
                <div className="text-xs text-accent font-medium">{sighting.distance}</div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-sm">
                <MapPin className="w-3 h-3 text-primary" />
                <span className="text-muted-foreground">{sighting.location}</span>
              </div>
              
              <p className="text-sm text-foreground">{sighting.behavior}</p>
              
              {sighting.priority === "urgent" && (
                <Badge variant="destructive" className="text-xs">
                  Urgent - Fighting/Eating
                </Badge>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-3 pt-3 border-t border-border">
              <Button variant="outline" size="sm" className="flex-1 text-xs">
                View on Map
              </Button>
              <Button variant="outline" size="sm" className="flex-1 text-xs">
                Get Directions
              </Button>
            </div>
          </div>
        ))}
        
        {filteredSightings.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No sightings found</h3>
            <p className="text-muted-foreground text-sm">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;