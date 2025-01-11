import { X } from "lucide-react";
import styles from "./styles.module.scss";

export function Modal() {
  return (
    <dialog className={styles.container}>
      <section className={styles.content}>
        <button className={styles.closeButton}>
          <X size="40" color="#ff3f4b" />
        </button>

        <article className={styles.articleContainer}>
          <h2>Detalhes do pedido</h2>

          <span className={styles.table}>
            Mesa <strong>36</strong>
          </span>

          <section className={styles.item}>
            <span>
              1 - <strong>Pizza de catupiri</strong>
            </span>
            <span className={styles.description}>Pizza de frango catupiry</span>
          </section>

          <button className={styles.orderButton}>Concluir pedido</button>
        </article>
      </section>
    </dialog>
  );
}
