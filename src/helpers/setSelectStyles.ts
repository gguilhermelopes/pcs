import { Option } from "@/components/sessions/SelectPatient";
import { StylesConfig } from "react-select";

const setSelectStyles = (isDarkMode: boolean): StylesConfig<Option> => {
  const optionBackgroundColor = (
    isSelected: boolean,
    isDarkMode: boolean,
    isFocused: boolean
  ) => {
    if (isSelected || isFocused) return "#8159db";
    return isDarkMode ? "rgb(38 38 38)" : "inherit";
  };

  return {
    control: (styles, { isFocused }) => ({
      ...styles,
      backgroundColor: isDarkMode ? "rgb(38 38 38)" : "rgb(229 229 229)",
      color: isDarkMode ? "rgb(229 229 229)" : "rgb(23 23 23)",
      borderRadius: "8px",
      border: "none",
      outline: isFocused ? "2.5px solid #8159db" : "none",
      boxShadow: "none",
      transition: "none",
      fontSize: ".875rem",
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: optionBackgroundColor(isSelected, isDarkMode, isFocused),
      color: isFocused || isSelected ? "white" : "inherit",
      fontSize: ".875rem",
    }),
    menuList: (styles) => ({
      ...styles,
      backgroundColor: isDarkMode ? "rgb(38 38 38)" : "rgb(229 229 229)",
      borderRadius: "2px",
    }),
    singleValue: (styles) => ({
      ...styles,
      color: isDarkMode ? "rgb(229 229 229)" : "rgb(23 23 23)",
    }),
    input: (styles) => ({
      ...styles,
      color: isDarkMode ? "rgb(229 229 229)" : "rgb(23 23 23)",
    }),
  };
};

export default setSelectStyles;
