import { MDXRemote } from "next-mdx-remote/rsc";

type MdxContentProps = {
  source: string;
};

// Renderiza corpo MDX/markdown em Server Components (Sprint 2).
// Estilos tipográficos em `.mdx-content` (globals.css).
export function MdxContent({ source }: MdxContentProps) {
  return (
    <div className="mdx-content">
      <MDXRemote source={source} />
    </div>
  );
}
