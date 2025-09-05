import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";
import { 
  Play, 
  Pause, 
  Download, 
  Search, 
  Filter, 
  Phone, 
  Clock, 
  Calendar,
  BarChart3,
  HeadphonesIcon,
  CheckCircle,
  AlertCircle,
  XCircle
} from "lucide-react";

interface Call {
  id: string;
  timestamp: string;
  caller: string;
  location: string;
  duration: string;
  status: 'resolved' | 'escalated' | 'missed';
  transcript: string;
  audioUrl: string;
  category: string;
  satisfaction?: number;
}

interface LocationStats {
  location: string;
  totalCalls: number;
  resolvedCalls: number;
  avgDuration: string;
  topCategory: string;
}

export function CallHistory() {
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("7days");
  const [statusFilter, setStatusFilter] = useState("all");
  const [playingCall, setPlayingCall] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Mock data - replace with real data
  const locations = [
    "All Locations",
    "Main Location", 
    "Downtown Branch",
    "Westside Location"
  ];

  const calls: Call[] = [
    {
      id: "call-001",
      timestamp: "2024-01-15 14:30:22",
      caller: "+1 (555) 123-4567",
      location: "Main Location",
      duration: "2:45",
      status: "resolved",
      transcript: "Customer asked about business hours and wash prices. AI provided accurate information about 6AM-11PM hours and $3.50 for regular wash.",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Mock audio URL
      category: "Hours & Pricing",
      satisfaction: 5
    },
    {
      id: "call-002", 
      timestamp: "2024-01-15 13:15:08",
      caller: "+1 (555) 987-6543",
      location: "Downtown Branch",
      duration: "4:12",
      status: "escalated",
      transcript: "Customer reported machine #3 took money but didn't start. AI apologized and provided refund process, then transferred to maintenance.",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      category: "Equipment Issue",
      satisfaction: 3
    },
    {
      id: "call-003",
      timestamp: "2024-01-15 12:08:44",
      caller: "+1 (555) 456-7890",
      location: "Main Location", 
      duration: "1:23",
      status: "resolved",
      transcript: "Quick question about accepting credit cards. AI confirmed card readers are available on all machines.",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      category: "Payment Methods",
      satisfaction: 5
    },
    {
      id: "call-004",
      timestamp: "2024-01-15 11:45:33",
      caller: "+1 (555) 234-5678",
      location: "Westside Location",
      duration: "0:00",
      status: "missed",
      transcript: "Call not answered - customer hung up before AI could respond.",
      audioUrl: "",
      category: "Missed Call"
    },
    {
      id: "call-005",
      timestamp: "2024-01-15 10:22:11",
      caller: "+1 (555) 345-6789",
      location: "Downtown Branch",
      duration: "3:18",
      status: "resolved",
      transcript: "Customer inquiry about drop-off service and pickup times. AI explained service availability and scheduling process.",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      category: "Services",
      satisfaction: 4
    }
  ];

  const locationStats: LocationStats[] = [
    {
      location: "Main Location",
      totalCalls: 47,
      resolvedCalls: 42,
      avgDuration: "2:34",
      topCategory: "Hours & Pricing"
    },
    {
      location: "Downtown Branch", 
      totalCalls: 38,
      resolvedCalls: 33,
      avgDuration: "3:12",
      topCategory: "Equipment Issues"
    },
    {
      location: "Westside Location",
      totalCalls: 29,
      resolvedCalls: 27,
      avgDuration: "2:08", 
      topCategory: "Services"
    }
  ];

  // Filter calls based on selected criteria
  const filteredCalls = calls.filter(call => {
    const matchesLocation = selectedLocation === "all" || call.location === selectedLocation;
    const matchesSearch = searchTerm === "" || 
      call.transcript.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.caller.includes(searchTerm) ||
      call.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || call.status === statusFilter;
    
    return matchesLocation && matchesSearch && matchesStatus;
  });

  const handlePlayPause = (callId: string, audioUrl: string) => {
    if (!audioUrl) return;
    
    if (playingCall === callId) {
      // Pause current audio
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlayingCall(null);
    } else {
      // Play new audio
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
      }
      setPlayingCall(callId);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'escalated':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'missed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      resolved: "default",
      escalated: "secondary", 
      missed: "destructive"
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      
      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);
      const handleEnded = () => setPlayingCall(null);
      
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', updateDuration);
      audio.addEventListener('ended', handleEnded);
      
      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  return (
    <div className="space-y-6">
      <audio ref={audioRef} style={{ display: 'none' }} />
      
      {/* Header Stats */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Calls</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calls.length}</div>
            <p className="text-xs text-muted-foreground">Last 7 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {calls.filter(c => c.status === 'resolved').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((calls.filter(c => c.status === 'resolved').length / calls.length) * 100)}% success rate
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Avg Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2:29</div>
            <p className="text-xs text-muted-foreground">Per call average</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Satisfaction</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.3</div>
            <p className="text-xs text-muted-foreground">Average rating</p>
          </CardContent>
        </Card>
      </div> */}

      <Tabs defaultValue="calls" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calls">Call History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="calls" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="Main Location">Main Location</SelectItem>
                      <SelectItem value="Downtown Branch">Downtown Branch</SelectItem>
                      <SelectItem value="Westside Location">Westside Location</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Time Period</Label>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="7days">Last 7 days</SelectItem>
                      <SelectItem value="30days">Last 30 days</SelectItem>
                      <SelectItem value="90days">Last 90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="escalated">Escalated</SelectItem>
                      <SelectItem value="missed">Missed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search calls..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call History Table */}
          <Card>
            <CardHeader>
              <CardTitle>Call Records</CardTitle>
              <CardDescription>
                {filteredCalls.length} calls found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Caller</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Recording</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCalls.map((call) => {
                    const { date, time } = formatTimestamp(call.timestamp);
                    const isPlaying = playingCall === call.id;
                    
                    return (
                      <TableRow key={call.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm font-medium">{time}</div>
                            <div className="text-xs text-muted-foreground">{date}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{call.caller}</TableCell>
                        <TableCell>{call.location}</TableCell>
                        <TableCell>{call.duration}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{call.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(call.status)}
                            {getStatusBadge(call.status)}
                          </div>
                        </TableCell>
                        <TableCell>
                          {call.audioUrl ? (
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handlePlayPause(call.id, call.audioUrl)}
                                className="h-8 w-8 p-0"
                              >
                                {isPlaying ? (
                                  <Pause className="h-4 w-4" />
                                ) : (
                                  <Play className="h-4 w-4" />
                                )}
                              </Button>
                              {isPlaying && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <HeadphonesIcon className="h-3 w-3" />
                                  <span>Playing</span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">No recording</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {call.audioUrl && (
                              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                                <Download className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Call Details */}
          {filteredCalls.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Call Transcript</CardTitle>
                <CardDescription>Latest call details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Call ID:</span> {filteredCalls[0].id}
                    </div>
                    <div>
                      <span className="font-medium">Satisfaction:</span> 
                      {filteredCalls[0].satisfaction ? ` ${filteredCalls[0].satisfaction}/5 stars` : ' Not rated'}
                    </div>
                  </div>
                  <Separator />
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm leading-relaxed">{filteredCalls[0].transcript}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          {/* Location Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Location Performance</CardTitle>
              <CardDescription>Call volume and resolution rates by location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {locationStats.map((location) => {
                  const resolvedRate = Math.round((location.resolvedCalls / location.totalCalls) * 100);
                  
                  return (
                    <div key={location.location} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{location.location}</h4>
                        <div className="text-sm text-muted-foreground">
                          {location.resolvedCalls}/{location.totalCalls} resolved ({resolvedRate}%)
                        </div>
                      </div>
                      <Progress value={resolvedRate} className="h-2" />
                      <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div>Total: {location.totalCalls}</div>
                        <div>Avg: {location.avgDuration}</div>
                        <div>Top: {location.topCategory}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Call Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Call Categories</CardTitle>
              <CardDescription>Most common inquiry types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { category: "Hours & Pricing", count: 23, percentage: 35 },
                  { category: "Equipment Issues", count: 18, percentage: 28 },
                  { category: "Services", count: 15, percentage: 23 },
                  { category: "Payment Methods", count: 9, percentage: 14 }
                ].map((item) => (
                  <div key={item.category} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="text-sm font-medium">{item.category}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm text-muted-foreground">{item.count} calls</div>
                      <Badge variant="outline">{item.percentage}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}