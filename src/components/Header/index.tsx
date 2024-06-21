import { SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';
import SignedInNav from './SignedInNav';
import SignedOutNav from './SignedOutNav';
import Image from 'next/image';
import Logo from "@/assets/logo.svg"

export default async function Header() {
  const logoSize = {
    width: 175,
    height: 70
  };

	return (
		<header className="shadow-sm bg-secondary-color">
			<div className='px-8 py-4 text-neutral-100 flex justify-between items-center'>
				<div className="w-[12vw] h-[50px] relative">
					<Link href="/"><Image fill sizes="22vw" src={Logo} alt="Logo" /></Link>
				</div>

				<nav>
					<SignedIn>
						<SignedInNav />
					</SignedIn>
					<SignedOut>
						<SignedOutNav />
					</SignedOut>
				</nav>
			</div>
		</header>
	);
}