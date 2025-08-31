import React from "react";
import { Brain, Zap, Play } from "lucide-react";

const Logo = ({ variant = "default", size = "md", className = "" }) => {
  const sizes = {
    sm: "w-8 h-8 text-lg",
    md: "w-12 h-12 text-2xl", 
    lg: "w-16 h-16 text-3xl",
    xl: "w-20 h-20 text-4xl"
  };

  const variants = {
    default: "from-blue-600 to-indigo-600",
    dark: "from-blue-400 to-indigo-400",
    white: "from-white to-gray-100",
    gradient: "from-cyan-400 via-blue-500 to-indigo-600"
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Icon */}
      <div className="relative">
        {/* Outer glow ring */}
        <div className={`absolute inset-0 ${sizes[size]} bg-gradient-to-r ${variants[variant]} rounded-2xl blur-md opacity-30 animate-pulse`}></div>
        
        {/* Main logo container */}
        <div className={`relative ${sizes[size]} bg-gradient-to-br ${variants[variant]} rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden group`}>
          
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full animate-ping"></div>
            <div className="absolute top-2 right-2 w-0.5 h-0.5 bg-white rounded-full animate-ping animation-delay-300"></div>
            <div className="absolute bottom-2 left-2 w-0.5 h-0.5 bg-white rounded-full animate-ping animation-delay-600"></div>
          </div>
          
          {/* Central icon */}
          <div className="relative z-10">
            <div className="flex items-center justify-center">
              {/* Brain icon with circuit pattern */}
              <div className="relative">
                <Brain className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : size === 'lg' ? 'w-8 h-8' : 'w-10 h-10'} text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300`} />
                
                {/* Circuit lines */}
                <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-white/60 rounded-tr"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-white/60 rounded-bl"></div>
              </div>
              
              {/* Small play icon overlay */}
              <Play className={`absolute ${size === 'sm' ? 'w-2 h-2' : 'w-3 h-3'} text-white/80 translate-x-1 translate-y-1`} fill="currentColor" />
            </div>
          </div>
          
          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        {/* Processing dots */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 bg-blue-400 rounded-full animate-bounce opacity-70"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Logo Text */}
      <div className="flex flex-col">
        <span className={`font-bold bg-gradient-to-r ${variants[variant]} bg-clip-text text-transparent ${sizes[size].includes('text-lg') ? 'text-lg' : sizes[size].includes('text-2xl') ? 'text-2xl' : sizes[size].includes('text-3xl') ? 'text-3xl' : 'text-4xl'} leading-none tracking-tight`}>
          Semisizer
        </span>
        {size !== 'sm' && (
          <span className={`text-xs ${variant === 'white' ? 'text-gray-600' : 'text-slate-500'} font-medium tracking-wide uppercase`}>
            AI Video Intelligence
          </span>
        )}
      </div>
    </div>
  );
};

// Standalone icon component
export const LogoIcon = ({ size = "md", variant = "default", className = "" }) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16",
    xl: "w-20 h-20"
  };

  const variants = {
    default: "from-blue-600 to-indigo-600",
    dark: "from-blue-400 to-indigo-400",
    white: "from-white to-gray-100",
    gradient: "from-cyan-400 via-blue-500 to-indigo-600"
  };

  return (
    <div className={`relative ${className}`}>
      {/* Outer glow ring */}
      <div className={`absolute inset-0 ${sizes[size]} bg-gradient-to-r ${variants[variant]} rounded-2xl blur-md opacity-30 animate-pulse`}></div>
      
      {/* Main logo container */}
      <div className={`relative ${sizes[size]} bg-gradient-to-br ${variants[variant]} rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden group cursor-pointer`}>
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full animate-ping"></div>
          <div className="absolute top-2 right-2 w-0.5 h-0.5 bg-white rounded-full animate-ping animation-delay-300"></div>
          <div className="absolute bottom-2 left-2 w-0.5 h-0.5 bg-white rounded-full animate-ping animation-delay-600"></div>
        </div>
        
        {/* Central icon */}
        <div className="relative z-10">
          <div className="flex items-center justify-center">
            {/* Brain icon with circuit pattern */}
            <div className="relative">
              <Brain className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : size === 'lg' ? 'w-8 h-8' : 'w-10 h-10'} text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300`} />
              
              {/* Circuit lines */}
              <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-white/60 rounded-tr"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-white/60 rounded-bl"></div>
            </div>
            
            {/* Small play icon overlay */}
            <Play className={`absolute ${size === 'sm' ? 'w-2 h-2' : 'w-3 h-3'} text-white/80 translate-x-1 translate-y-1`} fill="currentColor" />
          </div>
        </div>
        
        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      {/* Processing dots */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-1 h-1 bg-blue-400 rounded-full animate-bounce opacity-70"
            style={{ animationDelay: `${i * 0.2}s` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Logo;