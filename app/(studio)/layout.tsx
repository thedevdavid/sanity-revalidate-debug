import '@/app/globals.css';

export const metadata = {
  title: 'Studio',
  description: 'Studio',
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
