"use client";

import { Button } from "@/app/dashboard/components/Button";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import styles from "./styles.module.scss";

export function Form() {
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");

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

      <form action="" className={styles.form}>
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
          <option key={1} value="1">
            Categoria 1
          </option>
          <option key={2} value="2">
            Categoria 2
          </option>
          <option key={3} value="3">
            Categoria 3
          </option>
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
