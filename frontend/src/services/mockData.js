// Mock data service for frontend testing
export const mockSummarizationService = {
  // Simulate video summarization
  summarizeVideo: async (url, summaryType = "concise") => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const videoId = extractVideoId(url);
    const mockData = getMockVideoData(videoId, summaryType);
    
    return mockData;
  },

  // Get available models
  getModels: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      models: [
        { name: "llama3.2:3b", description: "Fast and efficient" },
        { name: "llama3.2:7b", description: "Balanced performance" },
        { name: "mistral:7b", description: "High quality summaries" }
      ],
      defaultModel: "llama3.2:3b"
    };
  }
};

// Extract video ID from YouTube URL
const extractVideoId = (url) => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return "dQw4w9WgXcQ"; // Default video ID
};

// Generate mock video data based on video ID and summary type
const getMockVideoData = (videoId, summaryType) => {
  const mockVideos = {
    "dQw4w9WgXcQ": {
      title: "Never Gonna Give You Up - Rick Astley",
      description: "The official video for Rick Astley's classic hit song",
      channel: "Rick Astley",
      duration: "3:32"
    },
    default: {
      title: "How AI is Transforming Video Content Analysis",
      description: "An in-depth look at modern artificial intelligence techniques for understanding and processing video content",
      channel: "Tech Insights",
      duration: "12:45"
    }
  };

  const videoInfo = mockVideos[videoId] || mockVideos.default;
  
  const summaries = {
    concise: generateConciseSummary(videoInfo),
    detailed: generateDetailedSummary(videoInfo),
    "bullet-points": generateBulletPointSummary(videoInfo),
    executive: generateExecutiveSummary(videoInfo)
  };

  return {
    videoInfo: {
      videoId,
      url: `https://www.youtube.com/watch?v=${videoId}`,
      ...videoInfo
    },
    transcript: {
      language: "English",
      languageCode: "en",
      isGenerated: true,
      wordCount: Math.floor(Math.random() * 2000) + 500,
      estimatedTokens: Math.floor(Math.random() * 3000) + 650,
      truncated: false
    },
    summary: summaries[summaryType] || summaries.concise,
    processingMetadata: {
      modelUsed: "llama3.2:3b",
      summaryType,
      originalLength: Math.floor(Math.random() * 10000) + 2000,
      summaryLength: summaries[summaryType]?.length || 500,
      compressionRatio: Math.round((Math.random() * 15) + 5),
      chunksProcessed: Math.floor(Math.random() * 3) + 1,
      processingTimeSeconds: Math.round((Math.random() * 5) + 2),
      timestamp: new Date().toISOString()
    },
    status: "completed"
  };
};

const generateConciseSummary = (videoInfo) => {
  if (videoInfo.title.includes("Rick Astley")) {
    return "This is the iconic music video for Rick Astley's 1987 hit song 'Never Gonna Give You Up.' The video features Rick Astley singing and dancing in various indoor and outdoor locations. The song became famous for its upbeat melody and heartfelt lyrics about unwavering commitment and loyalty in relationships. It later gained renewed popularity as the centerpiece of the 'Rickrolling' internet meme phenomenon.";
  }
  
  return "This video explores the revolutionary impact of artificial intelligence on video content analysis and processing. The presentation covers key technological advances in machine learning, computer vision, and natural language processing that enable automated understanding of video content. Major topics include real-time transcription, content categorization, sentiment analysis, and automated summarization techniques that are transforming how we interact with video media.";
};

const generateDetailedSummary = (videoInfo) => {
  if (videoInfo.title.includes("Rick Astley")) {
    return `This comprehensive analysis covers Rick Astley's seminal 1987 music video "Never Gonna Give You Up," which has become a cultural phenomenon spanning multiple decades.

**Video Content & Production:**
The music video showcases Rick Astley performing his breakthrough hit in various settings, including indoor studio spaces and outdoor urban environments. The production features classic 1980s cinematography with vibrant colors and dynamic camera movements that complement the upbeat tempo of the song.

**Musical Elements:**
The song demonstrates sophisticated pop composition with its memorable bass line, synthesizer arrangements, and Astley's distinctive baritone vocals. The lyrics center on themes of commitment, trust, and emotional reliability in relationships.

**Cultural Impact:**
Beyond its initial commercial success, the video gained massive renewed popularity in the 2000s through the "Rickrolling" internet meme, where users would trick others into clicking links to this video. This phenomenon has made it one of the most recognized and frequently viewed videos in internet history.

**Legacy:**
The video represents a perfect intersection of 1980s pop culture and modern internet culture, demonstrating how content can transcend its original context to become a lasting part of digital folklore.`;
  }
  
  return `This comprehensive presentation examines the transformative role of artificial intelligence in modern video content analysis and processing systems.

**Technological Foundations:**
The video begins with an overview of fundamental AI technologies including machine learning algorithms, deep neural networks, and computer vision systems that form the backbone of intelligent video processing. Key concepts covered include convolutional neural networks for visual recognition and recurrent neural networks for temporal analysis.

**Core Applications:**
Several major application areas are explored in detail:
- Automated transcription and speech recognition systems
- Real-time content moderation and safety filtering
- Intelligent video summarization and highlight generation
- Advanced search and recommendation algorithms
- Sentiment analysis and emotion detection

**Industry Implementation:**
The presentation showcases real-world implementations across various sectors including entertainment, education, security, and marketing. Case studies demonstrate how major platforms leverage these technologies to process millions of hours of video content daily.

**Future Developments:**
The discussion concludes with emerging trends including multimodal AI systems, real-time processing capabilities, and the integration of large language models for enhanced content understanding and generation.

**Technical Challenges:**
Key challenges addressed include computational efficiency, accuracy optimization, privacy considerations, and scalability requirements for enterprise-level deployments.`;
};

const generateBulletPointSummary = (videoInfo) => {
  if (videoInfo.title.includes("Rick Astley")) {
    return `• Classic 1987 music video featuring Rick Astley's breakthrough hit "Never Gonna Give You Up"
• Showcases distinctive 1980s production style with vibrant visuals and dynamic cinematography
• Features Rick Astley's signature baritone vocals and memorable synthesizer-driven composition
• Song lyrics focus on themes of unwavering commitment and loyalty in relationships
• Video includes performance scenes in both indoor studio and outdoor urban settings
• Became the centerpiece of the famous "Rickrolling" internet meme phenomenon
• Demonstrates the evolution from traditional pop culture to viral internet content
• Represents one of the most recognized videos in internet history
• Perfect example of how content can gain renewed relevance through digital culture
• Showcases the lasting appeal of well-crafted pop music and memorable visual presentation`;
  }
  
  return `• Comprehensive exploration of AI's transformative impact on video content analysis
• Coverage of fundamental technologies: machine learning, computer vision, neural networks
• Key applications include automated transcription and real-time speech recognition
• Advanced content moderation and safety filtering systems for platform protection
• Intelligent video summarization techniques for efficient content consumption
• Sophisticated search and recommendation algorithms powered by deep learning
• Real-time sentiment analysis and emotion detection capabilities
• Industry implementations across entertainment, education, security, and marketing sectors
• Case studies from major platforms processing millions of hours of content daily
• Detailed examination of technical challenges including computational efficiency and scalability
• Discussion of privacy considerations and ethical implications in AI video processing
• Future trends including multimodal AI systems and large language model integration
• Practical insights for enterprise-level deployment and optimization strategies
• Analysis of accuracy improvements and performance benchmarking methodologies`;
};

const generateExecutiveSummary = (videoInfo) => {
  if (videoInfo.title.includes("Rick Astley")) {
    return `**Executive Overview:**
Rick Astley's "Never Gonna Give You Up" represents a unique case study in content longevity and viral marketing, evolving from a 1987 pop hit into a global internet phenomenon.

**Key Business Insights:**
The video's transformation into the "Rickrolling" meme demonstrates how legacy content can achieve unprecedented digital reach without traditional marketing investment. This organic viral success generated millions in additional revenue streams and renewed brand recognition for the artist.

**Strategic Implications:**
Organizations can learn from this content's ability to transcend generational boundaries and maintain relevance across different media platforms. The phenomenon illustrates the unpredictable nature of viral content and the importance of owning intellectual property that can adapt to new cultural contexts.

**Recommendations:**
Content creators and businesses should consider how their materials might be repurposed or reimagined by digital communities, potentially creating long-term value beyond initial commercial objectives.`;
  }
  
  return `**Executive Overview:**
This analysis examines the strategic implementation of AI-powered video content analysis systems, representing a $12+ billion market opportunity with significant competitive advantages for early adopters.

**Business Impact:**
Organizations implementing these technologies report 60-80% reduction in content processing costs, 95% improvement in content categorization accuracy, and 40% increase in user engagement through personalized recommendations.

**Strategic Opportunities:**
- Automated content moderation reduces liability and operational overhead
- Intelligent summarization increases content accessibility and user satisfaction  
- Advanced analytics provide actionable insights for content strategy optimization
- Real-time processing capabilities enable immediate response to trending topics

**Investment Considerations:**
Initial implementation costs range from $100K-$2M depending on scale, with ROI typically achieved within 12-18 months through operational efficiency gains and enhanced user experience metrics.

**Competitive Advantages:**
Early adopters gain significant market positioning through superior content understanding, faster processing capabilities, and more sophisticated user personalization systems.

**Recommendations:**
Immediate evaluation and pilot program initiation recommended to maintain competitive positioning in rapidly evolving digital content landscape.`;
};

export default mockSummarizationService;