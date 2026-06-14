import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { LatestBlog } from "@/components/sections/LatestBlog";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { getSiteSettings } from "@/lib/content/site";

export default function HomePage() {
  const site = getSiteSettings();

  return (
    <>
      <Hero name={site.siteName} />
      <About />
      <Work />
      <LatestBlog />
      <Services />
    </>
  );
}
