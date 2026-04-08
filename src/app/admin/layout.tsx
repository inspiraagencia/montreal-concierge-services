import '@/styles/globals.css';

// Mark all admin pages as dynamic (requires runtime data)
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin Panel | Montreal Concierge Services',
  description: 'Administrative dashboard for Montreal Concierge Services',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
