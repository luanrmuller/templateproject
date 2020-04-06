import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import TextField from "@material-ui/core/TextField";

import Checkbox from "@material-ui/core/Checkbox";
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
  const hasEmail = !props.email;

  const [email, setEmail] = useState(props.email ? props.email.email : "");
  const [isActive, setActive] = useState(
    props.email ? props.email.isActive : ""
  );
  const [isDefault, setDefault] = useState(
    props.email ? props.email.isDefault : ""
  );

  const [open, setOpen] = React.useState(false);

  const token = localStorage.getItem("token");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleAddEmail(e) {
    e.preventDefault();

    const data = {
      email,
      isActive,
      isDefault,
    };

    try {
      await api.post("/api/emails", data, {
        headers: {
          Authorization: token,
        },
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
        {/* {!hasEmail && <FiEdit2 size={20} color="#0288D1" />}
        {hasEmail && <FiPlus size={20} color="#00796B" />} */}
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Adicionar email
        </DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" >
              <TextField
                autoFocus
                variant="outlined"
                margin="normal"
                id="name"
                label="Email"
                type="text"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <FormControlLabel
                value="Ativo"
                control={
                  <Checkbox
                    color="primary"
                    value={isActive}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                }
                label="Ativo"
                labelPlacement="Ativo"
              />
              <FormControlLabel
                value="Padrão"
                control={
                  <Checkbox
                    color="primary"
                    value={isDefault}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                }
                label="Padrão"
                labelPlacement="Padrão"
              />
            </FormGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddEmail} color="primary">
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
