
import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ThemeProvider } from "next-themes";

// Using the same mock data structure from the index page
const mockData = [
  {
    id: "1",
    name: "TechCorp AI",
    industry: ["AI/ML", "Fintech"],
    location: "Bay Area",
    type: "B2B",
  },
  {
    id: "2",
    name: "BioHealth Solutions",
    industry: ["Bio Health"],
    location: "Seattle",
    type: "B2C",
  },
  {
    id: "3",
    name: "Crypto Dynamics",
    industry: ["Crypto", "Fintech"],
    location: "Remote",
    type: "Both",
  },
  {
    id: "4",
    name: "AI Labs",
    industry: ["AI/ML"],
    location: "Bay Area",
    type: "B2B",
  },
  {
    id: "5",
    name: "FinTech Solutions",
    industry: ["Fintech"],
    location: "Bay Area",
    type: "B2C",
  },
];

const locations = [
  "Remote",
  "Bay Area",
  "Washington DC",
  "Chicago",
  "LA",
  "Seattle",
  "Orange County",
  "New York",
];

const COLORS = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9', '#22c55e'];

const Insights = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>("Bay Area");

  // Calculate company type distribution
  const typeDistribution = mockData.reduce((acc, company) => {
    acc[company.type] = (acc[company.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const typeChartData = Object.entries(typeDistribution).map(([name, value]) => ({
    name,
    value,
  }));

  // Calculate industry distribution for selected location
  const getLocationIndustryData = (location: string) => {
    const locationCompanies = mockData.filter(
      (company) => company.location === location
    );

    const industries = locationCompanies.reduce((acc, company) => {
      company.industry.forEach((ind) => {
        acc[ind] = (acc[ind] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(industries).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const locationIndustryData = getLocationIndustryData(selectedLocation);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto p-8 space-y-8 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold text-foreground">Insights</h1>
              <p className="text-muted-foreground">
                Analyze company distribution by type and location
              </p>
            </div>
            <ThemeToggle />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Company Types Chart */}
            <div className="bg-card p-6 rounded-xl border shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-foreground">
                Company Types Distribution
              </h2>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={typeChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} (${(percent * 100).toFixed(0)}%)`
                      }
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {typeChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Industry Distribution by Location */}
            <div className="bg-card p-6 rounded-xl border shadow-sm">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Industry Distribution by Location
                </h2>
                <div className="flex flex-wrap gap-2">
                  {locations.map((location) => (
                    <Badge
                      key={location}
                      variant={
                        selectedLocation === location ? "default" : "outline"
                      }
                      className="cursor-pointer transition-all hover:scale-105 px-3 py-1"
                      onClick={() => setSelectedLocation(location)}
                    >
                      <MapPin className="h-3 w-3 mr-1.5" />
                      {location}
                    </Badge>
                  ))}
                </div>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={locationIndustryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} (${(percent * 100).toFixed(0)}%)`
                        }
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {locationIndustryData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Insights;
