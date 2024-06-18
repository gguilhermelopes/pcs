import { useTheme } from "next-themes";
import { LegacyRef } from "react";
import Select, {
  GroupBase,
  SelectInstance,
  SingleValue,
  StylesConfig,
} from "react-select";

export interface PatientOption {
  readonly value: string;
  readonly label: string;
}

interface SelectPatientProps {
  onChange: (value: string | null) => void;
  onBlur: () => void;
  ref: LegacyRef<
    SelectInstance<PatientOption, boolean, GroupBase<PatientOption>>
  >;
  handlePatientChange: (value: SingleValue<PatientOption>) => void;
  mappedPatients: PatientOption[];
}

const SelectPatient = ({
  onChange,
  onBlur,
  ref,
  handlePatientChange,
  mappedPatients,
}: SelectPatientProps) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const optionBackgroundColor = (
    isSelected: boolean,
    isDarkMode: boolean,
    isFocused: boolean
  ) => {
    if (isSelected || isFocused) return "#8159db";
    return isDarkMode ? "rgb(38 38 38)" : "inherit";
  };

  const selectStyles: StylesConfig<PatientOption> = {
    control: (styles, { isFocused }) => ({
      ...styles,
      backgroundColor: isDarkMode ? "rgb(38 38 38)" : "rgb(229 229 229)",
      color: isDarkMode ? "rgb(229 229 229)" : "rgb(23 23 23 )",
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
      color: isDarkMode ? "rgb(229 229 229)" : "rgb(23 23 23 )",
    }),
    input: (styles) => ({
      ...styles,
      color: isDarkMode ? "rgb(229 229 229)" : "rgb(23 23 23 )",
    }),
  };

  return (
    <Select
      styles={selectStyles}
      options={mappedPatients}
      placeholder="Selecione um paciente"
      noOptionsMessage={() => "Nenhum paciente encontrado"}
      onChange={(selectedOption) => {
        onChange(
          selectedOption ? (selectedOption as PatientOption).value : null
        );
        handlePatientChange(selectedOption as SingleValue<PatientOption>);
      }}
      onBlur={onBlur}
      ref={ref}
    />
  );
};

export default SelectPatient;
