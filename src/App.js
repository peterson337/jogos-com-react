import logo from "./logo.svg";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  const links = [
    {
      name: "Jogo da velha",
      url: "/jogo-da-velha",
    },

    {
      name: "Jogo da memória",
      url: "/jogo-da-memoria",
    },
  ];
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Bem vindo ao jogos feito com react.</p>
        <br />
        <p>Escolha um jogo abaixo</p>

        {links.map((link) => (
          <Link className="link" style={{ marginBottom: "10px" }} to={link.url}>
            {link.name}
          </Link>
        ))}

        <h3>
          {" "}
          <a
            href="https://jogos-com-vue.vercel.app/"
            style={{ color: "rgb(11, 214, 68)" }}
            className="linkVue"
          >
            Jogos com vue
          </a>
        </h3>
      </header>
    </div>
  );
}

export default App;
