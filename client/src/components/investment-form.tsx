import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertInvestmentSchema, type InsertInvestment } from "@shared/schema";

const formSchema = insertInvestmentSchema.extend({
  shares: insertInvestmentSchema.shape.shares.min(1, "Shares must be at least 1"),
  purchasePrice: insertInvestmentSchema.shape.purchasePrice.regex(/^\d+(\.\d{1,2})?$/, "Must be a valid price"),
  currentPrice: insertInvestmentSchema.shape.currentPrice.regex(/^\d+(\.\d{1,2})?$/, "Must be a valid price"),
});

export default function InvestmentForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<InsertInvestment>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symbol: "",
      companyName: "",
      shares: 0,
      purchasePrice: "",
      currentPrice: "",
      purchaseDate: "",
    },
  });

  const createInvestmentMutation = useMutation({
    mutationFn: async (data: InsertInvestment) => {
      return apiRequest("POST", "/api/investments", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/investments"] });
      form.reset();
      toast({
        title: "Success",
        description: "Investment added successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add investment",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertInvestment) => {
    createInvestmentMutation.mutate(data);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Investment</h3>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="symbol" className="text-sm font-medium text-gray-700">Stock Symbol</Label>
          <Input
            id="symbol"
            placeholder="e.g., AAPL"
            {...form.register("symbol")}
            className="mt-1"
          />
          {form.formState.errors.symbol && (
            <p className="text-sm text-red-600 mt-1">{form.formState.errors.symbol.message}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">Company Name</Label>
          <Input
            id="companyName"
            placeholder="e.g., Apple Inc."
            {...form.register("companyName")}
            className="mt-1"
          />
          {form.formState.errors.companyName && (
            <p className="text-sm text-red-600 mt-1">{form.formState.errors.companyName.message}</p>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="shares" className="text-sm font-medium text-gray-700">Shares</Label>
            <Input
              id="shares"
              type="number"
              placeholder="100"
              {...form.register("shares", { valueAsNumber: true })}
              className="mt-1"
            />
            {form.formState.errors.shares && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.shares.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="purchasePrice" className="text-sm font-medium text-gray-700">Purchase Price</Label>
            <Input
              id="purchasePrice"
              type="number"
              step="0.01"
              placeholder="150.00"
              {...form.register("purchasePrice")}
              className="mt-1"
            />
            {form.formState.errors.purchasePrice && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.purchasePrice.message}</p>
            )}
          </div>
        </div>
        
        <div>
          <Label htmlFor="currentPrice" className="text-sm font-medium text-gray-700">Current Price</Label>
          <Input
            id="currentPrice"
            type="number"
            step="0.01"
            placeholder="175.00"
            {...form.register("currentPrice")}
            className="mt-1"
          />
          {form.formState.errors.currentPrice && (
            <p className="text-sm text-red-600 mt-1">{form.formState.errors.currentPrice.message}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="purchaseDate" className="text-sm font-medium text-gray-700">Purchase Date</Label>
          <Input
            id="purchaseDate"
            type="date"
            {...form.register("purchaseDate")}
            className="mt-1"
          />
          {form.formState.errors.purchaseDate && (
            <p className="text-sm text-red-600 mt-1">{form.formState.errors.purchaseDate.message}</p>
          )}
        </div>
        
        <Button
          type="submit"
          className="w-full bg-brand-blue hover:bg-blue-700"
          disabled={createInvestmentMutation.isPending}
        >
          <Plus className="w-4 h-4 mr-2" />
          {createInvestmentMutation.isPending ? "Adding..." : "Add Investment"}
        </Button>
      </form>
    </div>
  );
}
