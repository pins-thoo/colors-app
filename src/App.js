import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NewPaletteForm from "./NewPaletteForm";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import seedColors from "./seedColors";
import SingleColorPalette from "./SingleColorPalette";
import { generatePalette } from "./colorHelpers";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
    this.state = { palettes: savedPalettes || seedColors };
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }
  findPalette(id) {
    return this.state.palettes.find(function (palette) {
      return palette.id === id;
    });
  }
  deletePalette(id) {
    this.setState(
      st => ({ palettes: st.palettes.filter(palette => palette.id !== id) }),
      this.syncLocalStorage
    )
  }
  savePalette(newPalette) {
    this.setState({ palettes: [...this.state.palettes, newPalette] }, this.syncLocalStorage);
  }
  syncLocalStorage() {
    // save palettes to local storage
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes))
  }
  render() {
    return (
      <Route render={({ location }) => (
        <TransitionGroup>
          <CSSTransition classNames="fade" timeout={500} key={location.key}>
            <Switch location={location}>
              <Route
                exact
                path="/palette/new"
                render={(routeProps) => (
                  <div className="page">
                    <NewPaletteForm savePalette={this.savePalette} {...routeProps} palettes={this.state.palettes} />
                  </div>

                )}
              />
              <Route
                exact
                path="/"
                render={(routeProps) => (
                  <div className="page">
                    <PaletteList palettes={this.state.palettes} deletePalette={this.deletePalette} {...routeProps} />
                  </div>
                )}
              />
              <Route
                exact
                path="/palette/:id"
                render={(routeProps) => (
                  <div className="page">
                    <Palette
                      palette={generatePalette(
                        this.findPalette(routeProps.match.params.id)
                      )}
                    />
                  </div>
                )}
              />
              <Route
                exact
                path="/palette/:paletteId/:colorId"
                render={(routeProps) => (
                  <div className="page">
                    <SingleColorPalette
                      colorId={routeProps.match.params.colorId}
                      palette={generatePalette(
                        this.findPalette(routeProps.match.params.paletteId)
                      )}
                    />
                  </div>
                )}
              />
              <Route
                render={(routeProps) => (
                  <div className="page">
                    <PaletteList palettes={this.state.palettes} deletePalette={this.deletePalette} {...routeProps} />
                  </div>
                )}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
      />
    );
  }
}

export default App;
