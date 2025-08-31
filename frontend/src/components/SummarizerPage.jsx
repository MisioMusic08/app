import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Alert, AlertDescription } from "./ui/alert";
import { Loader2, Youtube, Clock, FileText, Brain, CheckCircle, Copy, ExternalLink } from "lucide-react";
import { mockSummarizationService } from "../services/mockData";

const SummarizerPage = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [summaryType, setSummaryType] = useState("concise");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) {
      setError("Please enter a YouTube URL");
      return;
    }

    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
      setError("Please enter a valid YouTube URL");
      return;
    }

    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      // Simulate API call with mock data
      const mockResult = await mockSummarizationService.summarizeVideo(url, summaryType);
      setResult(mockResult);
    } catch (err) {
      setError("Failed to process video. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const getSummaryIcon = (type) => {
    switch (type) {
      case "concise": return <FileText className="w-4 h-4" />;
      case "detailed": return <Brain className="w-4 h-4" />;
      case "bullet-points": return <CheckCircle className="w-4 h-4" />;
      case "executive": return <Clock className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Video Summarizer
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Transform any YouTube video into intelligent, actionable summaries powered by advanced AI
          </p>
        </div>

        {/* Input Form */}
        <Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-slate-900">
              <Youtube className="w-6 h-6 mr-2 text-red-500" />
              YouTube Video URL
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="h-12 text-lg border-2 border-slate-200 focus:border-blue-500"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Brain className="w-5 h-5 mr-2" />
                      Summarize
                    </>
                  )}
                </Button>
              </div>

              {/* Summary Type Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700">Summary Type</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: "concise", label: "Concise", desc: "Quick overview" },
                    { value: "detailed", label: "Detailed", desc: "Comprehensive analysis" },
                    { value: "bullet-points", label: "Bullet Points", desc: "Key takeaways" },
                    { value: "executive", label: "Executive", desc: "Business focused" }
                  ].map((type) => (
                    <Button
                      key={type.value}
                      type="button"
                      variant={summaryType === type.value ? "default" : "outline"}
                      onClick={() => setSummaryType(type.value)}
                      className={`flex items-center space-x-2 ${
                        summaryType === type.value 
                          ? "bg-blue-600 text-white" 
                          : "hover:bg-blue-50 hover:border-blue-300"
                      }`}
                    >
                      {getSummaryIcon(type.value)}
                      <span>{type.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="py-12 text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center animate-pulse">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">Processing Video...</h3>
                <p className="text-slate-600">Our AI is analyzing the content and generating your summary</p>
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {result && !isLoading && (
          <div className="space-y-6">
            
            {/* Video Info */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Youtube className="w-6 h-6 mr-2 text-red-500" />
                    Video Information
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Processed Successfully
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">{result.videoInfo.title}</h3>
                    <p className="text-slate-600 mb-4">{result.videoInfo.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                      <span>Channel: {result.videoInfo.channel}</span>
                      <span>Duration: {result.videoInfo.duration}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Word Count:</span>
                      <span className="font-semibold">{result.transcript.wordCount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Language:</span>
                      <span className="font-semibold">{result.transcript.language}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Processing Time:</span>
                      <span className="font-semibold">{result.processingMetadata.processingTimeSeconds}s</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Summary Results */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getSummaryIcon(summaryType)}
                    <span className="ml-2">
                      {summaryType.charAt(0).toUpperCase() + summaryType.slice(1).replace('-', ' ')} Summary
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(result.summary)}
                    className="hover:bg-blue-50"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-50 rounded-lg p-6 border-2 border-slate-200">
                  <div className="prose prose-slate max-w-none">
                    {summaryType === "bullet-points" ? (
                      <ul className="space-y-2">
                        {result.summary.split('\n').filter(line => line.trim()).map((point, index) => (
                          <li key={index} className="text-slate-700 leading-relaxed">
                            {point.replace(/^[•\-\*]\s*/, '')}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                        {result.summary}
                      </div>
                    )}
                  </div>
                </div>

                {/* Summary Metrics */}
                <div className="mt-6 grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{result.processingMetadata.summaryLength}</div>
                    <div className="text-sm text-slate-600">Characters</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{result.processingMetadata.compressionRatio}x</div>
                    <div className="text-sm text-slate-600">Compression</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{result.processingMetadata.chunksProcessed}</div>
                    <div className="text-sm text-slate-600">Chunks</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{result.processingMetadata.modelUsed}</div>
                    <div className="text-sm text-slate-600">AI Model</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                onClick={() => window.open(url, '_blank')}
                className="hover:bg-blue-50"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Original Video
              </Button>
              <Button
                onClick={() => {
                  setResult(null);
                  setUrl("");
                }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Summarize Another Video
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummarizerPage;