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
      <div className="flex">
        <Sidebar />
        <div className="min-h-screen flex-1 p-7 bg-secondary overflow-x-auto">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="bg-secondary">
      <Navbar />
      <main className="flex min-h-screen flex-col max-w-screen-xl mx-auto p-4 py-10 bg-secondary">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
