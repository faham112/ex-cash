import { useQuery } from "@tanstack/react-query";
import { Wallet, TrendingUp, PieChart, ArrowUp } from "lucide-react";
import type { Investment } from "@shared/schema";

export default function PortfolioOverview() {
  const { data: investments, isLoading } = useQuery<Investment[]>({
    queryKey: ["/api/investments"],
  });

  const calculatePortfolioMetrics = () => {
    if (!investments) return { totalValue: 0, totalGainLoss: 0, gainLossPercent: 0, activeCount: 0 };

    const totalValue = investments.reduce((sum, inv) => {
      return sum + (parseFloat(inv.currentPrice) * inv.shares);
    }, 0);

    const totalCost = investments.reduce((sum, inv) => {
      return sum + (parseFloat(inv.purchasePrice) * inv.shares);
    }, 0);

    const totalGainLoss = totalValue - totalCost;
    const gainLossPercent = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0;

    return {
      totalValue,
      totalGainLoss,
      gainLossPercent,
      activeCount: investments.length
    };
  };

  const metrics = calculatePortfolioMetrics();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Portfolio Value</p>
            <p className="text-2xl font-bold text-gray-900">${metrics.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
          <div className="w-12 h-12 bg-brand-blue bg-opacity-10 rounded-lg flex items-center justify-center">
            <Wallet className="text-brand-blue w-6 h-6" />
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <span className="text-sm text-brand-green font-medium">+5.2%</span>
          <span className="text-sm text-gray-500 ml-1">from last month</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Gain/Loss</p>
            <p className={`text-2xl font-bold ${metrics.totalGainLoss >= 0 ? 'text-brand-green' : 'text-brand-red'}`}>
              {metrics.totalGainLoss >= 0 ? '+' : ''}${metrics.totalGainLoss.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="w-12 h-12 bg-brand-green bg-opacity-10 rounded-lg flex items-center justify-center">
            <TrendingUp className="text-brand-green w-6 h-6" />
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <span className={`text-sm font-medium ${metrics.gainLossPercent >= 0 ? 'text-brand-green' : 'text-brand-red'}`}>
            {metrics.gainLossPercent >= 0 ? '+' : ''}{metrics.gainLossPercent.toFixed(1)}%
          </span>
          <span className="text-sm text-gray-500 ml-1">overall return</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Active Investments</p>
            <p className="text-2xl font-bold text-gray-900">{metrics.activeCount}</p>
          </div>
          <div className="w-12 h-12 bg-brand-amber bg-opacity-10 rounded-lg flex items-center justify-center">
            <PieChart className="text-brand-amber w-6 h-6" />
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <span className="text-sm text-gray-600">Across multiple sectors</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Monthly Performance</p>
            <p className="text-2xl font-bold text-brand-green">+8.4%</p>
          </div>
          <div className="w-12 h-12 bg-brand-green bg-opacity-10 rounded-lg flex items-center justify-center">
            <ArrowUp className="text-brand-green w-6 h-6" />
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <span className="text-sm text-gray-600">vs. market: +2.1%</span>
        </div>
      </div>
    </div>
  );
}
