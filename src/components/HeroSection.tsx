// import image_4f07b866f72d97be4cadfc4e91a087b91f95511c from 'figma:asset/4f07b866f72d97be4cadfc4e91a087b91f95511c.png';
// import image_28676c51465095531e758149520eb2f40e37904c from 'figma:asset/28676c51465095531e758149520eb2f40e37904c.png';
// import image_90744171dec9e5f9e55e6155495f85a9e4c4cb66 from 'figma:asset/90744171dec9e5f9e55e6155495f85a9e4c4cb66.png';
// import image_d4b0a0964a0bac1df5afe5e9037906378b0d9be2 from 'figma:asset/d4b0a0964a0bac1df5afe5e9037906378b0d9be2.png';
import image1 from '../assets/1.png'
import image2 from '../assets/2.png'
import image3 from '../assets/3.png'
import image4 from '../assets/4.png'
import { useRedirect } from "@/utils/redirect";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HeroSection({ onGetStarted, onDemo }: { onGetStarted: () => void; onDemo?: () => void }) {
  const { redirectDemo, redirectContact } = useRedirect();
  
  // function redirect() {
  //   router.push("/demo")
  // }

  
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/10"></div>
      
      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl xl:text-7xl tracking-tight w-full leading-tight">
                <span className="bg-gradient-to-r from-primary via-primary to-[#7851A9] bg-clip-text text-transparent font-extrabold">
                  AI Assistant for Laundromats
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                Answer calls, handle inquiries, and reduce costs automatically — available 24/7
              </p>
            </div>

            {/* Buttons positioned for centered layout with reduced spacing */}
            <div className="pt-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={onGetStarted} size="lg" className="text-lg px-8">
                  Start Free Trial
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8" 
                // onClick={onDemo}
                onClick={redirectDemo}>
                  Watch Demo
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-6">
              <div className="text-center group">
                <div className="text-3xl font-extrabold bg-gradient-to-r from-primary to-[#7851A9] bg-clip-text text-transparent">24/7</div>
                <div className="text-sm text-muted-foreground font-medium">Availability</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-extrabold bg-gradient-to-r from-primary to-[#7851A9] bg-clip-text text-transparent">90%</div>
                <div className="text-sm text-muted-foreground font-medium">Cost Reduction</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-extrabold bg-gradient-to-r from-primary to-[#7851A9] bg-clip-text text-transparent">5 min</div>
                <div className="text-sm text-muted-foreground font-medium">Setup Time</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-primary/10 to-accent/20 rounded-3xl p-8 lg:p-12">
              <ImageWithFallback
                src={image2.src}
                alt="Modern laundromat interior"
                className="w-full h-80 object-cover rounded-2xl shadow-2xl"
              />
            </div>
            
            {/* Floating UI Elements */}
            <div className="absolute -bottom-4 -left-4 bg-white dark:bg-card rounded-xl p-4 shadow-xl border border-border backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-sm"></div>
                <span className="text-sm font-medium">ConnectAI Active</span>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 bg-white dark:bg-card rounded-xl p-4 shadow-xl border border-border backdrop-blur-sm">
              <div className="text-sm font-semibold text-foreground">
                Reduce Customer Calls by 95%
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



// import { Button } from "./ui/button";
// import { ImageWithFallback } from "./figma/ImageWithFallback";

// export function HeroSection({ onGetStarted }: { onGetStarted: () => void }) {
//   return (
//     <section className="relative py-20 px-4 overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/10"></div>
      
//       <div className="relative max-w-6xl mx-auto">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           <div className="space-y-8">
//             <div className="space-y-4">
//               <h1 className="text-4xl lg:text-5xl tracking-tight">
//                 Replace Attendant Calls with
//                 <span className="text-primary block">AI-Powered Assistance</span>
//               </h1>
//               <p className="text-xl text-muted-foreground max-w-lg">
//                 Your 24/7 AI laundromat assistant handles customer inquiries instantly, 
//                 reduces operational costs, and improves customer satisfaction.
//               </p>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4">
//               <Button onClick={onGetStarted} size="lg" className="text-lg px-8">
//                 Get Started Today
//               </Button>
//               <Button variant="outline" size="lg" className="text-lg px-8">
//                 Watch Demo
//               </Button>
//             </div>

//             <div className="grid grid-cols-3 gap-8 pt-8">
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-primary">24/7</div>
//                 <div className="text-sm text-muted-foreground">Availability</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-primary">90%</div>
//                 <div className="text-sm text-muted-foreground">Cost Reduction</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-primary">5min</div>
//                 <div className="text-sm text-muted-foreground">Setup Time</div>
//               </div>
//             </div>
//           </div>

//           <div className="relative">
//             <div className="bg-gradient-to-br from-primary/10 to-accent/20 rounded-3xl p-8 lg:p-12">
//               <ImageWithFallback
//                 src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
//                 alt="Modern laundromat interior"
//                 className="w-full h-80 object-cover rounded-2xl shadow-2xl"
//               />
//             </div>
            
//             {/* Floating UI Elements */}
//             <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg border">
//               <div className="flex items-center gap-3">
//                 <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
//                 <span className="text-sm">AI Assistant Active</span>
//               </div>
//             </div>
            
//             <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-lg border">
//               <div className="text-sm">
//                 <div className="font-medium">Customer Calls</div>
//                 <div className="text-primary">↓ 95% Reduced</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }