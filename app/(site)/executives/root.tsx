export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-11/12 mx-auto py-8">
      <div className="text-center font-bold text-2xl sm:text-3xl mb-4">
        Meet The Executives
      </div>
      {children}
    </main>
  );
}
