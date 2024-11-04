import { client } from "@/sanity/lib/client";
import Ping from "./Ping";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";

const View = async ({ id }: { id: string }) => {
	// Get views from the ID and from sanity
	const { views: totalViews } = await client
		.withConfig({ useCdn: false }) // Disable CDN to prevent caching
		.fetch(STARTUP_VIEWS_QUERY, { id });

	return (
		<div className="view-container">
			<div className="absolute -top-2 -right-2">
				<Ping />
			</div>

			<p className="view-text">
				<span className="font-black">{totalViews} {totalViews === 1 ? "view" : "views"}</span>
			</p>
		</div>
	);
};
export default View;