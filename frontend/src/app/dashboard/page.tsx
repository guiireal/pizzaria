import { api } from "@/services/api";
import { getSessionTokenServer } from "@/services/cookies/server";
import { Order } from "@/types";
import { Orders } from "./components/Orders";

async function getOrders(): Promise<Order[] | []> {
  try {
    const token = await getSessionTokenServer();

    const { data } = await api.get<Order[]>("/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function Page() {
  const orders = await getOrders();

  return (
    <>
      <Orders orders={orders} />
    </>
  );
}
