/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="hero" className="w-full py-12 md:py-24 lg:py-32 bg-section">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <div className="text-cyan-400 text-sm font-semibold mb-4">Bug Bounty Program</div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">Cip68 Generator</h1>
              <p className="text-gray-400 text-lg md:text-xl max-w-2xl">
                Help us improve security and earn rewards for finding vulnerabilities in our application.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="#how-it-work">
                <Button className="bg-cyan-400 hover:bg-cyan-500 text-black font-semibold px-8 py-3 rounded-md">
                  Learn More <span className="ml-2">→</span>
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[600px]">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-cyan-400/30 rounded-full blur-3xl"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img src="https://i.imgur.com/1w2ohLC.png" alt="Security Visualization" width={600} height={600} className="object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
