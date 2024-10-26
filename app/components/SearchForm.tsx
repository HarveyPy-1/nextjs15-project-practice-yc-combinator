import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
const SearchForm = () => {
	// Search query inputted in the form
	const query = "Test";

	return (
		// New NextJS 15 feature. Submitting forms server side. You need an action in the form tag.
		<Form action="/" scroll={false} className="search-form">
			<input
				type="text"
				name="query"
				defaultValue={query}
				className="search-input"
				placeholder="Search Startups"
			/>

			{/* Reset the form  */}
			<div className="flex gap-2">
				{query && <SearchFormReset />}

				<button type="submit" className="search-btn text-white">
					S
				</button>
			</div>
		</Form>
	);
};
export default SearchForm;