import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Brain, Users, Zap, Shield, Globe, Award, ArrowRight, CheckCircle, Target, Lightbulb, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      bio: "AI researcher with 10+ years in machine learning and natural language processing",
      expertise: ["Machine Learning", "NLP", "Computer Vision"]
    },
    {
      name: "Marcus Rodriguez",
      role: "Lead AI Engineer", 
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Former Google AI researcher specializing in video content analysis and summarization",
      expertise: ["Deep Learning", "Video Processing", "AI Architecture"]
    },
    {
      name: "Emily Johnson",
      role: "Product Designer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face", 
      bio: "UX/UI expert focused on creating intuitive AI-powered interfaces",
      expertise: ["UX Design", "Product Strategy", "User Research"]
    }
  ];

  const values = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Innovation First",
      description: "We constantly push the boundaries of AI technology to deliver cutting-edge solutions"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy Focused", 
      description: "Your data stays secure with our local processing approach and privacy-first design"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "User Centric",
      description: "Every feature is built with our users' needs and feedback at the center"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Accessible AI",
      description: "Making advanced AI technology accessible and useful for everyone"
    }
  ];

  const milestones = [
    {
      year: "2023",
      title: "Company Founded",
      description: "Started with a vision to democratize AI-powered content analysis"
    },
    {
      year: "2024",
      title: "First AI Model",
      description: "Launched our proprietary video summarization algorithm"
    },
    {
      year: "2024",
      title: "Beta Launch",
      description: "Released beta version to 1,000+ early adopters"
    },
    {
      year: "2025",
      title: "Public Release",
      description: "Official launch of Semisizer with advanced AI capabilities"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="text-blue-700 bg-blue-100 px-4 py-2 mb-6">
            <Heart className="w-4 h-4 mr-2" />
            Our Story
          </Badge>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            Transforming How the World
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
              Consumes Video Content
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-8 leading-relaxed">
            At Semisizer, we believe that knowledge should be accessible, digestible, and actionable. 
            Our mission is to harness the power of artificial intelligence to transform hours of video 
            content into meaningful insights that drive real results.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/summarize">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Try Semisizer Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                <Target className="w-4 h-4 mr-2" />
                Our Mission
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Democratizing Access to Knowledge
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                We're on a mission to break down the barriers between vast amounts of video content 
                and the valuable insights they contain. By leveraging cutting-edge AI technology, 
                we make it possible for anyone to quickly understand, analyze, and act on video 
                information without spending hours watching.
              </p>
              <div className="space-y-4">
                {[
                  "Save thousands of hours annually",
                  "Extract key insights instantly", 
                  "Make informed decisions faster",
                  "Access knowledge without barriers"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-3xl blur-xl"></div>
              <Card className="relative border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Our Vision
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    A World Where Knowledge is Instant
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    We envision a future where accessing and understanding information is as simple 
                    as asking a question. Where students, professionals, and curious minds can learn 
                    from any video content instantly, making education and knowledge transfer more 
                    efficient than ever before.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The principles that guide everything we do at Semisizer
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm group">
                <CardContent className="text-center space-y-4 p-0">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">{value.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-slate-600">
              The brilliant minds behind Semisizer's AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">{member.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-slate-600">
              Key milestones in building the future of AI-powered content analysis
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-3">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">{milestone.title}</h3>
                        <p className="text-slate-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="relative flex items-center justify-center w-4 h-4 bg-white border-4 border-blue-500 rounded-full z-10">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Join Our Mission?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Experience the future of video content analysis and be part of the knowledge revolution
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/summarize">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Try Semisizer Now
                <Zap className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-6 text-lg font-semibold transition-all duration-300">
              Learn More
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;