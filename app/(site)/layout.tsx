import '@/app/globals.css';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <main className="container mx-auto max-w-5xl pt-12 min-h-screen">{children}</main>;
}
