import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Brain, 
  Zap, 
  Shield, 
  Clock, 
  Globe, 
  CheckCircle, 
  ArrowRight, 
  Play, 
  FileText, 
  BarChart3, 
  Headphones, 
  Languages, 
  Download,
  Settings,
  Users,
  Sparkles,
  Target,
  Lightbulb,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";

const FeaturesPage = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const coreFeatures = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Advanced AI Processing",
      description: "Powered by state-of-the-art language models including Llama 3.2 and custom-trained summarization algorithms",
      benefits: ["99.2% accuracy rate", "Context-aware analysis", "Multilingual support"],
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast Results", 
      description: "Get comprehensive summaries in seconds, not minutes. Our optimized processing pipeline delivers instant insights",
      benefits: ["3-5 second processing", "Real-time streaming", "Batch processing"],
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy First Design",
      description: "Your data never leaves your device. All processing happens locally using Ollama for complete privacy protection",
      benefits: ["Local processing", "No data storage", "GDPR compliant"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Multi-Language Support",
      description: "Analyze videos in 50+ languages with automatic detection and translation capabilities",
      benefits: ["50+ languages", "Auto-detection", "Cultural context"],
      color: "from-purple-500 to-pink-500"
    }
  ];

  const summaryTypes = [
    {
      icon: <FileText className="w-6 h-6" />,
      name: "Concise Summary",
      description: "Perfect quick overview in 3-5 sentences",
      useCase: "Ideal for busy professionals",
      example: "Get the main points without watching the entire video"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      name: "Detailed Analysis", 
      description: "Comprehensive breakdown with key insights",
      useCase: "Perfect for research and learning",
      example: "Deep dive into topics, arguments, and conclusions"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      name: "Bullet Points",
      description: "Organized key takeaways in list format",
      useCase: "Great for note-taking and sharing",
      example: "• Main topic 1\n• Key insight 2\n• Important conclusion 3"
    },
    {
      icon: <Target className="w-6 h-6" />,
      name: "Executive Summary",
      description: "Business-focused insights and action items",
      useCase: "Designed for decision makers",
      example: "Strategic insights with recommended actions"
    }
  ];

  const advancedFeatures = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Smart Timestamps",
      description: "Navigate directly to important sections with AI-generated timestamps"
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Export Options", 
      description: "Download summaries in PDF, Word, or plain text formats"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Custom Preferences",
      description: "Tailor summary length, focus areas, and output style"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Collaboration",
      description: "Share summaries and collaborate with team members"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics Dashboard",
      description: "Track your summarization usage and insights over time"
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "Audio Transcription",
      description: "Automatic transcription with speaker identification"
    }
  ];

  const useCases = [
    {
      title: "Education & Learning",
      description: "Transform educational videos into study guides",
      icon: <Lightbulb className="w-12 h-12" />,
      benefits: ["Create study notes", "Review lectures quickly", "Extract key concepts"],
      stats: "89% of students save 5+ hours weekly"
    },
    {
      title: "Business & Professional", 
      description: "Analyze training videos and presentations",
      icon: <Users className="w-12 h-12" />,
      benefits: ["Meeting summaries", "Training documentation", "Competitor analysis"],
      stats: "67% increase in productivity"
    },
    {
      title: "Content Creation",
      description: "Research and analyze content for inspiration",
      icon: <Sparkles className="w-12 h-12" />,
      benefits: ["Content research", "Trend analysis", "Script writing"],
      stats: "3x faster content planning"
    },
    {
      title: "Research & Analysis",
      description: "Process research videos and documentaries",
      icon: <Star className="w-12 h-12" />,
      benefits: ["Literature reviews", "Data extraction", "Citation assistance"],
      stats: "92% accuracy in key point extraction"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="text-blue-700 bg-blue-100 px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Powerful Features
          </Badge>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            Everything You Need for
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
              Smart Video Analysis
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Discover the comprehensive suite of AI-powered features that make Semisizer 
            the most advanced video summarization platform available today.
          </p>
          
          <Link to="/summarize">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              <Play className="w-5 h-5 mr-2" />
              Try All Features Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Core AI Capabilities
            </h2>
            <p className="text-xl text-slate-600">
              The foundation of intelligent video processing
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {coreFeatures.map((feature, index) => (
                <Card 
                  key={index}
                  className={`p-6 border-0 shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                    activeFeature === index 
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500' 
                      : 'bg-white/80 backdrop-blur-sm hover:shadow-xl'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white shadow-lg`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                      <p className="text-slate-600 mb-3">{feature.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <Badge key={benefitIndex} variant="secondary" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-3xl blur-xl"></div>
              <Card className="relative border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${coreFeatures[activeFeature].color} text-white rounded-2xl mb-6`}>
                    {coreFeatures[activeFeature].icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    {coreFeatures[activeFeature].title}
                  </h3>
                  <p className="text-slate-600 text-lg leading-relaxed mb-6">
                    {coreFeatures[activeFeature].description}
                  </p>
                  <div className="space-y-3">
                    {coreFeatures[activeFeature].benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-slate-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Types */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Multiple Summary Styles
            </h2>
            <p className="text-xl text-slate-600">
              Choose the perfect format for your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {summaryTypes.map((type, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm group">
                <CardHeader className="text-center pb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {type.icon}
                  </div>
                  <CardTitle className="text-lg font-semibold text-slate-900">{type.name}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-slate-600 text-sm mb-3">{type.description}</p>
                  <div className="bg-blue-50 rounded-lg p-3 mb-3">
                    <p className="text-blue-700 text-xs font-medium">{type.useCase}</p>
                  </div>
                  <p className="text-slate-500 text-xs italic">{type.example}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Advanced Capabilities
            </h2>
            <p className="text-xl text-slate-600">
              Professional tools for power users
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advancedFeatures.map((feature, index) => (
              <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm group">
                <CardContent className="text-center space-y-4 p-0">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-xl group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Perfect for Every Use Case
            </h2>
            <p className="text-xl text-slate-600">
              See how different professionals use Semisizer
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-2xl flex items-center justify-center">
                        {useCase.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">{useCase.title}</h3>
                      <p className="text-slate-600 mb-4 leading-relaxed">{useCase.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        {useCase.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-slate-700 text-sm">{benefit}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                        <p className="text-blue-700 font-semibold text-sm">{useCase.stats}</p>
                      </div>
                    </div>
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
            Ready to Experience All Features?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already transforming their video consumption with Semisizer's advanced AI capabilities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/summarize">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Free Trial
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-6 text-lg font-semibold transition-all duration-300">
              View Pricing
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;