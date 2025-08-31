import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "./Logo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo */}
          <Link to="/" className="group">
            <Logo size="sm" variant="default" className="group-hover:scale-105 transition-transform duration-200" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors duration-200 ${
                isActive("/") 
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1" 
                  : "text-slate-700 hover:text-blue-600"
              }`}
            >
              Home
            </Link>
            <Link
              to="/features"
              className={`font-medium transition-colors duration-200 ${
                isActive("/features") 
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1" 
                  : "text-slate-700 hover:text-blue-600"
              }`}
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className={`font-medium transition-colors duration-200 ${
                isActive("/pricing") 
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1" 
                  : "text-slate-700 hover:text-blue-600"
              }`}
            >
              Pricing
            </Link>
            <Link
              to="/about"
              className={`font-medium transition-colors duration-200 ${
                isActive("/about") 
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1" 
                  : "text-slate-700 hover:text-blue-600"
              }`}
            >
              About
            </Link>
            <Link
              to="/summarize"
              className={`font-medium transition-colors duration-200 ${
                isActive("/summarize") 
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1" 
                  : "text-slate-700 hover:text-blue-600"
              }`}
            >
              Summarize
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/summarize">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300">
                Try Now
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-blue-600 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200/50">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`font-medium transition-colors duration-200 ${
                  isActive("/") ? "text-blue-600" : "text-slate-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/features"
                className={`font-medium transition-colors duration-200 ${
                  isActive("/features") ? "text-blue-600" : "text-slate-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                to="/pricing"
                className={`font-medium transition-colors duration-200 ${
                  isActive("/pricing") ? "text-blue-600" : "text-slate-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="/about"
                className={`font-medium transition-colors duration-200 ${
                  isActive("/about") ? "text-blue-600" : "text-slate-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/summarize"
                className={`font-medium transition-colors duration-200 ${
                  isActive("/summarize") ? "text-blue-600" : "text-slate-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Summarize
              </Link>
              <Link to="/summarize" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold mt-4">
                  Try Now
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;