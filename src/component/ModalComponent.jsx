import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import "../component/css/modal.css";

export const ModalComponent = (props) => {
   //prettier-ignore
  const { openModal, closeModal, content, resetarJogo, MessageFimJogo, setSelect } = props;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: content === "jogoDaMemoria"? 350: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const recomecarJogo = () => {
    resetarJogo();
    closeModal();
  };

  return (
    <Modal
      open={openModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={style}
        style={{
          backgroundColor: "#565f69",
          borderRadius: "20px",
          border: "none",
          outline: "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {content === "JogoDaVelha" ? (
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Fim de jogo
            </Typography>

            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ marginBottom: "20px" }}
            >
              {MessageFimJogo}
            </Typography>

            <Button variant="contained" color="error" onClick={recomecarJogo}>
              Recomeçar o jogo
            </Button>
          </>
        ) : content === "jogoDaMemoria" && (
          <>
          {
            <>
            {
              MessageFimJogo === "Jogo iniciado"  ? (
                <>
                  <Link to="/" className="link">Voltar para a página inicial</Link>

                  <Typography id="modal-modal-title" variant="h6" component="h2">
                  <h3>Como jogar? 🤔</h3>

                  <p style={{margin: "8px"}}>
                   Clique nas cartas para encontrar os pares. 
                  </p>

                  <p>O jogo termina quando todas
                  as cartas forem encontradas ou se o tempo acabar. Boa sorte!</p>

                </Typography>
                <br />

                <select className="select" id="select" onChange={(e) => setSelect(e.target.value)}>
                <option value="Selecione algo" selected style={{ display: "none" }}>Selecione algo</option>
                <option value="Animais">Animais</option>
                <option value="Personagens">Personagens</option>
              </select>
                <br />

                <Button variant="contained"  onClick={resetarJogo}>
                Começar o jogo
                </Button>


                </>
              ) : MessageFimJogo === "você perdeu"?  (
                <>
                  <Link to="/" className="link">Voltar para a página inicial</Link>

                  <Typography id="modal-modal-title" variant="h6" component="h2">
                  <h3>（；´д｀）ゞVocê perdeu! 😐</h3>

                  <p>
                  ⏱ O tempo acabou. Mas não se preocupe, pois você  pode tentar novamente clicando no botão abaixo. 👇
                  </p>

                </Typography>
                <br />

                <Button variant="contained" color="success"  onClick={resetarJogo}>
                recomeçar o jogo
                </Button>


                </>

              ) : MessageFimJogo === "você venceu" &&  (
                <>
                  <Link to="/" className="link">Voltar para a página inicial</Link>

                  <Typography id="modal-modal-title" variant="h6" component="h2">
                  <h3>╰(*°▽°*)╯ Você Venceu! 😎</h3>

                  <p>
                  🖖 Parabéns, Você achou todos os pares das imagens, você pode jogar novamente clicando no botão abaixo. 👇
                  </p>

                </Typography>
                <br />

                <Button variant="contained" color="success"  onClick={resetarJogo}>
                recomeçar o jogo
                </Button>


                </>

              )
            }
            </>
            
          }

          </>
        )}
      </Box>
    </Modal>
  );
};
