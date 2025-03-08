import React, { useEffect } from "react";
import "../component/css/jogoDaMemoria.css";
import { ModalComponent } from "./ModalComponent";
import { Link } from "react-router-dom";


export const JogoDaMemoria = () => {
  const armazenarCartasMostradas = React.useRef({
    primeiraCarta: null,
    segundaCarta: null,
  });

  const [countError, setCountError] = React.useState(0);

  const [acerto, setAcerto] = React.useState(0);

  const [isJogoIniciado, setIsJogoIniciado] = React.useState(false);
  const [isOpenModal, setIsOpenModal] = React.useState(true);

  const [messageJogo, setMessageJogo] = React.useState("Jogo iniciado");


  const [imagens, setImagens] = React.useState([
    { id: 1, src: "/img/gato.png", alt: "gato" },
    { id: 2, src: "/img/gato.png", alt: "gato" },
    { id: 3, src: "/img/shiba-inu.png", alt: "shiba-inu" }, // cspell:ignore shiba
    { id: 4, src: "/img/shiba-inu.png", alt: "shiba-inu" }, // cspell:ignore shiba
    { id: 5, src: "/img/glutão.png", alt: "glutão" },
    { id: 6, src: "/img/glutão.png", alt: "glutão" },
    { id: 7, src: "/img/tartaruga.png", alt: "tartaruga" },
    { id: 8, src: "/img/tartaruga.png", alt: "tartaruga" },
    { id: 9, src: "/img/urso.png", alt: "urso" },
    { id: 10, src: "/img/urso.png", alt: "urso" },
    { id: 11, src: "/img/raccoon.png", alt: "raccoon" },
    { id: 12, src: "/img/raccoon.png", alt: "raccoon" },
  ]);

  useEffect(() => {
    if (!isJogoIniciado) {
      embaralharCartas();
    }

    // if (acerto === imagens.length / 2) {
    //   setIsJogoIniciado(false);
    // }

    // if (countError === 7) {
    //   setIsJogoIniciado(false);
    // }

  }, [acerto, countError, isJogoIniciado]);

  //prettier-ignore
  const embaralharCartas = () => setImagens((prevImagens) => [...prevImagens].sort(() => Math.random() - 0.5));

  const mostrarCarta = (e) => {
    e.target.style.filter = "grayscale(0%) brightness(100%)";
    e.target.style.transition = "all 1s";
    if (!armazenarCartasMostradas.current.primeiraCarta) {
        armazenarCartasMostradas.current.primeiraCarta = e.target;
    } else{
        armazenarCartasMostradas.current.segundaCarta = e.target;

    if (armazenarCartasMostradas.current.primeiraCarta.alt === armazenarCartasMostradas.current.segundaCarta.alt) {
            armazenarCartasMostradas.current.primeiraCarta.style.filter = "grayscale(0%) brightness(100%)";
            armazenarCartasMostradas.current.primeiraCarta.style.transition = "all 1s";
            armazenarCartasMostradas.current.segundaCarta.style.filter = "grayscale(0%) brightness(100%)";
            armazenarCartasMostradas.current.segundaCarta.style.transition = "all 1s";
            armazenarCartasMostradas.current.primeiraCarta = null;
            armazenarCartasMostradas.current.segundaCarta = null;
            setAcerto((prev) => prev + 1);
        } else{
            setCountError((prev) => prev + 1);
            setTimeout(() => {
                armazenarCartasMostradas.current.primeiraCarta.style.filter = "grayscale(100%) brightness(0%)";
                armazenarCartasMostradas.current.primeiraCarta.style.transition = "all 1s";
                armazenarCartasMostradas.current.segundaCarta.style.filter = "grayscale(100%) brightness(0%)";
                armazenarCartasMostradas.current.segundaCarta.style.transition = "all 1s";
                armazenarCartasMostradas.current.primeiraCarta = null;
                armazenarCartasMostradas.current.segundaCarta = null;
            }, 700);
        }
    }
  };

  return (
    <>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2rem",
          gap: "10px",
        }}
      >
        {isJogoIniciado ? (
          <>
            {/* <h2>Jogo da Memória</h2> */}

         <Link className="link" to="/">Voltar para a página inicial</Link>
            

            <h2>Quantidade de erros: {countError}</h2>

            <section className="imagensContainer">
              {imagens.map((imagem) => {
                return (
                  <div key={imagem.id}>
                    <img
                      src={imagem.src}
                      alt={imagem.alt}
                      className="image"
                      onClick={(e) => mostrarCarta(e)}
                      width={200}
                      height={300}
                    />
                  </div>
                );
              })}
            </section>
          </>
        ) : !isJogoIniciado ? (
          <>
            <ModalComponent
              content={"jogoDaMemoria"}
              openModal={isOpenModal}
              closeModal={() => {
                setIsOpenModal(false);
                setIsJogoIniciado(true);
            }}
              resetarJogo={() => setIsJogoIniciado(true)}
              MessageFimJogo={messageJogo}
            />
          </>
        ) : (
          <div>Jogo finalizado!</div>
        )}
      </main>
    </>
  );
};
