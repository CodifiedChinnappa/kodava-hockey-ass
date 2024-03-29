import { LoginButton } from "@/components/backOffice/auth/login-button";
import LiveScoreCarousel from "@/components/frontEnd/LiveScoreCarousel";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <LoginButton asChild>
          <Button variant="secondary" size="lg">
            Sign in
          </Button>
        </LoginButton>
        <LiveScoreCarousel />
      </div>
    </main>
  );
}
