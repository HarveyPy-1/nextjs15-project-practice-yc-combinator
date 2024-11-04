/* eslint-disable @next/next/no-img-element */
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";
import Image from "next/image"
import { notFound } from "next/navigation";
import markdownit from 'markdown-it'
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";

// Enable partial pre-rendering for this page
export const experimental_ppr = true;

const StartupDetails = async ({ params }: { params: { id: string } }) => {
  
  // Get the startup ID from the params
	const id = (await params).id;

  // Get the startup data from the ID
  const postDetails = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  // If the startup data is not found, return a 404 page
  if (!postDetails) return notFound();

	// Initialize markdown parser
	const md = markdownit();

	// Parse the pitch content which is in markdown format
	const parsedContent = md.render(postDetails.pitch || '');
			return (
				<>
					<section className="pink_container !min-h-[230px]">
						<p className="tag">{formatDate(postDetails?._createdAt)}</p>

						<h1 className="heading">{postDetails.title}</h1>
						<p className="sub-heading !max-w-5xl">{postDetails.description}</p>
					</section>

					<section className="section_container">
						<img
							src={postDetails.image ?? "/default-image.png"}
							alt="thumbnail"
							className="w-full h-auto rounded-xl"
						/>

						<div className="space-y-5 mt-10 max-w-4xl mx-auto">
							<div className="flex-between gap-5">
								<Link
									href={`/user/${postDetails.author?._id}`}
									className="flex gap-2 items-center mb-3">
									<Image
										src={postDetails?.author?.image ?? "/default-avatar.png"}
										alt="avatar"
										width={64}
										height={64}
										className="rounded-full drop-shadow-lg"
									/>

									<div>
										<p className="text-20-medium">{postDetails?.author?.name}</p>
										<p className="text-16-medium !text-black-300">
											@{postDetails?.author?.username}
										</p>
									</div>
								</Link>

								<p className="category-tag">{postDetails.category}</p>
							</div>

							<h3 className="text-30-bold">Pitch Details</h3>
							{parsedContent ? (
								<article
									className="prose max-w-4xl font-work-sans break-all"
									// Allow HTML tags in the content. You should sanitise the content before using this
									dangerouslySetInnerHTML={{ __html: parsedContent }}
								/>
							) : (
								<p className="no-result">No details provided</p>
							)}
						</div>

						<hr className="divider" />

							{/* Code in the suspense tag will be rendered dynamically */}
						<Suspense fallback={<Skeleton className="view_skeleton" />}>
							<View id={id} />
						</Suspense>
					</section>
				</>
			);
};
export default StartupDetails;
