import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  MapPin,
  Edit,
  Save,
  X,
  Plus,
  Copy,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import image2 from "@/assets/Logo files/SVG/Logo_5.svg"
import Image from "next/image";

interface PhoneNumberAssignment {
  id: string;
  phoneNumber: string;
  location: string;
  address: string;
  status: "active" | "pending" | "setup";
  assignedDate: string;
}

interface PhoneAssignmentProps {
  businessName: string;
  onComplete: () => void;
}

export function PhoneAssignment({ businessName, onComplete }: PhoneAssignmentProps) {
  const [assignments, setAssignments] = useState<PhoneNumberAssignment[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({ location: "", address: "" });
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newLocation, setNewLocation] = useState({ location: "", address: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/form");
        if (res.ok) {
          const data = await res.json();
          const mapped = data.map((loc: any) => ({
            id: loc.id.toString(),
            phoneNumber: (loc.twilioPhone?.replace(/[^\d+]/g, '')),
            location: loc.locationName || "Main Branch",
            address: loc.address || "123 Main St, New York, NY",
            status: "active" as const,
            assignedDate:
              loc.assignedDate || new Date().toISOString().split("T")[0],
          }));
          setAssignments(mapped);
        } else setAssignments([]);
      } catch {
        setAssignments([]);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleSave = (id: string) => {
    setAssignments((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, location: editValues.location, address: editValues.address }
          : a
      )
    );
    setEditingId(null);
  };

  const handleAddNew = () => {
    const newAssignment: PhoneNumberAssignment = {
      id: Date.now().toString(),
      phoneNumber: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(
        1000 + Math.random() * 9000
      )}`,
      location: newLocation.location,
      address: newLocation.address,
      status: "setup",
      assignedDate: new Date().toISOString().split("T")[0],
    };
    setAssignments((prev) => [...prev, newAssignment]);
    setNewLocation({ location: "", address: "" });
    setIsAddingNew(false);
  };

  const statusColors = {
    active: "bg-green-100 text-green-700 border-green-300",
    pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
    setup: "bg-blue-100 text-blue-700 border-blue-300",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      {/* Header */}
      <header className="border-b bg-white/70 backdrop-blur-md sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3 py-2">
            {/* Logo */}
            <div className="flex items-center -ml-45 h-10 mr-0 pr-0">
              <Image
                src={image2}
                alt="ConnectAI Logo"
                width={150}
                height={80}
                className="object-contain bg-transparent mr-0 pr-0"
              />
            </div>

            {/* Title */}
            <div className="ml-0 pl-0">
              <h1 className="text-xl font-semibold tracking-tight leading-tight ml-0 pl-0">
                Connect AI Phone Number Management
              </h1>
              <p className="text-gray-500 text-sm leading-none mt-1">
                {/* Phone management for {businessName} */}
              </p>
            </div>
          </div>

          <Button
            className="rounded-full bg-black ml-20 pl-20 hover:bg-gray-900 text-white px-6"
            onClick={onComplete}
          >
            Dashboard <ArrowRight className="h-4 w-4 ml- " />
          </Button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-8 py-12">
        {/* Left Column — Overview */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-md border border-gray-100"
          >
            <div className="flex items-start gap-3">
              <div className="bg-green-100 text-green-700 p-2 rounded-lg">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">ConnectAI Active</h2>
                <p className="text-sm text-gray-600">
                  Your AI system is live and ready for customer calls.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Next Steps</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>✅ Update your Google Business and website numbers.</li>
              <li>📞 Call to test AI’s greeting and behavior.</li>
              <li>📊 Review performance metrics in your dashboard.</li>
            </ul>
          </div>
        </div>

        {/* Right Column — Phone Assignments */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Assigned Phone Numbers</h2>
            <Button
              variant="default"
              className="rounded-full px-6 flex items-center justify-center"
              onClick={() => setIsAddingNew(true)}
            >
              <Plus className="h-4 w-4 " />
              <div className="pr-3">Add Location</div>
              
            </Button>
          </div>

          {loading ? (
            <p className="text-center text-gray-500 py-8">Loading...</p>
          ) : assignments.length === 0 ? (
            <div className="text-center py-12 border rounded-2xl bg-white shadow-sm text-gray-500">
              No phone numbers assigned yet.
            </div>
          ) : (
            <div className="space-y-5">
              {assignments.map((assignment, index) => (
                <motion.div
                  key={assignment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all"
                >
                  {/* Card Body */}
                  <div className="flex flex-col gap-4">
                    {/* Top Row: Left (title/status/address or edit form) / Right (phone/copy) */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      {/* Left side */}
                      <div className="space-y-1">
                        {editingId === assignment.id ? (
                          <div className="space-y-3">
                            <div>
                              <Label>Location</Label>
                              <Input
                                value={editValues.location}
                                onChange={(e) =>
                                  setEditValues((p) => ({
                                    ...p,
                                    location: e.target.value,
                                  }))
                                }
                              />
                            </div>
                            <div>
                              <Label>Address</Label>
                              <Input
                                value={editValues.address}
                                onChange={(e) =>
                                  setEditValues((p) => ({
                                    ...p,
                                    address: e.target.value,
                                  }))
                                }
                              />
                            </div>
                            <div className="flex gap-2 pt-2">
                              <Button
                                size="sm"
                                onClick={() => handleSave(assignment.id)}
                              >
                                <Save className="h-4 w-4 mr-1" /> Save
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingId(null)}
                              >
                                <X className="h-4 w-4 mr-1" /> Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                              {assignment.location}
                              <Badge
                                variant="outline"
                                className={`border px-2 py-0.5 text-xs rounded-full ${
                                  statusColors[assignment.status]
                                }`}
                              >
                                {assignment.status.toUpperCase()}
                              </Badge>
                            </h3>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <MapPin className="h-4 w-4" />{" "}
                              {assignment.address}
                            </p>
                          </>
                        )}
                      </div>
                      {/* Right side: phone & copy */}
                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <code className="bg-gray-100 px-2 py-1 rounded-md text-sm">
                          {assignment.phoneNumber}
                        </code>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            navigator.clipboard.writeText(
                              assignment.phoneNumber
                            )
                          }
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {/* Footer: date bottom-left, edit bottom-right */}
                    <div className="mt-1 pt-3 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <p className="text-sm text-gray-600">
                        Assigned on{" "}
                        <span className="font-medium">
                          {new Date(
                            assignment.assignedDate
                          ).toLocaleDateString()}
                        </span>
                      </p>
                      {editingId !== assignment.id && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="sm:ml-auto w-40"
                          onClick={() => {
                            setEditingId(assignment.id);
                            setEditValues({
                              location: assignment.location,
                              address: assignment.address,
                            });
                          }}
                        >
                          <Edit className="h-4 mr-1 w-4" /> Edit Training
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              {/* ))} */}
            </div>
          )}

          {/* Add New */}
          {isAddingNew && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border-2 border-dashed border-gray-300 bg-white rounded-2xl p-6 space-y-4"
            >
              <h3 className="text-lg font-semibold">Add New Location</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="Location Name"
                  value={newLocation.location}
                  onChange={(e) =>
                    setNewLocation((p) => ({ ...p, location: e.target.value }))
                  }
                />
                <Input
                  placeholder="Address"
                  value={newLocation.address}
                  onChange={(e) =>
                    setNewLocation((p) => ({ ...p, address: e.target.value }))
                  }
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleAddNew}
                  disabled={!newLocation.location || !newLocation.address}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Location ($50/month)
                </Button>
                <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                  Cancel
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}



// import { useState, useEffect } from "react";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
// import { Badge } from "./ui/badge";
// import { Separator } from "./ui/separator";
// import { Phone, MapPin, Plus, Edit, Save, X, CheckCircle } from "lucide-react";

// interface PhoneNumberAssignment {
//   id: string;
//   phoneNumber: string;
//   location: string;
//   address: string;
//   status: 'active' | 'pending' | 'setup';
//   assignedDate: string;
// }

// interface PhoneAssignmentProps {
//   businessName: string;
//   onComplete: () => void;
// }

// export function PhoneAssignment({ businessName, onComplete }: PhoneAssignmentProps) {
//   const [assignments, setAssignments] = useState<PhoneNumberAssignment[]>([]);
  
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [editValues, setEditValues] = useState({ location: '', address: '' });
//   const [isAddingNew, setIsAddingNew] = useState(false);
//   const [newLocation, setNewLocation] = useState({ location: '', address: '' });
//   const [locations, setLocations] = useState<any[]>([]);
//   const [loadingLocations, setLoadingLocations] = useState(true);

//   useEffect(() => {
//   async function fetchLocations() {
//     try {
//       const res = await fetch("/api/form");
//       if (res.ok) {
//         const data = await res.json();

//         // Map data to PhoneNumberAssignment[] if needed
//         const mapped = data.map((loc: any) => ({
//           id: loc.id.toString(),
//           phoneNumber: (loc.twilioPhone?.replace(/[^\d+]/g, '')) || '', // adjust as needed
//           location: loc.locationName || loc.location || '',
//           address: loc.address || '',
//           status: 'active' as const, // or map real status from data
//           assignedDate: loc.assignedDate || new Date().toISOString().split('T')[0],
//         }));
//         setAssignments(mapped);
//       } else {
//         setAssignments([]);
//       }
//     } catch (e) {
//       setAssignments([]);
//     }
//     setLoadingLocations(false);
//   }

//   fetchLocations();
// }, []);

//   const handleEdit = (assignment: PhoneNumberAssignment) => {
//     setEditingId(assignment.id);
//     setEditValues({ location: assignment.location, address: assignment.address });
//   };

//   const handleSave = (id: string) => {
//     setAssignments(prev => prev.map(assignment => 
//       assignment.id === id 
//         ? { ...assignment, location: editValues.location, address: editValues.address }
//         : assignment
//     ));
//     setEditingId(null);
//   };

//   const handleCancel = () => {
//     setEditingId(null);
//     setEditValues({ location: '', address: '' });
//   };

//   const handleAddNew = () => {
//     if (newLocation.location && newLocation.address) {
//       const newAssignment: PhoneNumberAssignment = {
//         id: Date.now().toString(),
//         phoneNumber: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
//         location: newLocation.location,
//         address: newLocation.address,
//         status: 'setup',
//         assignedDate: new Date().toISOString().split('T')[0]
//       };
//       setAssignments(prev => [...prev, newAssignment]);
//       setNewLocation({ location: '', address: '' });
//       setIsAddingNew(false);
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'active': return 'bg-green-500';
//       case 'pending': return 'bg-yellow-500';
//       case 'setup': return 'bg-blue-500';
//       default: return 'bg-gray-500';
//     }
//   };

//   const getStatusText = (status: string) => {
//     switch (status) {
//       case 'active': return 'Active';
//       case 'pending': return 'Pending Setup';
//       case 'setup': return 'In Setup';
//       default: return 'Unknown';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="border-b bg-card">
//         <div className="max-w-4xl mx-auto px-6 py-6">
//           <div className="flex items-center space-x-4">
//             <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
//               <Phone className="h-6 w-6 text-primary-foreground" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-semibold">Phone Number Assignment</h1>
//               <p className="text-muted-foreground">
//                 Your AI assistant phone numbers for {businessName}
//               </p>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-4xl mx-auto p-6 space-y-6">
//         {/* Success Message */}
//         <Card className="border-green-200 bg-green-50">
//           <CardContent className="pt-6">
//             <div className="flex items-center space-x-3">
//               <CheckCircle className="h-6 w-6 text-green-600" />
//               <div>
//                 <h3 className="font-medium text-green-900">Training Complete!</h3>
//                 <p className="text-green-700 text-sm">
//                   Your AI assistant has been trained and is ready to handle customer calls.
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Phone Numbers */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center justify-between">
//               <span className="flex items-center gap-2">
//                 <Phone className="h-5 w-5" />
//                 Assigned Phone Numbers
//               </span>
//               {/* <Button
//                 onClick={() => setIsAddingNew(true)}
//                 size="sm"
//                 className="flex items-center gap-2"
//               >
//                 <Plus className="h-4 w-4" />
//                 Add Location
//               </Button> */}
//             </CardTitle>
//             <CardDescription>
//               These phone numbers are connected to your AI assistant. Share them with customers or use them to replace your existing business numbers.
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {assignments.map((assignment) => (
//               <div key={assignment.id} className="border rounded-lg p-4 space-y-4">
//                 <div className="flex items-start justify-between">
//                   <div className="space-y-2 flex-1">
//                     {editingId === assignment.id ? (
//                       <div className="space-y-3">
//                         <div className="space-y-1">
//                           <Label htmlFor={`location-${assignment.id}`}>Location Name</Label>
//                           <Input
//                             id={`location-${assignment.id}`}
//                             value={editValues.location}
//                             onChange={(e) => setEditValues(prev => ({ ...prev, location: e.target.value }))}
//                             placeholder="Main Location"
//                           />
//                         </div>
//                         <div className="space-y-1">
//                           <Label htmlFor={`address-${assignment.id}`}>Address</Label>
//                           <Input
//                             id={`address-${assignment.id}`}
//                             value={editValues.address}
//                             onChange={(e) => setEditValues(prev => ({ ...prev, address: e.target.value }))}
//                             placeholder="123 Main St, City, State"
//                           />
//                         </div>
//                         <div className="flex space-x-2">
//                           <Button size="sm" onClick={() => handleSave(assignment.id)}>
//                             <Save className="h-4 w-4 mr-1" />
//                             Save
//                           </Button>
//                           <Button size="sm" variant="outline" onClick={handleCancel}>
//                             <X className="h-4 w-4 mr-1" />
//                             Cancel
//                           </Button>
//                         </div>
//                       </div>
//                     ) : (
//                       <>
//                         <div className="flex items-center space-x-3">
//                           <h3 className="font-medium">{assignment.location}</h3>
//                           <Badge 
//                             variant="outline" 
//                             className="flex items-center gap-1"
//                           >
//                             <div className={`w-2 h-2 rounded-full ${getStatusColor(assignment.status)}`}></div>
//                             {getStatusText(assignment.status)}
//                           </Badge>
//                         </div>
//                         <div className="flex items-center space-x-2 text-sm text-muted-foreground">
//                           <MapPin className="h-4 w-4" />
//                           <span>{assignment.address}</span>
//                         </div>
//                       </>
//                     )}
//                   </div>
                  
//                   {editingId !== assignment.id && (
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       onClick={() => handleEdit(assignment)}
//                     >
//                       <Edit className="h-4 w-4" />
//                     </Button>
//                   )}
//                 </div>

//                 <Separator />

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <Label className="text-sm font-medium">Phone Number</Label>
//                     <div className="flex items-center space-x-2 mt-1">
//                       <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
//                         {assignment.phoneNumber}
//                       </code>
//                       <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(assignment.phoneNumber)}>
//                         Copy
//                       </Button>
//                     </div>
//                   </div>
//                   <div>
//                     <Label className="text-sm font-medium">Assigned Date</Label>
//                     <p className="text-sm text-muted-foreground mt-1">
//                       {new Date(assignment.assignedDate).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {/* Add New Location Form */}
//             {isAddingNew && (
//               <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 space-y-4">
//                 <h3 className="font-medium">Add New Location</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-1">
//                     <Label htmlFor="new-location">Location Name</Label>
//                     <Input
//                       id="new-location"
//                       value={newLocation.location}
//                       onChange={(e) => setNewLocation(prev => ({ ...prev, location: e.target.value }))}
//                       placeholder="Downtown Branch"
//                     />
//                   </div>
//                   <div className="space-y-1">
//                     <Label htmlFor="new-address">Address</Label>
//                     <Input
//                       id="new-address"
//                       value={newLocation.address}
//                       onChange={(e) => setNewLocation(prev => ({ ...prev, address: e.target.value }))}
//                       placeholder="456 Oak St, City, State"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex space-x-2">
//                   <Button onClick={handleAddNew} disabled={!newLocation.location || !newLocation.address}>
//                     <Plus className="h-4 w-4 mr-1" />
//                     Add Location ($50/month)
//                   </Button>
//                   <Button variant="outline" onClick={() => setIsAddingNew(false)}>
//                     Cancel
//                   </Button>
//                 </div>
//                 <p className="text-xs text-muted-foreground">
//                   Each additional location costs $50/month and will be added to your next bill.
//                 </p>
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         {/* Instructions */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Next Steps</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <h4 className="font-medium">1. Update Your Business Listings</h4>
//               <p className="text-sm text-muted-foreground">
//                 Replace your current phone numbers with the AI assistant numbers in your Google Business Profile, website, and marketing materials.
//               </p>
//             </div>
//             <div className="space-y-2">
//               <h4 className="font-medium">2. Test the System</h4>
//               <p className="text-sm text-muted-foreground">
//                 Call the numbers to test how your AI assistant responds. You can refine the training data anytime from your dashboard.
//               </p>
//             </div>
//             <div className="space-y-2">
//               <h4 className="font-medium">3. Monitor Performance</h4>
//               <p className="text-sm text-muted-foreground">
//                 Use your dashboard to track calls, customer satisfaction, and optimize your AI assistant's responses.
//               </p>
//             </div>
//           </CardContent>
//         </Card>

//         <div className="flex justify-end pt-6 border-t">
//           <Button onClick={onComplete} className="flex items-center gap-2">
//             Continue to Dashboard
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }