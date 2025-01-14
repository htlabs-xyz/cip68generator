"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState(0);
  const totalTabs = 4;

  const nextTab = () => {
    setActiveTab((prev) => (prev + 1) % totalTabs);
  };

  const prevTab = () => {
    setActiveTab((prev) => (prev - 1 + totalTabs) % totalTabs);
  };

  return (
    <section className="py-24 bg-section">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 ">How It Works</h2>

        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-4">
              <Button variant="outline" size="icon" onClick={prevTab} className="h-10 w-10 rounded-full">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextTab} className="h-10 w-10 rounded-full">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm ">
              {activeTab + 1} / {totalTabs}
            </div>
          </div>

          <Tabs value={String(activeTab)} onValueChange={(v) => setActiveTab(Number(v))}>
            <TabsContent value="0">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-6 ">Program insights at your fingertips</h3>
                  <p className="text-gray-600 mb-8">
                    Gain a complete view of performance with customizable insights and real-time data. Easily manage submissions, rewards, and
                    researcher engagement for optimized security outcomes.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex gap-2">
                      <span className="text-cyan-500 font-bold">■</span>
                      <span>Track and display key program data such as submissions, rewards, researcher activity, and response times.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-500 font-bold">■</span>
                      <span>Simplify report management, researcher interactions, and report resolution, all in one place.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-500 font-bold">■</span>
                      <span>Compare your program's performance across the platform with benchmarks against peers and industry standards.</span>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <img
                    src="https://www.hackerone.com/sites/default/files/styles/carousel_spotlight_2x/public/BBLP_HowitworksCentralizedMgt.png.webp"
                    alt="Bug Bounty Program Overview"
                    width={500}
                    height={300}
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="1">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-6 ">Streamlined Vulnerability Management</h3>
                  <p className="text-gray-600 mb-8">
                    Efficiently process and manage vulnerability reports with our intuitive workflow system. Prioritize, assign, and track issues
                    through their entire lifecycle.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex gap-2">
                      <span className="text-cyan-500 font-bold">■</span>
                      <span>Automated triage and severity assessment tools</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-500 font-bold">■</span>
                      <span>Real-time collaboration with security researchers</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-500 font-bold">■</span>
                      <span>Integrated workflow management and tracking</span>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <img
                    src="https://www.hackerone.com/sites/default/files/styles/carousel_spotlight_2x/public/BBLP_HowitworksCentralizedMgt.png.webp"
                    alt="Bug Bounty Program Overview"
                    width={500}
                    height={300}
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="2">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-6 ">Reward Management</h3>
                  <p className="text-gray-600 mb-8">
                    Manage your bug bounty program's rewards efficiently with automated payment processing and transparent reward calculations.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex gap-2">
                      <span className="text-cyan-500 font-bold">■</span>
                      <span>Automated reward calculations based on severity</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-500 font-bold">■</span>
                      <span>Multiple payment options and currencies supported</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-500 font-bold">■</span>
                      <span>Complete reward history and analytics</span>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <img
                    src="https://www.hackerone.com/sites/default/files/styles/carousel_spotlight_2x/public/BBLP_HowitworksCentralizedMgt.png.webp"
                    alt="Bug Bounty Program Overview"
                    width={500}
                    height={300}
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="3">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-6 ">Analytics & Reporting</h3>
                  <p className="text-gray-600 mb-8">
                    Get detailed insights into your program's performance with comprehensive analytics and customizable reporting tools.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex gap-2">
                      <span className="text-cyan-500 font-bold">■</span>
                      <span>Custom report generation and scheduling</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-500 font-bold">■</span>
                      <span>Trend analysis and predictive insights</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-500 font-bold">■</span>
                      <span>Export capabilities in multiple formats</span>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <img
                    src="https://www.hackerone.com/sites/default/files/styles/carousel_spotlight_2x/public/BBLP_HowitworksCentralizedMgt.png.webp"
                    alt="Bug Bounty Program Overview"
                    width={500}
                    height={300}
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
