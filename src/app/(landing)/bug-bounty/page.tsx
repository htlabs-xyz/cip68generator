import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Shield, CheckCircle } from "lucide-react";
import Header from "../_layout/header";
import Footer from "../_layout/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HowItWorks from "./how-it-work";

export default function BugBountyLanding() {
  return (
    <div className="relative px-4 overflow-x-hidden">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section id="hero" className="w-full py-12 md:py-24 lg:py-32 bg-section">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <div className="text-cyan-400 text-sm font-semibold mb-4">Bug Bounty Program</div>
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">Your last line of defense</h1>
                  <p className="text-gray-400 text-lg md:text-xl max-w-2xl">
                    The ultimate line of defense, uncovering novel and elusive vulnerabilities missed by other controls in our CIP68 implementation.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-cyan-400 hover:bg-cyan-500 text-black font-semibold px-8 py-3 rounded-md">
                    Speak with a Security Expert
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 px-8 py-3 rounded-md">
                    Solution Brief
                  </Button>
                </div>
              </div>
              <div className="relative h-[400px] md:h-[600px]">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-cyan-400/30 rounded-full blur-3xl"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <img src="https://i.imgur.com/w9fAVBl.png" alt="Security Visualization" width={600} height={600} className="object-contain" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="overview" className="w-full py-12 md:py-24 lg:py-32 ">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Overview</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 place-items-center">
              <Card>
                <CardHeader>
                  <Shield className="w-8 h-8 mb-2 text-primary" />
                  <CardTitle>Scope</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Smart contract code and web application functionality for CIP68 implementation.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Zap className="w-8 h-8 mb-2 text-primary" />
                  <CardTitle>Objective</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Identify and mitigate potential vulnerabilities before they can be exploited by malicious actors.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CheckCircle className="w-8 h-8 mb-2 text-primary" />
                  <CardTitle>Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Enhance platform security, build user trust, and reward contributors for finding bugs.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <HowItWorks />
        <section id="timeline" className="w-full py-12 md:py-24 lg:py-32 ">
          <div className="px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Timeline</h2>
            <div className="relativ w-full mx-auto">
              <svg width="100%" height="352" viewBox="0 0 1579 300" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(199.5, 0)">
                  {/* Horizontal Lines */}
                  <path
                    d="M-330.6111111111111 100.57142857142857 L902.7777777777778 100.57142857142857"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    fill="none"
                  />

                  {/* Curved Line */}
                  <path
                    d="M932.7777777777778 100.57142857142857 h98.33333333333334 c98.33333333333334,0 98.33333333333334,150.85714285714283 0,150.85714285714283 L342.77777777777777 251.42857142857142"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    fill="none"
                  />

                  {/* Timeline Points - Top Row */}
                  <g>
                    {/* Preparation Phase */}
                    <g transform="translate(131.11111111111111, 100.57142857142857)">
                      <circle r="15" fill="#3b82f6" />
                      <circle r="15" stroke="#3b82f6" strokeWidth="2" fill="none" />
                      <text y="-50" textAnchor="middle" className="text-sm font-semibold fill-white">
                        Preparation Phase
                      </text>
                      <text y="-28" textAnchor="middle" className="text-xs fill-gray-400">
                        22/11/2024 - 29/12/2024
                      </text>
                    </g>

                    {/* Execution Phase */}
                    <g transform="translate(524.4444444444445, 100.57142857142857)">
                      <circle r="15" fill="#3b82f6" />
                      <circle r="15" stroke="#3b82f6" strokeWidth="2" fill="none" />
                      <text y="-50" textAnchor="middle" className="text-sm font-semibold fill-white">
                        Execution Phase
                      </text>
                      <text y="-28" textAnchor="middle" className="text-xs fill-gray-400">
                        14/01/2025 - 09/02/2025
                      </text>
                    </g>

                    {/* Initial Review */}
                    <g transform="translate(917.7777777777778, 100.57142857142857)">
                      <circle r="15" fill="#3b82f6" />
                      <circle r="15" stroke="#3b82f6" strokeWidth="2" fill="none" />
                      <text y="-50" textAnchor="middle" className="text-sm font-semibold fill-white">
                        Initial Review
                      </text>
                      <text y="-28" textAnchor="middle" className="text-xs fill-gray-400">
                        09/02/2025 - 10/02/2025
                      </text>
                    </g>
                  </g>

                  {/* Timeline Points - Bottom Row */}
                  <g>
                    {/* Final Evaluation */}
                    <g transform="translate(721.1111111111111, 251.42857142857142)">
                      <circle r="15" fill="#3b82f6" />
                      <circle r="15" stroke="#3b82f6" strokeWidth="2" fill="none" />
                      <text y="-50" textAnchor="middle" className="text-sm font-semibold fill-white">
                        Final Evaluation
                      </text>
                      <text y="-28" textAnchor="middle" className="text-xs fill-gray-400">
                        11/02/2025
                      </text>
                    </g>

                    {/* Results Announcement */}
                    <g transform="translate(327.77777777777777, 251.42857142857142)">
                      <circle r="15" fill="#3b82f6" />
                      <circle r="15" stroke="#3b82f6" strokeWidth="2" fill="none" />
                      <text y="-50" textAnchor="middle" className="text-sm font-semibold fill-white">
                        Results Announcement
                      </text>
                      <text y="-28" textAnchor="middle" className="text-xs fill-gray-400">
                        12/02/2025
                      </text>
                    </g>
                  </g>

                  {/* Info Indicators */}
                  {[
                    [131.11111111111111, 100.57142857142857],
                    [524.4444444444445, 100.57142857142857],
                    [917.7777777777778, 100.57142857142857],
                    [721.1111111111111, 251.42857142857142],
                    [327.77777777777777, 251.42857142857142],
                  ].map(([x, y], i) => (
                    <g key={i} transform={`translate(${x}, ${y})`}>
                      <path d="M0 -4 v0.1 m0 4 v3.5" stroke="#0A0D14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                  ))}
                </g>
              </svg>
            </div>

            <div className="mt-16 text-center text-gray-400 max-w-2xl mx-auto">
              <p>
                Please note that dates are subject to change due to the dynamic nature of the program. Make sure to follow official announcements to
                stay up to date.
              </p>
            </div>
          </div>
        </section>
        <section id="rewards" className="w-full py-12 md:py-24 lg:py-32 bg-section ">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Reward Tiers</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle>High Severity</CardTitle>
                  <CardDescription>Asset spending, voting rights loss, stake loss</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">300 ADA</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Medium Severity</CardTitle>
                  <CardDescription>API key leaks, incorrect pricing, asset info mismatch</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">150 ADA</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Low Severity</CardTitle>
                  <CardDescription>UI bugs, responsiveness issues, typos, broken links</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">100 ADA</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Frequently Asked Questions</h2>
          <Tabs defaultValue="eligibility" className="w-full max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
              <TabsTrigger value="reporting">Reporting</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
            </TabsList>
            <TabsContent value="eligibility">
              <Card>
                <CardHeader>
                  <CardTitle>Who can participate?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Anyone can participate in the bug bounty program, except for employees and contractors of the project.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reporting">
              <Card>
                <CardHeader>
                  <CardTitle>How do I report a vulnerability?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Submit your findings through GitHub Issues on our repository. Provide a detailed description, steps to reproduce, and any relevant
                    attachments.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="rewards">
              <Card>
                <CardHeader>
                  <CardTitle>How are rewards determined?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Rewards are based on the severity of the vulnerability and the quality of the report. Final decisions are made by the project
                    team.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      <Footer className="bg-section" />
    </div>
  );
}
