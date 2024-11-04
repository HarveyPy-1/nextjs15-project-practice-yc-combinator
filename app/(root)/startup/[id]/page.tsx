import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

// Enable partial pre-rendering for this page
export const experimental_ppr = true;

const StartupDetails = async ({ params }: { params: { id: string } }) => {
  
  // Get the startup ID from the params
	const id = (await params).id;

  // Get the startup data from the ID
  const postDetails = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  // If the startup data is not found, return a 404 page
  if (!postDetails) return notFound();
			return (
				<div>
					<h1>This is a startup title: {postDetails.title}</h1>
				</div>
			);
};
export default StartupDetails;
