import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function BugBountyLandingPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">CIP68 Bug Bounty Program</h1>
        </div>
      </header>

      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center py-12">
          <h2 className="text-4xl font-extrabold mb-4">Help Us Secure Our Platform</h2>
          <p className="text-xl text-muted-foreground mb-8">Join our bug bounty program and earn rewards for finding vulnerabilities!</p>
          <Button size="lg">Start Hunting</Button>
        </section>

        {/* Program Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Program Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our bug bounty program aims to identify and mitigate potential vulnerabilities before they can be exploited by malicious actors,
              ensuring the safety and trust of our users. We focus on smart contract code and application functionalities.
            </p>
          </CardContent>
        </Card>

        {/* Scope and Eligibility */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Scope and Eligibility</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>
                Smart contract source code on GitHub:{" "}
                <a href="https://github.com/cardano2vn/cip68generator" className="underline hover:no-underline">
                  https://github.com/cardano2vn/cip68generator
                </a>
              </li>
              <li>Application functionalities through the web interface</li>
              <li>Specific URLs and features as outlined in the program details</li>
            </ul>
          </CardContent>
        </Card>

        {/* Rewards Structure */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Rewards Structure</CardTitle>
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

        {/* How to Report */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How to Report</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
              <li>Access the Issues page of our repository</li>
              <li>Choose "New Issue" and fill out the provided template</li>
              <li>Describe the bug in detail, including steps to reproduce, test environment, and severity</li>
              <li>Submit the issue on GitHub</li>
            </ol>
          </CardContent>
        </Card>

        {/* Rules and Guidelines */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Rules and Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Provide detailed reports with reproducible steps</li>
              <li>Do not use automated scanners</li>
              <li>Submit each vulnerability as a separate issue unless they need to be linked for maximum impact</li>
              <li>Do not report issues from third-party providers</li>
              <li>No DoS/DDoS, social engineering, or spam attacks</li>
              <li>Stay within the defined scope</li>
            </ul>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Program Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">The bug bounty program will run from January 14, 2025, to February 9, 2025.</p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              If you have any questions about the program, please contact us at{" "}
              <a href="mailto:bugbounty@example.com" className="underline hover:no-underline">
                bugbounty@example.com
              </a>
              .
            </p>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 CIP68 Bug Bounty Program. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
