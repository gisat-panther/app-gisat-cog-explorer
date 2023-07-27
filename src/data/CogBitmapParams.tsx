type TypeDefinition = {
  inputType: string,
  value: string
}

interface BitmapDefinition {
  name: string;
  title: string;
  description: string | JSX.Element;
  defaultValue: string | boolean | number | null | Array<number>;
  type: string | TypeDefinition;
}

const params: Array<BitmapDefinition> = [
  {
    name: "useAutoRange",
    title: "useAutoRange",
    description: "Set automatic range of color gradient (default false).",
    defaultValue: false,
    type: "bool",
  },
  {
    name: "useDataForOpacity",
    title: "useDataForOpacity",
    description:
      "Visualise data with opacity of each pixel according to its value (default false)",
    defaultValue: false,
    type: "bool",
  },
  {
    name: "alpha",
    title: "alpha",
    description:
      "Visualise data in specific opacity (if useDataOpacity is false) (default 150)",
    defaultValue: 150,
    type: "number",
  },
  {
    name: "useHeatMap",
    title: "useHeatMap",
    description: "Generate data as a color heatmap (default true)",
    defaultValue: true,
    type: "bool",
  },
  {
    name: "useChannel",
    title: "useChannel",
    description: "Specify a single channel to use (default null)",
    defaultValue: null,
    type: "number",
  },
  {
    name: "multiplier",
    title: "multiplier",
    description: "Multiplies each value (default 1.00)",
    defaultValue: 1,
    type: "number",
  },
  {
    name: "clipLow",
    title: "clipLow",
    description: "Generate only data greater than this (default null)",
    defaultValue: null,
    type: "number",
  },
  {
    name: "clipHigh",
    title: "clipHigh",
    description: "Generate only data less than this (default null)",
    defaultValue: null,
    type: "number",
  },
  {
    name: "clippedColor",
    title: "clippedColor",
    description:
      "Set color for clipped values when using clipLow or clipHigh, (default [0, 0, 0, 0])",
    defaultValue: [0, 0, 0, 0],
    type: { inputType: "text", value: "color" },
  },
  {
    name: "colorScale",
    title: "colorScale",
    description: (
      <>
        Array of colors, supports <a href={"https://vis4.net/labs/multihue/"} className={"text-white underline"} target="blank">chroma.js</a> color definition such as 'red',
        [255,0,0], '#FF0000', etc. and <a href={"https://r-graph-gallery.com/38-rcolorbrewers-palettes.html"} className={"text-white underline"} target="blank">Color Brewer</a> pallete names in this
        format: chroma.brewer.Greens
      </>
    ),
    defaultValue: null,
    type: { inputType: "text", value: "colorScale" },
  },
  {
    name: "colorScaleValueRange",
    title: "colorScaleValueRange",
    description:
      "Set min and max range values or set any array of values to set exact colors to values, if useAutoRange is false, (default [0,255])",
    defaultValue: [0, 255],
    type: { inputType: "text", value: "commaSeparatedNumbers" },
  },
  {
    name: "useColorsBasedOnValues",
    title: "useColorsBasedOnValues",
    description:
      "Assign pixels colors based on defined data values (default false)",
    defaultValue: false,
    type: "bool",
  },
  {
    name: "colorsBasedOnValues",
    title: "colorsBasedOnValues",
    description:
      "Array of value-color pairs, used if useColorsBasedOnValues is true, supports chroma.js color definition such as 'red', [255,0,0], '#FF0000', etc.",
    defaultValue: null,
    type: "array",
  },
  {
    name: "unidentifiedColor",
    title: "unidentifiedColor",
    description:
      "Set color for not identified values if useColorsBasedOnValues is true, (default [0, 0, 0, 0])",
    defaultValue: [0, 0, 0, 0],
    type: "color",
  },
  {
    name: "nullColor",
    title: "nullColor",
    description: "Set color for noData values (default [0, 0, 0, 0])",
    defaultValue: [0, 0, 0, 0],
    type: "color",
  },
  {
    name: "useSingleColor",
    title: "useSingleColor",
    description: "Display data values only with single color (default false)",
    defaultValue: false,
    type: "bool",
  },
  {
    name: "color",
    title: "color",
    description:
      "Set color when if useSingleColor is true, (default [255, 0, 255, 255])",
    defaultValue: [0, 0, 0, 0],
    type: "color",
  },
];

export default params;
