import Link from "next/link";
import styles from "./page.module.css";


export default function Home() {

	return (
		<main className={styles.main}>
			<h1 className={styles.headline}>It more than just a trip</h1>
				<div className={styles.hero} />
				<div className={styles.buttonWrapper}>
					<Link href="/signup">Get started</Link>
				</div>
		</main>
	);
}