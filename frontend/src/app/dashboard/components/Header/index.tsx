"use client";

import { deleteCookie } from "cookies-next";
import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "../../../../../public/logo.svg";
import styles from "./styles.module.scss";

export function Header() {
  const router = useRouter();

  function handleLogout() {
    deleteCookie("session", { path: "/" });

    router.replace("/");
  }

  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Link href="/dashboard">
          <Image
            alt="Logo Sujeito Pizza"
            src={logo}
            width="190"
            height="60"
            priority
            quality="100"
          />
        </Link>
        <nav>
          <Link href="/dashboard/categories">Categoria</Link>
          <Link href="/dashboard/products">Produto</Link>

          <form action={handleLogout}>
            <button type="submit">
              <LogOutIcon size="24" color="#fff" />
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
