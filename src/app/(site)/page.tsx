import { About } from "@/components/sections/About";
import { LatestBlog } from "@/components/sections/LatestBlog";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { MarqueeBanner } from "@/components/ui/MarqueeBanner";
import { getSiteSettings } from "@/lib/content/site";

export default function HomePage() {
  const site = getSiteSettings();

  return (
    <>
      {/* Nome gigante fixo no topo; o conteúdo rola por cima dele. */}
      <MarqueeBanner text={site.siteName} asHeading headingLabel={site.siteName} />
      <div className="page-surface">
        <About />
        <Work />
        <LatestBlog />
        <Services />
      </div>
    </>
  );
}
