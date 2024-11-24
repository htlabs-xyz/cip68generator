import LandingProvider from "@/contexts/landing";
import LandingPage from "./_components/landing-page";
import QueryClientProvider from "@/components/providers/query";

export default function Page() {
  return (
    <QueryClientProvider>
      <LandingProvider>
        <LandingPage />
      </LandingProvider>
    </QueryClientProvider>
  );
}
