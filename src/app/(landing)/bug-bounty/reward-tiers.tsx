import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function RewardTiers() {
  return (
    <section id="rewards" className="w-full py-12 md:py-24 lg:py-32 bg-section ">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 ">Reward Tiers</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <Card className="h-full">
            <CardHeader className="h-2/3">
              <CardTitle>High Severity</CardTitle>
              <CardDescription>Asset spending, voting rights loss, stake loss </CardDescription>
            </CardHeader>
            <CardContent className="h-full justify-end">
              <p className="text-4xl font-bold text-orange-500">300 ADA</p>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader className="h-2/3">
              <CardTitle>Medium Severity</CardTitle>
              <CardDescription>API key leaks, incorrect pricing, asset info mismatch</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold  text-orange-500">150 ADA</p>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader className="h-2/3">
              <CardTitle>Low Severity</CardTitle>
              <CardDescription>UI bugs, responsiveness issues, typos, broken links</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold  text-orange-500">100 ADA</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
