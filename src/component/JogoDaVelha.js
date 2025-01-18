import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./css/styleGlobal.css";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import { ModalComponent } from "./ModalComponent";

export const JogoDaVelha = () => {
  const obj = [
    { jogador: "", quemVenceu: "" },
    { jogador: "", quemVenceu: "" },
    { jogador: "", quemVenceu: "" },
    { jogador: "", quemVenceu: "" },
    { jogador: "", quemVenceu: "" },
    { jogador: "", quemVenceu: "" },
    { jogador: "", quemVenceu: "" },
    { jogador: "", quemVenceu: "" },
    { jogador: "", quemVenceu: "" },
  ];
  const [state, setState] = React.useState(obj);
  const [jogadorCount1, setJogadorCount1] = React.useState(0);
  const [jogadorCount2, setJogadorCount2] = React.useState(0);
  const [jogador1, setJogador1] = React.useState("j");
  const [jogador2, setJogador2] = React.useState("j2");
  const [jogoIniciado, setJogoIniciado] = React.useState(false);
  const [isOpenModalFimDeJogo, setIsOpenModalFimDeJogo] = React.useState(false);
  const [isJogador1Podejogar, setIsJogador1Podejogar] = React.useState(true);
  const [chamarUseEffectNovamente, setChamarUseEffectNovamente] =
    React.useState(true);

  const [isJogador2Podejogar, setIsJogador2Podejogar] = React.useState(false);

  const [isJogador2IgualCPU, setIsJogador2IgualCPU] = React.useState(true);

  const resetarValores = () => {
    setState(obj);
    setJogadorCount1(0);
    setJogadorCount2(0);
    setJogador1("j");
    setJogador2("j2");
    setJogoIniciado(false);
    setIsOpenModalFimDeJogo(false);
    setIsJogador1Podejogar(true);
    setIsJogador2Podejogar(false);
  };

  const MessageFimJogo = React.useRef("");
  const resetarJogo = (validation) => {
    if (validation === "fimDeJogo") {
      resetarValores();
      return;
    }

    setState(obj);
    setJogador1(jogador1);
    setJogador2(jogador2);
    setIsJogador1Podejogar(true);
    setIsJogador2Podejogar(false);
    setJogoIniciado(true);
    setIsOpenModalFimDeJogo(false);

    MessageFimJogo.current === "O primeiro jogador venceu"
      ? setJogadorCount1((prev) => prev + 1)
      : MessageFimJogo.current === "A CPU venceu"
      ? setJogadorCount2((prev) => prev + 1)
      : MessageFimJogo.current === "O segundo jogador venceu" &&
        setJogadorCount2((prev) => prev + 1);
  };

  const modalFimDeJogo = (letra) => {
    MessageFimJogo.current =
      letra.quemVenceu === "jogador2"
        ? "O segundo jogador venceu"
        : letra.quemVenceu === "CPU"
        ? "A CPU venceu"
        : "O primeiro jogador venceu";
    setIsOpenModalFimDeJogo(true);
  };

  const arrayNumber = [];

  for (let i = 0; i < 9; i++) {
    arrayNumber.push(i);
  }

  React.useEffect(() => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    winningCombinations.forEach((combination) => {
      const [a, b, c] = combination;
      if (
        (state[a].jogador === jogador1 &&
          state[b].jogador === jogador1 &&
          state[c].jogador === jogador1) ||
        (state[a].jogador === jogador2 &&
          state[b].jogador === jogador2 &&
          state[c].jogador === jogador2)
      ) {
        modalFimDeJogo(state[a]);
      } else if (state.every((item) => item.jogador !== "")) {
        MessageFimJogo.current = "O jogo está empatado";
        setIsOpenModalFimDeJogo(true);
      }
    });

    //  Jogada da CPU

    if (isJogador2IgualCPU) {
      if (isJogador2Podejogar) {
        const randomNumber = Math.floor(Math.random() * 9);

        if (state[randomNumber].jogador === "") {
          setState((prev) =>
            prev.map((item, indexMap) =>
              indexMap === randomNumber
                ? { ...item, jogador: jogador2, quemVenceu: "CPU" }
                : item
            )
          );
          setIsJogador1Podejogar(true);
          setIsJogador2Podejogar(false);
        } else setChamarUseEffectNovamente((prev) => !prev);
      }
    }
  }, [state, chamarUseEffectNovamente]);

  const quadradoClicado = (index) => {
    if (isJogador1Podejogar || !isJogador2IgualCPU) {
      if (jogoIniciado) {
        if (state[index].jogador === "") {
          setIsJogador1Podejogar(false);
          setState((prev) =>
            prev.map((item, indexMap) =>
              indexMap === index
                ? {
                    ...item,
                    jogador: isJogador2Podejogar ? jogador2 : jogador1,
                    quemVenceu: isJogador2Podejogar ? "jogador2" : "jogador1",
                  }
                : item
            )
          );

          if (isJogador2IgualCPU) {
            setIsJogador2Podejogar(true);
          } else if (isJogador2Podejogar && !isJogador2IgualCPU) {
            setIsJogador2Podejogar(false);
          } else if (!isJogador2Podejogar && !isJogador2IgualCPU) {
            setIsJogador2Podejogar(true);
          }
        }
      } else
        alert(
          "Este quadrado já tem uma letra, por favor escolha outro quadrado."
        );
    } else alert("Espere a jogada da CPU ou do segundo jogador.");
  };

  const iniciarJogo = (letra, validation) => {
    if (validation === "fimDeJogo") {
      resetarJogo("fimDeJogo");
    } else {
      const letraEscolhida =
        validation === "iniciarJogo" ? letra.target.innerText : "";
      const letraJogador2 = letraEscolhida === "X" ? "O" : "X";

      setJogador1(letraEscolhida);
      setJogador2(letraJogador2);
      setJogoIniciado(true);
    }
  };

  const flexBox = { display: "flex", flexDirection: "row" };

  return (
    <>
      {isOpenModalFimDeJogo && (
        <ModalComponent
          openModal={isOpenModalFimDeJogo}
          closeModal={() => setIsOpenModalFimDeJogo(false)}
          content={"JogoDaVelha"}
          resetarJogo={() => resetarJogo()}
          MessageFimJogo={MessageFimJogo.current}
        />
      )}

      <section className="container">
        <Link to="/" className="link">
          Voltar para a página inicial
        </Link>

        {!jogoIniciado && (
          <Button
            color={isJogador2IgualCPU ? "success" : "secondary"}
            variant="contained"
            onClick={() => setIsJogador2IgualCPU((prev) => !prev)}
          >
            {isJogador2IgualCPU ? "J1 VS J2" : "CPU"}
          </Button>
        )}

        {!jogoIniciado ? (
          <p className="fraseInicial">
            Para começar o jogo é preciso escolher o X ou o O
          </p>
        ) : (
          <Button
            variant="contained"
            color="error"
            onClick={() => iniciarJogo(null, "fimDeJogo")}
          >
            Fim de jogo
          </Button>
        )}
        <div style={{ ...flexBox, gap: "20px" }}>
          {!jogoIniciado ? (
            <>
              <Fab
                color="primary"
                onClick={(e) => iniciarJogo(e, "iniciarJogo")}
              >
                X
              </Fab>

              <Fab color="error" onClick={(e) => iniciarJogo(e, "iniciarJogo")}>
                O
              </Fab>
            </>
          ) : (
            <>
              <p>Jogador: {jogadorCount1}</p> <p>CPU: {jogadorCount2} </p>
            </>
          )}
        </div>
        <div className="divPai">
          {state.map((item, index) => {
            return (
              <section key={index}>
                <p
                  // prettier-ignore
                  className={`${item.jogador === "" ? "quadradoVazio" : "quadrado"}`}
                  onClick={() => quadradoClicado(index)}
                >
                  {item.jogador}
                </p>
              </section>
            );
          })}
        </div>
      </section>
    </>
  );
};
