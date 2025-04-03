import React, { useEffect } from "react";
import "../component/css/jogoDaMemoria.css";
import { ModalComponent } from "./ModalComponent";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export const JogoDaMemoria = () => {
  const armazenarCartasMostradas = React.useRef({
    primeiraCarta: null,
    segundaCarta: null,
  });

  const [selectTimers, setSelectTimers] = React.useState({
    min: null,
    seg: null,
    })

  const [acerto, setAcerto] = React.useState(0);

  const [isJogoIniciado, setIsJogoIniciado] = React.useState(false);
  const [isOpenModal, setIsOpenModal] = React.useState(true);

  const [messageJogo, setMessageJogo] = React.useState("Jogo iniciado");

  const [select, setSelect] = React.useState("Selecione algo");

  const [timer, setTimer] = React.useState({minuto: 0, segundo: 0});

  const ajustarTempo = () => {
    if (selectTimers.min === null && selectTimers.seg === null) {
      if (select === "Animais") {
        setTimer({minuto: 2, segundo: 59})
      }
      if (select === "Personagens") {
        setTimer({minuto: 5, segundo: 59})
      }
    }

    if (selectTimers.min !== null && selectTimers.seg !== null) {
      setTimer({minuto: selectTimers.min, segundo: selectTimers.seg})
    }
  }

  const [imagens, setImagens] = React.useState([
    { id: 1, src: "/img/gato.png", alt: "gato", type: "Animais" },
    { id: 2, src: "/img/gato.png", alt: "gato", type: "Animais" },
    { id: 3, src: "/img/shiba-inu.png", alt: "shiba-inu",  type: "Animais" }, // cspell:ignore shiba
    { id: 4, src: "/img/shiba-inu.png", alt: "shiba-inu",  type: "Animais"}, // cspell:ignore shiba
    { id: 5, src: "/img/glutão.png", alt: "glutão", type: "Animais" },
    { id: 6, src: "/img/glutão.png", alt: "glutão", type: "Animais" },
    { id: 7, src: "/img/tartaruga.png", alt: "tartaruga", type: "Animais" },
    { id: 8, src: "/img/tartaruga.png", alt: "tartaruga", type: "Animais" },
    { id: 9, src: "/img/urso.png", alt: "urso", type: "Animais" },
    { id: 10, src: "/img/urso.png", alt: "urso", type: "Animais" },
    { id: 11, src: "/img/raccoon.png", alt: "raccoon", type: "Animais" },
    { id: 12, src: "/img/raccoon.png", alt: "raccoon", type: "Animais" },
    { id: 13, src: "/img/texugo.png", alt: "texugo", type: "Animais" },
    { id: 14, src: "/img/texugo.png", alt: "texugo", type: "Animais" },
    { id: 15, src: "/img/fox.png", alt: "fox", type: "Animais" },
    { id: 16, src: "/img/fox.png", alt: "fox", type: "Animais" },
    { id: 17, src: "/img/papagaio.png", alt: "papagaio", type: "Animais" },
    { id: 18, src: "/img/papagaio.png", alt: "papagaio", type: "Animais" },
    { id: 19, src: "/img/macaco.png", alt: "macaco", type: "Animais" },
    { id: 20, src: "/img/macaco.png", alt: "macaco", type: "Animais" },
    { id: 21, src: "/img/peixe.png", alt: "peixe", type: "Animais" },
    { id: 22, src: "/img/peixe.png", alt: "peixe", type: "Animais" },
    { id: 23, src: "/img/marmota.png", alt: "marmota", type: "Animais" },
    { id: 24, src: "/img/marmota.png", alt: "marmota", type: "Animais" },
    { id: 25, src: "/img/capivara.png", alt: "capivara", type: "Animais" },
    { id: 26, src: "/img/capivara.png", alt: "capivara", type: "Animais" },
    
    { id: 1, src: "/img/rem.png", alt: "rem", type: "Personagens" },
    { id: 2, src: "/img/rem.png", alt: "rem", type: "Personagens" },
    { id: 3, src: "/img/beako.png", alt: "beako", type: "Personagens" },
    { id: 4, src: "/img/beako.png", alt: "beako", type: "Personagens" },
    { id: 5, src: "/img/luigi.png", alt: "luigi", type: "Personagens" },
    { id: 6, src: "/img/luigi.png", alt: "luigi", type: "Personagens" },
    { id: 7, src: "/img/mario.png", alt: "mario", type: "Personagens" },
    { id: 8, src: "/img/mario.png", alt: "mario", type: "Personagens" },
    { id: 9, src: "/img/viloes.png", alt: "viloes", type: "Personagens" },
    { id: 10, src: "/img/viloes.png", alt: "viloes", type: "Personagens" },
    { id: 11, src: "/img/filo.png", alt: "filo", type: "Personagens" },
    { id: 12, src: "/img/filo.png", alt: "filo", type: "Personagens" },
    { id: 13, src: "/img/ramma1.png", alt: "ramma1", type: "Personagens" },
    { id: 14, src: "/img/ramma1.png", alt: "ramma1", type: "Personagens" },
    { id: 15, src: "/img/ramma2.png", alt: "ramma2", type: "Personagens" },
    { id: 16, src: "/img/ramma2.png", alt: "ramma2", type: "Personagens" },
    { id: 17, src: "/img/garotaFofa.png", alt: "shampoo", type: "Personagens" },
    { id: 18, src: "/img/garotaFofa.png", alt: "shampoo", type: "Personagens" },
    { id: 19, src: "/img/naofumi.png", alt: "naofumi", type: "Personagens" },
    { id: 20, src: "/img/naofumi.png", alt: "naofumi", type: "Personagens" },
    { id: 21, src: "/img/subaru.png", alt: "subaru", type: "Personagens" },
    { id: 22, src: "/img/subaru.png", alt: "subaru", type: "Personagens" },
    { id: 23, src: "/img/deku.png", alt: "deku", type: "Personagens" },
    { id: 24, src: "/img/deku.png", alt: "deku", type: "Personagens" },
    { id: 25, src: "/img/himiko-toga.png", alt: "himiko-toga", type: "Personagens" },
    { id: 26, src: "/img/himiko-toga.png", alt: "himiko-toga", type: "Personagens" },
    { id: 27, src: "/img/sonic.png", alt: "sonic", type: "Personagens" },
    { id: 28, src: "/img/sonic.png", alt: "sonic", type: "Personagens" },
    { id: 29, src: "/img/tails.png", alt: "tails", type: "Personagens" },
    { id: 30, src: "/img/tails.png", alt: "tails", type: "Personagens" },
    { id: 31, src: "/img/frieren.png", alt: "frieren", type: "Personagens" },
    { id: 32, src: "/img/frieren.png", alt: "frieren", type: "Personagens" },
    { id: 33, src: "/img/kung-fu-panda.png", alt: "kung-fu-panda", type: "Personagens" },
    { id: 34, src: "/img/kung-fu-panda.png", alt: "kung-fu-panda", type: "Personagens" },
    { id: 35, src: "/img/mitsuri.png", alt: "mitsuri", type: "Personagens" },
    { id: 36, src: "/img/mitsuri.png", alt: "mitsuri", type: "Personagens" },
    { id: 37, src: "/img/nezuko.png", alt: "nezuko", type: "Personagens" },
    { id: 38, src: "/img/nezuko.png", alt: "nezuko", type: "Personagens" },
    { id: 39, src: "/img/raphtalia.png", alt: "raphtalia", type: "Personagens" },
    { id: 40, src: "/img/raphtalia.png", alt: "raphtalia", type: "Personagens" },
    { id: 41, src: "/img/sinobu.png", alt: "sinobu", type: "Personagens" },
    { id: 42, src: "/img/sinobu.png", alt: "sinobu", type: "Personagens" },
    { id: 43, src: "/img/akane.png", alt: "akane", type: "Personagens" },
    { id: 44, src: "/img/akane.png", alt: "akane", type: "Personagens" },
    { id: 45, src: "/img/shadow.png", alt: "shadow", type: "Personagens" },
    { id: 46, src: "/img/shadow.png", alt: "shadow", type: "Personagens" },
    
  ]);

  const [renderImagens, setRenderImagens] = React.useState([])

  useEffect(() => {
    if (isJogoIniciado) {
      setTimeout(() => {
      const segundo = timer.segundo;
      const minuto = timer.minuto;
    
      if (segundo <= 0) {
        setTimer((prev) => ({ ...prev, segundo: 60 }));
        setTimer((prev) => ({ ...prev, minuto: prev.minuto - 1 }));
      }
    
      if (segundo >= 0) {
          setTimer(prev => ({...prev, segundo: prev.segundo - 1}));
        }
        
        if (segundo === 0 && minuto === 0) {
          setIsJogoIniciado(false);
          setMessageJogo("você perdeu");
          setIsOpenModal(true);
        }
      }, 1000); 
    }
  }, [timer])
  

  useEffect(() => {
    if (!isJogoIniciado) {
      embaralharCartas();
    }

     if (acerto === renderImagens.length / 2 && renderImagens.length > 0) {
       setIsJogoIniciado(false);
       setMessageJogo("você venceu");
       setIsOpenModal(true);
     }

    if (select !== "Selecione algo") {
      const imagensFiltradas = imagens.filter(item => item.type === select);
      setRenderImagens(imagensFiltradas);
      if (!isJogoIniciado)  ajustarTempo();
    }
    }, [acerto, isJogoIniciado, select, timer]);
    
  //prettier-ignore
  const embaralharCartas = () => setImagens((prevImagens) => [...prevImagens].sort(() => Math.random() - 0.5));

   // for (let i = imagens.length - 1; i > 0; i--) {
    // const j = Math.floor(Math.random() * (i + 1));
    // [imagens[i], imagens[j]] = [imagens[j], imagens[i]];
    // }

    // setImagens(imagens);

    const mostrarCarta = (e) => {
      if (e.target.style.filter === "grayscale(0%) brightness(100%)") {
        alert("Esta carta já foi selecionada. Escolha outra carta");
        return;
      }
      const primeiraCarta = armazenarCartasMostradas.current.primeiraCarta;
      const segundaCarta = armazenarCartasMostradas.current.segundaCarta;
  
      if (!primeiraCarta || !segundaCarta) {
        e.target.style.filter = "grayscale(0%) brightness(100%)";
        e.target.style.transition = "all 1s";
        if (!armazenarCartasMostradas.current.primeiraCarta) {
          armazenarCartasMostradas.current.primeiraCarta = e.target;
        } else {
          armazenarCartasMostradas.current.segundaCarta = e.target;
  
          if (
            armazenarCartasMostradas.current.primeiraCarta.alt ===
            armazenarCartasMostradas.current.segundaCarta.alt
          ) {
            armazenarCartasMostradas.current.primeiraCarta.style.filter =
              "grayscale(0%) brightness(100%)";
            armazenarCartasMostradas.current.primeiraCarta.style.transition =
              "all 1s";
            armazenarCartasMostradas.current.segundaCarta.style.filter =
              "grayscale(0%) brightness(100%)";
            armazenarCartasMostradas.current.segundaCarta.style.transition =
              "all 1s";
            armazenarCartasMostradas.current.primeiraCarta = null;
            armazenarCartasMostradas.current.segundaCarta = null;
            setAcerto((prev) => prev + 1);
          } else {
            setTimeout(() => {
              armazenarCartasMostradas.current.primeiraCarta.style.filter =
                "grayscale(100%) brightness(0%)";
              armazenarCartasMostradas.current.primeiraCarta.style.transition =
                "all 1s";
              armazenarCartasMostradas.current.segundaCarta.style.filter =
                "grayscale(100%) brightness(0%)";
              armazenarCartasMostradas.current.segundaCarta.style.transition =
                "all 1s";
              armazenarCartasMostradas.current.primeiraCarta = null;
              armazenarCartasMostradas.current.segundaCarta = null;
            }, 700);
          }
        }
      } else {
        alert("você já selecionou duas cartas, espere as cartas ficarem pretas");
      }
    };

  const resetarJogo = () => {
    if (select === "Selecione algo") {
      alert("Selecione uma opção no dropdown para iniciar o jogo");
      return;
    }
    setIsJogoIniciado(true);
    ajustarTempo();
    setAcerto(0);
    setIsOpenModal(false);
  }

  const voltar = () => {
    setIsJogoIniciado(false);
    ajustarTempo();
    setAcerto(0);
    setIsOpenModal(true);
    setMessageJogo("Jogo iniciado");
    setSelectTimers({min: null, seg: null});
    setSelect("Selecione algo");
  }

  return (
    <>
      {/*  prettier-ignore */}
      <main className="conteúdoPrincipal" style={isJogoIniciado ? { backgroundColor: "#276ca8" } : undefined}>
        {isJogoIniciado ? (
          <>
            {/* <h2>Jogo da Memória</h2> */}

          <div className="divNavigation">
            <Link className="link" to="/">
              Voltar para a página inicial
            </Link>

            <Button variant="contained" color="error" onClick={voltar}>Voltar </Button>
          </div>

            <h2>minuto: {timer.minuto} segundo: {timer.segundo}</h2>

            <section className="imagensContainer">
              {renderImagens.map((imagem) => {
                return(
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
            )
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
            resetarJogo={() => resetarJogo()}
            MessageFimJogo={messageJogo}
            setSelect={setSelect}
            selectTimers={setSelectTimers}
            voltar={voltar}
          />
        </>
        ) : (
          <div>Jogo finalizado!</div>
        )}
      </main>
    </>
  );
};
