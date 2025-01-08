import { api } from "@/services/api";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import logo from "../../public/logo.svg";
import styles from "./page.module.scss";

async function handleSubmit(formData: FormData) {
  "use server";

  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return;
  }

  try {
    const { data } = await api.post("/sign-in", { email, password });

    if (!data.token) {
      return;
    }

    const cookieStore = await cookies();

    cookieStore.set("session", data.token, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
      path: "/",
      httpOnly: false,
      secure: false,
    });
  } catch (error) {
    console.error(error);
  } finally {
    redirect("/dashboard");
  }
}

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <Image src={logo} alt="Logo da pizzaria" />
        <section className={styles.login}>
          <form action={handleSubmit}>
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
            <button type="submit">Acessar</button>
          </form>
          <Link href="/signup" className={styles.text}>
            Não possui uma conta? Cadastre-se!
          </Link>
        </section>
      </div>
    </>
  );
}
