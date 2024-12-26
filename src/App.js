import logo from "./logo.svg";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Bem vindo ao jogos feito com react.</p>
        <br />
        <p>Escolha um jogo abaixo</p>

        <Link className="link" to="/jogo-da-velha">
          Jogo da velha
        </Link>
        <br />
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
