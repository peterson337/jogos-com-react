import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ModalComponent = (props) => {
  const { openModal, closeModal, content, resetarJogo, MessageFimJogo } = props;
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
              MessageFimJogo === "Jogo iniciado"  && (
                <>
                  <Link to="/" className="link">Voltar para a página inicial</Link>

                  <Typography id="modal-modal-title" variant="h6" component="h2">
                  <h3>Como jogar</h3>

                  <p>
                  Clique nas cartas para encontrar os pares. O jogo termina quando todas
                  as cartas forem encontradas ou se tiver 7 erros.
                  </p>

                </Typography>
                <br />

                <Button variant="contained"  onClick={resetarJogo}>
                Começar o jogo
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
