import ArticleNavbar from "@/components/ArticleNavbar";

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ArticleNavbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
