
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MapPin, Globe, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Prospect {
  id: string;
  logo: string;
  name: string;
  exitRisk: "Very Low" | "Low" | "Moderate" | "High";
  employees: string;
  industry: string[];
  location: string;
  type: "B2B" | "B2C" | "Both";
}

const mockData: Prospect[] = [
  {
    id: "1",
    logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=80&h=80&fit=crop",
    name: "TechCorp AI",
    exitRisk: "Low",
    employees: "50-100",
    industry: ["AI/ML", "Fintech"],
    location: "Bay Area",
    type: "B2B",
  },
  {
    id: "2",
    logo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=80&h=80&fit=crop",
    name: "BioHealth Solutions",
    exitRisk: "Moderate",
    employees: "100-250",
    industry: ["Bio Health"],
    location: "Seattle",
    type: "B2C",
  },
  {
    id: "3",
    logo: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=80&h=80&fit=crop",
    name: "Crypto Dynamics",
    exitRisk: "High",
    employees: "25-50",
    industry: ["Crypto", "Fintech"],
    location: "Remote",
    type: "Both",
  },
];

const industries = ["AI/ML", "Bio Health", "Crypto", "Fintech", "Hardware"];
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

const Index = () => {
  const navigate = useNavigate();
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry)
        ? prev.filter((i) => i !== industry)
        : [...prev, industry]
    );
  };

  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

  const filteredData = mockData.filter((prospect) => {
    const matchesIndustry =
      selectedIndustries.length === 0 ||
      prospect.industry.some((i) => selectedIndustries.includes(i));
    const matchesLocation =
      selectedLocations.length === 0 ||
      selectedLocations.includes(prospect.location);
    const matchesSearch =
      searchTerm === "" ||
      prospect.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesIndustry && matchesLocation && matchesSearch;
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Very Low":
        return "bg-success-light text-success";
      case "Low":
        return "bg-success-light text-success";
      case "Moderate":
        return "bg-warning-light text-warning";
      case "High":
        return "bg-danger-light text-danger";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const handleCompanyClick = (id: string) => {
    navigate(`/company/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#FCFCFC]">
      <div className="max-w-7xl mx-auto p-8 space-y-8 animate-fadeIn">
        <div className="space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-semibold text-gray-900">Companies</h1>
            <p className="text-gray-500">Browse and filter company prospects</p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full max-w-md bg-white border-gray-200 focus:ring-2 focus:ring-gray-200 transition-shadow"
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700">Industries</h3>
              <div className="flex flex-wrap gap-2">
                {industries.map((industry) => (
                  <Badge
                    key={industry}
                    variant={
                      selectedIndustries.includes(industry) ? "default" : "outline"
                    }
                    className="cursor-pointer transition-all hover:scale-105 px-3 py-1"
                    onClick={() => toggleIndustry(industry)}
                  >
                    {industry}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700">Locations</h3>
              <div className="flex flex-wrap gap-2">
                {locations.map((location) => (
                  <Badge
                    key={location}
                    variant={
                      selectedLocations.includes(location) ? "default" : "outline"
                    }
                    className="cursor-pointer transition-all hover:scale-105 px-3 py-1"
                    onClick={() => toggleLocation(location)}
                  >
                    <MapPin className="h-3 w-3 mr-1.5" />
                    {location}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-[100px] font-medium">Logo</TableHead>
                <TableHead className="font-medium">Name</TableHead>
                <TableHead className="font-medium">Exit Risk</TableHead>
                <TableHead className="font-medium">Employees</TableHead>
                <TableHead className="font-medium">Industry</TableHead>
                <TableHead className="font-medium">Location</TableHead>
                <TableHead className="font-medium">Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((prospect) => (
                <TableRow
                  key={prospect.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors group"
                  onClick={() => handleCompanyClick(prospect.id)}
                >
                  <TableCell className="py-4">
                    <img
                      src={prospect.logo}
                      alt={`${prospect.name} logo`}
                      className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                      loading="lazy"
                    />
                  </TableCell>
                  <TableCell className="font-medium group-hover:text-primary transition-colors">
                    {prospect.name}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`${getRiskColor(prospect.exitRisk)} px-3 py-1`}
                    >
                      {prospect.exitRisk}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">{prospect.employees}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1.5">
                      {prospect.industry.map((ind) => (
                        <Badge
                          key={ind}
                          variant="outline"
                          className="text-xs bg-gray-50 border-gray-200"
                        >
                          {ind}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1.5 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{prospect.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="text-xs bg-gray-50 border-gray-200"
                    >
                      <Globe className="h-3 w-3 mr-1.5" />
                      {prospect.type}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Index;
