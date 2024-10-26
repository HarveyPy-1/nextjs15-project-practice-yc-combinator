import NavBar from "../../components/NavBar";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<main className="font-work-sans">
			<NavBar />
			{children}
		</main>
	);
};
export default Layout;
