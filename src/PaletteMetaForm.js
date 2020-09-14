import React, { useState, useEffect, useReducer } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart';

export default function PaletteMetaForm({ palettes, handleSubmit, hideForm }) {
  const [stage, setStage] = useState("form");
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      newColorName: '',
      newPaletteName: '',
    }
  );

  useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
      palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }, [palettes]);

  const handleChange = (event) => {
    const name = event.target.name;
    const newValue = event.target.value;
    setUserInput({ [name]: newValue });
  }

  const showEmojiPicker = () => {
    setStage("emoji");
  }

  const savePalette = (emoji) => {
    console.log(emoji.native);
    const newPalette = { paletteName: userInput.newPaletteName, emoji: emoji.native }
    handleSubmit(newPalette)

  }

  return (
    <div>
      <Dialog open={stage === "emoji"} onClose={hideForm}>
        <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
        <Picker onSelect={savePalette} title="Pick a Palette Emoji" />
      </Dialog>
      <Dialog open={stage === "form"} onClose={hideForm} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={showEmojiPicker}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new beautiful palette. Make sure it's unique!
          </DialogContentText>
            <TextValidator
              value={userInput.newPaletteName}
              name="newPaletteName"
              label="Palette Name"
              onChange={handleChange}
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={['Enter a palette name', 'Name already used']}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={hideForm} color="primary">
              Cancel
          </Button>
            <Button variant="contained" color="primary" type="submit">Save Palette</Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}