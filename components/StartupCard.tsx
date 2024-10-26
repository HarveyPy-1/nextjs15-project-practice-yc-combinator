import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
	// Destructure post object
	const {
		_createdAt,
		views,
		author: { _id: authorID, name },
		title,
		category,
		description,
		_id,
		image,
	} = post;
	return (
		<li className="startup-card group">
			<div className="flex-between">
				<p className="startup_card_date">{formatDate(_createdAt)}</p>
				<div className="flex gap-1 5">
					<EyeIcon className="size-6 text-primary" />
					<span className="text-16-medium">{views}</span>
				</div>
			</div>

			<div className="flex-between mt-5 gap-5">
				<div className="flex-1">
					<Link href={`/user/${authorID}`}>
						<p className="text-16-medium line-clamp-1">{name}</p>
					</Link>
					<Link href={`/startup/${_id}`}>
						<h3 className="text-26-semibold line-clamp-1">{title}</h3>
					</Link>
				</div>
				<Link href={`/user/${authorID}`}>
					<Image
						src="https://placehold.co/48x48"
						alt="profile picture"
						width={48}
						height={48}
						className="rounded-full"
					/>
				</Link>
			</div>
			<Link href={`/startup/${_id}`}>
				<p className="startup-card-desc">{description}</p>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src={image} alt="startup image" className="startup-card_img" />
			</Link>

			<div className="flex-between gap-3 mt-5">
				<Link href={`/?query=${category.toLowerCase()}`}>
					<p className="text-16-medium">{category}</p>
				</Link>
				<Button className="startup-card_btn" asChild>
					<Link href={`/startup/${_id}`}>Details</Link>
				</Button>
			</div>
		</li>
	);
};
export default StartupCard;
