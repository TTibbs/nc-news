import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
