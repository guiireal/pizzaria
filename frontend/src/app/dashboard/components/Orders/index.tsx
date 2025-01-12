"use client";

import { OrderContext } from "@/providers/order";
import { Order } from "@/types";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { toast } from "sonner";
import { Modal } from "../Modal";
import styles from "./styles.module.scss";

type OrderProps = {
  orders: Order[];
};

export function Orders({ orders }: OrderProps) {
  const { isOpen, onRequestOpen } = use(OrderContext);

  const router = useRouter();

  function handleRefresh() {
    router.refresh();
    toast.success("Pedidos atualizados com sucesso!");
  }

  return (
    <>
      <main className={styles.container}>
        <section className={styles.header}>
          <h1>Últimos pedidos</h1>
          <button>
            <RefreshCw size={24} color="#3fffa3" onClick={handleRefresh} />
          </button>
        </section>
        <section className={styles.orders}>
          {!orders.length && (
            <span className={styles.emptyItem}>
              Nenhum pedido aberto no momento...
            </span>
          )}

          {orders.map((order) => (
            <button
              key={order.id}
              className={styles.item}
              onClick={() => onRequestOpen(order.id)}
            >
              <div className={styles.tag}></div>
              <span>Mesa {order.table}</span>
            </button>
          ))}
        </section>
      </main>

      {isOpen && <Modal />}
    </>
  );
}
