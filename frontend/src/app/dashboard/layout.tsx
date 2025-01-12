import { OrderProvider } from "@/providers/order";
import { ReactNode } from "react";
import { Header } from "./components/Header";

type LayoutProps = {
  children: Readonly<ReactNode>;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <OrderProvider>{children}</OrderProvider>
    </>
  );
}
