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
    <div class="prose prose-invert max-w-none">
      <h2>Why Water Conservation Matters</h2>
      <p>Water conservation is crucial for sustainable urban development. As cities grow and climate change affects water availability, it's becoming increasingly important to manage our water resources efficiently. This program helps you understand and implement effective water conservation strategies.</p>
      
      <h3>Program Objectives</h3>
      <ul>
        <li>Reduce household water consumption by 40%</li>
        <li>Implement smart water monitoring systems</li>
        <li>Develop sustainable water usage habits</li>
        <li>Save money on water bills</li>
      </ul>
      
      <h3>Key Components</h3>
      <ol>
        <li>
          <strong>Smart Meter Installation</strong>
          <p>Learn about smart water meters and how they help track usage in real-time.</p>
        </li>
        <li>
          <strong>Leak Detection Workshop</strong>
          <p>Hands-on training to identify and fix common household water leaks.</p>
        </li>
        <li>
          <strong>Water-Efficient Fixtures</strong>
          <p>Guide to selecting and installing water-efficient fixtures and appliances.</p>
        </li>
      </ol>
      
      <h3>Expected Benefits</h3>
      <ul>
        <li>Reduce water bills by up to 40%</li>
        <li>Lower environmental impact</li>
        <li>Contribute to community sustainability</li>
        <li>Access to smart monitoring tools</li>
      </ul>

      <h3>Program Schedule</h3>
      <table class="w-full border-collapse border border-zinc-800 my-4">
        <thead>
          <tr>
            <th class="border border-zinc-800 p-2">Week</th>
            <th class="border border-zinc-800 p-2">Topic</th>
            <th class="border border-zinc-800 p-2">Format</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-zinc-800 p-2">Week 1</td>
            <td class="border border-zinc-800 p-2">Introduction to Water Conservation</td>
            <td class="border border-zinc-800 p-2">Online Workshop</td>
          </tr>
          <tr>
            <td class="border border-zinc-800 p-2">Week 2</td>
            <td class="border border-zinc-800 p-2">Smart Meter Installation</td>
            <td class="border border-zinc-800 p-2">On-site Training</td>
          </tr>
          <tr>
            <td class="border border-zinc-800 p-2">Week 3</td>
            <td class="border border-zinc-800 p-2">Usage Monitoring & Analysis</td>
            <td class="border border-zinc-800 p-2">Online Workshop</td>
          </tr>
        </tbody>
      </table>
    </div>
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
