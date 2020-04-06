import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";

// import { FiEdit2 } from "react-icons/fi";
// import { FiPlus } from "react-icons/fi";

import api from "../../../services/api";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function FormDialog(props) {
  const hasProduct = !props.product;

  const [code, setCode] = useState(props.product ? props.product.code : "");
  const [name, setName] = useState(props.product ? props.product.name : "");

  const [open, setOpen] = React.useState(false);

  const token = localStorage.getItem("token");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleAddProduct(e) {
    e.preventDefault();

    const data = {
      code,
      name
    };

    try {
      await api.post("/api/products", data, {
        headers: {
          Authorization: token
        }
      });

      setOpen(false);
    } catch (error) {
      console.log(error);
      alert("Erro no cadastro, tente novamente.");
    }
  }

  return (
    <div>
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"
        onClick={handleClickOpen}
      >
        {/* {!hasProduct && <FiEdit2 size={20} color="#0288D1" />}
        {hasProduct && <FiPlus size={20} color="#00796B" />} */}
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Adicionar produto
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            variant="outlined"
            margin="normal"
            id="name"
            label="Código"
            type="text"
            fullWidth
            value={code}
            onChange={e => setCode(e.target.value)}
          />
          <TextField
            autoFocus
            variant="outlined"
            margin="normal"
            id="name"
            label="Nome"
            type="text"
            fullWidth
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddProduct} color="primary">
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
