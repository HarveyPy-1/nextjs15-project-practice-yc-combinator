/* eslint-disable @typescript-eslint/no-unused-vars */
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

const Home = async ({
	searchParams,
}: {
	searchParams: Promise<{ query?: string }>;
}) => {
	// Get the search query from the URL
	const { query } = await searchParams;

	// Define the search params
	const params = { search: query || null };

	// Get data from sanity

	// THIS FETCH IS THE DEFAULT WAY OF FETCHING DATA FROM SANITY.
	// const posts = await client.fetch<StartupCardType[]>(STARTUPS_QUERY)

	// THIS FETCH IS THE LIVE WAY OF FETCHING DATA FROM SANITY. NEW DATA WILL BE FETCHED IN REAL TIME
	const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

	// Get sanity ID of the author
	const session = await auth();

	// console.log(session?.id)

	return (
		<>
			<section className="pink_container">
				<h1 className="heading">
					Pitch Your Startup, <br /> Connect with entrepreneurs
				</h1>
				<p className="sub-heading !max-w-3xl">
					Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
				</p>
				<SearchForm query={query} />
			</section>
			<section className="section_container">
				<p className="text-30-semibold">
					{query ? `Search results for "${query}"` : "All Startups"}
				</p>

				<ul className="mt-7 card_grid">
					{posts?.length > 0 ? (
						// @ts-expect-error-next-line
						posts.map((post: StartupCardType) => (
							<StartupCard key={post?._id} post={post} />
						))
					) : (
						<p className="no-results">No startups found</p>
					)}
				</ul>
			</section>
			<SanityLive />
		</>
	);
};
export default Home;
