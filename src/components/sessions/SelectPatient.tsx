import { useTheme } from "next-themes";
import { forwardRef } from "react";
import Select, { GroupBase, SelectInstance, SingleValue } from "react-select";
import setSelectStyles from "@/helpers/setSelectStyles";

export interface Option {
  readonly value: string;
  readonly label: string;
}

interface SelectPatientProps {
  onChange: (value: string | null) => void;
  onBlur: () => void;
  handlePatientChange: (value: SingleValue<Option>) => void;
  mappedPatients: Option[];
}

const SelectPatient = forwardRef<
  SelectInstance<Option, boolean, GroupBase<Option>>,
  SelectPatientProps
>(({ onChange, mappedPatients, onBlur, handlePatientChange }, ref) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const selectStyles = setSelectStyles(isDarkMode);

  return (
    <Select
      styles={selectStyles}
      options={mappedPatients}
      placeholder="Selecione um paciente"
      noOptionsMessage={() => "Nenhum paciente encontrado"}
      onChange={(selectedOption) => {
        onChange(selectedOption ? (selectedOption as Option).value : null);
        handlePatientChange(selectedOption as SingleValue<Option>);
      }}
      onBlur={onBlur}
      ref={ref}
    />
  );
});

SelectPatient.displayName = "SelectPatient";

export default SelectPatient;
