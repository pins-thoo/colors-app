import React, { useEffect, useReducer, useState } from 'react';
import clsx from 'clsx';
import PaletteMetaForm from './PaletteMetaForm';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Link } from 'react-router-dom';

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "64px",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  navButtons: {
    marginRight: "1rem"
  },
  button: {
    margin: "0 0.5rem",
  },
  link: {
    textDecoration: "none"
  }
}));

function PaletteFormNav({ open, palettes, handleSubmit, handleDrawerOpen }) {
  const classes = useStyles();
  const [formShowing, setFormShowing] = useState(false);

  const showForm = () => {
    setFormShowing(true);
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Create A Palette
          </Typography>
        </Toolbar>
        <div className={classes.navButtons}>
          <Link to="/" className={classes.link}>
            <Button variant="contained" color="secondary" className={classes.button}>Go Back</Button>
          </Link>
          <Button variant="contained" color="primary" onClick={showForm} className={classes.button}>
            Save
      </Button>
        </div>
      </AppBar>
      {formShowing && (
        <PaletteMetaForm palettes={palettes} handleSubmit={handleSubmit} />
      )}
    </div>
  )
}

export default PaletteFormNav;