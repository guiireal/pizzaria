import { api } from "@/services/api";
import { getSessionTokenServer } from "@/services/cookies/server";
import { Form } from "./components/Form";

export default async function Page() {
  const token = await getSessionTokenServer();

  const { data } = await api.get("/categories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (
    <>
      <Form categories={data} />
    </>
  );
}
