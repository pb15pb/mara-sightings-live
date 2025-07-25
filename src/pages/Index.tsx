import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MapPin, Clock, AlertTriangle, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

const Index = () => {
  const navigate = useNavigate();
  const [recentSightings, setRecentSightings] = useState<Sighting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentSightings();
  }, []);

  const fetchRecentSightings = async () => {
    try {
      const { data, error } = await supabase
        .from('wildlife_sightings')
        .select('*')
        .order('sighting_time', { ascending: false })
        .limit(3);

      if (error) throw error;
      setRecentSightings(data || []);
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

  return (
    <div className="min-h-screen bg-gradient-earth">
      {/* Header */}
      <header className="bg-card shadow-earth p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">SafariTracker</h1>
            <p className="text-xs text-muted-foreground">Wildlife monitoring for Maasai Mara</p>
          </div>
          <Button 
            onClick={() => navigate("/report")} 
            className="gradient-safari text-primary-foreground touch-target"
          >
            <Plus className="w-4 h-4 mr-2" />
            Report
          </Button>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{recentSightings.length}</p>
                <p className="text-xs text-muted-foreground">Recent sightings</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">5.2km</p>
                <p className="text-xs text-muted-foreground">Coverage area</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Sightings */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Recent Sightings</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/activity")}
            >
              View All
            </Button>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-lg p-4 border border-border animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {recentSightings.map((sighting) => (
                <div key={sighting.id} className="bg-card rounded-lg p-4 border border-border">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-safari rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-primary-foreground">
                          {sighting.species.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-sm">{sighting.species}</h3>
                          {sighting.animal_status === "urgent" && (
                            <AlertTriangle className="w-3 h-3 text-destructive" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          by {sighting.reporter_name} {sighting.reporter_surname}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {formatTimeAgo(sighting.sighting_time)}
                      </div>
                    </div>
                  </div>
                  
                  {sighting.location_description && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                      <MapPin className="w-3 h-3" />
                      {sighting.location_description}
                    </div>
                  )}
                </div>
              ))}
              
              {recentSightings.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No recent sightings</p>
                  <Button 
                    onClick={() => navigate("/report")} 
                    className="mt-2"
                    variant="outline"
                  >
                    Report the first sighting
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
