"use server";

import { auth } from "@/auth";
import { writeClient } from "@/sanity/lib/write-client";
import slugify from "slugify";

// Create a new startup pitch
export const createPitch = async (
	state: any,
	form: FormData,
	pitch: string
) => {
	// Fetch session
	const session = await auth();

	// If the user is not logged in, return an error
	if (!session)
		return JSON.parse(
			JSON.stringify({ status: "ERROR", error: "User not authenticated" })
		);

	// Extract form values
	const { title, description, category, link } = Object.fromEntries(
		Array.from(form).filter(([key]) => key !== "pitch")
	);

  // Generate a slug from the title
	const slug = slugify(title as string, { lower: true, strict: true });

	try {

    // Define the startup object
		const startup = {
			title,
			description,
			category,
			image: link,
			slug: { _type: slug, current: slug },
			author: { _type: "reference", _ref: session?.id },
			pitch,
		};

    // Write the startup object to the database (Sanity)
		const result = await writeClient.create({ _type: "startup", ...startup });

    // Return a success message
		return JSON.parse(
			JSON.stringify({ ...result, status: "SUCCESS", error: "" })
		);
	} catch (error) {
		console.error(error);

		return JSON.parse(
			JSON.stringify({ status: "ERROR", error: JSON.stringify(error) })
		);
	}
};
