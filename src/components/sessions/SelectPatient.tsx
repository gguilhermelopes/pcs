import setSelectStyles from "@/helpers/setSelectStyles";
import { useTheme } from "next-themes";
import { LegacyRef } from "react";
import Select, { GroupBase, SelectInstance, SingleValue } from "react-select";

export interface Option {
  readonly value: string;
  readonly label: string;
}

interface SelectPatientProps {
  onChange: (value: string | null) => void;
  onBlur: () => void;
  ref: LegacyRef<SelectInstance<Option, boolean, GroupBase<Option>>>;
  handlePatientChange: (value: SingleValue<Option>) => void;
  mappedPatients: Option[];
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
};

export default SelectPatient;
