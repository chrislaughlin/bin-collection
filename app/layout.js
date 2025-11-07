import './globals.css';

export const metadata = {
  title: 'Bin Buddy - Belfast Bin Banter',
  description: 'A playful look at the next Belfast City Council bin collection for BT7 2HR.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
