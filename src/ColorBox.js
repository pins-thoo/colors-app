import React, { Component } from "react";
import styles from './styles/ColorBoxStyles';
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import { CopyToClipboard } from "react-copy-to-clipboard";

class ColorBox extends Component {
  state = { copied: false };

  changeCopyState = () => {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  };

  render() {
    const { name, background, moreUrl, showingFullPalette, classes } = this.props;
    const { copied } = this.state;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background }} className={classes.colorBox}>
          <div
            style={{ background }}
            className={`${classes.copyOverlay} ${copied && classes.showOverlay}`}
          />
          <div className={`${classes.copyMessage} ${copied && classes.copyMessageShow}`}>
            <h1>copied!</h1>
            <p className={classes.copyText} >{background}</p>
          </div>
          <div>
            <div className={classes.boxContent}>
              <span className={classes.colorName} >{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>
          {showingFullPalette && (
            <Link
              to={moreUrl}
              onClick={(e) => e.stopPropagation()}
            >
              <span className={classes.seeMore} >MORE</span>
            </Link>
          )}
        </div>
      </CopyToClipboard >
    );
  }
}

export default withStyles(styles)(ColorBox);
