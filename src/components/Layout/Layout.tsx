import React, { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useRouter } from "next/router";
import { Sidebar } from "../Sidebar/Sidebar";

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  const router = useRouter();

  if (router.pathname.startsWith("/auth")) {
    return children;
  }
  if (router.pathname.startsWith("/admin")) {
    return (
      <div>
        <Sidebar />
        {children}
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <main className="flex min-h-screen flex-col px-60 mt-10">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
