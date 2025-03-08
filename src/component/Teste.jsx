import React, { createElement, useRef, useState } from "react";
import "./css/teste.css";

export const Teste = () => {
  // Posições do jogador
  const [top, setTop] = React.useState(0);
  const [down, setDown] = React.useState(0);
  const [left, setLeft] = React.useState(0);
  const [right, setRight] = React.useState(0);

  const [chamarUseEffect, setChamarUseEffect] = useState(false);
  //const chamarUseEffect = React.useRef(false);
  const conteudoPrincipal = document.querySelector(".conteudoPrincipal");
  const quadrado = document.querySelector(".quadrado");

  React.useEffect(() => {
    if (chamarUseEffect) {
      console.log(conteudoPrincipal);

      const bolinha = document.createElement("div");
      bolinha.className = "bolinha";
      bolinha.style.margin = `${down}px ${right}px ${top}px ${left}px`;
      conteudoPrincipal.appendChild(bolinha);

      setChamarUseEffect(false);
    }
  });

  const atirar = (e) => {
    if (e.key === "a") setChamarUseEffect(true);
    // if (e.key === "a") {

    //   console.log(quadrado.style.marginRight);
    // }
  };

  const moverQuadrado = (e) => {
    if (e.key === "ArrowUp") setTop((prev) => prev + 10);
    if (e.key === "ArrowDown") setDown((prev) => prev + 10);
    if (e.key === "ArrowRight") setLeft((prev) => prev + 10);
    if (e.key === "ArrowLeft") setRight((prev) => prev + 10);
  };

  React.useEffect(() => {
    window.addEventListener("keydown", moverQuadrado);
    window.addEventListener("keyup", atirar);

    return () => {
      window.removeEventListener("keydown", moverQuadrado);
      window.removeEventListener("keyup", atirar);
    };
  }, []);

  return (
    <>
      <section className="conteudoPrincipal">
        <div
          className="quadrado"
          style={{ margin: `${down}px ${right}px ${top}px ${left}px` }}
          onKeyDown={(e) => moverQuadrado(e)}
          onKeyUp={(e) => atirar(e)}
        />
      </section>
    </>
  );
};
