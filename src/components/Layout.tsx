import { ReactNode } from "react";
import BottomNav from "./BottomNav";
import DesktopNav from "./DesktopNav";
import Footer from "./Footer";

const Layout = ({ children, hideFooter = false }: { children: ReactNode; hideFooter?: boolean }) => {
  return (
    <div className="min-h-screen bg-background flex">
      <DesktopNav />
      <div className="flex-1 min-w-0 pb-24 lg:pb-6 overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
        <main className="mx-auto max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
          {children}
          {!hideFooter && <Footer />}
        </main>
      </div>
      <BottomNav />
    </div>
  );
};

export default Layout;
