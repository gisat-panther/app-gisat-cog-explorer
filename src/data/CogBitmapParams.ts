interface BitmapDefinition {
  name: string;
  title: string;
  description: string;
  defaultValue: string | boolean | null;
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
    name: "useHeatMap",
    title: "useHeatMap",
    description: "Generate data as a color heatmap (default true)",
    defaultValue: true,
    type: "bool",
  },
  {
    name: "useColorsBasedOnValues",
    title: "useColorsBasedOnValues",
    description:
      "Assign pixels colors based on defined data values (default false)",
    defaultValue: false,
    type: "bool",
  },
];

export default params;
