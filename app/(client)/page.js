import LiveScoreCarousel from "@/components/frontEnd/LiveScoreCarousel";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        
        <LiveScoreCarousel />
      </div>
    </main>
  );
}
