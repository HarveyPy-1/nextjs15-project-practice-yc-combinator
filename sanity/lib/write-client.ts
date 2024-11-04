import "server-only";

import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, token } from "../env";

export const writeClient = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: false, // Set to false if you want your data to show up instantly, and not cached data
	token,
});

if (!writeClient.config().token)
	throw new Error("No token found in writeClient");
