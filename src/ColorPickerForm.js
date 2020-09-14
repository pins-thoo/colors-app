import React, { useState, useReducer, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';

function ColorPickerForm({ paletteIsFull, palettes, addNewColor, colors }) {
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
      <ChromePicker color={currentColor} onChangeComplete={updateColor} />
      <ValidatorForm onSubmit={handleSubmit}>
        <TextValidator
          value={userInput.newColorName}
          name="newColorName"
          onChange={handleChange}
          validators={['required', 'isColorNameUnique', 'isColorUnique']}
          errorMessages={['Enter a color name', 'Color name must be unique', 'Color already used!']}
        />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          disabled={paletteIsFull}
          style={{ backgroundColor: paletteIsFull ? "grey" : currentColor }}
        >
          {paletteIsFull ? "PALETTE FULL" : "Add Color"}
        </Button>
      </ValidatorForm>
    </>
  )
}

export default ColorPickerForm;