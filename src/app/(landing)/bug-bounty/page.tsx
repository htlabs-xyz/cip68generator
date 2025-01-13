import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Shield, CheckCircle, ChevronRight, CalendarDays } from "lucide-react";
import Header from "../_layout/header";
import Footer from "../_layout/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BugBountyLanding() {
  return (
    <div className="relative  px-4 overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-52 xl:py-72 bg-section">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">Cardano Bug Bounty Program</h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Help us improve security and earn rewards for finding vulnerabilities in our CIP68 implementation.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <a href="https://github.com/cardano2vn/cip68generator/issues" target="_blank" rel="noopener noreferrer">
                    Start Hunting
                  </a>
                </Button>
                <Button variant="outline">Learn More</Button>
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-section">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">How to Participate</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              <div className="flex flex-col items-center text-center">
                <h3 className="text-xl font-semibold mb-2">1. Access Repository</h3>
                <p className="text-gray-600">Visit our GitHub repository to review the code and documentation.</p>
              </div>
              <ChevronRight className="hidden md:block w-6 h-6 text-gray-400" />
              <div className="flex flex-col items-center text-center">
                <h3 className="text-xl font-semibold mb-2">2. Find Vulnerabilities</h3>
                <p className="text-gray-600">Analyze the code and application for potential security issues.</p>
              </div>
              <ChevronRight className="hidden md:block w-6 h-6 text-gray-400" />
              <div className="flex flex-col items-center text-center">
                <h3 className="text-xl font-semibold mb-2">3. Report Issues</h3>
                <p className="text-gray-600">Submit detailed bug reports through GitHub Issues.</p>
              </div>
              <ChevronRight className="hidden md:block w-6 h-6 text-gray-400" />
              <div className="flex flex-col items-center text-center">
                <h3 className="text-xl font-semibold mb-2">4. Earn Rewards</h3>
                <p className="text-gray-600">Receive bounties for valid, unique vulnerability reports.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="timeline" className="w-full py-12 md:py-24 lg:py-32 ">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Program Timeline</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CalendarDays className="w-8 h-8 mb-2 text-primary" />
                  <CardTitle>Preparation</CardTitle>
                  <CardDescription>22/11/2024 - 29/12/2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Setting up program rules, documentation, and bug reporting tools.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CalendarDays className="w-8 h-8 mb-2 text-primary" />
                  <CardTitle>Execution</CardTitle>
                  <CardDescription>14/01/2025 - 09/02/2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Active bug hunting period. Receive and process vulnerability reports.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CalendarDays className="w-8 h-8 mb-2 text-primary" />
                  <CardTitle>Evaluation</CardTitle>
                  <CardDescription>11/02/2025 - 12/02/2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Analyze results and publish program outcome report.</p>
                </CardContent>
              </Card>
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
