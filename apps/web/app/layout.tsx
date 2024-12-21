import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Turborepo Template",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
