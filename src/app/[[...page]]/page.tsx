import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@/components/builder";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
  params: {
    page?: string[];
  };
}

export async function generateStaticParams() {
  return [{ page: [] }]; // Default params for build
}

export default async function Page({ params }: PageProps) {
  const urlPath = await
    params?.page?.[0] === "index"
      ? "/"
      : "/" + (params?.page?.join("/") || "");

  const content = await builder
    .get("page", { userAttributes: { urlPath } })
    .toPromise();

  return <RenderBuilderContent content={content} />;
}
