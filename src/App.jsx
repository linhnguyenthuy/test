import React from "react";
import { createRoot } from "react-dom/client";
import { Range, getTrackBackground } from "react-range";
import "./App.css";

const STEP = 0.1;
const MIN = 0;
const MAX = 246;

export class App extends React.Component {
  state = {
    values: [0.0],
    currentValue: 0.0,
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          margin: "2em",
          width: "100%",
        }}
      >
        <Range
          values={this.state.values}
          step={STEP}
          min={MIN}
          max={MAX}
          onChange={(values) => {
            this.setState({ values, currentValue: values[0] });
          }}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "60px",
                display: "flex",
                width: "500px",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "2px",
                  width: "100%",
                  borderRadius: "2px",
                  background: getTrackBackground({
                    values: this.state.values,
                    colors: ["#548BF4", "#ccc"],
                    min: MIN,
                    max: MAX,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "20px",
                width: "20px",
                borderRadius: "2px",
                backgroundColor: "#FFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px #AAA",
              }}
            >
              <div
                style={{
                  height: "16px",
                  width: "5px",
                  backgroundColor: isDragged ? "#548BF4" : "#CCC",
                }}
              />
            </div>
          )}
        />
        <output style={{ marginTop: "30px" }} id="output">
          {this.state.currentValue.toFixed(1)}
        </output>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);
