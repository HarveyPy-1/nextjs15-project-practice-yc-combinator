import { client } from "@/sanity/lib/client";
import Ping from "./Ping";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { unstable_after as after } from "next/server";

const View = async ({ id }: { id: string }) => {
	// Get views from the ID and from sanity
	const { views: totalViews } = await client
		.withConfig({ useCdn: false }) // Disable CDN to prevent caching
		.fetch(STARTUP_VIEWS_QUERY, { id });

	// NOTE: Getting the views and updating the views will run sequentially, and until they finish, we'll only see the skeleton rendered. To avoid that, and display the current view, while updating the views in the background, we can use NextJS unstable_after functionality, that allows you to schedule work to be executed after a response is finished. This way, we can update the views in the background, and display the current view to the user.

	// Update number of views after the page is rendered
	after(
		async () =>
			await writeClient
				.patch(id)
				.set({ views: totalViews + 1 })
				.commit()
	);

	return (
		<div className="view-container">
			<div className="absolute -top-2 -right-2">
				<Ping />
			</div>

			<p className="view-text">
				<span className="font-black">
					{totalViews} {totalViews === 1 ? "view" : "views"}
				</span>
			</p>
		</div>
	);
};
export default View;
