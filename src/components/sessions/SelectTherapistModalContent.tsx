import { Dispatch, SetStateAction } from "react";
import CloseButton from "../UI/Button/CloseButton";
import setSelectStyles from "@/helpers/setSelectStyles";
import { useTheme } from "next-themes";
import Select from "react-select";
import { Option } from "./SelectPatient";

interface SelectTherapistModalContentProps {
  therapists: Option[];
  setIsTherapistModalOpen: Dispatch<SetStateAction<boolean>>;
  setTherapist: Dispatch<SetStateAction<Option>>;
}

const SelectTherapistModalContent = ({
  therapists,
  setIsTherapistModalOpen,
  setTherapist,
}: SelectTherapistModalContentProps) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const handleCloseModalClick = () => {
    setIsTherapistModalOpen(false);
  };

  const selectStyles = setSelectStyles(isDarkMode);

  return (
    <section className="relative p-10 min-w-[500px] flex flex-col bg-neutral-300 dark:bg-neutral-900 rounded-lg">
      <h1 className="text-xl font-semibold text-center mb-4">
        Selecione o terapeuta
      </h1>
      <CloseButton handleCloseModalClick={handleCloseModalClick} />
      <Select
        options={therapists}
        styles={selectStyles}
        placeholder="Selecione um terapeuta"
        onChange={(selectedOption) => {
          if (selectedOption) {
            setTherapist(selectedOption as Option);
            setIsTherapistModalOpen(false);
          }
        }}
      />
    </section>
  );
};

export default SelectTherapistModalContent;
