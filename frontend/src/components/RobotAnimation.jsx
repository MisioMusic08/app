import React, { useState, useEffect } from "react";
import { Cpu, Eye, Zap, Sparkles } from "lucide-react";

const RobotAnimation = () => {
  const [isActive, setIsActive] = useState(false);
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive(prev => !prev);
    }, 2000);

    const eyeInterval = setInterval(() => {
      setEyePosition({
        x: Math.random() * 10 - 5,
        y: Math.random() * 10 - 5
      });
    }, 1500);

    return () => {
      clearInterval(interval);
      clearInterval(eyeInterval);
    };
  }, []);

  return (
    <div className="relative w-80 h-80 flex items-center justify-center">
      {/* Background glow effect */}
      <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-indigo-400/20 blur-xl transition-all duration-1000 ${isActive ? 'scale-110 opacity-100' : 'scale-90 opacity-70'}`}></div>
      
      {/* Main robot body */}
      <div className="relative w-64 h-64 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl border-4 border-slate-300 shadow-2xl">
        
        {/* Robot head/screen */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-32 h-24 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border-2 border-slate-600 overflow-hidden">
          
          {/* Screen content */}
          <div className="relative w-full h-full bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center">
            {/* Animated screen lines */}
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute h-px bg-blue-400/50 transition-all duration-1000 ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0'}`}
                  style={{
                    top: `${15 + i * 12}%`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
            
            {/* Brain icon in center */}
            <div className={`transition-all duration-500 ${isActive ? 'scale-110 text-blue-300' : 'scale-100 text-blue-400'}`}>
              <Cpu className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Robot eyes */}
        <div className="absolute top-40 left-1/2 transform -translate-x-1/2 flex space-x-8">
          {[0, 1].map((eye) => (
            <div key={eye} className="relative w-8 h-8 bg-blue-500 rounded-full shadow-lg overflow-hidden">
              <div 
                className="absolute w-3 h-3 bg-white rounded-full transition-all duration-500"
                style={{
                  transform: `translate(${8 + eyePosition.x}px, ${8 + eyePosition.y}px)`
                }}
              />
              <div className={`absolute inset-0 bg-blue-400 rounded-full transition-all duration-300 ${isActive ? 'animate-pulse' : ''}`} />
            </div>
          ))}
        </div>

        {/* Control panel */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {[0, 1, 2].map((btn, index) => (
            <div 
              key={btn}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                isActive 
                  ? index === 0 ? 'bg-green-400 shadow-lg shadow-green-400/50' 
                    : index === 1 ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50'
                    : 'bg-red-400 shadow-lg shadow-red-400/50'
                  : 'bg-slate-400'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            />
          ))}
        </div>

        {/* Side panels */}
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 space-y-2">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i}
              className={`w-1 h-8 bg-slate-400 rounded-full transition-all duration-500 ${
                isActive ? 'bg-blue-500 shadow-lg shadow-blue-500/30' : ''
              }`}
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>

        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 space-y-2">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i}
              className={`w-1 h-8 bg-slate-400 rounded-full transition-all duration-500 ${
                isActive ? 'bg-indigo-500 shadow-lg shadow-indigo-500/30' : ''
              }`}
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute transition-all duration-2000 ${
              isActive ? 'opacity-100 scale-100' : 'opacity-50 scale-75'
            }`}
            style={{
              left: `${20 + (i * 60) % 200}px`,
              top: `${30 + (i * 80) % 200}px`,
              animationDelay: `${i * 0.3}s`
            }}
          >
            {i % 3 === 0 ? (
              <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
            ) : i % 3 === 1 ? (
              <Zap className="w-3 h-3 text-indigo-400 animate-bounce" />
            ) : (
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping" />
            )}
          </div>
        ))}
      </div>

      {/* Processing indicator */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
        <div className={`flex space-x-1 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
        <p className="text-xs text-slate-600 text-center mt-2 font-medium">
          {isActive ? 'Processing...' : 'Ready to analyze'}
        </p>
      </div>
    </div>
  );
};

export default RobotAnimation;