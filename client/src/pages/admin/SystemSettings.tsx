import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Smartphone, Building2 } from "lucide-react";

const securityFormSchema = z.object({
  ipWhitelist: z.string(),
  twoFactorAuth: z.boolean(),
});

type SecurityFormData = z.infer<typeof securityFormSchema>;

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: any;
  enabled: boolean;
  color: string;
}

export default function SystemSettings() {
  const { toast } = useToast();
  
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "jazzcash",
      name: "JazzCash",
      description: "Mobile payment gateway",
      icon: Smartphone,
      enabled: true,
      color: "text-success-green"
    },
    {
      id: "easypaisa",
      name: "Easypaisa",
      description: "Mobile payment gateway",
      icon: Smartphone,
      enabled: true,
      color: "text-primary"
    },
    {
      id: "bank",
      name: "Bank Transfer",
      description: "Direct bank transfers",
      icon: Building2,
      enabled: false,
      color: "text-purple-main"
    }
  ]);

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false
  });

  const securityForm = useForm<SecurityFormData>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      ipWhitelist: "192.168.1.100\n10.0.0.5",
      twoFactorAuth: true,
    },
  });

  const onSecuritySubmit = (data: SecurityFormData) => {
    console.log("Security settings:", data);
    toast({
      title: "Success",
      description: "Security settings updated successfully",
    });
  };

  const togglePaymentMethod = (id: string) => {
    setPaymentMethods(prev => 
      prev.map(method => 
        method.id === id ? { ...method, enabled: !method.enabled } : method
      )
    );
    toast({
      title: "Success",
      description: "Payment method settings updated",
    });
  };

  const toggleNotification = (type: 'email' | 'sms') => {
    setNotifications(prev => ({ ...prev, [type]: !prev[type] }));
    toast({
      title: "Success",
      description: "Notification settings updated",
    });
  };

  return (
    <DashboardLayout pageTitle="System Settings">
      <h2 className="text-2xl font-bold text-foreground mb-6">System Settings</h2>
      
      <div className="space-y-6">
        {/* Payment Methods */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <div key={method.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${
                        method.id === 'jazzcash' ? 'bg-green-100 dark:bg-green-900/20' :
                        method.id === 'easypaisa' ? 'bg-blue-100 dark:bg-blue-900/20' :
                        'bg-purple-100 dark:bg-purple-900/20'
                      } rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${method.color}`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{method.name}</h4>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={method.enabled}
                      onCheckedChange={() => togglePaymentMethod(method.id)}
                    />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...securityForm}>
              <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-4">
                <FormField
                  control={securityForm.control}
                  name="ipWhitelist"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>IP Whitelist</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter allowed IP addresses, one per line" 
                          rows={3} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={securityForm.control}
                  name="twoFactorAuth"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <div>
                          <FormLabel>Two-Factor Authentication</FormLabel>
                          <p className="text-sm text-muted-foreground">Require 2FA for admin login</p>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Save Security Settings</Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">Email Notifications</h4>
                  <p className="text-sm text-muted-foreground">Receive email alerts for new deposits/withdrawals</p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={() => toggleNotification('email')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">SMS Notifications</h4>
                  <p className="text-sm text-muted-foreground">Receive SMS alerts for critical actions</p>
                </div>
                <Switch
                  checked={notifications.sms}
                  onCheckedChange={() => toggleNotification('sms')}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Information */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">System Version</p>
                <p className="font-medium text-foreground">HYIP Admin v2.1.0</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="font-medium text-foreground">January 15, 2024</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Database Status</p>
                <p className="font-medium text-success-green">Connected</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Server Status</p>
                <p className="font-medium text-success-green">Online</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Backup & Maintenance */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Backup & Maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">Database Backup</h4>
                  <p className="text-sm text-muted-foreground">Last backup: January 15, 2024 at 2:00 AM</p>
                </div>
                <Button variant="outline">Create Backup</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">System Maintenance</h4>
                  <p className="text-sm text-muted-foreground">Schedule system maintenance window</p>
                </div>
                <Button variant="outline">Schedule Maintenance</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">Clear Cache</h4>
                  <p className="text-sm text-muted-foreground">Clear system cache to improve performance</p>
                </div>
                <Button variant="outline">Clear Cache</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
