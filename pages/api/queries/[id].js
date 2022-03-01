import { prisma } from "../../../prisma/prisma-client";

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

const getQuery = (id) => {
  switch (+id) {
    case 1:
      return `SELECT COUNT(*) FROM Especie;`;
    case 2:
      return `SELECT COUNT(*) FROM Gen
        INNER JOIN GenXEspecie
        ON Gen.id = GenXEspecie.gene_id
        INNER JOIN Especie
        ON GenXEspecie.specie_id = Especie.id
        WHERE Especie.id = 'prokka_AZUL';`;
    case 3:
      return `SELECT Especie.specie, Especie.strain FROM Gen
        INNER JOIN GenXEspecie
        ON Gen.id = GenXEspecie.gene_id
        INNER JOIN Especie
        ON GenXEspecie.specie_id = Especie.id
        WHERE Gen.id = 'pucAB';`;
    case 4:
      return `SELECT id, sequence FROM Gen WHERE length(sequence) < 95;`;
    case 5:
      return `SELECT COUNT(*) FROM GenXEspecie WHERE (gene_id = 'pucAE' AND specie_id = (SELECT id FROM Especie WHERE strain = 'AZUL') );`;
    case 6:
      return `SELECT COUNT(*) FROM Especie WHERE specie = 'rutila';`;
    case 7:
      return `SELECT GenXEspecie.gene_id, Funcion.annotation FROM GenXEspecie
      INNER JOIN Funcion ON GenXEspecie.gene_id = Funcion.id
      GROUP BY GenXEspecie.gene_id
      HAVING COUNT(*) = 1 AND GenXEspecie.specie_id  = (SELECT id FROM Especie WHERE strain = 'AZUL');`;
    case 8:
      return `SELECT specie, COUNT(*) FROM Especie GROUP BY specie;`;
    case 9:
      return `SELECT COUNT(*) FROM Gen WHERE sequence LIKE '%GGAAC%';`;
    case 10:
      return `SELECT AVG(length(sequence)) FROM Gen;`;
    default:
      return `SELECT 'Inserte una consulta válida'`;
  }
};

export default async function handler(req, res) {
  // Get data submitted in request's body.
  const { id } = req.query;

  // Optional logging to see the responses
  // in the command line where next.js app is running.
  const result = await prisma.$queryRawUnsafe(getQuery(id));
  // Guard clause checks for first and last name,
  // and returns early if they are not found
  if (!id) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: "No se envió ninguna query" });
  }

  // Found the name.
  // Sends a HTTP success code
  res.status(200).json({ data: result, query: getQuery(id), question: questions[+id - 1] });
}
