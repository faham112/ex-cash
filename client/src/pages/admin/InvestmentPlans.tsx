import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Edit, Trash2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { InvestmentPlan } from "@shared/schema";

const planFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  minAmount: z.string().min(1, "Minimum amount is required"),
  maxAmount: z.string().min(1, "Maximum amount is required"),
  dailyRoi: z.string().min(1, "Daily ROI is required"),
  duration: z.string().min(1, "Duration is required"),
  status: z.enum(["active", "inactive"]),
});

type PlanFormData = z.infer<typeof planFormSchema>;

export default function InvestmentPlans() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<InvestmentPlan | null>(null);
  const { toast } = useToast();

  const { data: plans, isLoading } = useQuery({
    queryKey: ["/api/investment-plans"],
  });

  const form = useForm<PlanFormData>({
    resolver: zodResolver(planFormSchema),
    defaultValues: {
      title: "",
      minAmount: "",
      maxAmount: "",
      dailyRoi: "",
      duration: "",
      status: "active",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: PlanFormData) => {
      const response = await apiRequest("POST", "/api/investment-plans", {
        ...data,
        minAmount: parseFloat(data.minAmount),
        maxAmount: parseFloat(data.maxAmount),
        dailyRoi: parseFloat(data.dailyRoi),
        duration: parseInt(data.duration),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/investment-plans"] });
      setDialogOpen(false);
      form.reset();
      toast({
        title: "Success",
        description: "Investment plan created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create investment plan",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: PlanFormData }) => {
      const response = await apiRequest("PATCH", `/api/investment-plans/${id}`, {
        ...data,
        minAmount: parseFloat(data.minAmount),
        maxAmount: parseFloat(data.maxAmount),
        dailyRoi: parseFloat(data.dailyRoi),
        duration: parseInt(data.duration),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/investment-plans"] });
      setDialogOpen(false);
      setEditingPlan(null);
      form.reset();
      toast({
        title: "Success",
        description: "Investment plan updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update investment plan",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/investment-plans/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/investment-plans"] });
      toast({
        title: "Success",
        description: "Investment plan deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete investment plan",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: PlanFormData) => {
    if (editingPlan) {
      updateMutation.mutate({ id: editingPlan.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (plan: InvestmentPlan) => {
    setEditingPlan(plan);
    form.reset({
      title: plan.title,
      minAmount: plan.minAmount,
      maxAmount: plan.maxAmount,
      dailyRoi: plan.dailyRoi,
      duration: plan.duration.toString(),
      status: plan.status as "active" | "inactive",
    });
    setDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this plan?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleNewPlan = () => {
    setEditingPlan(null);
    form.reset();
    setDialogOpen(true);
  };

  if (isLoading) {
    return (
      <DashboardLayout pageTitle="Investment Plans">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading plans...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="Investment Plans">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Investment Plans</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleNewPlan} className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add New Plan</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingPlan ? "Edit Investment Plan" : "Create Investment Plan"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plan Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter plan title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="minAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Amount ($)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="maxAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Amount ($)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="dailyRoi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Daily ROI (%)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration (Days)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex space-x-2 pt-4">
                  <Button 
                    type="submit" 
                    disabled={createMutation.isPending || updateMutation.isPending}
                    className="flex-1"
                  >
                    {editingPlan ? "Update Plan" : "Create Plan"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setDialogOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {plans?.map((plan: InvestmentPlan) => (
          <Card key={plan.id} className="dashboard-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">{plan.title}</CardTitle>
                <Badge 
                  variant={plan.status === "active" ? "default" : "secondary"}
                  className={plan.status === "active" ? "bg-green-100 text-success-green dark:bg-green-900/20" : ""}
                >
                  {plan.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Min Amount:</span>
                  <span className="text-sm font-medium">${plan.minAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Max Amount:</span>
                  <span className="text-sm font-medium">${plan.maxAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Daily ROI:</span>
                  <span className="text-sm font-medium text-success-green">{plan.dailyRoi}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Duration:</span>
                  <span className="text-sm font-medium">{plan.duration} Days</span>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleEdit(plan)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDelete(plan.id)}
                  className="flex-1 text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {/* Add Plan Card */}
        <Card className="dashboard-card border-dashed">
          <CardContent className="flex flex-col items-center justify-center h-full min-h-[200px] text-center p-6">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
              <Plus className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Custom Plan</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create a custom investment plan with your own parameters
            </p>
            <Button onClick={handleNewPlan} size="sm">
              Configure Plan
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
