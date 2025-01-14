/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function RegistrationForm() {
  return (
    <section id="register" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Register</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-gray-400 text-lg mb-6">
              Do you want to become a "Super Bug Hunter"? Register our bug bounty program now! Simply fill out the registration form below, and you'll
              have the chance to uncover security vulnerabilities, sharpen your skills, and earn exciting rewards. Don't miss out on this opportunity!
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="https://forms.gle/Jdpz9vXJWHAqgXNN6" target="_blank">
                <Button className="font-semibold px-8 py-3 rounded-md">
                  Hunt now <span className="ml-2">→</span>
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src="https://lh6.googleusercontent.com/MC_6ptThaBoOY0B5cKDNoiDjtCG_vp78lqq67hh5vwCyeAI4O3RrlNgeVqJRYeklKMxJAJqr2S89mghA7lpco_xoetIZrzLOi-ZY29mYxYJa6eoVujg3AWCd08RG9E9T0B98SgqWT7Q=w1916"
              alt="Bug Bounty Program Overview"
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
