"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState(0);
  const totalTabs = 3;

  const nextTab = () => {
    setActiveTab((prev) => (prev + 1) % totalTabs);
  };

  const prevTab = () => {
    setActiveTab((prev) => (prev - 1 + totalTabs) % totalTabs);
  };

  return (
    <section id="how-it-work" className="py-24 bg-section">
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
                  <h3 className="text-3xl font-bold mb-6 ">Scope</h3>
                  <p className="text-gray-600 mb-8">
                    Identify and mitigate potential vulnerabilities before they can be exploited by bad actors, ensuring user safety and trust.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex gap-2">
                      <span className="text-cyan-500 font-bold">■</span>
                      <span>
                        <strong>Source Code:</strong> The main scope focuses on reviewing the source code and smart contracts. This code is hosted on
                        GitHub at{" "}
                        <a className="text-blue-500" href="https://github.com/cardano2vn/cip68generator" target="_blank">
                          https://github.com/cardano2vn/cip68generator
                        </a>
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-500 font-bold">■</span>
                      <span>
                        <strong>Application Functions:</strong> In addition to reviewing the source code, the scope also includes direct interaction
                        with the application's functionalities via a web interface.
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle></CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>URL</TableHead>
                            <TableHead>Property name</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>cip68.cardano2vn.io</TableCell>
                            <TableCell>Main website</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>cip68.cardano2vn.io/dashboard/mint/one</TableCell>
                            <TableCell>Asset minting</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>cip68.cardano2vn.io/(unit)/update</TableCell>
                            <TableCell>Asset updating</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>cip68.cardano2vn.io/(unit)/burn</TableCell>
                            <TableCell>Asset burning</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>cip68.cardano2vn.io/dashboard/mint/many</TableCell>
                            <TableCell>Mint multiple assets</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="1">
              <div>
                <h3 className="text-3xl font-bold mb-3">Disclaimer</h3>
                <ul className="space-y-4">
                  <li className="flex gap-2">
                    <span className="text-cyan-500 font-bold">■</span>
                    <span>
                      You may use your own funds to test our product, but please note that we will not be responsible for any losses incurred.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-500 font-bold">■</span>
                    <span>Our assessment of all vulnerabilities will be considered the final decision.</span>
                  </li>
                </ul>
                <h3 className="text-3xl font-bold mt-6 mb-3">Program Rules</h3>
                <ul className="space-y-4">
                  <li className="flex gap-2">
                    <span className="text-cyan-500 font-bold">■</span>
                    <span>
                      Please provide a detailed report with reproducible steps. If the report lacks sufficient detail to reproduce the issue, it will
                      not be eligible for a reward.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-500 font-bold">■</span>
                    <span>Please DO NOT use automated scanners. We do not accept any issues found by automated scanners.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-500 font-bold">■</span>
                    <span>
                      Submit each vulnerability by creating an Issue for each corresponding vulnerability on GitHub, unless you need to link
                      vulnerabilities together to maximize impact.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-500 font-bold">■</span>
                    <span>
                      Please do not report bugs originating from third parties, such as Wallet Providers, API Providers, SDK Providers, or Libraries.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-500 font-bold">■</span>
                    <span>We do not accept issues related to DoS/DDoS vulnerabilities, social engineering attacks, or spam.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-500 font-bold">■</span>
                    <span>Only conduct vulnerability testing within the scope defined in section 1.2.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-500 font-bold">■</span>
                    <span>
                      In case of duplicate issues, we will only reward the first valid report. The internal project team will determine whether issues
                      are duplicates.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-500 font-bold">■</span>
                    <span>Multiple vulnerabilities caused by a fundamental issue will be rewarded with a single reward.</span>
                  </li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="2">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-6 ">Reward Rules</h3>
                  <p className="text-gray-600 mb-8">
                    Our Bug Bounty program will reward issues based on the final decision of the project team. Rewards will be paid according to the
                    severity of the vulnerability found. The program will run from January 15, 2025, to February 19, 2025, and the total number of
                    rewards will be determined by the organizers.
                  </p>
                  <ul className="space-y-4">
                    <p>Severity Level Definitions:</p>
                    <li className="flex gap-2">
                      <span className="text-cyan-500 font-bold">■</span>
                      <span>
                        <strong>High:</strong> Cases involving spending assets on the smart contract (modifying, deleting, or stealing assets), loss
                        of voting rights, or staking rights.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-500 font-bold">■</span>
                      <span>
                        <strong>Medium:</strong> API Key leaks, incorrect billing mechanisms, or displaying incorrect asset information.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-500 font-bold">■</span>
                      <span>
                        <strong>Low: </strong>UI bugs, non-responsive design, spelling errors, or broken links.
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle>Severity Levels and Rewards</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Severity</TableHead>
                            <TableHead>Reward</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>High</TableCell>
                            <TableCell>300 ADA</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Medium</TableCell>
                            <TableCell>150 ADA</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Low</TableCell>
                            <TableCell>100 ADA</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
