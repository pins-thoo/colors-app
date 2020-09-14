import React, { useState, useEffect, useReducer } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function PaletteMetaForm({ palettes, handleSubmit }) {
  const [open, setOpen] = useState(true);
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      newColorName: '',
      newPaletteName: '',
    }
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={() => handleSubmit(userInput.newPaletteName)}>
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
            <Button onClick={handleClose} color="primary">
              Cancel
          </Button>
            <Button variant="contained" color="primary" type="submit">Save Palette</Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}