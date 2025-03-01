import { AwarenessProgram, Scheme, BlogPost } from "@/types/awareness";

export const mockAwarenessPrograms: AwarenessProgram[] = [
  {
    id: 1,
    title: "Smart Water Usage Program",
    description:
      "Learn how to reduce water consumption by up to 40% through smart monitoring and daily habits",
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189",
    category: "water",
    readTime: "5 min",
    link: "/dashboard/awareness/water-conservation",
  },
  {
    id: 2,
    title: "Energy Conservation Challenge",
    description:
      "Join our 30-day community challenge to reduce energy consumption and win prizes",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e",
    category: "electricity",
    readTime: "8 min",
    link: "/dashboard/awareness/energy-challenge",
  },
  {
    id: 3,
    title: "Smart Home Integration Guide",
    description:
      "Step-by-step guide to automate your utility management with smart home devices",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827",
    category: "general",
    readTime: "10 min",
    link: "/dashboard/awareness/smart-home",
  },
  {
    id: 4,
    title: "Rainwater Harvesting Workshop",
    description:
      "Learn to set up your own rainwater harvesting system and reduce water bills",
    image: "https://images.unsplash.com/photo-1468421201266-ec88b2809284",
    category: "water",
    readTime: "15 min",
    link: "/dashboard/awareness/rainwater-harvesting",
  },
  {
    id: 5,
    title: "Solar Energy Basics",
    description:
      "Understanding solar panel installation, maintenance, and ROI calculation",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276",
    category: "electricity",
    readTime: "12 min",
    link: "/dashboard/awareness/solar-basics",
  },
];

export const mockSchemes: Scheme[] = [
  {
    id: 1,
    title: "Solar Panel Subsidy 2024",
    description:
      "Get up to 50% subsidy on solar panel installation for residential buildings",
    deadline: "2024-12-31",
    category: "electricity",
    status: "active",
  },
  {
    id: 2,
    title: "Smart Meter Installation Program",
    description:
      "Free smart meter installation for residential areas with real-time monitoring",
    deadline: "2024-06-30",
    category: "water",
    status: "active",
  },
  {
    id: 3,
    title: "Energy Efficient Appliance Exchange",
    description:
      "Exchange your old appliances for energy-efficient ones at 40% discount",
    deadline: "2024-09-15",
    category: "electricity",
    status: "active",
  },
  {
    id: 4,
    title: "Water Conservation Infrastructure Grant",
    description:
      "Funding for housing societies to implement water conservation systems",
    deadline: "2024-03-31",
    category: "water",
    status: "active",
  },
  {
    id: 5,
    title: "Smart Grid Connection Scheme",
    description:
      "Connect your home to the city's smart grid network at subsidized rates",
    deadline: "2024-08-01",
    category: "electricity",
    status: "inactive",
  },
];

export const mockBlogs: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Smart Cities",
    author: "Dr. Sarah Johnson",
    date: "2024-01-15",
    readTime: "10 min",
    category: "general",
    excerpt:
      "Exploring how smart utilities are revolutionizing urban living with AI and IoT integration...",
  },
  {
    id: 2,
    title: "10 Water Conservation Tips That Actually Work",
    author: "Mike Chen",
    date: "2024-01-20",
    readTime: "7 min",
    category: "water",
    excerpt:
      "Practical and effective ways to reduce your daily water consumption without compromising comfort...",
  },
  {
    id: 3,
    title: "Understanding Your Electricity Bill",
    author: "Emma Wright",
    date: "2024-01-25",
    readTime: "8 min",
    category: "electricity",
    excerpt:
      "A comprehensive guide to reading and optimizing your monthly electricity consumption...",
  },
  {
    id: 4,
    title: "Smart Home Security Best Practices",
    author: "Alex Turner",
    date: "2024-02-01",
    readTime: "12 min",
    category: "general",
    excerpt:
      "Essential security measures for your connected home devices and utility systems...",
  },
  {
    id: 5,
    title: "The Economics of Solar Power",
    author: "Prof. James Wilson",
    date: "2024-02-05",
    readTime: "15 min",
    category: "electricity",
    excerpt:
      "Analysis of costs, savings, and ROI for residential solar power installations...",
  },
];

// Detailed content for program page
export const mockProgramDetail = {
  id: 1,
  title: "Smart Water Usage Program",
  description: "Learn how to reduce water consumption by up to 40%",
  content: `
# Why Water Conservation Matters

Water conservation is crucial for sustainable urban development. As cities grow and climate change affects water availability, it's becoming increasingly important to manage our water resources efficiently.

> 💡 **Quick Fact**: The average household wastes up to 180 gallons per week, or 9,400 gallons of water annually, from household leaks alone.

## Program Objectives

- [x] Define conservation goals
- [x] Set up monitoring systems
- [ ] Complete implementation
- [ ] Review results

## Key Technologies

\`\`\`python
def calculate_annual_savings(daily_usage: float, reduction_target: float) -> float:
    """
    Calculate potential annual water savings
    
    Parameters:
    - daily_usage: Current daily water usage in liters
    - reduction_target: Target reduction percentage (0-100)
    
    Returns:
    - Annual savings in liters
    """
    annual_usage = daily_usage * 365
    return annual_usage * (reduction_target / 100)
\`\`\`

## Implementation Steps 🚀

1. **Assessment Phase** 
   - Measure current usage 📊
   - Identify waste points 🔍
   - Set reduction targets 🎯

2. **Installation Phase**
   - Smart meter setup
   - Leak detection systems
   - Efficient fixtures

> **Important**: All installations must comply with local building codes and regulations. Contact your local water authority for guidance.

## Progress Tracking

| Phase | Status | Completion |
|-------|--------|------------|
| Assessment | ✅ Complete | 100% |
| Installation | 🔄 In Progress | 60% |
| Monitoring | ⏳ Planned | 0% |
| Review | ⏳ Planned | 0% |

---

Want to learn more about our water conservation methods? [Check out our detailed guide →](https://example.com)
`,
  image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189",
  category: "water",
  readTime: "5 min",
  author: "Environmental Team",
  date: "2024-01-15",
  resources: [
    {
      title: "Water Conservation Guide",
      type: "PDF",
      size: "2.4 MB",
      url: "/resources/water-conservation-guide.pdf",
    },
    {
      title: "Usage Tracking Template",
      type: "Excel",
      size: "1.1 MB",
      url: "/resources/usage-tracker.xlsx",
    },
  ],
};

export const POSTS = [
  {
    id: 1,
    title: "Future of Smart Cities",
    excerpt: "Exploring how smart utilities are shaping future cities...",
    author: "Dr. Sarah Johnson",
    date: "2024-01-15",
    readTime: "10 min",
    category: "technology",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e",
    featured: true,
    content: `
# The Future of Smart Cities

Smart cities are revolutionizing the way we live and interact with urban infrastructure. Through the integration of IoT devices, AI, and smart utility management systems, cities are becoming more efficient and sustainable than ever before.

## Key Technologies Driving Change

### 1. Internet of Things (IoT)
- Smart sensors for real-time monitoring
- Connected devices for automated responses
- Integrated data collection systems

### 2. Artificial Intelligence
- Predictive maintenance
- Resource optimization
- Pattern recognition for anomaly detection

## Impact on Urban Living

The implementation of smart utility systems has shown remarkable results:

- 30% reduction in water wastage
- 25% improvement in energy efficiency
- 40% better waste management

> "Smart cities aren't just about technology; they're about improving quality of life while reducing environmental impact." - Dr. Sarah Johnson

## Looking Ahead

The future holds even more promise with:

1. Advanced grid systems
2. Automated resource distribution
3. AI-powered decision making
4. Citizen engagement platforms

Read more about our smart city initiatives and how you can participate in building a sustainable future.
    `,
  },
  {
    id: 2,
    title: "Water Conservation: A Digital Approach",
    excerpt: "How IoT sensors are revolutionizing water management systems...",
    author: "Ramesh Kumar",
    date: "2024-01-18",
    readTime: "8 min",
    category: "water",
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189",
    featured: false,
    content: `
# Water Conservation: A Digital Approach

Digital technology is transforming how we monitor and manage water resources. This article explores the latest innovations in smart water management.

## Smart Monitoring Systems

Modern water management systems incorporate:

1. Real-time leak detection
2. Pressure monitoring
3. Quality sensors
4. Usage analytics

### Benefits of Digital Water Management

- Immediate leak detection
- Reduced water wastage
- Better quality control
- Cost savings

## Implementation Strategies

\`\`\`javascript
// Example monitoring system algorithm
function detectAnomalies(readings) {
  const threshold = calculateThreshold(readings);
  return readings.filter(reading => reading > threshold);
}
\`\`\`

> "Digital transformation in water management could save billions of gallons annually." - Ramesh Kumar

## Best Practices

| Practice | Impact | Implementation Cost |
|----------|---------|-------------------|
| Smart Metering | High | Medium |
| Leak Detection | High | Low |
| Quality Monitoring | Medium | High |

    `,
  },
  {
    id: 3,
    title: "Smart Meters: The Game Changer",
    excerpt:
      "Understanding the impact of smart meters on utility management...",
    author: "Priya Reddy",
    date: "2024-01-20",
    readTime: "12 min",
    category: "electricity",
    image: "https://images.unsplash.com/photo-1640622300473-977435c38c04", // Updated image URL
    featured: true,
    content: `
# Smart Meters: The Game Changer

Smart meters are revolutionizing utility management by providing real-time data and insights. This comprehensive guide explores their impact and benefits.

## Understanding Smart Meters

Smart meters offer:
- Real-time consumption tracking
- Automated billing
- Usage pattern analysis
- Demand response capabilities

### Technical Implementation

\`\`\`python
class SmartMeter:
    def __init__(self):
        self.readings = []
        
    def record_usage(self, reading):
        self.readings.append({
            'value': reading,
            'timestamp': datetime.now()
        })
\`\`\`

## Cost Benefits

1. Reduced manual reading costs
2. Better leak detection
3. Improved billing accuracy
4. Energy savings

> "Smart meters are not just devices; they're the foundation of modern utility management." - Priya Reddy
    `,
  },
  {
    id: 4,
    title: "Green Energy Transition",
    excerpt: "How Telangana is leading the renewable energy revolution...",
    author: "Arun Sharma",
    date: "2024-01-22",
    readTime: "15 min",
    category: "sustainability",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276",
    featured: false,
  },
  {
    id: 5,
    title: "Digital Waste Management",
    excerpt: "Smart solutions for urban waste collection and processing...",
    author: "Kavita Patel",
    date: "2024-01-25",
    readTime: "7 min",
    category: "waste",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
    featured: false,
  },
  {
    id: 6,
    title: "AI in Utility Management",
    excerpt:
      "How artificial intelligence is optimizing resource distribution...",
    author: "Dr. Vikram Mehta",
    date: "2024-01-28",
    readTime: "11 min",
    category: "technology",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    featured: true,
  },
  {
    id: 7,
    title: "Smart Home Integration",
    excerpt: "Connecting your home to the city's smart grid network...",
    author: "Lisa Chen",
    date: "2024-01-30",
    readTime: "9 min",
    category: "technology",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827",
    featured: false,
  },
  {
    id: 8,
    title: "Sustainable Urban Planning",
    excerpt: "Building cities with integrated smart utility systems...",
    author: "Raj Malhotra",
    date: "2024-02-01",
    readTime: "13 min",
    category: "sustainability",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
    featured: true,
  },
];
