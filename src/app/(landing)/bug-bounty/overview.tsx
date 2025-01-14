import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Shield, Zap, CheckCircle } from "lucide-react";

export default function Overview() {
  return (
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
  );
}
