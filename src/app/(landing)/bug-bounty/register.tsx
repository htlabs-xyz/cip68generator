/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

export function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Here you would typically send the form data to your server
    // For this example, we'll just simulate a submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "Registration successful!",
      description: "We will contact you soon.",
    });

    setIsSubmitting(false);
  };

  return (
    <section id="register" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Register</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div>
              <Label htmlFor="github">GitHub Username</Label>
              <Input id="github" name="github" required />
            </div>
            <div>
              <Label htmlFor="experience">Security Experience</Label>
              <Textarea id="experience" name="experience" required />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register to Participate"}
            </Button>
          </form>
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
      </div>
    </section>
  );
}
