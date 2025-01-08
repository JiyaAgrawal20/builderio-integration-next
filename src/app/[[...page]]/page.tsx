import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@/components/builder";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
  params: {
    page?: string[];
  };
}

// Generate static params as static paths for dynamic routing
export async function generateStaticParams() {
  // Hardcoded static paths for testing purposes (can be extended)
  return [
    { page: [] }, // Represents the root path '/'
    { page: ['about'] }, // Represents '/about'
    { page: ['blog', 'my-first-post'] }, // Represents '/blog/my-first-post'
  ];
}

// Next.js page component
export default async function Page({ params }: PageProps) {
  // Generate the URL path based on dynamic segments
  const urlPath = params?.page?.[0] === "index" ? "/" : "/" + (params?.page?.join("/") || "");

  // Fetch content from Builder.io based on the generated path
  const content = await builder
    .get("page", { userAttributes: { urlPath } })
    .toPromise();

  // Return the content rendered using your custom RenderBuilderContent component
  return <RenderBuilderContent content={content} />;
}
