import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Settings, Award, MapPin, Calendar, Camera, Users } from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-earth">
      {/* Header */}
      <header className="bg-card shadow-earth p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">Profile</h1>
          <Button variant="ghost" size="icon" className="touch-target">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Profile Info */}
        <Card className="shadow-earth">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-gradient-safari text-primary-foreground text-lg font-bold">
                  JK
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold">James Kimani</h2>
                <p className="text-muted-foreground">Senior Tour Guide</p>
                <div className="flex items-center gap-1 text-sm text-primary mt-1">
                  <MapPin className="w-3 h-3" />
                  Maasai Mara National Reserve
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Badge variant="secondary">Expert Tracker</Badge>
              <Badge variant="outline">5 Years Experience</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card className="shadow-earth">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Your Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">847</div>
                <div className="text-sm text-muted-foreground">Total Sightings</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-accent">34</div>
                <div className="text-sm text-muted-foreground">Species Found</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-secondary-foreground">127</div>
                <div className="text-sm text-muted-foreground">This Month</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-earth">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <Camera className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Spotted Lion pride</p>
                  <p className="text-xs text-muted-foreground">2 hours ago at Mara River</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Helped 15 tourists</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Achieved "Big Five" badge</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h3 className="font-semibold">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="touch-target justify-start">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" className="touch-target justify-start">
              <Camera className="w-4 h-4 mr-2" />
              My Photos
            </Button>
            <Button variant="outline" className="touch-target justify-start">
              <Users className="w-4 h-4 mr-2" />
              Team
            </Button>
            <Button variant="outline" className="touch-target justify-start">
              <Award className="w-4 h-4 mr-2" />
              Achievements
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;