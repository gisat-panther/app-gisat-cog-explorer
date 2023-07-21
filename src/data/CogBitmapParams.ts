interface BitmapDefinition {
  name: string;
  title: string;
  description: string;
  defaultValue: string | boolean | number | null;
  type: string;
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
  // FIXME - clippedColor
  // FIXME - colorScale
  // FIXME - colorScaleValueRange
  {
    name: "useColorsBasedOnValues",
    title: "useColorsBasedOnValues",
    description:
      "Assign pixels colors based on defined data values (default false)",
    defaultValue: false,
    type: "bool",
  },
  // FIXME - colorsBasedOnValues
  // FIXME - unidentifiedColor
  // FIXME - nullColor
  // FIXME - useSingleColor
  // FIXME - color
];

export default params;
