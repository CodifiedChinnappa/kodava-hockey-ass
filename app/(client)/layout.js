import { Footer } from "@/components/frontEnd/Footer";
import { Navbar } from "@/components/frontEnd/Navbar";



export default async function RootLayout({ children }) {
  return (
        <html lang="en">
          <body >
            <Navbar/>
            {children}
          <Footer/>
          </body>
        </html>
  );
}
