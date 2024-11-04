import StartupForm from "@/components/StartupForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const CreateStartupPage = async () => {
  // Fetch session
	const session = await auth();

  // If the user is not logged in, redirect to the homepage
	if (!session) redirect("/");

	return (
		<>
			<section className="pink_container !min-h-[230px]">
				<h1 className="heading">Submit Your Startup</h1>
			</section>

			<StartupForm />
		</>
	);
};

export default CreateStartupPage;
