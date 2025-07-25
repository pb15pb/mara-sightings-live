import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock, User, Search, Filter, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Sighting {
  id: string;
  species: string;
  reporter_name: string;
  reporter_surname: string;
  notes: string | null;
  animal_status: string;
  location_description: string | null;
  sighting_time: string;
}

const ActivityFeed = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("all");
  const [sightings, setSightings] = useState<Sighting[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchSightings();
  }, []);

  const fetchSightings = async () => {
    try {
      const { data, error } = await supabase
        .from('wildlife_sightings')
        .select('*')
        .order('sighting_time', { ascending: false });

      if (error) throw error;
      setSightings(data || []);
    } catch (error) {
      console.error('Error fetching sightings:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const sightingTime = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - sightingTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    const hours = Math.floor(diffInMinutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  const filteredSightings = sightings.filter(sighting => {
    const matchesSearch = sighting.species.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (sighting.location_description && sighting.location_description.toLowerCase().includes(searchQuery.toLowerCase()));
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
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-lg p-4 border border-border animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
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
                        {sighting.animal_status === "urgent" && (
                          <AlertTriangle className="w-4 h-4 text-destructive" />
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <User className="w-3 h-3" />
                        {sighting.reporter_name} {sighting.reporter_surname}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {formatTimeAgo(sighting.sighting_time)}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  {sighting.location_description && (
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="w-3 h-3 text-primary" />
                      <span className="text-muted-foreground">{sighting.location_description}</span>
                    </div>
                  )}
                  
                  {sighting.notes && (
                    <p className="text-sm text-foreground">{sighting.notes}</p>
                  )}
                  
                  {sighting.animal_status === "urgent" && (
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
          </>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;