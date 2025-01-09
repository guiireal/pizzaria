"use client";

import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import styles from "./styles.module.scss";

type ButtonProps = {
  children: Readonly<ReactNode>;
};

export function Button({ children }: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={styles.button}>
      {pending ? "Carregando..." : children}
    </button>
  );
}
