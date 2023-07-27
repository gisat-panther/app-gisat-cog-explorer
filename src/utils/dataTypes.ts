import chroma, { Color } from "chroma-js";

export const transformToColor = (
  val?: Array<Number | string> | string | Color
) => {
  if (typeof val === "string") {
    const strVal = val;
    const splited = strVal.replace("[", "").replace("]", "").split(",");
    if (Array.isArray(splited) && splited.length >= 3) {
      const numericColor = splited.map((str) => Number(str));
      const isValid = numericColor.every(Number.isFinite);

      if (isValid) {
        const numericArray: Array<Number> = [...numericColor];
        return numericArray;
      } else {
        return null;
      }
    } else {
      return strVal;
    }
  } else {
    return val;
  }
};

export const isValidColorScale = (
  val: Color | string | Array<string | Color>,
  transform: Boolean = true
) => {
  try {
    const scale = transform ? transformToColorScale(val) : val;
    if (scale) {
      if (Array.isArray(scale)) {
        chroma.scale(scale).colors(1);
        return true;
      } else {
        chroma.scale(scale).colors(1);
        return true;
      }
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const isValidColor = (val?: Array<Number | string> | string) => {
  const valid = transformToColor(val);

  return valid && chroma.valid(valid);
};

const removeBracket = (string: string) => {
  if (string?.startsWith("[")) {
    string = string.substring(1);
  }

  if (string?.endsWith("]")) {
    string = string.substring(0, string.length - 1);
  }

  return string;
};

export const isValidCommaSeparatedNumbers = (
  val?: Array<Number | string> | string
) => {
  if (val === null || val === "") {
    return true;
  } else {
    const withoutBracket = removeBracket(val ? val?.toString() : "");
    const splited = withoutBracket
      .split(",")
      .map((i) => (i !== "" ? Number(i) : null));
    return splited && splited.length > 0
      ? splited.every((i) => Number.isFinite(i))
      : true;
  }
};

export const transformToCommaSeparatedNumbers = (
  val?: Array<Number | string> | string
) => {
  if (
    typeof val === "string" &&
    val !== "" &&
    isValidCommaSeparatedNumbers(val)
  ) {
    const withoutBracket = removeBracket(val ? val?.toString() : "");
    const splited = withoutBracket
      .split(",")
      .map((i) => (i !== "" ? Number(i) : null));
    return splited;
  } else {
    return null;
  }
};

/**
 * Single color definition is not valid color scale
 * @param scaleString  " [red, [0,0,0]]" || ['#ffffe0', '#8b0000'] || #ffffe0, #8b0000 || [red, [0,0,0]] || "Blues" || "red,blue" || "black" || 255,0,0
 * @returns
 */
export const transformToColorScale = (
  scaleString?: Array<string | Color> | Number | string | Color
) => {
  let withoutSpacesAndQuotation = scaleString
    ?.toString()
    .replaceAll(" ", "")
    .replaceAll('"', "")
    .replaceAll("'", "");

  withoutSpacesAndQuotation = withoutSpacesAndQuotation
    ? removeBracket(withoutSpacesAndQuotation)
    : "";
  const breakpoint = /\,\[|\]\,/;

  //handle array of arrays
  const asArray = withoutSpacesAndQuotation
    ?.split(breakpoint)
    .reduce((acc: Array<string>, val) => {
      const withoutSpacesAndQuotation = removeBracket(val);

      if (isValidColor(withoutSpacesAndQuotation)) {
        return [...acc, withoutSpacesAndQuotation];
      } else {
        return [...acc, ...withoutSpacesAndQuotation.split(",")];
      }
    }, []);
  if (asArray && asArray.length === 1 && !asArray[0].toString().includes(",")) {
    // Blues || red || #FF0000
    if (isValidColorScale(asArray[0], false)) {
      // Blues
      // named scale
      return asArray[0];
    } else {
      //red || #FF0000
      // single color is invalid
      return null;
    }
  } else {
    // ['#ffffe0', '#8b0000',[0,0,0],red]

    if (
      asArray &&
      asArray.length === 1 &&
      isValidColor(asArray[0]) &&
      transformToColor(asArray[0])
    ) {
      // 255,9,7
      // single color is invalid
      return null;
    } else {
      // '#ffffe0', '#8b0000' || red,blue || red,'#ffffe0',[255,255,0]
      const arrayOfColorsXX = asArray.map(transformToColor);

      const arrayOfColors: Array<Color | string> = arrayOfColorsXX.filter(
        (value) => value
      ) as any;

      if (arrayOfColors && isValidColorScale(arrayOfColors, false)) {
        return arrayOfColors;
      } else {
        return null;
      }
    }
  }
};
