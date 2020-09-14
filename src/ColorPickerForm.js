import React, { useState, useReducer, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';

const styles = {
  picker: {
    width: "100% !important",
    marginTop: "2rem",
  },
  addColor: {
    width: "100%",
    padding: "6px 89px 7px",
    fontSize: "2rem",
  },
  colorInput: {
    width: "100%",
    height: "75px",
  }
};

function ColorPickerForm({ paletteIsFull, palettes, addNewColor, colors, classes }) {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      newColorName: '',
      newPaletteName: '',
    }
  );
  const [currentColor, setCurrentColor] = useState("#12a6a6");
  const updateColor = (newColor) => {
    setCurrentColor(newColor.hex);
  };
  const handleSubmit = () => {
    const newColor = {
      color: currentColor,
      name: userInput.newColorName,
    };
    addNewColor(newColor)
    setUserInput(userInput.newColorName = "");
  }
  const handleChange = (event) => {
    const name = event.target.name;
    const newValue = event.target.value;
    setUserInput({ [name]: newValue });
  }

  useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
      colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule('isColorUnique', (value) =>
      colors.every(
        ({ color }) => color !== currentColor
      )
    );
  }, [colors, currentColor]);
  return (
    <>
      <ChromePicker color={currentColor} onChangeComplete={updateColor} className={classes.picker} />
      <ValidatorForm onSubmit={handleSubmit}>
        <TextValidator
          value={userInput.newColorName}
          name="newColorName"
          onChange={handleChange}
          validators={['required', 'isColorNameUnique', 'isColorUnique']}
          errorMessages={['Enter a color name', 'Color name must be unique', 'Color already used!']}
          className={classes.colorInput}
          variant="filled"
          margin="normal"
          placeholder="Color Name"
        />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          disabled={paletteIsFull}
          style={{ backgroundColor: paletteIsFull ? "grey" : currentColor }}
          className={classes.addColor}
        >
          {paletteIsFull ? "PALETTE FULL" : "Add Color"}
        </Button>
      </ValidatorForm>
    </>
  )
}

export default withStyles(styles)(ColorPickerForm);