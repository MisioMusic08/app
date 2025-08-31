import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Play, Zap, Brain, Clock, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import RobotAnimation from "./RobotAnimation";

const LandingPage = () => {
  const [animatedText, setAnimatedText] = useState("");
  const fullText = "Transform YouTube videos into intelligent summaries";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setAnimatedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Analysis",
      description: "Advanced language models extract key insights and main points from any video content"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Save Hours Daily",
      description: "Get comprehensive summaries in seconds instead of watching entire videos"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Powered by local Ollama models for instant processing and complete privacy"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Content Creator",
      content: "Semisizer has revolutionized how I research content. I can quickly understand video topics without watching hours of footage.",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Student",
      content: "Perfect for educational videos! I get the key points instantly and can focus on what matters most for my studies.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Business Analyst",
      content: "The AI summaries are incredibly accurate. It's like having a personal assistant that watches videos for me.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="secondary" className="text-blue-700 bg-blue-100 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Video Intelligence
              </Badge>
              
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Semisizer
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-slate-700 h-16">
                  {animatedText}
                  <span className="animate-pulse">|</span>
                </p>
                <p className="text-lg text-slate-600 max-w-xl">
                  Paste any YouTube URL and get instant, intelligent summaries powered by advanced AI. 
                  Save time, extract insights, and never miss important content again.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/summarize">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <Play className="w-5 h-5 mr-2" />
                    Try Semisizer Now
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="px-8 py-6 text-lg font-semibold border-2 border-slate-300 hover:border-blue-500 hover:text-blue-600 transition-all duration-300">
                  Watch Demo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-slate-600">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Free to use
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Privacy focused
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  No registration required
                </div>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <RobotAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Why Choose Semisizer?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experience the future of video content consumption with our advanced AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm">
                <CardContent className="text-center space-y-4 p-0">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-2xl mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600">
              Three simple steps to transform any YouTube video into actionable insights
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Paste URL", description: "Simply paste any YouTube video URL into our intelligent processor" },
              { step: "2", title: "AI Analysis", description: "Our advanced AI extracts transcripts and analyzes content structure" },
              { step: "3", title: "Get Summary", description: "Receive comprehensive summaries with key insights and actionable points" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-full text-2xl font-bold mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Loved by Thousands
            </h2>
            <p className="text-xl text-slate-600">
              See what our users are saying about Semisizer
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="space-y-4 p-0">
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <CheckCircle key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-700 italic leading-relaxed">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Video Experience?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already saving hours with AI-powered video summaries
          </p>
          <Link to="/summarize">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Sparkles className="w-5 h-5 mr-2" />
              Start Summarizing Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;