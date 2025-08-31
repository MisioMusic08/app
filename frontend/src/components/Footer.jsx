import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Mail, Heart } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="col-span-1">
            <div className="mb-4">
              <Logo size="sm" variant="dark" />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Transform YouTube videos into intelligent summaries with the power of advanced AI technology.
            </p>
            <div className="flex space-x-3">
              <a 
                href="#" 
                className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/summarize" className="hover:text-blue-400 transition-colors duration-200">
                  Video Summarizer
                </Link>
              </li>
              <li>
                <a href="#features" className="hover:text-blue-400 transition-colors duration-200">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors duration-200">
                  API Access
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors duration-200">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="hover:text-blue-400 transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors duration-200">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors duration-200">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors duration-200">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors duration-200">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors duration-200">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors duration-200">
                  Status
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 text-sm text-slate-400">
              <span>&copy; 2025 Semisizer. All rights reserved.</span>
              <span className="hidden md:block">|</span>
              <a href="#" className="hover:text-blue-400 transition-colors duration-200">
                Privacy Policy
              </a>
              <span className="hidden md:block">|</span>
              <a href="#" className="hover:text-blue-400 transition-colors duration-200">
                Terms of Service
              </a>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-slate-400 mt-4 md:mt-0">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>using AI technology</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;