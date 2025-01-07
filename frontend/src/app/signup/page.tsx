import { api } from "@/services/api";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import logo from "../../../public/logo.svg";
import styles from "../page.module.scss";

async function handleSubmit(formData: FormData) {
  "use server";

  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!name || !email || !password) {
    return;
  }

  try {
    const response = await api.post("/users", {
      name,
      email,
      password,
    });

    if (response.status !== 200) {
      return;
    }

    redirect("/");
  } catch (error) {
    console.error(error);
  }
}

export default function Page() {
  return (
    <>
      <div className={styles.container}>
        <Image src={logo} alt="Logo da pizzaria" />
        <section className={styles.login}>
          <h1>Criando sua conta</h1>
          <form action={handleSubmit}>
            <input
              type="text"
              required
              name="name"
              placeholder="Digite seu nome..."
              className={styles.input}
            />
            <input
              type="email"
              required
              name="email"
              placeholder="Digite seu e-mail..."
              className={styles.input}
            />
            <input
              type="password"
              required
              name="password"
              placeholder="***********"
              className={styles.input}
            />
            <button type="submit">Cadastrar</button>
          </form>
          <Link href="/" className={styles.text}>
            Já tem uma conta? Faça login.
          </Link>
        </section>
      </div>
    </>
  );
}
