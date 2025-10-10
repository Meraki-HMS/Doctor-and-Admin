// src/app/layout.js
import './globals.css'; // Import your global CSS including Tailwind

export const metadata = {
  title: 'Hospital Dashboard',
  description: 'Smart Healthcare Management System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  );
}
