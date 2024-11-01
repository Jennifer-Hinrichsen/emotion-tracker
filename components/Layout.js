import Navigation from "./Navigation/Navigation";

export default function Layout({ children }) {
  return (
    <>
      <main>{children}</main>
      <Navigation />
    </>
  );
}
