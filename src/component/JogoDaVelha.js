import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./css/styleGlobal.css";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";

export const JogoDaVelha = () => {
  const [state, setState] = React.useState([]);
  const [jogadorCount1, setJogadorCount1] = React.useState(0);
  const [jogadorCount2, setJogadorCount2] = React.useState(0);
  const [jogador1, setJogador1] = React.useState("");
  const [jogador2, setJogador2] = React.useState("");
  const [jogoIniciado, setJogoIniciado] = React.useState(false);

  const resetarJogo = () => {
    setState([]);
    setJogadorCount1(0);
    setJogadorCount2(0);
    setJogador1("");
    setJogador2("");
    setJogoIniciado(false);
  };

  React.useEffect(() => {
    if (state.length < 9) {
      for (let i = 1; i <= 9; i++) {
        setState([...state, { jogador: "", letra: "" }]);
      }
    }
  }, [state]);

  const jogadaCPU = () => {
    const randomNumber = Math.floor(Math.random() * 9);
    const validarOndeCPUPodeJogar = state.filter(
      (item, index) => randomNumber === index
    );
    console.log(validarOndeCPUPodeJogar[0].jogador);
    // state[index].jogador !== ""
    if (validarOndeCPUPodeJogar[0].jogador !== jogador1) {
      setState((prev) =>
        prev.map((item, indexMap) =>
          indexMap === randomNumber
            ? { ...item, jogador: jogador2, letra: jogador2 }
            : item
        )
      );
      validarQuemVenceu();
    } else jogadaCPU();
  };

  const quadradoClicado = (index) => {
    if (jogoIniciado) {
      setState((prev) =>
        prev.map((item, indexMap) =>
          indexMap === index
            ? { ...item, jogador: jogador1, letra: jogador1 }
            : item
        )
      );
      validarQuemVenceu();

      // setTimeout(() => {
      //   jogadaCPU();
      // }, 5000);
    }
  };

  const validarQuemVenceu = () => {
    const linha1 =
      state[1].jogador != state[2].jogador &&
      state[3].jogador != state[1].jogador;
    console.log(linha1);
    const linha2 =
      state[3].jogador === state[4].jogador &&
      state[3].jogador === state[5].jogador;
    const linha3 =
      state[6].jogador === state[7].jogador &&
      state[6].jogador === state[8].jogador;
    const coluna1 =
      state[0].jogador === state[3].jogador &&
      state[0].jogador === state[6].jogador;
    const coluna2 =
      state[1].jogador === state[4].jogador &&
      state[1].jogador === state[7].jogador;
    const coluna3 =
      state[2].jogador === state[5].jogador &&
      state[2].jogador === state[8].jogador;
    const diagonal1 =
      state[0].jogador === state[4].jogador &&
      state[0].jogador === state[8].jogador;
    const diagonal2 =
      state[2].jogador === state[4].jogador &&
      state[2].jogador === state[6].jogador;

    // if (linha1 || linha2 || linha3 || coluna1 || coluna2 || coluna3 || diagonal1 || diagonal2) {

    // }
  };

  const iniciarJogo = (letra, validation) => {
    if (validation === "fimDeJogo") {
      resetarJogo();
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
      <section className="container">
        <Link to="/" className="link">
          Voltar para a página inicial
        </Link>

        <p>
          {!jogoIniciado ? (
            "Para começar o jogo é preciso escolher o X ou o O "
          ) : (
            <Button
              variant="contained"
              color="error"
              onClick={() => iniciarJogo(null, "fimDeJogo")}
            >
              Fim de jogo
            </Button>
          )}
        </p>

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
