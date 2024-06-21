
export default function NewTravelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
        <div className="lg:w-3/5 w-[95%] m-auto">
            {children}
        </div>
    </main>
  );
}
