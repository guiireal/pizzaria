import { api } from "@/services/api";
import { getSessionTokenServer } from "@/services/cookies/server";
import { redirect } from "next/navigation";
import { Button } from "../components/Button";
import styles from "./styles.module.scss";

async function handleSubmit(formData: FormData) {
  "use server";

  const name = formData.get("name");

  if (!name) {
    return;
  }

  try {
    const token = await getSessionTokenServer();

    await api.post(
      "/categories",
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error(error);
  } finally {
    redirect("/dashboard");
  }
}

export default function Page() {
  return (
    <main className={styles.container}>
      <h1>Nova categoria</h1>

      <form action={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Nome da categoria, ex: Pizzas"
          required
          className={styles.input}
        />

        <Button>Cadastrar</Button>
      </form>
    </main>
  );
}
