"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Badge } from "@/components/MaterialTailwind";

export default function SignedInNav() {
	const [notificationNbr, setNotificationNbr] = useState('');
	const {userId} = useAuth()

	useEffect(() => {
		fetch(`/api/v0/users/${userId}/notifications/count`)
		.then(res => {
			if (res.ok) {
				res.json()
				.then(data => setNotificationNbr(data.count))
				.catch(error => console.log(error));
			}
		})
		.catch(error => console.log(error));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<ul className="flex items-center gap-5">
			<li className="text-white font-bold">
				<Link href="/travels/search">Search</Link>
			</li>
			<li className="text-white font-bold">
				<Link href="/travels/create">Publish travel</Link>
			</li>
			<li className="ml-10">
				<Badge  content={notificationNbr} withBorder color="red">
					<UserButton
						showName
						afterSignOutUrl="/"
						userProfileMode="navigation"
						userProfileUrl={process.env.NEXT_PUBLIC_CLERK_DASHBOARD_URL}
					/>
				</Badge>
			</li>
		</ul>
	);
}
