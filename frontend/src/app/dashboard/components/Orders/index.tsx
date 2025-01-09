import { RefreshCw } from "lucide-react";
import styles from "./styles.module.scss";

export function Orders() {
  return (
    <main className={styles.container}>
      <section className={styles.header}>
        <h1>Últimos pedidos</h1>
        <button>
          <RefreshCw size={24} color="#3fffa3" />
        </button>
      </section>
      <section className={styles.orders}>
        <button className={styles.item}>
          <div className={styles.tag}></div>
          <span>Mesa 10</span>
        </button>
      </section>
    </main>
  );
}
