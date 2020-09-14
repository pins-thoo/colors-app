import React, { useState, useReducer } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import PaletteFormNav from './PaletteFormNav';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import { arrayMove } from 'react-sortable-hoc';
import DraggableColorList from './DraggableColorList';
import { useHistory } from 'react-router-dom';
import ColorPickerForm from './ColorPickerForm';

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    display: "flex",
    alignItems: "center",
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  container: {
    width: "90%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    width: "100%",
  },
  button: {
    width: "50%",
  }
}));

const NewPaletteForm = ({ savePalette, palettes, maxColors = 20 }) => {
  const history = useHistory();
  const classes = useStyles();
  // const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [colors, setColors] = useState(palettes[0].colors);
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      newColorName: '',
      newPaletteName: '',
    }
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewColor = (newColor) => {
    // const newColor = {
    //   color: currentColor,
    //   name: userInput.newColorName,
    // };
    setColors([...colors, newColor]);
    setUserInput(userInput.newColorName = "");
  };

  const handleSubmit = (newPalette) => {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-")
    newPalette.colors = colors;
    savePalette(newPalette);
    history.push('/');
  };

  const removeColor = (colorName) => {
    const filteredColors = colors.filter(color => color.name !== colorName)
    setColors(filteredColors);
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newSortedColor = arrayMove(colors, oldIndex, newIndex);
    setColors(newSortedColor);
  };

  const clearColors = () => {
    setColors([]);
  }

  const randomColor = () => {
    const allColors = palettes.map(p => p.colors).flat();
    var rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    setColors([...colors, randomColor]);
  }

  const paletteIsFull = colors.length >= maxColors

  return (
    <div className={classes.root}>
      <PaletteFormNav
        open={open}
        palettes={palettes}
        handleSubmit={handleSubmit}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
          <Typography variant="h4" gutterBottom>
            Design Your Palette
        </Typography>
          <div className={classes.buttons}>
            <Button variant="contained" color="secondary" onClick={clearColors} className={classes.button}>Clear Palette</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={randomColor}
              disabled={paletteIsFull}
              className={classes.button}
            >
              Random Color
          </Button>
          </div>
          <ColorPickerForm paletteIsFull={paletteIsFull} palettes={palettes} addNewColor={addNewColor} colors={colors} />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList colors={colors} removeColor={removeColor} axis="xy" onSortEnd={onSortEnd} />
      </main>
    </div>
  );
}

export default NewPaletteForm;