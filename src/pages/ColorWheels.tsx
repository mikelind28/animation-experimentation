import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import Slider from "@mui/material/Slider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { motion, useTime, useTransform } from "motion/react";
import { useState } from "react";
import { IoCheckmark, IoChevronDown, IoClose } from "react-icons/io5";

declare module "@mui/material/styles" {
  interface Palette {
    red: Palette["primary"];
    orange?: PaletteOptions["primary"];
    yellow?: PaletteOptions["primary"];
    green?: PaletteOptions["primary"];
    blue?: PaletteOptions["primary"];
    violet?: PaletteOptions["primary"];
    gray?: PaletteOptions["primary"];
  }

  interface PaletteOptions {
    red?: PaletteOptions["primary"];
    orange?: PaletteOptions["primary"];
    yellow?: PaletteOptions["primary"];
    green?: PaletteOptions["primary"];
    blue?: PaletteOptions["primary"];
    violet?: PaletteOptions["primary"];
    gray?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Slider" {
  interface SliderPropsColorOverrides {
    red: true;
    orange: true;
    yellow: true;
    green: true;
    blue: true;
    violet: true;
    gray: true;
  }
}

const theme = createTheme({
  palette: {
    red: {
      main: "rgb(255,0,0)",
    },
    orange: {
      main: "rgb(255,128,0)",
    },
    yellow: {
      main: "rgb(255,255,0)",
    },
    green: {
      main: "rgb(0,255,0)",
    },
    blue: {
      main: "rgb(0,0,255)",
    },
    violet: {
      main: "rgb(128,0,255)",
    },
    gray: {
      main: "rgb(200,200,200)",
    },
  },
});

type ColorType = "red" | "orange" | "yellow" | "green" | "blue" | "violet";
type BlendModeTypes =
  | "normal"
  | "multiply"
  | "screen"
  | "overlay"
  | "darken"
  | "lighten"
  | "color-dodge"
  | "color-burn"
  | "hard-light"
  | "soft-light"
  | "difference"
  | "exclusion"
  | "hue"
  | "saturation"
  | "color"
  | "luminosity"
  | "plus-darker"
  | "plus-lighter";

function colorNameToRGB(color: ColorType) {
  switch (color) {
    case "red":
      return "rgb(255,0,0)";
    case "orange":
      return "rgb(255,128,0)";
    case "yellow":
      return "rgb(255,255,0)";
    case "green":
      return "rgb(0,255,0)";
    case "blue":
      return "rgb(0,0,255)";
    case "violet":
      return "rgb(128,0,255)";
    default:
      break;
  }
}

type ToggleType = {
  on: boolean;
  setOn: React.Dispatch<React.SetStateAction<boolean>>;
  color: ColorType;
};

function Toggle({ on, setOn, color }: ToggleType) {
  return (
    <button
      onClick={() => setOn(!on)}
      className={`relative flex h-10 w-14 items-center rounded-full border-2 border-black p-1 ${on ? "bg-neutral-100" : "bg-neutral-400"} transition-colors duration-200`}
      style={{ justifyContent: on ? "flex-end" : "flex-start" }}
    >
      <motion.div
        layout
        className={`z-1 flex h-full w-7 items-center justify-center rounded-full border-2 brightness-105 ${on ? "border-black" : "border-gray-700"} ${color === "blue" || color === "violet" ? "text-white" : "text-black"}`}
        style={{
          backgroundColor: colorNameToRGB(color),
          filter: on ? "saturate(1.33)" : "saturate(0.66)",
        }}
        transition={{
          duration: 0.2,
        }}
      >
        {on ? <IoCheckmark /> : <IoClose />}
      </motion.div>
    </button>
  );
}

type MySliderType = {
  colorName: ColorType;
  settings: {
    on: boolean;
    speed: number;
  };
  setSettings: React.Dispatch<
    React.SetStateAction<{
      on: boolean;
      speed: number;
    }>
  >;
};

function MySlider({ colorName, settings, setSettings }: MySliderType) {
  return (
    <div className="relative flex w-full items-center justify-between gap-4">
      <div>
        <Toggle
          on={settings.on}
          setOn={() =>
            setSettings((prev) => {
              return {
                ...prev,
                on: !settings.on,
              };
            })
          }
          color={colorName}
        />
      </div>

      <Slider
        id="speed-slider"
        aria-label={`${colorName} wheel speed`}
        defaultValue={settings.speed}
        getAriaValueText={() => `${settings.speed}`}
        valueLabelDisplay="auto"
        valueLabelFormat={() => `${settings.speed}`}
        color={settings.on ? `${colorName}` : "gray"}
        disabled={!settings.on}
        slotProps={{
          mark: {
            style: {
              backgroundColor: !settings.on
                ? "black"
                : colorName === "blue" || colorName === "violet"
                  ? "white"
                  : "black",
            },
          },
          rail: {
            style: {
              outline: "2px solid black",
              opacity: settings.on ? 1 : 0.5,
            },
          },
          track: {
            style: {
              backgroundColor: "rgba(0,0,0,0)",
              border: "rgba(0,0,0,0)",
            },
          },
          thumb: {
            style: {
              outline: settings.on
                ? "2px solid black"
                : "2px solid rgb(100,100,100)",
            },
          },
        }}
        shiftStep={1}
        step={1}
        marks
        min={-6}
        max={6}
        value={settings.speed}
        onChange={(_e, value) =>
          setSettings({ on: true, speed: value as number })
        }
      />
    </div>
  );
}

type ColorWheelType = {
  color: ColorType;
  speed: number;
  blendMode: BlendModeTypes;
};

function ColorWheel({ color, speed, blendMode }: ColorWheelType) {
  const time = useTime();
  const rotate = useTransform(time, [0, 6000], [0, 360 * speed], {
    clamp: false,
  });

  return (
    <motion.img
      src={`/color-wheel/${color}.svg`}
      className="absolute top-0 left-0 w-full"
      style={{
        rotate,
        mixBlendMode: blendMode,
      }}
    />
  );
}

export default function ColorWheels() {
  const [red, setRed] = useState({ on: true, speed: 0 });
  const [orange, setOrange] = useState({ on: false, speed: 0 });
  const [yellow, setYellow] = useState({ on: false, speed: 0 });
  const [green, setGreen] = useState({ on: true, speed: 1 });
  const [blue, setBlue] = useState({ on: true, speed: -1 });
  const [violet, setViolet] = useState({ on: false, speed: 0 });

  const [blendMode, setBlendMode] = useState<BlendModeTypes>("screen");

  return (
    <main className="flex h-full w-full flex-col items-center gap-4 p-4 xl:flex-row xl:justify-evenly">
      <div className="xs:size-95 relative size-65 shrink-0 sm:size-110 md:size-135 lg:size-160">
        {red.on && (
          <ColorWheel color="red" speed={red.speed} blendMode={blendMode} />
        )}
        {orange.on && (
          <ColorWheel
            color="orange"
            speed={orange.speed}
            blendMode={blendMode}
          />
        )}
        {yellow.on && (
          <ColorWheel
            color="yellow"
            speed={yellow.speed}
            blendMode={blendMode}
          />
        )}
        {green.on && (
          <ColorWheel color="green" speed={green.speed} blendMode={blendMode} />
        )}
        {blue.on && (
          <ColorWheel color="blue" speed={blue.speed} blendMode={blendMode} />
        )}
        {violet.on && (
          <ColorWheel
            color="violet"
            speed={violet.speed}
            blendMode={blendMode}
          />
        )}
      </div>

      <Accordion
        defaultExpanded
        className="w-full max-w-2xl rounded-lg border shadow-md/20"
      >
        <AccordionSummary
          expandIcon={<IoChevronDown />}
          aria-controls="color-wheels-options"
          id="color-wheels-options"
          className="my-0"
        >
          <span className="text-lg font-bold">Options</span>
        </AccordionSummary>

        <AccordionDetails>
          <div className="sm:px-4 sm:pb-6">
            <div className="mb-6 flex flex-col gap-2">
              <label htmlFor="blend-mode" className="font-semibold text-nowrap">
                Blend Mode:
              </label>
              <select
                id="blend-mode"
                defaultValue={blendMode}
                onChange={(e) => setBlendMode(e.target.value as BlendModeTypes)}
                className="w-full rounded-md border-2 border-black px-2 py-1"
              >
                <option value="normal">Normal</option>
                <option value="multiply">Multiply</option>
                <option value="screen">Screen</option>
                <option value="overlay">Overlay</option>
                <option value="darken">Darken</option>
                <option value="lighten">Lighten</option>
                <option value="color-dodge">Color Dodge</option>
                <option value="color-burn">Color Burn</option>
                <option value="hard-light">Hard Light</option>
                <option value="soft-light">Soft Light</option>
                <option value="difference">Difference</option>
                <option value="exclusion">Exclusion</option>
                <option value="hue">Hue</option>
                <option value="saturation">Saturation</option>
                <option value="color">Color</option>
                <option value="luminosity">Luminosity</option>
                <option value="plus-darker">Plus Darker</option>
                <option value="plus-lighter">Plus Lighter</option>
              </select>
            </div>

            <ThemeProvider theme={theme}>
              <div className="flex flex-col gap-2">
                <MySlider colorName="red" settings={red} setSettings={setRed} />
                <MySlider
                  colorName="orange"
                  settings={orange}
                  setSettings={setOrange}
                />
                <MySlider
                  colorName="yellow"
                  settings={yellow}
                  setSettings={setYellow}
                />
                <MySlider
                  colorName="green"
                  settings={green}
                  setSettings={setGreen}
                />
                <MySlider
                  colorName="blue"
                  settings={blue}
                  setSettings={setBlue}
                />
                <MySlider
                  colorName="violet"
                  settings={violet}
                  setSettings={setViolet}
                />
              </div>
            </ThemeProvider>
          </div>
        </AccordionDetails>
      </Accordion>
    </main>
  );
}
