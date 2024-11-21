import Navigation from "./Navigation";
import ThemeToggle from "@/components/ThemeToggle";

export default function Layout({ children }) {
  return (
    <>
      <nav>
        <ThemeToggle />
      </nav>
      <main>{children}</main>
      <Navigation />
    </>
  );
}
