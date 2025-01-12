"use client";

import { api } from "@/services/api";
import { getSessionTokenClient } from "@/services/cookies/client";
import { OrderDetail } from "@/types";
import { useRouter } from "next/navigation";
import { createContext, useState, type ReactNode } from "react";
import { toast } from "sonner";

type OrderContextProps = {
  isOpen: boolean;
  order?: OrderDetail;
  onRequestOpen: (orderId: string) => void;
  onRequestClose: () => void;
  handleFinishOrder: (orderId: string) => void;
};

type OrderProviderProps = {
  children: ReactNode;
};

export const OrderContext = createContext<OrderContextProps>(
  {} as OrderContextProps
);

export function OrderProvider({ children }: OrderProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState<OrderDetail>();
  const router = useRouter();

  async function onRequestOpen(orderId: string) {
    const token = await getSessionTokenClient();

    const { data } = await api.get<OrderDetail>(`/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setOrder(data);
    setIsOpen(true);
  }

  function onRequestClose() {
    setIsOpen(false);
  }

  async function handleFinishOrder(orderId: string) {
    const token = await getSessionTokenClient();

    try {
      await api.put(`/orders/${orderId}/complete`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Pedido finalizado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao finalizar pedido!");
    } finally {
      setIsOpen(false);
      router.refresh();
    }
  }

  return (
    <OrderContext.Provider
      value={{
        order,
        isOpen,
        onRequestOpen,
        onRequestClose,
        handleFinishOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
