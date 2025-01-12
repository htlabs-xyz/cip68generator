import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bug, Shield, Zap, Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BugBountyLanding() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/#">
          <Shield className="h-6 w-6 mr-2" />
          <span className="font-bold">SecureProduct</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#program">
            Program
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#how-it-works">
            How It Works
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#rewards">
            Rewards
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">Join Our Bug Bounty Program</h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Help us improve our security and earn rewards for finding vulnerabilities in our product.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section id="program" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Why Join Our Bug Bounty Program?</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 place-items-center">
              <Card>
                <CardHeader>
                  <Bug className="w-8 h-8 mb-2" />
                  <CardTitle>Find Vulnerabilities</CardTitle>
                </CardHeader>
                <CardContent>Help us identify security issues in our product and contribute to a safer digital environment.</CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Trophy className="w-8 h-8 mb-2" />
                  <CardTitle>Earn Rewards</CardTitle>
                </CardHeader>
                <CardContent>Receive competitive bounties for valid vulnerabilities, with rewards scaling based on severity.</CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Zap className="w-8 h-8 mb-2" />
                  <CardTitle>Boost Your Skills</CardTitle>
                </CardHeader>
                <CardContent>Challenge yourself, learn new techniques, and enhance your cybersecurity expertise.</CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">How It Works</h2>
            <ol className="grid gap-6 lg:grid-cols-3 lg:gap-12 place-items-center">
              <li className="flex flex-col items-center text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">1</div>
                <h3 className="mt-4 font-semibold">Sign Up</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">Create an account and agree to our program terms.</p>
              </li>
              <li className="flex flex-col items-center text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">2</div>
                <h3 className="mt-4 font-semibold">Find Bugs</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">Test our product and report any vulnerabilities you discover.</p>
              </li>
              <li className="flex flex-col items-center text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">3</div>
                <h3 className="mt-4 font-semibold">Get Rewarded</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">Receive bounties for valid, unique vulnerability reports.</p>
              </li>
            </ol>
          </div>
        </section>
        <section id="rewards" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Reward Tiers</h2>
            <div className="grid gap-6 lg:grid-cols-4 lg:gap-12 place-items-center">
              {["Low", "Medium", "High", "Critical"].map((severity, index) => (
                <Card key={severity}>
                  <CardHeader>
                    <CardTitle>{severity}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">${(index + 1) * 500}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Minimum Reward</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Start Hunting?</h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join our bug bounty program today and help us make our product more secure while earning rewards.
                </p>
              </div>
              <Button className="inline-flex items-center">
                Join Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center justify-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 SecureProduct Bug Bounty Program. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="/#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="/#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
