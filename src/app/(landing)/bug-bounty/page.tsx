import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Shield, CheckCircle } from "lucide-react";
import Header from "../_layout/header";
import Footer from "../_layout/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HowItWorks from "./how-it-work";
import Link from "next/link";
import Timeline from "./timeline";
import { RegistrationForm } from "./register";
import RewardTiers from "./reward-tiers";
import Hero from "./hero";
import Overview from "./overview";

export default function BugBountyLanding() {
  return (
    <div className="relative px-4 overflow-x-hidden">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />
        <Overview />
        <HowItWorks />
        <Timeline />
        <RewardTiers />
        <RegistrationForm />
      </main>
      <Footer className="bg-section" />
    </div>
  );
}
