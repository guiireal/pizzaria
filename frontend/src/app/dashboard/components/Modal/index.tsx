import { OrderContext } from "@/providers/order";
import { X } from "lucide-react";
import { use } from "react";
import styles from "./styles.module.scss";

export function Modal() {
  const { onRequestClose, handleFinishOrder, order } = use(OrderContext);

  if (!order) {
    return null;
  }

  return (
    <dialog className={styles.container}>
      <section className={styles.content}>
        <button className={styles.closeButton} onClick={() => onRequestClose()}>
          <X size="40" color="#ff3f4b" />
        </button>

        <article className={styles.articleContainer}>
          <h2>Detalhes do pedido</h2>

          <span className={styles.table}>
            Mesa <strong>{order.table}</strong>
          </span>

          {order.items.map((item, index) => (
            <section className={styles.item} key={index}>
              <span>
                {index + 1} - <strong>{item.product.name}</strong>
              </span>
              <span className={styles.description}>
                {item.product.description}
              </span>
            </section>
          ))}

          <button
            className={styles.orderButton}
            onClick={() => handleFinishOrder(order.id)}
          >
            Concluir pedido
          </button>
        </article>
      </section>
    </dialog>
  );
}
