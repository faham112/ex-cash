import { useQuery } from "@tanstack/react-query";
import type { Investment } from "@shared/schema";

export default function QuickStats() {
  const { data: investments, isLoading } = useQuery<Investment[]>({
    queryKey: ["/api/investments"],
  });

  const calculateStats = () => {
    if (!investments || investments.length === 0) {
      return {
        bestPerformer: { symbol: "N/A", percent: 0 },
        worstPerformer: { symbol: "N/A", percent: 0 },
        dividendYield: 0,
        riskScore: "Low"
      };
    }

    const performanceData = investments.map(inv => {
      const purchaseValue = parseFloat(inv.purchasePrice) * inv.shares;
      const currentValue = parseFloat(inv.currentPrice) * inv.shares;
      const gainLossPercent = ((currentValue - purchaseValue) / purchaseValue) * 100;
      
      return {
        symbol: inv.symbol,
        percent: gainLossPercent
      };
    });

    const bestPerformer = performanceData.reduce((best, current) => 
      current.percent > best.percent ? current : best
    );

    const worstPerformer = performanceData.reduce((worst, current) => 
      current.percent < worst.percent ? current : worst
    );

    return {
      bestPerformer,
      worstPerformer,
      dividendYield: 2.4, // Mock data
      riskScore: "Medium" // Mock data
    };
  };

  const stats = calculateStats();

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Best Performer</span>
          <div className="text-right">
            <span className="text-sm font-medium text-gray-900">{stats.bestPerformer.symbol}</span>
            <span className="text-sm text-brand-green ml-2">
              {stats.bestPerformer.percent >= 0 ? '+' : ''}{stats.bestPerformer.percent.toFixed(1)}%
            </span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Worst Performer</span>
          <div className="text-right">
            <span className="text-sm font-medium text-gray-900">{stats.worstPerformer.symbol}</span>
            <span className="text-sm text-brand-red ml-2">
              {stats.worstPerformer.percent >= 0 ? '+' : ''}{stats.worstPerformer.percent.toFixed(1)}%
            </span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Dividend Yield</span>
          <span className="text-sm font-medium text-gray-900">{stats.dividendYield}%</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Risk Score</span>
          <span className="text-sm font-medium text-brand-amber">{stats.riskScore}</span>
        </div>
      </div>
    </div>
  );
}
