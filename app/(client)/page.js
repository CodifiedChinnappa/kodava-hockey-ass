import { BackGroundSlider } from "@/components/frontEnd/BackGroundSlider";
import LiveScoreCarousel from "@/components/frontEnd/LiveScoreCarousel";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div>
        <BackGroundSlider/>
        <LiveScoreCarousel />
      </div>
    </main>
  );
}
