"use client";

import {
  Users,
  Calendar,
  Clock,
  GraduationCap,
  Star,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  ChevronDown,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface StatItem {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ComponentType<{ className?: string }>;
  subtitle?: string;
  customContent?: React.ReactNode;
  activeLanes?: number;
  inactiveLanes?: number;
}

interface Center {
  id: string;
  name: string;
  location: string;
}

// Mock centres data
const centres: Center[] = [
  { id: "bangalore", name: "Bangalore", location: "India" },
  { id: "houston", name: "Houston", location: "USA" },
  { id: "melbourne", name: "Melbourne", location: "AUS" },
  { id: "brisbane", name: "Brisbane", location: "AUS" },
  { id: "delhi", name: "Delhi", location: "India" },
];

// Mock data for different centres
const centreData: Record<
  string,
  {
    stats: StatItem[];
    recentUsers: RecentUser[];
  }
> = {
  bangalore: {
    stats: [
      {
        title: "Total Members",
        value: "2,345",
        change: "+10%",
        changeType: "positive",
        icon: Users,
      },
      {
        title: "Pending Tours",
        value: "18",
        change: "+2",
        changeType: "positive",
        icon: Clock,
      },
      {
        title: "Today's Bookings",
        value: "52",
        change: "+5",
        changeType: "positive",
        icon: Calendar,
      },
      {
        title: "Induction",
        value: "15",
        change: "+3",
        changeType: "positive",
        icon: GraduationCap,
      },
      {
        title: "Early Bird Sign",
        value: "70",
        change: "+12",
        changeType: "positive",
        icon: Star,
      },
      {
        title: "Lane Details",
        value: "28",
        change: "82%",
        changeType: "positive",
        icon: Layers,
        subtitle: "Operational",
        activeLanes: 23,
        inactiveLanes: 5,
      },
      {
        title: "Batting Lanes",
        value: "14",
        change: "86%",
        changeType: "positive",
        icon: Layers,
        subtitle: "Operational",
        activeLanes: 12,
        inactiveLanes: 2,
      },
      {
        title: "Bowling Lanes",
        value: "10",
        change: "80%",
        changeType: "positive",
        icon: Layers,
        subtitle: "Operational",
        activeLanes: 8,
        inactiveLanes: 2,
      },
      {
        title: "Hybrid Lanes",
        value: "4",
        change: "75%",
        changeType: "positive",
        icon: Layers,
        subtitle: "Operational",
        activeLanes: 3,
        inactiveLanes: 1,
      },
    ],
    recentUsers: [
      {
        name: "Amit Sharma",
        joinedAt: new Date(Date.now() - 4 * 60 * 1000),
        induction: "Completed",
        tour: "Tour B1",
        lane: "Lane 2",
        batting: "Right-handed",
      },
      {
        name: "Priya Singh",
        joinedAt: new Date(Date.now() - 9 * 60 * 1000),
        induction: "Completed",
        tour: "Tour B2",
        lane: "Lane 5",
        batting: "Left-handed",
      },
    ],
  },
  houston: {
    stats: [
      {
        title: "Total Members",
        value: "1,120",
        change: "+7%",
        changeType: "positive",
        icon: Users,
      },
      {
        title: "Pending Tours",
        value: "20",
        change: "-1",
        changeType: "negative",
        icon: Clock,
      },
      {
        title: "Today's Bookings",
        value: "38",
        change: "+2",
        changeType: "positive",
        icon: Calendar,
      },
      {
        title: "Induction",
        value: "10",
        change: "+1",
        changeType: "positive",
        icon: GraduationCap,
      },
      {
        title: "Early Bird Sign",
        value: "55",
        change: "+6",
        changeType: "positive",
        icon: Star,
      },
      {
        title: "Lane Details",
        value: "20",
        change: "75%",
        changeType: "positive",
        icon: Layers,
        subtitle: "Operational",
        activeLanes: 15,
        inactiveLanes: 5,
      },
      {
        title: "Batting Lanes",
        value: "8",
        change: "75%",
        changeType: "positive",
        icon: Layers,
        subtitle: "Operational",
        activeLanes: 6,
        inactiveLanes: 2,
      },
      {
        title: "Bowling Lanes",
        value: "8",
        change: "75%",
        changeType: "positive",
        icon: Layers,
        subtitle: "Operational",
        activeLanes: 6,
        inactiveLanes: 2,
      },
      {
        title: "Hybrid Lanes",
        value: "4",
        change: "75%",
        changeType: "positive",
        icon: Layers,
        subtitle: "Operational",
        activeLanes: 3,
        inactiveLanes: 1,
      },
    ],
    recentUsers: [
      {
        name: "John Doe",
        joinedAt: new Date(Date.now() - 6 * 60 * 1000),
        induction: "Completed",
        tour: "Tour H1",
        lane: "Lane 1",
        batting: "Switch",
      },
      {
        name: "Jane Smith",
        joinedAt: new Date(Date.now() - 12 * 60 * 1000),
        induction: "Completed",
        tour: "Tour H2",
        lane: "Lane 3",
        batting: "Right-handed",
      },
    ],
  },
  melbourne: {
    stats: [
      {
        title: "Total Members",
        value: "1,800",
        change: "+12%",
        changeType: "positive",
        icon: Users,
      },
      {
        title: "Pending Tours",
        value: "25",
        change: "+4",
        changeType: "positive",
        icon: Clock,
      },
      {
        title: "Today's Bookings",
        value: "60",
        change: "+10",
        changeType: "positive",
        icon: Calendar,
      },
      {
        title: "Induction",
        value: "20",
        change: "+5",
        changeType: "positive",
        icon: GraduationCap,
      },
      {
        title: "Early Bird Sign",
        value: "80",
        change: "+20",
        changeType: "positive",
        icon: Star,
      },
      {
        title: "Lane Details",
        value: "32",
        change: "90%",
        changeType: "positive",
        icon: Layers,
        subtitle: "Operational",
        activeLanes: 29,
        inactiveLanes: 3,
      },
      {
        title: "Batting Lanes",
        value: "16",
        change: "94%",
        changeType: "positive",
        icon: Layers,
        subtitle: "Operational",
        activeLanes: 15,
        inactiveLanes: 1,
      },
      {
        title: "Bowling Lanes",
        value: "10",
        change: "80%",
        changeType: "positive",
        icon: Layers,
        subtitle: "Operational",
        activeLanes: 8,
        inactiveLanes: 2,
      },
      {
        title: "Hybrid Lanes",
        value: "6",
        change: "83%",
        changeType: "positive",
        icon: Layers,
        subtitle: "Operational",
        activeLanes: 5,
        inactiveLanes: 1,
      },
    ],
    recentUsers: [
      {
        name: "Liam Brown",
        joinedAt: new Date(Date.now() - 3 * 60 * 1000),
        induction: "Completed",
        tour: "Tour M1",
        lane: "Lane 4",
        batting: "Left-handed",
      },
      {
        name: "Olivia Wilson",
        joinedAt: new Date(Date.now() - 8 * 60 * 1000),
        induction: "Completed",
        tour: "Tour M2",
        lane: "Lane 7",
        batting: "Right-handed",
      },
    ],
  },
  brisbane: {
    stats: [
      {
        title: "Total Members",
        value: "1,050",
        change: "+6%",
        changeType: "positive",
        icon: Users,
      },
      {
        title: "Pending Tours",
        value: "12",
        change: "-2",
        changeType: "negative",
        icon: Clock,
      },
      {
        title: "Today's Bookings",
        value: "29",
        change: "+1",
        changeType: "positive",
        icon: Calendar,
      },
      {
        title: "Induction",
        value: "7",
        change: "+1",
        changeType: "positive",
        icon: GraduationCap,
      },
      {
        title: "Early Bird Sign",
        value: "40",
        change: "+5",
        changeType: "positive",
        icon: Star,
      },
      {
        title: "Lane Details",
        value: "16",
        change: "75%",
        changeType: "positive",
        icon: Layers,
        subtitle: "Operational",
        activeLanes: 12,
        inactiveLanes: 4,
      },
      {
        title: "Batting Lanes",
        value: "8",
        change: "75%",
        changeType: "positive",
        icon: Layers,
        subtitle: "Operational",
        activeLanes: 6,
        inactiveLanes: 2,
      },
      {
        title: "Bowling Lanes",
        value: "6",
        change: "67%",
        changeType: "neutral",
        icon: Layers,
        subtitle: "Operational",
        activeLanes: 4,
        inactiveLanes: 2,
      },
      {
        title: "Hybrid Lanes",
        value: "2",
        change: "50%",
        changeType: "neutral",
        icon: Layers,
        subtitle: "Operational",
        activeLanes: 1,
        inactiveLanes: 1,
      },
    ],
    recentUsers: [
      {
        name: "Noah Taylor",
        joinedAt: new Date(Date.now() - 5 * 60 * 1000),
        induction: "Completed",
        tour: "Tour B1",
        lane: "Lane 2",
        batting: "Right-handed",
      },
      {
        name: "Mia Harris",
        joinedAt: new Date(Date.now() - 11 * 60 * 1000),
        induction: "Completed",
        tour: "Tour B2",
        lane: "Lane 5",
        batting: "Left-handed",
      },
    ],
  },
  delhi: {
    stats: [
      {
        title: "Total Members",
        value: "2,000",
        change: "+11%",
        changeType: "positive",
        icon: Users,
      },
      {
        title: "Pending Tours",
        value: "22",
        change: "+3",
        changeType: "positive",
        icon: Clock,
      },
      {
        title: "Today's Bookings",
        value: "48",
        change: "+6",
        changeType: "positive",
        icon: Calendar,
      },
      {
        title: "Induction",
        value: "13",
        change: "+2",
        changeType: "positive",
        icon: GraduationCap,
      },
      {
        title: "Early Bird Sign",
        value: "65",
        change: "+10",
        changeType: "positive",
        icon: Star,
      },
      {
        title: "Lane Details",
        value: "24",
        change: "83%",
        changeType: "positive",
        icon: Layers,
        subtitle: "Operational",
        activeLanes: 20,
        inactiveLanes: 4,
      },
      {
        title: "Batting Lanes",
        value: "12",
        change: "83%",
        changeType: "positive",
        icon: Layers,
        subtitle: "Operational",
        activeLanes: 10,
        inactiveLanes: 2,
      },
      {
        title: "Bowling Lanes",
        value: "8",
        change: "75%",
        changeType: "positive",
        icon: Layers,
        subtitle: "Operational",
        activeLanes: 6,
        inactiveLanes: 2,
      },
      {
        title: "Hybrid Lanes",
        value: "4",
        change: "75%",
        changeType: "positive",
        icon: Layers,
        subtitle: "Operational",
        activeLanes: 3,
        inactiveLanes: 1,
      },
    ],
    recentUsers: [
      {
        name: "Rahul Verma",
        joinedAt: new Date(Date.now() - 2 * 60 * 1000),
        induction: "Completed",
        tour: "Tour D1",
        lane: "Lane 1",
        batting: "Switch",
      },
      {
        name: "Sneha Kapoor",
        joinedAt: new Date(Date.now() - 7 * 60 * 1000),
        induction: "Completed",
        tour: "Tour D2",
        lane: "Lane 3",
        batting: "Right-handed",
      },
    ],
  },
};

// Mock data for recent joined users
interface RecentUser {
  name: string;
  joinedAt: Date;
  induction: string;
  tour: string;
  lane: string;
  batting: string;
}

// Mock financial data for each centre
const financialData: Record<
  string,
  {
    revenue: number;
    growth: string;
    trend: { date: string; revenue: number }[];
  }
> = {
  bangalore: {
    revenue: 120000,
    growth: "+8%",
    trend: [
      { date: "Mon", revenue: 15000 },
      { date: "Tue", revenue: 17000 },
      { date: "Wed", revenue: 16000 },
      { date: "Thu", revenue: 18000 },
      { date: "Fri", revenue: 20000 },
      { date: "Sat", revenue: 22000 },
      { date: "Sun", revenue: 18000 },
    ],
  },
  houston: {
    revenue: 90000,
    growth: "+5%",
    trend: [
      { date: "Mon", revenue: 12000 },
      { date: "Tue", revenue: 13000 },
      { date: "Wed", revenue: 14000 },
      { date: "Thu", revenue: 11000 },
      { date: "Fri", revenue: 15000 },
      { date: "Sat", revenue: 17000 },
      { date: "Sun", revenue: 8000 },
    ],
  },
  melbourne: {
    revenue: 105000,
    growth: "+6%",
    trend: [
      { date: "Mon", revenue: 14000 },
      { date: "Tue", revenue: 15000 },
      { date: "Wed", revenue: 16000 },
      { date: "Thu", revenue: 13000 },
      { date: "Fri", revenue: 17000 },
      { date: "Sat", revenue: 18000 },
      { date: "Sun", revenue: 12000 },
    ],
  },
  brisbane: {
    revenue: 80000,
    growth: "+4%",
    trend: [
      { date: "Mon", revenue: 9000 },
      { date: "Tue", revenue: 10000 },
      { date: "Wed", revenue: 11000 },
      { date: "Thu", revenue: 12000 },
      { date: "Fri", revenue: 13000 },
      { date: "Sat", revenue: 15000 },
      { date: "Sun", revenue: 10000 },
    ],
  },
  delhi: {
    revenue: 110000,
    growth: "+7%",
    trend: [
      { date: "Mon", revenue: 13000 },
      { date: "Tue", revenue: 14000 },
      { date: "Wed", revenue: 15000 },
      { date: "Thu", revenue: 16000 },
      { date: "Fri", revenue: 18000 },
      { date: "Sat", revenue: 20000 },
      { date: "Sun", revenue: 14000 },
    ],
  },
};

// Mock lane analytics data for 2025 (monthly data)
const laneAnalyticsData: Record<
  string,
  { month: string; batting: number; bowling: number; hybrid: number }[]
> = {
  bangalore: [
    { month: "Jan", batting: 85, bowling: 78, hybrid: 72 },
    { month: "Feb", batting: 88, bowling: 82, hybrid: 75 },
    { month: "Mar", batting: 92, bowling: 85, hybrid: 78 },
    { month: "Apr", batting: 89, bowling: 80, hybrid: 73 },
    { month: "May", batting: 86, bowling: 79, hybrid: 71 },
    { month: "Jun", batting: 90, bowling: 83, hybrid: 76 },
    { month: "Jul", batting: 94, bowling: 87, hybrid: 80 },
    { month: "Aug", batting: 91, bowling: 84, hybrid: 77 },
    { month: "Sep", batting: 87, bowling: 81, hybrid: 74 },
    { month: "Oct", batting: 93, bowling: 86, hybrid: 79 },
    { month: "Nov", batting: 89, bowling: 82, hybrid: 75 },
    { month: "Dec", batting: 95, bowling: 88, hybrid: 81 },
  ],
  houston: [
    { month: "Jan", batting: 75, bowling: 70, hybrid: 65 },
    { month: "Feb", batting: 78, bowling: 73, hybrid: 68 },
    { month: "Mar", batting: 82, bowling: 77, hybrid: 72 },
    { month: "Apr", batting: 79, bowling: 74, hybrid: 69 },
    { month: "May", batting: 76, bowling: 71, hybrid: 66 },
    { month: "Jun", batting: 80, bowling: 75, hybrid: 70 },
    { month: "Jul", batting: 84, bowling: 79, hybrid: 74 },
    { month: "Aug", batting: 81, bowling: 76, hybrid: 71 },
    { month: "Sep", batting: 77, bowling: 72, hybrid: 67 },
    { month: "Oct", batting: 83, bowling: 78, hybrid: 73 },
    { month: "Nov", batting: 79, bowling: 74, hybrid: 69 },
    { month: "Dec", batting: 85, bowling: 80, hybrid: 75 },
  ],
  melbourne: [
    { month: "Jan", batting: 90, bowling: 85, hybrid: 80 },
    { month: "Feb", batting: 93, bowling: 88, hybrid: 83 },
    { month: "Mar", batting: 97, bowling: 92, hybrid: 87 },
    { month: "Apr", batting: 94, bowling: 89, hybrid: 84 },
    { month: "May", batting: 91, bowling: 86, hybrid: 81 },
    { month: "Jun", batting: 95, bowling: 90, hybrid: 85 },
    { month: "Jul", batting: 99, bowling: 94, hybrid: 89 },
    { month: "Aug", batting: 96, bowling: 91, hybrid: 86 },
    { month: "Sep", batting: 92, bowling: 87, hybrid: 82 },
    { month: "Oct", batting: 98, bowling: 93, hybrid: 88 },
    { month: "Nov", batting: 94, bowling: 89, hybrid: 84 },
    { month: "Dec", batting: 100, bowling: 95, hybrid: 90 },
  ],
  brisbane: [
    { month: "Jan", batting: 70, bowling: 65, hybrid: 60 },
    { month: "Feb", batting: 73, bowling: 68, hybrid: 63 },
    { month: "Mar", batting: 77, bowling: 72, hybrid: 67 },
    { month: "Apr", batting: 74, bowling: 69, hybrid: 64 },
    { month: "May", batting: 71, bowling: 66, hybrid: 61 },
    { month: "Jun", batting: 75, bowling: 70, hybrid: 65 },
    { month: "Jul", batting: 79, bowling: 74, hybrid: 69 },
    { month: "Aug", batting: 76, bowling: 71, hybrid: 66 },
    { month: "Sep", batting: 72, bowling: 67, hybrid: 62 },
    { month: "Oct", batting: 78, bowling: 73, hybrid: 68 },
    { month: "Nov", batting: 74, bowling: 69, hybrid: 64 },
    { month: "Dec", batting: 80, bowling: 75, hybrid: 70 },
  ],
  delhi: [
    { month: "Jan", batting: 80, bowling: 75, hybrid: 70 },
    { month: "Feb", batting: 83, bowling: 78, hybrid: 73 },
    { month: "Mar", batting: 87, bowling: 82, hybrid: 77 },
    { month: "Apr", batting: 84, bowling: 79, hybrid: 74 },
    { month: "May", batting: 81, bowling: 76, hybrid: 71 },
    { month: "Jun", batting: 85, bowling: 80, hybrid: 75 },
    { month: "Jul", batting: 89, bowling: 84, hybrid: 79 },
    { month: "Aug", batting: 86, bowling: 81, hybrid: 76 },
    { month: "Sep", batting: 82, bowling: 77, hybrid: 72 },
    { month: "Oct", batting: 88, bowling: 83, hybrid: 78 },
    { month: "Nov", batting: 84, bowling: 79, hybrid: 74 },
    { month: "Dec", batting: 90, bowling: 85, hybrid: 80 },
  ],
};

// Mock induction analytics data for 2025 (monthly data)
const inductionAnalyticsData: Record<
  string,
  { month: string; completed: number; pending: number; failed: number; total: number }[]
> = {
  bangalore: [
    { month: "Jan", completed: 45, pending: 8, failed: 2, total: 55 },
    { month: "Feb", completed: 52, pending: 6, failed: 1, total: 59 },
    { month: "Mar", completed: 58, pending: 5, failed: 2, total: 65 },
    { month: "Apr", completed: 48, pending: 7, failed: 1, total: 56 },
    { month: "May", completed: 55, pending: 4, failed: 3, total: 62 },
    { month: "Jun", completed: 62, pending: 3, failed: 1, total: 66 },
    { month: "Jul", completed: 68, pending: 2, failed: 2, total: 72 },
    { month: "Aug", completed: 65, pending: 4, failed: 1, total: 70 },
    { month: "Sep", completed: 59, pending: 6, failed: 2, total: 67 },
    { month: "Oct", completed: 71, pending: 3, failed: 1, total: 75 },
    { month: "Nov", completed: 66, pending: 5, failed: 2, total: 73 },
    { month: "Dec", completed: 74, pending: 2, failed: 1, total: 77 },
  ],
  houston: [
    { month: "Jan", completed: 32, pending: 6, failed: 1, total: 39 },
    { month: "Feb", completed: 38, pending: 4, failed: 2, total: 44 },
    { month: "Mar", completed: 42, pending: 3, failed: 1, total: 46 },
    { month: "Apr", completed: 35, pending: 5, failed: 2, total: 42 },
    { month: "May", completed: 40, pending: 3, failed: 1, total: 44 },
    { month: "Jun", completed: 45, pending: 2, failed: 1, total: 48 },
    { month: "Jul", completed: 48, pending: 1, failed: 2, total: 51 },
    { month: "Aug", completed: 46, pending: 3, failed: 1, total: 50 },
    { month: "Sep", completed: 41, pending: 4, failed: 1, total: 46 },
    { month: "Oct", completed: 50, pending: 2, failed: 1, total: 53 },
    { month: "Nov", completed: 47, pending: 3, failed: 1, total: 51 },
    { month: "Dec", completed: 52, pending: 1, failed: 1, total: 54 },
  ],
  melbourne: [
    { month: "Jan", completed: 58, pending: 7, failed: 2, total: 67 },
    { month: "Feb", completed: 65, pending: 5, failed: 1, total: 71 },
    { month: "Mar", completed: 72, pending: 4, failed: 2, total: 78 },
    { month: "Apr", completed: 68, pending: 6, failed: 1, total: 75 },
    { month: "May", completed: 75, pending: 3, failed: 2, total: 80 },
    { month: "Jun", completed: 82, pending: 2, failed: 1, total: 85 },
    { month: "Jul", completed: 88, pending: 1, failed: 2, total: 91 },
    { month: "Aug", completed: 85, pending: 3, failed: 1, total: 89 },
    { month: "Sep", completed: 79, pending: 5, failed: 1, total: 85 },
    { month: "Oct", completed: 92, pending: 2, failed: 1, total: 95 },
    { month: "Nov", completed: 87, pending: 4, failed: 1, total: 92 },
    { month: "Dec", completed: 95, pending: 1, failed: 1, total: 97 },
  ],
  brisbane: [
    { month: "Jan", completed: 28, pending: 5, failed: 1, total: 34 },
    { month: "Feb", completed: 32, pending: 4, failed: 2, total: 38 },
    { month: "Mar", completed: 36, pending: 3, failed: 1, total: 40 },
    { month: "Apr", completed: 30, pending: 5, failed: 1, total: 36 },
    { month: "May", completed: 34, pending: 3, failed: 2, total: 39 },
    { month: "Jun", completed: 38, pending: 2, failed: 1, total: 41 },
    { month: "Jul", completed: 42, pending: 1, failed: 1, total: 44 },
    { month: "Aug", completed: 40, pending: 3, failed: 1, total: 44 },
    { month: "Sep", completed: 35, pending: 4, failed: 1, total: 40 },
    { month: "Oct", completed: 44, pending: 2, failed: 1, total: 47 },
    { month: "Nov", completed: 41, pending: 3, failed: 1, total: 45 },
    { month: "Dec", completed: 46, pending: 1, failed: 1, total: 48 },
  ],
  delhi: [
    { month: "Jan", completed: 42, pending: 6, failed: 2, total: 50 },
    { month: "Feb", completed: 48, pending: 4, failed: 1, total: 53 },
    { month: "Mar", completed: 54, pending: 3, failed: 2, total: 59 },
    { month: "Apr", completed: 50, pending: 5, failed: 1, total: 56 },
    { month: "May", completed: 56, pending: 3, failed: 2, total: 61 },
    { month: "Jun", completed: 62, pending: 2, failed: 1, total: 65 },
    { month: "Jul", completed: 68, pending: 1, failed: 2, total: 71 },
    { month: "Aug", completed: 65, pending: 3, failed: 1, total: 69 },
    { month: "Sep", completed: 59, pending: 5, failed: 1, total: 65 },
    { month: "Oct", completed: 72, pending: 2, failed: 1, total: 75 },
    { month: "Nov", completed: 67, pending: 4, failed: 1, total: 72 },
    { month: "Dec", completed: 75, pending: 1, failed: 1, total: 77 },
  ],
};

// Mock tour analytics data for 2025 (monthly data)
const tourAnalyticsData: Record<
  string,
  { month: string; completed: number; pending: number; cancelled: number; total: number }[]
> = {
  bangalore: [
    { month: "Jan", completed: 38, pending: 12, cancelled: 3, total: 53 },
    { month: "Feb", completed: 42, pending: 10, cancelled: 2, total: 54 },
    { month: "Mar", completed: 48, pending: 8, cancelled: 1, total: 57 },
    { month: "Apr", completed: 44, pending: 11, cancelled: 2, total: 57 },
    { month: "May", completed: 50, pending: 7, cancelled: 1, total: 58 },
    { month: "Jun", completed: 55, pending: 5, cancelled: 2, total: 62 },
    { month: "Jul", completed: 62, pending: 3, cancelled: 1, total: 66 },
    { month: "Aug", completed: 58, pending: 6, cancelled: 2, total: 66 },
    { month: "Sep", completed: 52, pending: 9, cancelled: 1, total: 62 },
    { month: "Oct", completed: 65, pending: 4, cancelled: 1, total: 70 },
    { month: "Nov", completed: 60, pending: 7, cancelled: 2, total: 69 },
    { month: "Dec", completed: 68, pending: 3, cancelled: 1, total: 72 },
  ],
  houston: [
    { month: "Jan", completed: 28, pending: 8, cancelled: 2, total: 38 },
    { month: "Feb", completed: 32, pending: 7, cancelled: 1, total: 40 },
    { month: "Mar", completed: 36, pending: 6, cancelled: 2, total: 44 },
    { month: "Apr", completed: 30, pending: 9, cancelled: 1, total: 40 },
    { month: "May", completed: 34, pending: 5, cancelled: 2, total: 41 },
    { month: "Jun", completed: 38, pending: 4, cancelled: 1, total: 43 },
    { month: "Jul", completed: 42, pending: 2, cancelled: 1, total: 45 },
    { month: "Aug", completed: 40, pending: 5, cancelled: 2, total: 47 },
    { month: "Sep", completed: 35, pending: 7, cancelled: 1, total: 43 },
    { month: "Oct", completed: 44, pending: 3, cancelled: 1, total: 48 },
    { month: "Nov", completed: 41, pending: 6, cancelled: 2, total: 49 },
    { month: "Dec", completed: 46, pending: 2, cancelled: 1, total: 49 },
  ],
  melbourne: [
    { month: "Jan", completed: 52, pending: 10, cancelled: 2, total: 64 },
    { month: "Feb", completed: 58, pending: 8, cancelled: 1, total: 67 },
    { month: "Mar", completed: 65, pending: 6, cancelled: 2, total: 73 },
    { month: "Apr", completed: 60, pending: 9, cancelled: 1, total: 70 },
    { month: "May", completed: 68, pending: 5, cancelled: 2, total: 75 },
    { month: "Jun", completed: 75, pending: 3, cancelled: 1, total: 79 },
    { month: "Jul", completed: 82, pending: 2, cancelled: 1, total: 85 },
    { month: "Aug", completed: 78, pending: 5, cancelled: 2, total: 85 },
    { month: "Sep", completed: 72, pending: 7, cancelled: 1, total: 80 },
    { month: "Oct", completed: 88, pending: 3, cancelled: 1, total: 92 },
    { month: "Nov", completed: 83, pending: 6, cancelled: 2, total: 91 },
    { month: "Dec", completed: 92, pending: 2, cancelled: 1, total: 95 },
  ],
  brisbane: [
    { month: "Jan", completed: 24, pending: 6, cancelled: 1, total: 31 },
    { month: "Feb", completed: 28, pending: 5, cancelled: 2, total: 35 },
    { month: "Mar", completed: 32, pending: 4, cancelled: 1, total: 37 },
    { month: "Apr", completed: 26, pending: 7, cancelled: 1, total: 34 },
    { month: "May", completed: 30, pending: 4, cancelled: 2, total: 36 },
    { month: "Jun", completed: 34, pending: 3, cancelled: 1, total: 38 },
    { month: "Jul", completed: 38, pending: 2, cancelled: 1, total: 41 },
    { month: "Aug", completed: 36, pending: 4, cancelled: 2, total: 42 },
    { month: "Sep", completed: 31, pending: 6, cancelled: 1, total: 38 },
    { month: "Oct", completed: 40, pending: 2, cancelled: 1, total: 43 },
    { month: "Nov", completed: 37, pending: 5, cancelled: 2, total: 44 },
    { month: "Dec", completed: 42, pending: 1, cancelled: 1, total: 44 },
  ],
  delhi: [
    { month: "Jan", completed: 38, pending: 8, cancelled: 2, total: 48 },
    { month: "Feb", completed: 42, pending: 7, cancelled: 1, total: 50 },
    { month: "Mar", completed: 48, pending: 6, cancelled: 2, total: 56 },
    { month: "Apr", completed: 44, pending: 9, cancelled: 1, total: 54 },
    { month: "May", completed: 50, pending: 5, cancelled: 2, total: 57 },
    { month: "Jun", completed: 55, pending: 4, cancelled: 1, total: 60 },
    { month: "Jul", completed: 62, pending: 2, cancelled: 1, total: 65 },
    { month: "Aug", completed: 58, pending: 5, cancelled: 2, total: 65 },
    { month: "Sep", completed: 52, pending: 7, cancelled: 1, total: 60 },
    { month: "Oct", completed: 65, pending: 3, cancelled: 1, total: 69 },
    { month: "Nov", completed: 60, pending: 6, cancelled: 2, total: 68 },
    { month: "Dec", completed: 68, pending: 2, cancelled: 1, total: 71 },
  ],
};

// Helper to get time ago string
function timeAgo(date: Date) {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  const diffHrs = Math.floor(diffMins / 60);
  return `${diffHrs} hour${diffHrs > 1 ? "s" : ""} ago`;
}

export default function DashboardPage() {
  const [selectedCentre, setSelectedCentre] = useState<string>("bangalore");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentCentre = centres.find((centre) => centre.id === selectedCentre);
  const currentData = centreData[selectedCentre];
  const currentFinancial = financialData[selectedCentre];
  const currentLaneAnalytics = laneAnalyticsData[selectedCentre];
  const currentInductionAnalytics = inductionAnalyticsData[selectedCentre];
  const currentTourAnalytics = tourAnalyticsData[selectedCentre];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to your admin portal</p>
        </div>
        {/* Centres Dropdown */}
        <div className="flex flex-col items-start min-w-[220px]">
          <label className="mb-1 text-xs font-medium text-gray-700">
            Centre
          </label>
          <div className="relative w-full">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center w-full gap-2 bg-white border border-blue-200 rounded-lg px-4 py-2 text-base font-semibold text-gray-900 shadow-sm hover:border-blue-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
            >
              <MapPin className="h-4 w-4 text-blue-500 mr-1" />
              <span className="flex-1 text-left truncate">
                {currentCentre
                  ? `${currentCentre.name}, ${currentCentre.location}`
                  : "Select Centre"}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-full bg-white border border-blue-100 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                {centres.map((centre) => (
                  <button
                    key={centre.id}
                    onClick={() => {
                      setSelectedCentre(centre.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-blue-50 transition-colors rounded ${
                      selectedCentre === centre.id
                        ? "bg-blue-50 text-blue-700 font-semibold"
                        : "text-gray-800"
                    }`}
                  >
                    <MapPin className="h-4 w-4 text-blue-400" />
                    <span className="truncate">
                      {centre.name}, {centre.location}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

    

      {/* Stats Grid */}
      <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mx-auto flex justify-center items-center">
        {currentData.stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-xl shadow p-6 border border-gray-100 w-full max-w-xs transition-transform duration-200 hover:scale-105 hover:shadow-lg group relative"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  {stat.title}
                </p>
                <div className="flex items-end gap-2">
                  <p className="text-3xl font-extrabold text-gray-900 leading-tight">
                    {stat.value}
                  </p>
                  {stat.subtitle && (
                    <span className="text-xs text-gray-500 mb-1">
                      {stat.subtitle}
                    </span>
                  )}
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                <stat.icon className="h-7 w-7 text-blue-600" />
              </div>
            </div>
            {stat.customContent ? (
              stat.customContent
            ) : (
              <div className="mt-4 flex items-center gap-2">
                <span
                  className={`inline-flex items-center text-sm font-semibold px-2 py-0.5 rounded-full
                    ${
                      stat.changeType === "positive"
                        ? "bg-green-50 text-green-700"
                        : stat.changeType === "negative"
                        ? "bg-red-50 text-red-700"
                        : "bg-gray-100 text-gray-600"
                    }
                  `}
                >
                  {stat.changeType === "positive" && (
                    <ArrowUpRight className="h-4 w-4 mr-1 text-green-600" />
                  )}
                  {stat.changeType === "negative" && (
                    <ArrowDownRight className="h-4 w-4 mr-1 text-red-600" />
                  )}
                  {stat.changeType === "neutral" && (
                    <Minus className="h-4 w-4 mr-1 text-gray-500" />
                  )}
                  {stat.change}
                </span>
                <span className="text-xs text-gray-500">
                  {stat.subtitle
                    ? stat.subtitle
                    : stat.change.includes("%")
                    ? "from last month"
                    : "new today"}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Recent Activity and Today Overview Side by Side */}
      <div className="flex flex-col lg:flex-row gap-8 w-full">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 w-full lg:w-1/2 p-0 flex flex-col min-w-[320px] max-w-[50%] h-[600px]">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100 bg-white rounded-t-2xl">
            <Users className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="px-6 pt-4 pb-6 flex-1 flex flex-col overflow-hidden">
              <p className="text-xs text-gray-500 mb-4">
                Members who joined in the last hour
              </p>
              <div className="space-y-4 overflow-y-auto pr-2 flex-1">
                {currentData.recentUsers.filter(
                  (u) =>
                    new Date().getTime() - u.joinedAt.getTime() <=
                    60 * 60 * 1000
                ).length === 0 && (
                  <div className="text-sm text-gray-500">
                    No recent joins in the last hour.
                  </div>
                )}
                {currentData.recentUsers
                  .filter(
                    (u) =>
                      new Date().getTime() - u.joinedAt.getTime() <=
                      60 * 60 * 1000
                  )
                  .slice(0, 10)
                  .map((user, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-4 bg-gray-50 rounded-xl p-4 shadow-sm"
                    >
                      {/* Avatar with initials */}
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold text-lg">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-base font-semibold text-gray-900">
                            {user.name}
                          </p>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium ml-1">
                            {timeAgo(user.joinedAt)}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full font-medium">
                            Induction: {user.induction}
                          </span>
                          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full font-medium">
                            Tour: {user.tour}
                          </span>
                          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full font-medium">
                            Lane: {user.lane}
                          </span>
                          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full font-medium">
                            Batting: {user.batting}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        {/* Today Overview */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 w-full lg:w-1/2 flex flex-col min-w-[320px] max-w-[50%] h-[600px]">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100 bg-white rounded-t-2xl">
            <Calendar className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-bold text-gray-900">Today Overview</h2>
          </div>
          <div className="px-6 flex-1 flex flex-col min-h-0 overflow-auto">
            {/* Lane Utilization Section */}
            <div className="mt-10">
              <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Layers className="h-4 w-4 text-blue-500" /> Lane Utilization
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Overall Lane Utilization */}
                {(() => {
                  const laneStats = currentData.stats.find(
                    (s) => s.title === "Lane Details"
                  );
                  const totalLanes = laneStats ? parseInt(laneStats.value) : 0;
                  const activeLanes =
                    laneStats && laneStats.activeLanes
                      ? laneStats.activeLanes
                      : 0;
                  const utilization = totalLanes
                    ? Math.round((activeLanes / totalLanes) * 100)
                    : 0;
                  return (
                    <div className="bg-white border border-gray-100 rounded-lg p-4 flex flex-col gap-2 shadow-sm">
                      <div className="flex items-center gap-2">
                        <Layers className="h-5 w-5 text-blue-400" />
                        <span className="font-bold text-gray-900">
                          Overall Lane Utilization
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-2xl font-bold text-gray-900">
                          {utilization}%
                        </span>
                        <span className="text-xs text-gray-500">
                          ({activeLanes} / {totalLanes} active)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${utilization}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })()}
                {/* Batting, Bowling, Hybrid Lane Utilization */}
                {(() => {
                  // Batting
                  const battingStats = currentData.stats.find(
                    (s) => s.title === "Batting Lanes"
                  );
                  const totalBatting = battingStats
                    ? parseInt(battingStats.value)
                    : 0;
                  const activeBatting =
                    battingStats && battingStats.activeLanes
                      ? battingStats.activeLanes
                      : 0;
                  const battingUtil = totalBatting
                    ? Math.round((activeBatting / totalBatting) * 100)
                    : 0;
                  // Bowling
                  const bowlingStats = currentData.stats.find(
                    (s) => s.title === "Bowling Lanes"
                  );
                  const totalBowling = bowlingStats
                    ? parseInt(bowlingStats.value)
                    : 0;
                  const activeBowling =
                    bowlingStats && bowlingStats.activeLanes
                      ? bowlingStats.activeLanes
                      : 0;
                  const bowlingUtil = totalBowling
                    ? Math.round((activeBowling / totalBowling) * 100)
                    : 0;
                  // Hybrid
                  const hybridStats = currentData.stats.find(
                    (s) => s.title === "Hybrid Lanes"
                  );
                  const totalHybrid = hybridStats
                    ? parseInt(hybridStats.value)
                    : 0;
                  const activeHybrid =
                    hybridStats && hybridStats.activeLanes
                      ? hybridStats.activeLanes
                      : 0;
                  const hybridUtil = totalHybrid
                    ? Math.round((activeHybrid / totalHybrid) * 100)
                    : 0;
                  return (
                    <div className="flex flex-col gap-4 w-full">
                      {/* Batting */}
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Layers className="h-4 w-4 text-blue-500" />
                          <span className="font-semibold text-blue-900">
                            Batting Lanes
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-lg font-bold text-blue-900">
                            {battingUtil}%
                          </span>
                          <span className="text-xs text-blue-700">
                            ({activeBatting} / {totalBatting} active)
                          </span>
                        </div>
                        <div className="w-full bg-blue-100 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all"
                            style={{ width: `${battingUtil}%` }}
                          ></div>
                        </div>
                      </div>
                      {/* Bowling */}
                      <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Layers className="h-4 w-4 text-green-500" />
                          <span className="font-semibold text-green-900">
                            Bowling Lanes
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-lg font-bold text-green-900">
                            {bowlingUtil}%
                          </span>
                          <span className="text-xs text-green-700">
                            ({activeBowling} / {totalBowling} active)
                          </span>
                        </div>
                        <div className="w-full bg-green-100 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all"
                            style={{ width: `${bowlingUtil}%` }}
                          ></div>
                        </div>
                      </div>
                      {/* Hybrid */}
                      <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Layers className="h-4 w-4 text-yellow-500" />
                          <span className="font-semibold text-yellow-900">
                            Hybrid Lanes
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-lg font-bold text-yellow-900">
                            {hybridUtil}%
                          </span>
                          <span className="text-xs text-yellow-700">
                            ({activeHybrid} / {totalHybrid} active)
                          </span>
                        </div>
                        <div className="w-full bg-yellow-100 rounded-full h-2">
                          <div
                            className="bg-yellow-500 h-2 rounded-full transition-all"
                            style={{ width: `${hybridUtil}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>

       {/* Financial Overview and Lane Analytics Side by Side */}
       <div className="flex flex-col md:flex-row gap-6 w-full">
        {/* Financial Overview Top Row */}
        <div className="bg-gradient-to-tr from-blue-50 via-white to-blue-100 rounded-2xl shadow-lg border border-blue-100 flex flex-col items-start px-8 py-6 gap-2 transition-all duration-200 hover:shadow-xl w-full md:w-1/2">
          <div className="mb-2">
            <h2 className="text-xl md:text-2xl font-bold text-blue-900 leading-tight">
              Financial Overview
            </h2>
            <p className="text-xs md:text-sm text-blue-600 font-medium">
              This week's revenue performance
            </p>
          </div>
          <div className="w-full h-80 md:h-96 flex items-center justify-center bg-white/70 rounded-xl shadow-inner p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={currentFinancial.trend}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="5 5"
                  vertical={false}
                  stroke="#e2e8f0"
                  opacity={0.6}
                />
                <XAxis
                  dataKey="date"
                  fontSize={12}
                  fontWeight={600}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#475569" }}
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis 
                  fontSize={12}
                  fontWeight={600}
                  tickLine={false} 
                  axisLine={false} 
                  hide={false}
                  tick={{ fill: "#475569" }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  width={60}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 16,
                    background: "rgba(255, 255, 255, 0.95)",
                    border: "2px solid #3b82f6",
                    fontSize: 14,
                    fontWeight: 600,
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(10px)",
                  }}
                  labelStyle={{ color: "#1e293b", fontWeight: 700 }}
                  formatter={(value: any) => [`$${value.toLocaleString()}`, "Revenue"]}
                  labelFormatter={(label) => `${label} - ${currentCentre?.name}`}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={4}
                  dot={{
                    r: 6,
                    fill: "#3b82f6",
                    stroke: "#ffffff",
                    strokeWidth: 3,
                    filter: "drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))",
                  }}
                  activeDot={{ 
                    r: 10,
                    fill: "#1d4ed8",
                    stroke: "#ffffff",
                    strokeWidth: 4,
                    filter: "drop-shadow(0 4px 8px rgba(29, 78, 216, 0.4))",
                  }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-between w-full mt-4 px-2">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-900">
                ${currentFinancial.revenue.toLocaleString()}
              </p>
              <p className="text-sm text-blue-600 font-medium">Total Revenue</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-green-600">
                {currentFinancial.growth}
              </p>
              <p className="text-sm text-gray-600">Growth</p>
            </div>
          </div>
        </div>
        {/* Lane Analytics Section */}
        <div className="bg-gradient-to-tr from-green-50 via-white to-green-100 rounded-2xl shadow-lg border border-green-100 flex flex-col items-start px-8 py-6 gap-2 transition-all duration-200 hover:shadow-xl w-full md:w-1/2">
          <div className="mb-2">
            <h2 className="text-xl md:text-2xl font-bold text-green-900 leading-tight">
              Lane Analytics
            </h2>
            <p className="text-xs md:text-sm text-green-600 font-medium">
              Monthly lane utilization trends
            </p>
          </div>
          <div className="w-full h-80 md:h-96 flex items-center justify-center bg-white/70 rounded-xl shadow-inner p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={currentLaneAnalytics}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="5 5"
                  vertical={false}
                  stroke="#e2e8f0"
                  opacity={0.6}
                />
                <XAxis
                  dataKey="month"
                  fontSize={12}
                  fontWeight={600}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#475569" }}
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis
                  fontSize={12}
                  fontWeight={600}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#475569" }}
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                  width={50}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 16,
                    background: "rgba(255, 255, 255, 0.95)",
                    border: "2px solid #10b981",
                    fontSize: 14,
                    fontWeight: 600,
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(10px)",
                  }}
                  labelStyle={{ color: "#1e293b", fontWeight: 700 }}
                  formatter={(value: any) => [`${value}%`, ""]}
                  labelFormatter={(label) => `${label} 2025 - ${currentCentre?.name}`}
                />
       
                <Line
                  type="monotone"
                  dataKey="batting"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{
                    r: 5,
                    fill: "#3b82f6",
                    stroke: "#ffffff",
                    strokeWidth: 2,
                    filter: "drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))",
                  }}
                  activeDot={{ 
                    r: 8,
                    fill: "#1d4ed8",
                    stroke: "#ffffff",
                    strokeWidth: 3,
                    filter: "drop-shadow(0 4px 8px rgba(29, 78, 216, 0.4))",
                  }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  name="Batting Lanes"
                />
                <Line
                  type="monotone"
                  dataKey="bowling"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{
                    r: 5,
                    fill: "#10b981",
                    stroke: "#ffffff",
                    strokeWidth: 2,
                    filter: "drop-shadow(0 2px 4px rgba(16, 185, 129, 0.3))",
                  }}
                  activeDot={{ 
                    r: 8,
                    fill: "#059669",
                    stroke: "#ffffff",
                    strokeWidth: 3,
                    filter: "drop-shadow(0 4px 8px rgba(5, 150, 105, 0.4))",
                  }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  name="Bowling Lanes"
                />
                <Line
                  type="monotone"
                  dataKey="hybrid"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={{
                    r: 5,
                    fill: "#f59e0b",
                    stroke: "#ffffff",
                    strokeWidth: 2,
                    filter: "drop-shadow(0 2px 4px rgba(245, 158, 11, 0.3))",
                  }}
                  activeDot={{ 
                    r: 8,
                    fill: "#d97706",
                    stroke: "#ffffff",
                    strokeWidth: 3,
                    filter: "drop-shadow(0 4px 8px rgba(217, 119, 6, 0.4))",
                  }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  name="Hybrid Lanes"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-6 mt-4 text-sm font-medium">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500 shadow-sm"></div>
              <span className="text-blue-700">Batting Lanes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500 shadow-sm"></div>
              <span className="text-green-700">Bowling Lanes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500 shadow-sm"></div>
              <span className="text-yellow-700">Hybrid Lanes</span>
            </div>
          </div>
        </div>
      </div>
      {/* End Financial Overview and Lane Analytics Side by Side */}

      {/* Induction and Tour Analytics Side by Side */}
      <div className="flex flex-col md:flex-row gap-6 w-full">
        {/* Induction Analytics Section */}
        <div className="bg-gradient-to-tr from-purple-50 via-white to-purple-100 rounded-2xl shadow-lg border border-purple-100 flex flex-col items-start px-8 py-6 gap-2 transition-all duration-200 hover:shadow-xl w-full md:w-1/2">
          <div className="mb-2">
            <h2 className="text-xl md:text-2xl font-bold text-purple-900 leading-tight">
              Induction Analytics
            </h2>
            <p className="text-xs md:text-sm text-purple-600 font-medium">
              Monthly induction completion trends
            </p>
          </div>
          <div className="w-full h-80 md:h-96 flex items-center justify-center bg-white/70 rounded-xl shadow-inner p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={currentInductionAnalytics}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="5 5"
                  vertical={false}
                  stroke="#e2e8f0"
                  opacity={0.6}
                />
                <XAxis
                  dataKey="month"
                  fontSize={12}
                  fontWeight={600}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#475569" }}
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis
                  fontSize={12}
                  fontWeight={600}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#475569" }}
                  width={50}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 16,
                    background: "rgba(255, 255, 255, 0.95)",
                    border: "2px solid #8b5cf6",
                    fontSize: 14,
                    fontWeight: 600,
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(10px)",
                  }}
                  labelStyle={{ color: "#1e293b", fontWeight: 700 }}
                  formatter={(value: any) => [`${value}`, ""]}
                  labelFormatter={(label) => `${label} 2025 - ${currentCentre?.name}`}
                />
       
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{
                    r: 5,
                    fill: "#8b5cf6",
                    stroke: "#ffffff",
                    strokeWidth: 2,
                    filter: "drop-shadow(0 2px 4px rgba(139, 92, 246, 0.3))",
                  }}
                  activeDot={{ 
                    r: 8,
                    fill: "#7c3aed",
                    stroke: "#ffffff",
                    strokeWidth: 3,
                    filter: "drop-shadow(0 4px 8px rgba(124, 58, 237, 0.4))",
                  }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  name="Completed Inductions"
                />
                <Line
                  type="monotone"
                  dataKey="pending"
                  stroke="#6b7280"
                  strokeWidth={3}
                  dot={{
                    r: 5,
                    fill: "#6b7280",
                    stroke: "#ffffff",
                    strokeWidth: 2,
                    filter: "drop-shadow(0 2px 4px rgba(107, 114, 128, 0.3))",
                  }}
                  activeDot={{ 
                    r: 8,
                    fill: "#4b5563",
                    stroke: "#ffffff",
                    strokeWidth: 3,
                    filter: "drop-shadow(0 4px 8px rgba(75, 85, 99, 0.4))",
                  }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  name="Pending Inductions"
                />
                <Line
                  type="monotone"
                  dataKey="failed"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{
                    r: 5,
                    fill: "#ef4444",
                    stroke: "#ffffff",
                    strokeWidth: 2,
                    filter: "drop-shadow(0 2px 4px rgba(239, 68, 68, 0.3))",
                  }}
                  activeDot={{ 
                    r: 8,
                    fill: "#991b1b",
                    stroke: "#ffffff",
                    strokeWidth: 3,
                    filter: "drop-shadow(0 4px 8px rgba(153, 27, 27, 0.4))",
                  }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  name="Failed Inductions"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-6 mt-4 text-sm font-medium">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-purple-500 shadow-sm"></div>
              <span className="text-purple-700">Completed Inductions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gray-500 shadow-sm"></div>
              <span className="text-gray-700">Pending Inductions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500 shadow-sm"></div>
              <span className="text-red-700">Failed Inductions</span>
            </div>
          </div>
        </div>
        {/* Tour Analytics Section */}
        <div className="bg-gradient-to-tr from-orange-50 via-white to-orange-100 rounded-2xl shadow-lg border border-orange-100 flex flex-col items-start px-8 py-6 gap-2 transition-all duration-200 hover:shadow-xl w-full md:w-1/2">
          <div className="mb-2">
            <h2 className="text-xl md:text-2xl font-bold text-orange-900 leading-tight">
              Tour Analytics
            </h2>
            <p className="text-xs md:text-sm text-orange-600 font-medium">
              Monthly tour completion trends
            </p>
          </div>
          <div className="w-full h-80 md:h-96 flex items-center justify-center bg-white/70 rounded-xl shadow-inner p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={currentTourAnalytics}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="5 5"
                  vertical={false}
                  stroke="#e2e8f0"
                  opacity={0.6}
                />
                <XAxis
                  dataKey="month"
                  fontSize={12}
                  fontWeight={600}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#475569" }}
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis
                  fontSize={12}
                  fontWeight={600}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#475569" }}
                  width={50}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 16,
                    background: "rgba(255, 255, 255, 0.95)",
                    border: "2px solid #f59e0b",
                    fontSize: 14,
                    fontWeight: 600,
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(10px)",
                  }}
                  labelStyle={{ color: "#1e293b", fontWeight: 700 }}
                  formatter={(value: any) => [`${value}`, ""]}
                  labelFormatter={(label) => `${label} 2025 - ${currentCentre?.name}`}
                />
       
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={{
                    r: 5,
                    fill: "#f59e0b",
                    stroke: "#ffffff",
                    strokeWidth: 2,
                    filter: "drop-shadow(0 2px 4px rgba(245, 158, 11, 0.3))",
                  }}
                  activeDot={{ 
                    r: 8,
                    fill: "#d97706",
                    stroke: "#ffffff",
                    strokeWidth: 3,
                    filter: "drop-shadow(0 4px 8px rgba(217, 119, 6, 0.4))",
                  }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  name="Completed Tours"
                />
                <Line
                  type="monotone"
                  dataKey="pending"
                  stroke="#6b7280"
                  strokeWidth={3}
                  dot={{
                    r: 5,
                    fill: "#6b7280",
                    stroke: "#ffffff",
                    strokeWidth: 2,
                    filter: "drop-shadow(0 2px 4px rgba(107, 114, 128, 0.3))",
                  }}
                  activeDot={{ 
                    r: 8,
                    fill: "#4b5563",
                    stroke: "#ffffff",
                    strokeWidth: 3,
                    filter: "drop-shadow(0 4px 8px rgba(75, 85, 99, 0.4))",
                  }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  name="Pending Tours"
                />
                <Line
                  type="monotone"
                  dataKey="cancelled"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{
                    r: 5,
                    fill: "#ef4444",
                    stroke: "#ffffff",
                    strokeWidth: 2,
                    filter: "drop-shadow(0 2px 4px rgba(239, 68, 68, 0.3))",
                  }}
                  activeDot={{ 
                    r: 8,
                    fill: "#991b1b",
                    stroke: "#ffffff",
                    strokeWidth: 3,
                    filter: "drop-shadow(0 4px 8px rgba(153, 27, 27, 0.4))",
                  }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  name="Cancelled Tours"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-6 mt-4 text-sm font-medium">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-orange-500 shadow-sm"></div>
              <span className="text-orange-700">Completed Tours</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gray-500 shadow-sm"></div>
              <span className="text-gray-700">Pending Tours</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500 shadow-sm"></div>
              <span className="text-red-700">Cancelled Tours</span>
            </div>
          </div>
        </div>
      </div>
      {/* End Induction and Tour Analytics Side by Side */}
    </div>
  );
}
