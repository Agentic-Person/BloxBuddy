import './globals.css'

export const metadata = {
  title: 'Blox Buddy - Learn Roblox Development',
  description: 'Master Roblox development through our structured 6-month learning journey',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
