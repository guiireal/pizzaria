import { Order } from "@/types";
import { RefreshCw } from "lucide-react";
import { Modal } from "../Modal";
import styles from "./styles.module.scss";

type OrderProps = {
  orders: Order[];
};

export function Orders({ orders }: OrderProps) {
  return (
    <>
      <main className={styles.container}>
        <section className={styles.header}>
          <h1>Últimos pedidos</h1>
          <button>
            <RefreshCw size={24} color="#3fffa3" />
          </button>
        </section>
        <section className={styles.orders}>
          {orders.map((order) => (
            <button key={order.id} className={styles.item}>
              <div className={styles.tag}></div>
              <span>Mesa {order.table}</span>
            </button>
          ))}
        </section>
      </main>

      <Modal />
    </>
  );
}
