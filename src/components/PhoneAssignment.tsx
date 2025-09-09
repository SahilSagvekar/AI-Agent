import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Phone, MapPin, Plus, Edit, Save, X, CheckCircle } from "lucide-react";

interface PhoneNumberAssignment {
  id: string;
  phoneNumber: string;
  location: string;
  address: string;
  status: 'active' | 'pending' | 'setup';
  assignedDate: string;
}

interface PhoneAssignmentProps {
  businessName: string;
  onComplete: () => void;
}

export function PhoneAssignment({ businessName, onComplete }: PhoneAssignmentProps) {
  const [assignments, setAssignments] = useState<PhoneNumberAssignment[]>([]);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({ location: '', address: '' });
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newLocation, setNewLocation] = useState({ location: '', address: '' });
  const [locations, setLocations] = useState<any[]>([]);
  const [loadingLocations, setLoadingLocations] = useState(true);

  useEffect(() => {
  async function fetchLocations() {
    try {
      const res = await fetch("/api/form");
      if (res.ok) {
        const data = await res.json();

        // Map data to PhoneNumberAssignment[] if needed
        const mapped = data.map((loc: any) => ({
          id: loc.id.toString(),
          phoneNumber: loc.twilioPhone || '', // adjust as needed
          location: loc.locationName || loc.location || '',
          address: loc.address || '',
          status: 'active' as const, // or map real status from data
          assignedDate: loc.assignedDate || new Date().toISOString().split('T')[0],
        }));
        setAssignments(mapped);
      } else {
        setAssignments([]);
      }
    } catch (e) {
      setAssignments([]);
    }
    setLoadingLocations(false);
  }

  fetchLocations();
}, []);

  const handleEdit = (assignment: PhoneNumberAssignment) => {
    setEditingId(assignment.id);
    setEditValues({ location: assignment.location, address: assignment.address });
  };

  const handleSave = (id: string) => {
    setAssignments(prev => prev.map(assignment => 
      assignment.id === id 
        ? { ...assignment, location: editValues.location, address: editValues.address }
        : assignment
    ));
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValues({ location: '', address: '' });
  };

  const handleAddNew = () => {
    if (newLocation.location && newLocation.address) {
      const newAssignment: PhoneNumberAssignment = {
        id: Date.now().toString(),
        phoneNumber: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
        location: newLocation.location,
        address: newLocation.address,
        status: 'setup',
        assignedDate: new Date().toISOString().split('T')[0]
      };
      setAssignments(prev => [...prev, newAssignment]);
      setNewLocation({ location: '', address: '' });
      setIsAddingNew(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'setup': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'pending': return 'Pending Setup';
      case 'setup': return 'In Setup';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Phone className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Phone Number Assignment</h1>
              <p className="text-muted-foreground">
                Your AI assistant phone numbers for {businessName}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Success Message */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="font-medium text-green-900">Training Complete!</h3>
                <p className="text-green-700 text-sm">
                  Your AI assistant has been trained and is ready to handle customer calls.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Phone Numbers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Assigned Phone Numbers
              </span>
              {/* <Button
                onClick={() => setIsAddingNew(true)}
                size="sm"
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Location
              </Button> */}
            </CardTitle>
            <CardDescription>
              These phone numbers are connected to your AI assistant. Share them with customers or use them to replace your existing business numbers.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    {editingId === assignment.id ? (
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <Label htmlFor={`location-${assignment.id}`}>Location Name</Label>
                          <Input
                            id={`location-${assignment.id}`}
                            value={editValues.location}
                            onChange={(e) => setEditValues(prev => ({ ...prev, location: e.target.value }))}
                            placeholder="Main Location"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor={`address-${assignment.id}`}>Address</Label>
                          <Input
                            id={`address-${assignment.id}`}
                            value={editValues.address}
                            onChange={(e) => setEditValues(prev => ({ ...prev, address: e.target.value }))}
                            placeholder="123 Main St, City, State"
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" onClick={() => handleSave(assignment.id)}>
                            <Save className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleCancel}>
                            <X className="h-4 w-4 mr-1" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center space-x-3">
                          <h3 className="font-medium">{assignment.location}</h3>
                          <Badge 
                            variant="outline" 
                            className="flex items-center gap-1"
                          >
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(assignment.status)}`}></div>
                            {getStatusText(assignment.status)}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{assignment.address}</span>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {editingId !== assignment.id && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(assignment)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Phone Number</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                        {assignment.phoneNumber}
                      </code>
                      <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(assignment.phoneNumber)}>
                        Copy
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Assigned Date</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(assignment.assignedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Add New Location Form */}
            {isAddingNew && (
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 space-y-4">
                <h3 className="font-medium">Add New Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="new-location">Location Name</Label>
                    <Input
                      id="new-location"
                      value={newLocation.location}
                      onChange={(e) => setNewLocation(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Downtown Branch"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new-address">Address</Label>
                    <Input
                      id="new-address"
                      value={newLocation.address}
                      onChange={(e) => setNewLocation(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="456 Oak St, City, State"
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleAddNew} disabled={!newLocation.location || !newLocation.address}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Location ($50/month)
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                    Cancel
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Each additional location costs $50/month and will be added to your next bill.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">1. Update Your Business Listings</h4>
              <p className="text-sm text-muted-foreground">
                Replace your current phone numbers with the AI assistant numbers in your Google Business Profile, website, and marketing materials.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">2. Test the System</h4>
              <p className="text-sm text-muted-foreground">
                Call the numbers to test how your AI assistant responds. You can refine the training data anytime from your dashboard.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">3. Monitor Performance</h4>
              <p className="text-sm text-muted-foreground">
                Use your dashboard to track calls, customer satisfaction, and optimize your AI assistant's responses.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end pt-6 border-t">
          <Button onClick={onComplete} className="flex items-center gap-2">
            Continue to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}