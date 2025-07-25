import { NavLink } from "react-router-dom";
import { PlusCircle, Map, Activity, User } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNavigation = () => {
  const navItems = [
    { to: "/report", icon: PlusCircle, label: "Report" },
    { to: "/", icon: Map, label: "Map" },
    { to: "/feed", icon: Activity, label: "Feed" },
    { to: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-safari z-50">
      <div className="flex justify-around items-center py-2 px-4 max-w-lg mx-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "touch-target flex flex-col items-center justify-center gap-1 rounded-lg transition-colors",
                "text-muted-foreground hover:text-foreground",
                isActive && "text-primary bg-primary/10"
              )
            }
          >
            <Icon size={20} />
            <span className="text-xs font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;