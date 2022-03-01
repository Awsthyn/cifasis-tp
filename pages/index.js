import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const questions = [
  "¿Cuántas especies posee la BDD?",
  "¿Cuántos genes tiene la especie sp. AZUL?",
  "¿Cuáles especies tienen un gen que cumple la función pucAB?",
  "¿Qué  genes tienen un secuencia menor a 95 pares de bases?",
  "¿La especie AZUL tiene un gen con la función pucAE?",
  "¿Cuántas cepas tiene la especie rutila?",
  "¿Cuáles son los genes únicos que posee la cepa AZUL?",
  "¿Qué especies distintas hay?¿Cuántas cepas tiene cada especie?",
  "¿Cuántas secuencias presentan el segmento GGAAC correspondiente a una secuencia consenso del promotor?",
  "¿Cuál es la longitud promedio de las secuencias?"
]


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Rhodopseudomonas DB</title>
        <meta name="description" content="TP Programación de bases de datos. CIFASIS." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Rhodopseudomonas DB
        </h1>

        <p className={styles.description}>
          Trabajo Práctico para Programación de bases de datos
        </p>

        <div className={styles.grid}>
        {questions.map((question, index) => (
          <>
          <a href={`/queries/${index +1}`} className={styles.card}>
          <h2>{index + 1} &rarr;</h2>
          <p>{question}</p>
        </a>
        </>
        ))}


        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
