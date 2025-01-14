/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState(0);
  const totalTabs = 5;

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
                  <h3 className="text-3xl font-bold mb-6 ">Program insights</h3>
                  <p className="text-gray-600 mb-8">
                    Identify and mitigate potential vulnerabilities before they can be exploited by bad actors, ensuring user safety and trust.
                  </p>
                  <ul className="space-y-4">
                    <p>Scope:</p>
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
                  <img
                    src="https://raw.githubusercontent.com/wiki/cardano2vn/cip68generator/images/about.png"
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
                  <h3 className="text-3xl font-bold mb-6">Disclaimer</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-2">
                      <span className="text-cyan-500 font-bold">■</span>
                      <span>
                        We encourage users to test our products using their personal assets; however, please be aware that we cannot accept
                        responsibility for any losses incurred. To minimize potential costs, we strongly recommend conducting tests on the testnet
                        environment.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-500 font-bold">■</span>
                      <span> Our evaluation and determination of all reported vulnerabilities will be deemed final and binding.</span>
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
                  <h3 className="text-3xl font-bold mb-6">Program Rules</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-2">
                      <span className="text-cyan-500 font-bold">■</span>
                      <span>
                        <strong>Detailed Reporting:</strong> All submissions must include a comprehensive report with clear, reproducible steps that
                        demonstrate the identified issue. Submissions lacking sufficient detail to reproduce the problem will not qualify for rewards.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-500 font-bold">■</span>
                      <span>
                        <strong>Submission Process:</strong> Each vulnerability should be reported as a separate issue on GitHub unless multiple
                        vulnerabilities need to be linked for a broader impact assessment.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-500 font-bold">■</span>
                      <span>
                        <strong>Exclusions:</strong> Reports involving external or third-party exploits, such as DoS/DDoS attacks, social engineering
                        tactics, or spam activities, will not be accepted.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-500 font-bold">■</span>
                      <span>
                        <strong>Duplicate and Related Issues:</strong> In cases where duplicate or related bugs are reported, the Project Team will
                        determine the severity and decide the eligibility for rewards at their discretion.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-500 font-bold">■</span>
                      <span>
                        <strong>Single Reward Policy:</strong> If multiple vulnerabilities stem from a single underlying issue, they will be
                        consolidated and treated as a single report, with one corresponding reward granted.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-500 font-bold">■</span>
                      <span>
                        <strong>Disclosure Policy:</strong> Do not discuss the program or any vulnerabilities on social media, disclose them to third
                        parties, or publish them on platforms other than GitHub. Additionally, do not exploit vulnerabilities to harm assets or
                        personal identities without the owner's consent.
                      </span>
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
                  <h3 className="text-3xl font-bold mb-6 ">Reward Policy</h3>
                  <p className="text-gray-600 mb-8">
                    Our Bug Bounty Program offers rewards for reported issues based on the final decision of the project team. Rewards will be
                    allocated in accordance with the severity level of the identified bugs. The program will run from January 14, 2025, to February 9,
                    2025, with the total number of rewards determined by the organizing team.
                  </p>
                  <ul className="space-y-4">
                    <p>Severity Level Guidelines</p>
                    <li className="flex gap-2">
                      <span className="text-cyan-500 font-bold">■</span>
                      <span>
                        <strong>High Severity: </strong>Issues that involve unauthorized actions on smart contract assets (modification, deletion, or
                        theft), loss of voting rights, or staking privileges.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-500 font-bold">■</span>
                      <span>
                        <strong> Medium Severity:</strong> Issues such as API key leakage, incorrect fee calculations, or inaccurate asset information
                        display.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-500 font-bold">■</span>
                      <span>
                        <strong>Low Severity:</strong>Issues like interface bugs, lack of responsiveness, typographical errors, or broken links.
                      </span>
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
            {/* <TabsContent value="4">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-6">Out-of-Scope Vulnerabilities</h3>
                  <p className="text-gray-600 mb-8">We do not accept vulnerabilities reported in relation to the following categories:</p>
                  <ul className="space-y-4">
                    <li className="flex gap-2">
                      <span className="text-cyan-500 font-bold">■</span>
                      <span>
                        <strong>Non-Relevant Vulnerabilities:</strong> Issues that are outside the scope of the program or have no valid impact on the
                        program.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-500 font-bold">■</span>
                      <span>
                        <strong>Third-Party Vulnerabilities:</strong> Vulnerabilities in third-party APIs, libraries, or services, unless they lead to
                        vulnerabilities on our platform. Also includes DoS/DDoS attacks and infrastructure issues (e.g., TLS, SSL, DNS).
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-500 font-bold">■</span>
                      <span>
                        <strong>Unverifiable or Low Impact Reports:</strong> Reports that do not include exploitation proof, cannot be reproduced, or
                        are unclear in nature.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-cyan-500 font-bold">■</span>
                      <span>
                        <strong>Theoretical or Minimal Impact Issues:</strong> Issues that are purely theoretical and have negligible or no impact in
                        practice.
                      </span>
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
            </TabsContent> */}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
