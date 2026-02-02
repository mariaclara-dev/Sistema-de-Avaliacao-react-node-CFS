function Estrelas({ nota }) {
  const estrelas = Math.round(nota / 2);

  return (
    <span>
      {"★".repeat(estrelas)}
      {"☆".repeat(5 - estrelas)}
    </span>
  );
}

export default Estrelas;
