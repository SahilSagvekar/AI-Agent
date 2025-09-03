import { Phone, Clock, BarChart3, MessageSquare, Settings, Shield } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone & SMS Support",
      description: "Automatically handles customer calls and text messages with intelligent responses."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "24/7 Availability",
      description: "Your AI assistant never sleeps, handling customer inquiries any time of day or night."
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Smart Responses",
      description: "Trained on laundromat-specific knowledge to provide accurate, helpful responses."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Analytics Dashboard",
      description: "Track call volume, response times, and customer satisfaction in real-time."
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Custom Training",
      description: "Easily train the AI with your location-specific information and policies."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Reliable & Secure",
      description: "Enterprise-grade security with 99.9% uptime guarantee for your peace of mind."
    }
  ];

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-zinc-950 via-zinc-900 to-purple-950 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-violet-500/5" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center space-y-3 mb-10">
          <h2 className="tracking-tight font-bold text-white" style={{ fontSize: '42px' }}>
            Why Choose Our AI Assistant?
          </h2>
          <p className="text-xl text-white max-w-2xl mx-auto leading-relaxed">
            Built specifically for laundromats, our AI assistant understands<br />your business and your customers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative bg-gradient-to-br from-zinc-900/80 to-zinc-800/40 backdrop-blur-sm rounded-2xl p-6 border border-zinc-700/50 hover:border-purple-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              {/* Card glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-white transition-colors duration-300">{feature.title}</h3>
                </div>
                <p className="text-white text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// import { Phone, Clock, BarChart3, MessageSquare, Settings, Shield } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

// export function FeaturesSection() {
//   const features = [
//     {
//       icon: <Phone className="h-8 w-8" />,
//       title: "Twilio Integration",
//       description: "Seamlessly integrates with Twilio to handle calls and SMS messages automatically."
//     },
//     {
//       icon: <Clock className="h-8 w-8" />,
//       title: "24/7 Availability",
//       description: "Your AI assistant never sleeps, handling customer inquiries any time of day or night."
//     },
//     {
//       icon: <MessageSquare className="h-8 w-8" />,
//       title: "Smart Responses",
//       description: "Trained on laundromat-specific knowledge to provide accurate, helpful responses."
//     },
//     {
//       icon: <BarChart3 className="h-8 w-8" />,
//       title: "Analytics Dashboard",
//       description: "Track call volume, response times, and customer satisfaction in real-time."
//     },
//     {
//       icon: <Settings className="h-8 w-8" />,
//       title: "Custom Training",
//       description: "Easily train the AI with your location-specific information and policies."
//     },
//     {
//       icon: <Shield className="h-8 w-8" />,
//       title: "Reliable & Secure",
//       description: "Enterprise-grade security with 99.9% uptime guarantee for your peace of mind."
//     }
//   ];

//   return (
//     <section className="py-20 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center space-y-4 mb-16">
//           <h2 className="text-3xl lg:text-4xl">Why Choose Our AI Assistant?</h2>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             Built specifically for laundromats, our AI assistant understands your business and your customers.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <Card key={index} className="border-2 hover:border-primary/20 transition-colors">
//               <CardHeader>
//                 <div className="text-primary mb-2">{feature.icon}</div>
//                 <CardTitle className="text-xl">{feature.title}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-muted-foreground">{feature.description}</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }