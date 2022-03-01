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


export default function Layout({ children }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Inicio
              </a>
            </li>
            {questions.map((q, index)=> (            <li key={index} className="nav-item">
              <a className="nav-link active" aria-current="page" href={`/queries/${index +1}`}>
                Pregunta {index+1}
              </a>
            </li>))}
          </ul>
        </div>
      </nav>
      {children}
    </>
  );
}
