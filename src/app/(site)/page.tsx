import { About } from "@/components/sections/About";
import { LatestBlog } from "@/components/sections/LatestBlog";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";

export default function HomePage() {
  return (
    <div className="mt-8 lg:mt-12">
      <About />
      <Work />
      <LatestBlog />
      <Services />
    </div>
  );
}
