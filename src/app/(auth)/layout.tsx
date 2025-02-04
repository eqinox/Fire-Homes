export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-screen-sm mx-auto p-5 max-md:px-0">{children}</div>
  );
}
