import { Footer } from "@/components/frontEnd/Footer";
import { Navbar } from "@/components/frontEnd/Navbar";

export default async function RootLayout({ children }) {
  return (
    <div className=" h-screen over-hidden">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
