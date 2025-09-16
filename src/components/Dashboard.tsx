import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { CallHistory } from "./CallHistory";
import { useRouter } from "next/navigation";
import { LocationEditor } from "./LocationEditor";
import {
  Bot,
  Phone,
  MessageSquare,
  BarChart3,
  Settings,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  CreditCard,
  Calendar,
  DollarSign,
  Download,
  Eye,
  MapPin,
  Edit,
} from "lucide-react";

interface DashboardProps {
  businessName: string;
  onEditTraining: () => void;
  onLogout: () => void;
}

export function Dashboard({
  businessName,
  onEditTraining,
  onLogout,
}: DashboardProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [accountSettings, setAccountSettings] = useState({
    businessName: businessName,
    email: "contact@business.com",
  });
  const [locationEditorOpen, setLocationEditorOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [locations, setLocations] = useState<any[]>([]);
  const [loadingLocations, setLoadingLocations] = useState(true);

  // Mock subscription data
  const subscriptionData = {
    plan: "Professional",
    status: "Active",
    price: 220, // $175 base + $45 for 1 additional location
    locations: 2,
    nextBilling: "2024-02-15",
    billingHistory: [
      { date: "2024-01-15", amount: 220, status: "Paid", invoice: "INV-001" },
      { date: "2023-12-15", amount: 175, status: "Paid", invoice: "INV-002" },
      { date: "2023-11-15", amount: 175, status: "Paid", invoice: "INV-003" },
    ],
    paymentMethod: {
      type: "Visa",
      last4: "4242",
      expiry: "12/27",
    },
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
      { question: "Can I pay with card?", count: 10 },
    ],
    recentCalls: [
      { time: "2:35 PM", question: "What time do you close?", resolved: true },
      {
        time: "1:42 PM",
        question: "Machine #3 ate my quarters",
        resolved: true,
      },
      { time: "12:18 PM", question: "Do you have WiFi?", resolved: true },
      {
        time: "11:55 AM",
        question: "How much for large load?",
        resolved: true,
      },
      {
        time: "11:22 AM",
        question: "Can I leave clothes overnight?",
        resolved: false,
      },
    ],
  };

  useEffect(() => {
    async function fetchLocations() {
      try {
        const res = await fetch("/api/form");
        if (res.ok) {
          const data = await res.json();
          setLocations(data);
        } else {
          setLocations([]); // or handle error appropriately
        }
      } catch (e) {
        setLocations([]);
      }
      setLoadingLocations(false);
    }

    fetchLocations();
  }, []);

  const handleEditLocation = (locationName: string) => {
    setSelectedLocation(locationName);
    setLocationEditorOpen(true);
  };

  const navigateToEditTraining = (locationId: any) => {
      router.push(`/edit-training?locationId=${locationId}`);
}

  const handleLocationSave = async (updatedData: any) => {
    try {
      const res = await fetch("api/form", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
    } catch (error) {
      console.error("Error in handleAddLocation:", error);
      // alert('An unexpected error occurred.');
    }
  };

  const handleAddLocation = async (locationId: any) => {

    const flowType = "ADD_LOCATION";

      console.log("flowType:", flowType);
      // router.push("/training");
      // router.push(`/training?flowType=${encodeURIComponent(flowType)}`);
router.push(`/add-training?locationId=${locationId}&flowType=${encodeURIComponent(flowType)}`);
  };

  const handleAddNumber = async () => {
    const flowType = "NEW_NUMBER";

    console.log("flowType:", flowType);
    // router.push("/training");
    router.push(`/training?flowType=${encodeURIComponent(flowType)}`);
  };

  const locationName = locations.length > 0 ? locations[0].locationName : "";
  const locationEmail = locations.length > 0 ? locations[0].email : "";

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
                <h1 className="text-xl font-semibold">{locationName}</h1>
                {/* <h1 className="text-xl font-semibold">{businessName}</h1> */}
                <p className="text-sm text-muted-foreground">
                  AI Assistant Dashboard
                </p>
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
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {/* <TabsTrigger value="analytics">Analytics</TabsTrigger> */}
            <TabsTrigger value="calls">Call History</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
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
                  <div className="text-2xl font-bold">
                    {stats.avgResponseTime}
                  </div>
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
                  <div className="text-2xl font-bold">
                    {stats.satisfactionRate}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Customer rating
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Subscription Overview */}
            {/* <Card>
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
                      ${subscriptionData.locations === 1 ? '175 base' : '175 base + $45 per additional location'}
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
            </Card> */}

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
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
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
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          {call.resolved ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-yellow-500" />
                          )}
                          <div>
                            <p className="text-sm font-medium">
                              {call.question}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {call.time}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={call.resolved ? "default" : "secondary"}
                        >
                          {call.resolved ? "Resolved" : "Pending"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Status */}
            {/* <Card>
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
                      <Badge
                        variant="outline"
                        className="text-green-700 border-green-200"
                      >
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
            </Card> */}
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
                    Advanced analytics dashboard will be available in the next
                    update
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calls">
            <CallHistory />
          </TabsContent>

          {/* locations */}
          <TabsContent value="locations" className="space-y-6">
            <Card>
              {/* <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Locations
                </CardTitle>
                <CardDescription>
                  Manage your laundromat locations and their AI assistant training
                </CardDescription>
              </CardHeader> */}

              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Locations
                  </CardTitle>

                  <Button className="text-sm px-3 py-1 rounded-md bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => handleAddLocation(locationIdAdd)}>
                    <Settings className="h-4 w-4 mr-2" />
                    Add Location
                  </Button>
                </div>

                <CardDescription>
                  Manage your laundromat locations and their AI assistant
                  training
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {locations.map((location) => (
                    <div
                      key={location.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-medium">
                            {location.locationName}
                          </h4>
                          <Badge
                            variant="outline"
                            className="text-green-700 border-green-200"
                          >
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                            {location.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {location.address}
                        </p>
                        <p className="text-sm text-muted-foreground font-mono">
                          {location.twilioPhone}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last updated:{" "}
                          {new Date(location.lastUpdated).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigateToEditTraining(location.id)}
                          className="flex items-center gap-1"
                        >
                          <Edit className="h-4 w-4" />
                          Edit Location
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            navigator.clipboard.writeText(location.twilioPhone)
                          }
                        >
                          Copy Phone
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            {/* Customer Management */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Customer List */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="h-5 w-5" />
                          Customer Database
                        </CardTitle>
                        <CardDescription>
                          Manage customer phone numbers and engagement
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="text-green-700 border-green-200">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        {[
                          { phone: "(555) 123-4567", name: "Sarah Johnson", lastVisit: "2024-01-15", visits: 12, status: "Active" },
                          { phone: "(555) 234-5678", name: "Mike Chen", lastVisit: "2024-01-14", visits: 8, status: "Active" },
                          { phone: "(555) 345-6789", name: "Lisa Rodriguez", lastVisit: "2024-01-12", visits: 15, status: "Active" },
                          { phone: "(555) 456-7890", name: "David Kim", lastVisit: "2024-01-10", visits: 5, status: "New" },
                          { phone: "(555) 567-8901", name: "Emma Thompson", lastVisit: "2023-12-28", visits: 3, status: "Inactive" }
                        ].length} Total Customers
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Search and Add Customer */}
                      <div className="flex gap-2">
                        <Input placeholder="Search customers by phone or name..." className="flex-1" />
                        <Button>Add Customer</Button>
                      </div>

                      {/* Customer Table */}
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Visits</TableHead>
                            <TableHead>Last Visit</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[
                            { phone: "(555) 123-4567", name: "Sarah Johnson", lastVisit: "2024-01-15", visits: 12, status: "Active" },
                            { phone: "(555) 234-5678", name: "Mike Chen", lastVisit: "2024-01-14", visits: 8, status: "Active" },
                            { phone: "(555) 345-6789", name: "Lisa Rodriguez", lastVisit: "2024-01-12", visits: 15, status: "Active" },
                            { phone: "(555) 456-7890", name: "David Kim", lastVisit: "2024-01-10", visits: 5, status: "New" },
                            { phone: "(555) 567-8901", name: "Emma Thompson", lastVisit: "2023-12-28", visits: 3, status: "Inactive" }
                          ].map((customer, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <div>
                                  <p className="font-medium">{customer.name}</p>
                                  <p className="text-sm text-muted-foreground">Customer #{index + 1}</p>
                                </div>
                              </TableCell>
                              <TableCell className="font-mono">{customer.phone}</TableCell>
                              <TableCell>{customer.visits}</TableCell>
                              <TableCell>{new Date(customer.lastVisit).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <Badge variant={customer.status === 'Active' ? 'default' : customer.status === 'New' ? 'secondary' : 'outline'}>
                                  {customer.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end space-x-1">
                                  <Button size="sm" variant="outline">
                                    <MessageSquare className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
               {/* SMS Blast Panel */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      SMS Blast
                    </CardTitle>
                    <CardDescription>
                      Send messages to your customers
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="recipients">Recipients</Label>
                      <select className="w-full p-2 border rounded-md">
                        <option>All Active Customers (3)</option>
                        <option>All Customers (5)</option>
                        <option>New Customers Only (1)</option>
                        <option>Inactive Customers (1)</option>
                        <option>Custom Selection</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <textarea 
                        id="message"
                        placeholder="Enter your message here..."
                        className="w-full p-2 border rounded-md h-24 resize-none"
                        maxLength={160}
                      />
                      <p className="text-xs text-muted-foreground text-right">0/160 characters</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Quick Templates</Label>
                      <div className="space-y-1">
                        <Button size="sm" variant="outline" className="w-full justify-start text-left h-auto p-2">
                          <div className="text-left">
                            <p className="font-medium">Promotion Alert</p>
                            <p className="text-xs text-muted-foreground">20% off today only!</p>
                          </div>
                        </Button>
                        <Button size="sm" variant="outline" className="w-full justify-start text-left h-auto p-2">
                          <div className="text-left">
                            <p className="font-medium">Maintenance Notice</p>
                            <p className="text-xs text-muted-foreground">Temporary closure info</p>
                          </div>
                        </Button>
                        <Button size="sm" variant="outline" className="w-full justify-start text-left h-auto p-2">
                          <div className="text-left">
                            <p className="font-medium">Thank You</p>
                            <p className="text-xs text-muted-foreground">Appreciation message</p>
                          </div>
                        </Button>
                      </div>
                    </div>

                    <Button className="w-full" style={{ backgroundColor: '#7851A9' }}>
                      Send SMS Blast
                    </Button>
                  </CardContent>
                </Card>

                {/* Customer Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <p className="text-2xl font-bold">5</p>
                        <p className="text-sm text-muted-foreground">Total Customers</p>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <p className="text-2xl font-bold">3</p>
                        <p className="text-sm text-muted-foreground">Active This Month</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Engagement Rate</span>
                        <span>78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Avg Visits/Customer</span>
                        <span>8.6</span>
                      </div>
                      <Progress value={86} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
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
                      <h3 className="font-medium">
                        {subscriptionData.plan} Plan
                      </h3>
                      <p className="text-2xl font-bold">
                        ${subscriptionData.price}
                        <span className="text-base font-normal text-muted-foreground">
                          /month
                        </span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Base: $175 + {subscriptionData.locations - 1} additional
                        location(s) at $45 each
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Status:</span>
                        <Badge
                          variant="outline"
                          className="text-green-700 border-green-200"
                        >
                          Active
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Next billing:</span>
                        <span>
                          {new Date(
                            subscriptionData.nextBilling
                          ).toLocaleDateString()}
                        </span>
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
                            <p className="text-sm font-medium">
                              {subscriptionData.paymentMethod.type} ••••{" "}
                              {subscriptionData.paymentMethod.last4}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Expires {subscriptionData.paymentMethod.expiry}
                            </p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Update
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button onClick={handleAddNumber} className="w-full">Add Phone Number (+$85/month)</Button>
                      {/* Biling add location */}
                      <Button
                        // onClick={handleAddNumber}
                        variant="outline"
                        className="w-full"
                      >
                        Add Location (+$45/month)
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Billing History */}
            {/* <Card>
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
                        <TableCell>
                          {new Date(bill.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>${bill.amount}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              bill.status === "Paid" ? "default" : "secondary"
                            }
                          >
                            {bill.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {bill.invoice}
                        </TableCell>
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
            </Card> */}
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
                      value={locationName}
                      onChange={(e) =>
                        setAccountSettings((prev) => ({
                          ...prev,
                          businessName: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={locationEmail}
                      onChange={(e) =>
                        setAccountSettings((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
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
                    <h4 className="font-medium text-destructive">
                      Cancel Subscription
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Your AI assistant will stop working and all data will be
                      deleted.
                    </p>
                    <Button variant="destructive" size="sm">
                      Cancel Subscription
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Location Editor Dialog */}
      <LocationEditor
        isOpen={locationEditorOpen}
        onClose={() => setLocationEditorOpen(false)}
        locationName={selectedLocation}
        onSave={handleLocationSave}
      />

      {/* <EditAITrainingForm initialData={initialData} onComplete={handleTrainingComplete} /> */}
    </div>
  );
}
