"use client";

import { Button } from "@/app/dashboard/components/Button";
import { api } from "@/services/api";
import { getSessionTokenClient } from "@/services/cookies/client";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import styles from "./styles.module.scss";

type Category = {
  id: string;
  name: string;
};

type FormProps = {
  categories: Category[];
};

export function Form({ categories }: FormProps) {
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");

  async function handleSubmit(formData: FormData) {
    const category = formData.get("category");
    const name = formData.get("name");
    const price = formData.get("price");
    const description = formData.get("description");

    if (!category || !name || !price || !description || !image) {
      return;
    }

    const token = await getSessionTokenClient();

    const data = new FormData();

    data.append("name", name);
    data.append("category", category);
    data.append("price", price);
    data.append("description", description);
    data.append("banner", image);

    await api.post("/products", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || !event.target.files[0]) {
      return;
    }

    const imageFile = event.target.files[0];

    if (!["image/png", "image/jpeg"].includes(imageFile.type)) {
      return;
    }

    setImage(imageFile);
    setPreviewImage(URL.createObjectURL(imageFile));
  }

  return (
    <main className={styles.container}>
      <h1>Novo produto</h1>

      <form action={handleSubmit} className={styles.form}>
        <label htmlFor="" className={styles.labelImage}>
          <span>
            <UploadCloud size={30} color="#fff" />
          </span>

          <input
            type="file"
            accept="image/png, image/jpeg"
            required
            onChange={handleFile}
          />

          {previewImage && (
            <Image
              src={previewImage}
              alt="Imagem prévia"
              className={styles.preview}
              fill
              quality={100}
              priority
            />
          )}
        </label>

        <select name="category">
          <option value="">Selecione uma categoria</option>
          {categories.map((category, index) => (
            <option key={index} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="name"
          placeholder="Digite nome do produto..."
          required
          className={styles.input}
        />

        <input
          type="text"
          name="price"
          placeholder="Preço do produto..."
          required
          className={styles.input}
        />

        <textarea
          name="description"
          className={styles.input}
          placeholder="Digite a descrição do produto..."
          required
        ></textarea>

        <Button>Cadastrar</Button>
      </form>
    </main>
  );
}
