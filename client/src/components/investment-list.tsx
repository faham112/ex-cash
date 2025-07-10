import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit, Trash2, Filter, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Investment } from "@shared/schema";

export default function InvestmentList() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: investments, isLoading } = useQuery<Investment[]>({
    queryKey: ["/api/investments"],
  });

  const deleteInvestmentMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/investments/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/investments"] });
      toast({
        title: "Success",
        description: "Investment deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete investment",
        variant: "destructive",
      });
    },
  });

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this investment?")) {
      deleteInvestmentMutation.mutate(id);
    }
  };

  const calculateGainLoss = (investment: Investment) => {
    const currentValue = parseFloat(investment.currentPrice) * investment.shares;
    const purchaseValue = parseFloat(investment.purchasePrice) * investment.shares;
    const gainLoss = currentValue - purchaseValue;
    const gainLossPercent = (gainLoss / purchaseValue) * 100;
    return { gainLoss, gainLossPercent };
  };

  const getInitials = (symbol: string) => {
    return symbol.charAt(0).toUpperCase();
  };

  const getColorForSymbol = (symbol: string) => {
    const colors = ['bg-brand-blue', 'bg-brand-green', 'bg-brand-amber', 'bg-purple-500', 'bg-pink-500'];
    const index = symbol.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Your Investments</h3>
        </div>
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Your Investments</h3>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" className="text-brand-blue hover:text-blue-700">
              <Filter className="w-4 h-4 mr-1" />
              Filter
            </Button>
            <Button variant="ghost" size="sm" className="text-brand-blue hover:text-blue-700">
              <ArrowUpDown className="w-4 h-4 mr-1" />
              Sort
            </Button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shares</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gain/Loss</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {investments?.map((investment) => {
              const { gainLoss, gainLossPercent } = calculateGainLoss(investment);
              const currentValue = parseFloat(investment.currentPrice) * investment.shares;
              
              return (
                <tr key={investment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 ${getColorForSymbol(investment.symbol)} rounded-full flex items-center justify-center mr-3`}>
                        <span className="text-white text-xs font-bold">{getInitials(investment.symbol)}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{investment.symbol}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{investment.companyName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{investment.shares}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${parseFloat(investment.currentPrice).toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${currentValue.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`text-sm font-medium ${gainLoss >= 0 ? 'text-brand-green' : 'text-brand-red'}`}>
                        {gainLoss >= 0 ? '+' : ''}${gainLoss.toFixed(2)}
                      </span>
                      <span className={`text-sm ml-1 ${gainLoss >= 0 ? 'text-brand-green' : 'text-brand-red'}`}>
                        ({gainLoss >= 0 ? '+' : ''}{gainLossPercent.toFixed(1)}%)
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-brand-blue hover:text-blue-700"
                        onClick={() => {
                          toast({
                            title: "Feature Coming Soon",
                            description: "Edit functionality will be available soon",
                          });
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-brand-red hover:text-red-700"
                        onClick={() => handleDelete(investment.id)}
                        disabled={deleteInvestmentMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {investments?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No investments found. Add your first investment above!</p>
          </div>
        )}
      </div>
    </div>
  );
}
