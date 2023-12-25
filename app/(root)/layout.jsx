import "../globals.css";

export const metadata = {
  title: "Admin Dashboard",
  description: "Explore the future",
};

export default function RootLayout({ children }) {
  return (
    <>
      <h1>Navbar</h1>
      {children}
      <h1>Footer</h1>
    </>
  );
}
