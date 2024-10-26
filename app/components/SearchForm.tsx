import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
import { SearchIcon } from "lucide-react";

const SearchForm = ({query}: {query?: string}) => {
	return (
		// New NextJS 15 feature. Submitting forms server side. You need an action in the form tag. It is useful for forms that navigate to a new page, such as a search form that leads to a results page.
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
					<SearchIcon className="size-5" />
				</button>
			</div>
		</Form>
	);
};
export default SearchForm;
