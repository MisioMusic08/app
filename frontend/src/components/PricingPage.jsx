import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { CheckCircle, X, Zap, Crown, Sparkles, Users, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Free",
      description: "Perfect for getting started",
      price: { monthly: 0, annual: 0 },
      badge: null,
      color: "from-slate-500 to-slate-600",
      features: [
        "5 video summaries per month",
        "Basic summary types",
        "Standard processing speed",
        "Email support",
        "Web access only"
      ],
      limitations: [
        "No advanced features",
        "Limited export options",
        "No team collaboration"
      ],
      cta: "Get Started Free",
      popular: false
    },
    {
      name: "Pro",
      description: "For power users and professionals",
      price: { monthly: 19, annual: 15 },
      badge: "Most Popular",
      color: "from-blue-500 to-indigo-500",
      features: [
        "Unlimited video summaries",
        "All summary types",
        "Lightning fast processing",
        "Priority support",
        "Mobile & web access",
        "Advanced AI models",
        "Custom preferences",
        "Export to PDF/Word",
        "Smart timestamps"
      ],
      limitations: [],
      cta: "Start Pro Trial",
      popular: true
    },
    {
      name: "Enterprise",
      description: "For teams and organizations",
      price: { monthly: 99, annual: 79 },
      badge: "Best Value",
      color: "from-purple-500 to-pink-500",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Admin dashboard",
        "SSO integration",
        "Custom integrations",
        "Analytics & reporting",
        "Dedicated support",
        "On-premise deployment",
        "SLA guarantee",
        "Custom AI training"
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const faqs = [
    {
      question: "How does the free plan work?",
      answer: "The free plan gives you 5 video summaries per month with basic features. No credit card required to start."
    },
    {
      question: "Can I upgrade or downgrade anytime?",
      answer: "Yes! You can change your plan at any time. Upgrades take effect immediately, downgrades at the next billing cycle."
    },
    {
      question: "What's included in priority support?",
      answer: "Pro and Enterprise users get faster response times, direct email access, and priority bug fixes."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee on all paid plans. No questions asked."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. All processing happens locally with Ollama, so your data never leaves your device. We're GDPR compliant."
    },
    {
      question: "Can I use Semisizer offline?",
      answer: "Yes! Since we use local AI processing with Ollama, you can summarize videos without an internet connection."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Content Creator",
      company: "TechVid Studios", 
      content: "Semisizer Pro has revolutionized my content research. I can analyze competitor videos in seconds instead of hours.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Marcus Johnson",
      role: "Research Director",
      company: "Innovation Labs",
      content: "The Enterprise features are incredible. Our team productivity increased by 300% since implementing Semisizer.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      role: "MBA Student", 
      company: "Stanford University",
      content: "As a student, the free plan is perfect for my needs. The summaries help me study more efficiently.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="text-blue-700 bg-blue-100 px-4 py-2 mb-6">
            <Star className="w-4 h-4 mr-2" />
            Simple Pricing
          </Badge>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            Choose Your
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
              Perfect Plan
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Start free and scale as you grow. All plans include our core AI-powered 
            video summarization with no hidden fees.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`text-lg font-medium ${!isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isAnnual ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-lg font-medium ${isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
              Annual
            </span>
            {isAnnual && (
              <Badge className="bg-green-100 text-green-700 ml-2">
                Save 20%
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm overflow-hidden ${
                  plan.popular ? 'transform scale-105 ring-2 ring-blue-500' : 'hover:scale-105'
                }`}
              >
                {plan.badge && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4 pt-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${plan.color} text-white rounded-2xl mb-4 mx-auto`}>
                    {plan.name === 'Free' && <Zap className="w-8 h-8" />}
                    {plan.name === 'Pro' && <Crown className="w-8 h-8" />}
                    {plan.name === 'Enterprise' && <Users className="w-8 h-8" />}
                  </div>
                  
                  <CardTitle className="text-2xl font-bold text-slate-900 mb-2">
                    {plan.name}
                  </CardTitle>
                  
                  <p className="text-slate-600 mb-4">{plan.description}</p>
                  
                  <div className="text-center">
                    <span className="text-4xl font-bold text-slate-900">
                      ${isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className="text-slate-500 ml-1">
                      {plan.price.monthly > 0 ? '/month' : ''}
                    </span>
                    {isAnnual && plan.price.monthly > 0 && (
                      <div className="text-sm text-green-600 font-medium">
                        Save ${(plan.price.monthly - plan.price.annual) * 12}/year
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0 pb-8">
                  <Button 
                    className={`w-full mb-6 font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">
                      What's Included:
                    </h4>
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 text-sm">{feature}</span>
                      </div>
                    ))}
                    
                    {plan.limitations.length > 0 && (
                      <>
                        <h4 className="font-semibold text-slate-900 text-sm uppercase tracking-wide mt-6">
                          Limitations:
                        </h4>
                        {plan.limitations.map((limitation, limitIndex) => (
                          <div key={limitIndex} className="flex items-start space-x-3">
                            <X className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-500 text-sm">{limitation}</span>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Loved by Thousands of Users
            </h2>
            <p className="text-xl text-slate-600">
              See what our customers say about their Semisizer experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-slate-700 italic mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <p className="font-semibold text-slate-900">{testimonial.name}</p>
                      <p className="text-sm text-slate-600">{testimonial.role}</p>
                      <p className="text-xs text-slate-500">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to know about Semisizer pricing
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
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
            Join thousands of professionals who are already saving hours with AI-powered video summaries
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/summarize">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Free Trial
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-6 text-lg font-semibold transition-all duration-300">
              Contact Sales
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;