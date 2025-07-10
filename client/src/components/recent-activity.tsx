import { useQuery } from "@tanstack/react-query";
import { Plus, Edit, Minus } from "lucide-react";
import type { Investment } from "@shared/schema";

export default function RecentActivity() {
  const { data: investments, isLoading } = useQuery<Investment[]>({
    queryKey: ["/api/investments"],
  });

  // Generate mock recent activity based on investments
  const generateRecentActivity = () => {
    if (!investments || investments.length === 0) return [];

    const activities = investments.slice(0, 3).map((inv, index) => {
      const actions = [
        {
          type: "add",
          icon: Plus,
          color: "bg-brand-green",
          title: `Added ${inv.symbol} position`,
          subtitle: `${inv.shares} shares at $${parseFloat(inv.purchasePrice).toFixed(2)}`,
          value: `$${(parseFloat(inv.purchasePrice) * inv.shares).toFixed(2)}`,
          time: index === 0 ? "2 hours ago" : index === 1 ? "1 day ago" : "3 days ago"
        },
        {
          type: "edit",
          icon: Edit,
          color: "bg-brand-amber",
          title: `Updated ${inv.symbol} position`,
          subtitle: `Price updated to $${parseFloat(inv.currentPrice).toFixed(2)}`,
          value: `$${(parseFloat(inv.currentPrice) * inv.shares).toFixed(2)}`,
          time: index === 0 ? "5 hours ago" : index === 1 ? "2 days ago" : "1 week ago"
        },
        {
          type: "remove",
          icon: Minus,
          color: "bg-brand-red",
          title: `Sold ${inv.symbol} position`,
          subtitle: `${Math.floor(inv.shares * 0.3)} shares at $${parseFloat(inv.currentPrice).toFixed(2)}`,
          value: `$${(parseFloat(inv.currentPrice) * Math.floor(inv.shares * 0.3)).toFixed(2)}`,
          time: index === 0 ? "1 day ago" : index === 1 ? "4 days ago" : "2 weeks ago"
        }
      ];

      return actions[index % actions.length];
    });

    return activities;
  };

  const activities = generateRecentActivity();

  if (isLoading) {
    return (
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-32 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      
      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.map((activity, index) => {
            const IconComponent = activity.icon;
            return (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-10 h-10 ${activity.color} rounded-full flex items-center justify-center mr-3`}>
                    <IconComponent className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.subtitle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">{activity.value}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
}
