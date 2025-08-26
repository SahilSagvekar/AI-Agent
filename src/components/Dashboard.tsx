import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Bot, Phone, MessageSquare, BarChart3, Settings, Users, Clock, CheckCircle, AlertCircle, CreditCard, Calendar, DollarSign, Download, Eye } from "lucide-react";

interface DashboardProps {
  businessName: string;
  onEditTraining: () => void;
  onLogout: () => void;
}

export function Dashboard({ businessName, onEditTraining, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [accountSettings, setAccountSettings] = useState({
    businessName: businessName,
    email: "contact@business.com"
  });

  // Mock subscription data
  const subscriptionData = {
    plan: "Professional",
    status: "Active",
    price: 300, // $250 base + $50 for 1 additional location
    locations: 2,
    nextBilling: "2024-02-15",
    billingHistory: [
      { date: "2024-01-15", amount: 300, status: "Paid", invoice: "INV-001" },
      { date: "2023-12-15", amount: 250, status: "Paid", invoice: "INV-002" },
      { date: "2023-11-15", amount: 250, status: "Paid", invoice: "INV-003" }
    ],
    paymentMethod: {
      type: "Visa",
      last4: "4242",
      expiry: "12/27"
    }
  };

  // Mock data for demonstration
  const stats = {
    totalCalls: 127,
    callsToday: 8,
    avgResponseTime: "1.2s",
    satisfactionRate: 94,
    commonQuestions: [
      { question: "What are your hours?", count: 23 },
      { question: "How much does a wash cost?", count: 18 },
      { question: "Do you have change machines?", count: 15 },
      { question: "Is the laundromat open 24/7?", count: 12 },
      { question: "Can I pay with card?", count: 10 }
    ],
    recentCalls: [
      { time: "2:35 PM", question: "What time do you close?", resolved: true },
      { time: "1:42 PM", question: "Machine #3 ate my quarters", resolved: true },
      { time: "12:18 PM", question: "Do you have WiFi?", resolved: true },
      { time: "11:55 AM", question: "How much for large load?", resolved: true },
      { time: "11:22 AM", question: "Can I leave clothes overnight?", resolved: false }
    ]
  };

  const phoneNumbers = [
    { location: "Main Location", number: "+1 (555) 247-8901", status: "Active" },
    { location: "Downtown Branch", number: "+1 (555) 247-8902", status: "Active" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Bot className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">{businessName}</h1>
                <p className="text-sm text-muted-foreground">AI Assistant Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                AI Active
              </Badge>
              <Badge variant="secondary" className="hidden sm:flex">
                {subscriptionData.plan} Plan
              </Badge>
              <Button variant="outline" onClick={onEditTraining}>
                <Settings className="h-4 w-4 mr-2" />
                Edit Training
              </Button>
              <Button variant="ghost" onClick={onLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="calls">Call History</TabsTrigger>
            <TabsTrigger value="phones">Phone Numbers</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Total Calls</CardTitle>
                  <Phone className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalCalls}</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Calls Today</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.callsToday}</div>
                  <p className="text-xs text-muted-foreground">
                    Real-time count
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Avg Response</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.avgResponseTime}</div>
                  <p className="text-xs text-muted-foreground">
                    Lightning fast
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Satisfaction</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.satisfactionRate}%</div>
                  <p className="text-xs text-muted-foreground">
                    Customer rating
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Subscription Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Subscription Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Current Plan</span>
                      <Badge variant="outline">{subscriptionData.plan}</Badge>
                    </div>
                    <p className="text-2xl font-bold">${subscriptionData.price}/month</p>
                    <p className="text-xs text-muted-foreground">
                      ${subscriptionData.locations === 1 ? '250 base' : '250 base + $50 per additional location'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Status</span>
                      <Badge variant="outline" className="text-green-700 border-green-200">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        {subscriptionData.status}
                      </Badge>
                    </div>
                    <p className="text-sm">Next billing: {new Date(subscriptionData.nextBilling).toLocaleDateString()}</p>
                    <p className="text-xs text-muted-foreground">
                      {subscriptionData.locations} location{subscriptionData.locations > 1 ? 's' : ''}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-sm font-medium">Payment Method</span>
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4" />
                      <span className="text-sm">{subscriptionData.paymentMethod.type} •••• {subscriptionData.paymentMethod.last4}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Expires {subscriptionData.paymentMethod.expiry}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Common Questions */}
              <Card>
                <CardHeader>
                  <CardTitle>Most Asked Questions</CardTitle>
                  <CardDescription>
                    Top customer inquiries this month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.commonQuestions.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{item.question}</span>
                        <Badge variant="secondary">{item.count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Call Activity</CardTitle>
                  <CardDescription>
                    Latest customer interactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.recentCalls.map((call, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {call.resolved ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-yellow-500" />
                          )}
                          <div>
                            <p className="text-sm font-medium">{call.question}</p>
                            <p className="text-xs text-muted-foreground">{call.time}</p>
                          </div>
                        </div>
                        <Badge variant={call.resolved ? "default" : "secondary"}>
                          {call.resolved ? "Resolved" : "Pending"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  AI Assistant Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Knowledge Base</span>
                      <Badge variant="outline">Complete</Badge>
                    </div>
                    <Progress value={100} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Training data processed successfully
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Twilio Integration</span>
                      <Badge variant="outline" className="text-green-700 border-green-200">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        Connected
                      </Badge>
                    </div>
                    <Progress value={100} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Phone system operational
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Response Accuracy</span>
                      <Badge variant="outline">Excellent</Badge>
                    </div>
                    <Progress value={94} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      94% accuracy rate
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>
                  Detailed insights and performance metrics (coming soon)
                </CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground">
                    Advanced analytics dashboard will be available in the next update
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calls">
            <Card>
              <CardHeader>
                <CardTitle>Call History</CardTitle>
                <CardDescription>
                  Complete log of customer interactions
                </CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Phone className="h-16 w-16 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground">
                    Detailed call history and transcripts will be available soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="phones" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Phone Numbers
                </CardTitle>
                <CardDescription>
                  AI assistant phone numbers assigned to your locations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {phoneNumbers.map((phone, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">{phone.location}</h4>
                        <p className="text-sm text-muted-foreground font-mono">{phone.number}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-green-700 border-green-200">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                          {phone.status}
                        </Badge>
                        <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(phone.number)}>
                          Copy
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            {/* Current Subscription */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Current Subscription
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">{subscriptionData.plan} Plan</h3>
                      <p className="text-2xl font-bold">${subscriptionData.price}<span className="text-base font-normal text-muted-foreground">/month</span></p>
                      <p className="text-sm text-muted-foreground">
                        Base: $250 + {subscriptionData.locations - 1} additional location(s) at $50 each
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Status:</span>
                        <Badge variant="outline" className="text-green-700 border-green-200">Active</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Next billing:</span>
                        <span>{new Date(subscriptionData.nextBilling).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Locations:</span>
                        <span>{subscriptionData.locations}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Payment Method</h4>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="h-5 w-5" />
                          <div>
                            <p className="text-sm font-medium">{subscriptionData.paymentMethod.type} •••• {subscriptionData.paymentMethod.last4}</p>
                            <p className="text-xs text-muted-foreground">Expires {subscriptionData.paymentMethod.expiry}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">Update</Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button className="w-full">Upgrade Plan</Button>
                      <Button variant="outline" className="w-full">Add Location (+$50/month)</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Billing History */}
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>
                  Your payment history and invoices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Invoice</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscriptionData.billingHistory.map((bill) => (
                      <TableRow key={bill.invoice}>
                        <TableCell>{new Date(bill.date).toLocaleDateString()}</TableCell>
                        <TableCell>${bill.amount}</TableCell>
                        <TableCell>
                          <Badge variant={bill.status === 'Paid' ? 'default' : 'secondary'}>
                            {bill.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{bill.invoice}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-1">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="business-name">Business Name</Label>
                    <Input 
                      id="business-name" 
                      value={accountSettings.businessName} 
                      onChange={(e) => setAccountSettings(prev => ({ ...prev, businessName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={accountSettings.email}
                      onChange={(e) => setAccountSettings(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <Button>Update Account</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Danger Zone</CardTitle>
                  <CardDescription>
                    Irreversible and destructive actions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-destructive">Cancel Subscription</h4>
                    <p className="text-sm text-muted-foreground">
                      Your AI assistant will stop working and all data will be deleted.
                    </p>
                    <Button variant="destructive" size="sm">Cancel Subscription</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}