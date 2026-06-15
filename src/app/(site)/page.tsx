import { PageMarquee } from "@/components/ui/PageMarquee";
import { About } from "@/components/sections/About";
import { LatestBlog } from "@/components/sections/LatestBlog";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { getSiteSettings } from "@/lib/content/site";

export default function HomePage() {
  const site = getSiteSettings();

  return (
    <>
      <PageMarquee text={site.siteName} repeat={6} ariaLabel={site.siteName} />
      <About />
      <Work />
      <LatestBlog />
      <Services />
    </>
  );
}
