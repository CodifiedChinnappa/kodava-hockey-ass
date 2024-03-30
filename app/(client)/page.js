import { SponsorsScroll } from "@/components/common/SponsorsScroll";
import { BackGroundSlider } from "@/components/frontEnd/BackGroundSlider";
import LiveScoreCarousel from "@/components/frontEnd/LiveScoreCarousel";
import { TiesDownload } from "@/components/frontEnd/TiesDownload";
import { Welcome } from "@/components/frontEnd/Welcome";

export const images = [
  {
    src: "https://kundyolanda.com/wp-content/uploads/2024/03/asset-1.png",
    name: "image 1",
  },
  {
    src: "https://kundyolanda.com/wp-content/uploads/2024/03/asset-1.png",
    name: "image 2",
  },
  {
    src: "https://kundyolanda.com/wp-content/uploads/2024/03/asset-1.png",
    name: "image 3",
  },
  {
    src: "https://kundyolanda.com/wp-content/uploads/2024/03/asset-1.png",
    name: "image 4",
  },
  {
    src: "https://kundyolanda.com/wp-content/uploads/2024/03/asset-1.png",
    name: "image 5",
  },
  {
    src: "https://kundyolanda.com/wp-content/uploads/2024/03/asset-1.png",
    name: "image 6",
  },
  {
    src: "https://kundyolanda.com/wp-content/uploads/2024/03/asset-1.png",
    name: "image 7",
  },
  {
    src: "https://kundyolanda.com/wp-content/uploads/2024/03/asset-1.png",
    name: "image 8",
  },
  {
    src: "https://kundyolanda.com/wp-content/uploads/2024/03/asset-1.png",
    name: "image 9",
  },
  {
    src: "https://kundyolanda.com/wp-content/uploads/2024/03/asset-1.png",
    name: "image 10",
  },
];

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between overflow-x-hidden">
      <div>
        <BackGroundSlider />
        <Welcome />
        <TiesDownload />
        <LiveScoreCarousel />

        <SponsorsScroll images={images} speed={20000}/>
      </div>
    </main>
  );
}
