"use client";

interface LoadingProps {
  text?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Loading({ text = "Loading...", size = "md", className = "" }: LoadingProps) {
  const spinnerSize = size === "sm" ? "h-6 w-6" : size === "lg" ? "h-12 w-12" : "h-8 w-8";

  return (
    <div className={`flex flex-col items-center justify-center space-y-2 ${className} py-8`}>
      <div className={`relative ${spinnerSize} animate-spin`}>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-primary rounded-full h-2 w-2 opacity-0 animate-fadeDot delay-0"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-primary rounded-full h-2 w-2 opacity-0 animate-fadeDot delay-150"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-primary rounded-full h-2 w-2 opacity-0 animate-fadeDot delay-300"></div>
      </div>
      <span className="text-sm text-muted-foreground">{text}</span>
    </div>
  );
}



// "use client";

// interface LoadingProps {
//   text?: string;
//   size?: "sm" | "md" | "lg";
//   className?: string;
// }

// export function Loading({ text = "Loading...", size = "md", className = "" }: LoadingProps) {
//   const dotSize = size === "sm" ? "h-2 w-2" : size === "lg" ? "h-4 w-4" : "h-3 w-3";

//   return (
//     <div className={`flex flex-col items-center justify-center space-y-2 ${className} py-8`}>
//       <div className="flex space-x-1">
//         <span className={`bg-primary rounded-full ${dotSize} animate-bounce`}></span>
//         <span className={`bg-primary rounded-full ${dotSize} animate-bounce delay-150`}></span>
//         <span className={`bg-primary rounded-full ${dotSize} animate-bounce delay-300`}></span>
//       </div>
//       <span className="text-sm text-muted-foreground">{text}</span>
//     </div>
//   );
// }
