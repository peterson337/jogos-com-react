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

  const MessageFimJogo = React.useRef("");
  const resetarJogo = () => {
    setState(obj);
    //setJogadorCount1(0);
    //setJogadorCount2(0);
    setJogador1("j");
    setJogador2("j2");
    setJogoIniciado(false);
    setIsOpenModalFimDeJogo(false);
  };

  React.useEffect(() => {
    // if (state.length < 9) {
    //   for (let i = 1; i <= 9; i++) {
    //     setState([...state, { jogador: "", quemVenceu: "" }]);
    //   }
    // }

    const [a, b, c, d, e, f, g, h, i] = state;

    if (
      (a.jogador === jogador1 &&
        b.jogador === jogador1 &&
        c.jogador === jogador1) ||
      (a.jogador === jogador2 &&
        b.jogador === jogador2 &&
        c.jogador === jogador2)
    ) {
      MessageFimJogo.current =
        a.quemVenceu === "jogador2"
          ? "O segundo jogador venceu"
          : a.quemVenceu === "CPU"
          ? "A CPU venceu"
          : "O primeiro jogador venceu";
      setIsOpenModalFimDeJogo(true);
    }

    if (
      (a.jogador === jogador1 &&
        b.jogador === jogador1 &&
        c.jogador === jogador1) ||
      (a.jogador === jogador2 &&
        b.jogador === jogador2 &&
        c.jogador === jogador2)
    ) {
      setIsOpenModalFimDeJogo(true);

      console.log("Segundo if");
    }

    if (
      (a.jogador === jogador1 &&
        b.jogador === jogador1 &&
        c.jogador === jogador1) ||
      (a.jogador === jogador2 &&
        b.jogador === jogador2 &&
        c.jogador === jogador2)
    ) {
      setIsOpenModalFimDeJogo(true);

      console.log("Terceiro if");
    }
    if (
      d.jogador === (jogador1 || jogador2) &&
      e.jogador === (jogador1 || jogador2) &&
      f.jogador === (jogador1 || jogador2)
    ) {
      setIsOpenModalFimDeJogo(true);

      console.log("Terceiro if");
    }

    if (
      g.jogador === jogador1 &&
      h.jogador === jogador1 &&
      i.jogador === jogador1
    ) {
      // setIsOpenModalFimDeJogo(true);

      console.log("Quarta if");
    }

    if (
      b.jogador === jogador1 &&
      e.jogador === jogador1 &&
      h.jogador === jogador1
    ) {
      // setIsOpenModalFimDeJogo(true);

      console.log("Quinta if");
    }

    if (
      c.jogador === jogador1 &&
      f.jogador === jogador1 &&
      i.jogador === jogador1
    ) {
      // setIsOpenModalFimDeJogo(true);

      console.log("Setima if");
    }

    if (
      a.jogador === jogador1 &&
      e.jogador === jogador1 &&
      i.jogador === jogador1
    ) {
      // setIsOpenModalFimDeJogo(true);

      console.log("Otiva if");
    }

    if (
      c.jogador === jogador1 &&
      e.jogador === jogador1 &&
      g.jogador === jogador1
    ) {
      // setIsOpenModalFimDeJogo(true);

      console.log("Decima if");
    } else if (state.every((item) => item.jogador !== "")) {
      MessageFimJogo.current = "O jogo está empatado";
      setIsOpenModalFimDeJogo(true);
    }
  }, [state]);

  const jogadaCPU = () => {
    // const randomNumber = Math.floor(Math.random() * 9);
    // const validarOndeCPUPodeJogar = state.filter(
    //   (item, index) => randomNumber === index
    // );
    // console.log(validarOndeCPUPodeJogar[0].jogador);
    // // state[index].jogador !== ""
    // if (validarOndeCPUPodeJogar[0].jogador !== jogador1) {
    //   setState((prev) =>
    //     prev.map((item, indexMap) =>
    //       indexMap === randomNumber
    //         ? { ...item, jogador: jogador2, quemVenceu: "CPU" }
    //         : item
    //     )
    //   );
    // } else jogadaCPU();

    setState((prev) =>
      prev.map((item, indexMap) =>
        (indexMap === 0 && item.jogador === "") ||
        (indexMap === 1 && item.jogador === "") ||
        (indexMap === 2 && item.jogador === "") ||
        (indexMap === 6 && item.jogador === "") ||
        (indexMap === 3 && item.jogador === "") ||
        (indexMap === 8 && item.jogador === "")
          ? { ...item, jogador: jogador2, quemVenceu: "CPU" }
          : item
      )
    );
  };

  const quadradoClicado = (index) => {
    if (jogoIniciado) {
      setState((prev) =>
        prev.map((item, indexMap) =>
          indexMap === index
            ? { ...item, jogador: jogador1, quemVenceu: "jogador1" }
            : item
        )
      );

      jogadaCPU();
    }
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
