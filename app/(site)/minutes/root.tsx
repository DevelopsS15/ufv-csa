export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-11/12 lg:w-9/12 mx-auto py-8">
      <div className="text-2xl sm:text-3xl font-bold text-center mb-8">
        Meeting Minutes
      </div>
      {children}
    </main>
  );
}
