import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.svg";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <Image src={logo} alt="Logo da pizzaria" />
        <section className={styles.login}>
          <form>
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
