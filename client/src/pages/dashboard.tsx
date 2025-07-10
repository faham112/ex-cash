import { ChartLine, Bell, User } from "lucide-react";
import PortfolioOverview from "@/components/portfolio-overview";
import InvestmentForm from "@/components/investment-form";
import InvestmentList from "@/components/investment-list";
import QuickStats from "@/components/quick-stats";
import RecentActivity from "@/components/recent-activity";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <ChartLine className="text-brand-blue text-2xl w-8 h-8" />
                <span className="ml-2 text-xl font-bold text-gray-900">Investro22</span>
              </div>
            </div>
            
            {/* Hello World Section */}
            <div className="text-center flex-1 mx-8">
              <h1 className="text-4xl font-bold text-brand-blue">Hello World</h1>
              <p className="text-gray-600 mt-1">Welcome to your investment dashboard</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700">
                <Bell className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-brand-blue rounded-full flex items-center justify-center">
                  <User className="text-white w-4 h-4" />
                </div>
                <span className="text-gray-700 font-medium hidden sm:block">John Doe</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Portfolio Overview */}
        <PortfolioOverview />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Investment Form and Quick Stats */}
          <div className="lg:col-span-1 space-y-6">
            <InvestmentForm />
            <QuickStats />
          </div>

          {/* Investment List */}
          <div className="lg:col-span-2">
            <InvestmentList />
          </div>
        </div>

        {/* Data Visualization Placeholder */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Portfolio Performance</h3>
              <div className="flex space-x-2">
                <button className="text-sm text-brand-blue hover:text-blue-700 font-medium">1M</button>
                <button className="text-sm text-brand-blue hover:text-blue-700 font-medium">3M</button>
                <button className="text-sm text-brand-blue hover:text-blue-700 font-medium border-b-2 border-brand-blue">6M</button>
                <button className="text-sm text-brand-blue hover:text-blue-700 font-medium">1Y</button>
              </div>
            </div>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <ChartLine className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Performance Chart</p>
                <p className="text-sm text-gray-400">Chart visualization coming soon</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Allocation</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 mb-4">
              <div className="text-center">
                <ChartLine className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Asset Allocation Chart</p>
                <p className="text-sm text-gray-400">Pie chart visualization coming soon</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-brand-blue rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Technology</span>
                </div>
                <span className="text-sm font-medium text-gray-900">45%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-brand-green rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Healthcare</span>
                </div>
                <span className="text-sm font-medium text-gray-900">25%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-brand-amber rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Finance</span>
                </div>
                <span className="text-sm font-medium text-gray-900">20%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Other</span>
                </div>
                <span className="text-sm font-medium text-gray-900">10%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <RecentActivity />
      </main>
    </div>
  );
}
