import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./css/styleGlobal.css";

export const JogoDaVelha = () => {
  const quadrado = [];

  React.useEffect(() => {
    for (let i = 1; i <= 9; i++) {
      quadrado.push([{ id: i, jogador: "x" }]);
    }
    setState(quadrado);
  }, []);

  const [state, setState] = React.useState([]);
  console.log(state);
  return (
    <>
      <section className="container">
        <Link to="/" className="link">
          Voltar para a página inicial
        </Link>

        <div className="divPai">
          {state.map((item, index) => {
            return (
              <Fragment key={index}>
                <p className="quadrado">{item.jogador != "x" ? "X" : "O"}</p>
              </Fragment>
            );
          })}
        </div>
      </section>
    </>
  );
};
