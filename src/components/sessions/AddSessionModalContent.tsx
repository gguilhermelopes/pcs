import { Dispatch, SetStateAction, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { SingleValue } from "react-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Patient } from "@/interfaces/patient";
import { AddSessionFormSchema } from "../../../lib/schema";
import { DefaultInput } from "../UI/DefaultInput";
import { Button } from "../UI/Button";
import useCreateSession from "@/hooks/useCreateSession";
import { Loader } from "../UI/Loader";
import CloseButton from "../UI/Button/CloseButton";
import SelectPatient, { PatientOption } from "./SelectPatient";

interface AddSessionModalContentProps {
  patients: Patient[];
  setIsAddSessionModalOpen: Dispatch<SetStateAction<boolean>>;
}

export type AddSessionFormData = z.infer<typeof AddSessionFormSchema>;

const AddSessionModalContent = ({
  patients,
  setIsAddSessionModalOpen,
}: AddSessionModalContentProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddSessionFormData>({
    resolver: zodResolver(AddSessionFormSchema),
  });
  const { mutate, isPending } = useCreateSession(setIsAddSessionModalOpen);
  const [therapist, setTherapist] = useState("Terapeuta");

  const submitFormHandler: SubmitHandler<AddSessionFormData> = (data) => {
    const patient = patients.find((patient) => patient.id === data.patientId);

    if (!patient) return;

    const { therapistId } = patient;
    const finalData = { ...data, therapistId };
    mutate(finalData);
  };

  const handlePatientChange = (event: SingleValue<PatientOption>) => {
    const selectedPatient = event?.value;
    const patient = patients.find((patient) => patient.id === selectedPatient);
    setTherapist(patient?.therapist || "Terapeuta");
  };

  const handleCloseModalClick = () => {
    setIsAddSessionModalOpen(false);
  };

  const mappedPatients = patients.map((patient) => ({
    value: patient.id,
    label: patient.name,
  }));

  return (
    <section className="relative py-6 px-12 flex flex-col bg-neutral-300 dark:bg-neutral-900 rounded-lg">
      <h2 className="text-xl font-semibold text-center mb-4">
        Adicionar nova sessão
      </h2>
      <CloseButton handleCloseModalClick={handleCloseModalClick} />
      <form
        className="grid grid-cols-3 gap-x-12 gap-y-4 mt-4"
        onSubmit={handleSubmit(submitFormHandler)}
      >
        <div>
          <DefaultInput.Root>Paciente</DefaultInput.Root>
          <Controller
            control={control}
            name="patientId"
            render={({ field: { onChange, onBlur, ref } }) => (
              <SelectPatient
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                handlePatientChange={handlePatientChange}
                mappedPatients={mappedPatients}
              />
            )}
          />
          {errors.patientId?.message && (
            <DefaultInput.ErrorMessage message={errors.patientId.message} />
          )}
        </div>

        <DefaultInput.Root title="Selecione o paciente e o terapeuta será selecionado automaticamente.">
          <DefaultInput.Label
            label="Terapeuta"
            id="therapistId-label"
            htmlFor="therapistId"
          >
            Terapeuta
          </DefaultInput.Label>
          <DefaultInput.Content
            disabled
            id="therapistId"
            placeholder="Terapeuta"
            {...register("therapistId")}
            value={therapist}
          />
          {errors.therapistId?.message && (
            <DefaultInput.ErrorMessage message={errors.therapistId.message} />
          )}
        </DefaultInput.Root>

        <DefaultInput.Root>
          <DefaultInput.Label
            label="Data da sessão"
            id="sessionDate-label"
            htmlFor="sessionDate"
          >
            Data da sessão
          </DefaultInput.Label>
          <DefaultInput.Content
            id="sessionDate"
            placeholder="Data da sessão"
            type="datetime-local"
            {...register("sessionDate")}
          />
          {errors.sessionDate?.message && (
            <DefaultInput.ErrorMessage message={errors.sessionDate.message} />
          )}
        </DefaultInput.Root>
        <DefaultInput.Root>
          <DefaultInput.Label
            label="Duração da sessão"
            id="sessionDuration-label"
            htmlFor="sessionDuration"
          >
            Duração da sessão (min)
          </DefaultInput.Label>
          <DefaultInput.Content
            type="number"
            placeholder="Duração da sessão em minutos"
            id="sessionDuration"
            {...register("sessionDuration")}
          />
          {errors.sessionDuration?.message && (
            <DefaultInput.ErrorMessage
              message={errors.sessionDuration.message}
            />
          )}
        </DefaultInput.Root>

        <DefaultInput.Root className="flex items-center gap-4">
          <DefaultInput.Label
            label="Sessão remota?"
            id="isRemote-label"
            htmlFor="isRemote"
          >
            Sessão remota?
          </DefaultInput.Label>
          <DefaultInput.Content
            className="w-initial"
            type="checkbox"
            id="isRemote"
            {...register("isRemote")}
          />
          {errors.isRemote?.message && (
            <DefaultInput.ErrorMessage message={errors.isRemote.message} />
          )}
        </DefaultInput.Root>
        <DefaultInput.Root className="flex items-center gap-4">
          <DefaultInput.Label
            label="Sessão autorizada?"
            id="isAuthorized-label"
            htmlFor="isAuthorized"
          >
            Sessão autorizada?
          </DefaultInput.Label>
          <DefaultInput.Content
            className="w-initial"
            type="checkbox"
            id="isAuthorized"
            {...register("isAuthorized")}
          />
          {errors.isAuthorized?.message && (
            <DefaultInput.ErrorMessage message={errors.isAuthorized.message} />
          )}
        </DefaultInput.Root>

        <DefaultInput.Root>
          <DefaultInput.Label label="Token" id="token-label" htmlFor="token">
            Token de autorização
          </DefaultInput.Label>
          <DefaultInput.Content
            placeholder="Token"
            id="token"
            {...register("token")}
          />
          {errors.token?.message && (
            <DefaultInput.ErrorMessage message={errors.token.message} />
          )}
        </DefaultInput.Root>
        <DefaultInput.Root>
          <DefaultInput.Label
            label="Data da autorização"
            id="authorizationDate-label"
            htmlFor="authorizationDate"
          >
            Data da autorização
          </DefaultInput.Label>
          <DefaultInput.Content
            id="authorizationDate"
            placeholder="Data da autorização"
            type="date"
            {...register("authorizationDate")}
          />
          {errors.authorizationDate?.message && (
            <DefaultInput.ErrorMessage
              message={errors.authorizationDate.message}
            />
          )}
        </DefaultInput.Root>

        <DefaultInput.Root className="flex items-center gap-4">
          <DefaultInput.Label
            label="Paciente compareceu?"
            id="hasPatientAttended-label"
            htmlFor="hasPatientAttended"
          >
            Paciente compareceu?
          </DefaultInput.Label>
          <DefaultInput.Content
            className="w-initial"
            type="checkbox"
            id="hasPatientAttended"
            {...register("hasPatientAttended")}
          />
          {errors.hasPatientAttended?.message && (
            <DefaultInput.ErrorMessage
              message={errors.hasPatientAttended.message}
            />
          )}
        </DefaultInput.Root>
        <DefaultInput.Root>
          <DefaultInput.Label
            label="Valor da sessão"
            id="sessionValue-label"
            htmlFor="sessionValue"
          >
            Valor da sessão (R$)
          </DefaultInput.Label>
          <DefaultInput.Content
            type="number"
            placeholder="Valor da sessão em reais"
            id="sessionValue"
            {...register("sessionValue")}
          />
          {errors.sessionValue?.message && (
            <DefaultInput.ErrorMessage message={errors.sessionValue.message} />
          )}
        </DefaultInput.Root>

        <DefaultInput.Root className="flex items-center gap-4">
          <DefaultInput.Label
            label="Sessão paga?"
            id="isPaid-label"
            htmlFor="isPaid"
          >
            Sessão paga?
          </DefaultInput.Label>

          <DefaultInput.Content
            className="w-initial"
            type="checkbox"
            id="isPaid"
            {...register("isPaid")}
          />
          {errors.isPaid?.message && (
            <DefaultInput.ErrorMessage message={errors.isPaid.message} />
          )}
        </DefaultInput.Root>
        <DefaultInput.Root>
          <DefaultInput.Label
            label="Data do pagamento"
            id="paymentDate-label"
            htmlFor="paymentDate"
          >
            Data do pagamento
          </DefaultInput.Label>
          <DefaultInput.Content
            id="paymentDate"
            placeholder="Data do pagamento"
            type="date"
            {...register("paymentDate")}
          />
          {errors.paymentDate?.message && (
            <DefaultInput.ErrorMessage message={errors.paymentDate.message} />
          )}
        </DefaultInput.Root>

        <DefaultInput.Root className="flex items-center gap-4">
          <DefaultInput.Label
            label="Sessão contabilizada?"
            id="isAccounted-label"
            htmlFor="isAccounted"
          >
            Sessão contabilizada?
          </DefaultInput.Label>

          <DefaultInput.Content
            className="w-initial"
            type="checkbox"
            id="isAccounted"
            {...register("isAccounted")}
          />
          {errors.isAccounted?.message && (
            <DefaultInput.ErrorMessage message={errors.isAccounted.message} />
          )}
        </DefaultInput.Root>
        <DefaultInput.Root>
          <DefaultInput.Label
            label="Data da contabilização"
            id="accountDate-label"
            htmlFor="accountDate"
          >
            Data da contabilização
          </DefaultInput.Label>
          <DefaultInput.Content
            id="accountDate"
            placeholder="Data da contabilização"
            type="date"
            {...register("accountDate")}
          />
          {errors.accountDate?.message && (
            <DefaultInput.ErrorMessage message={errors.accountDate.message} />
          )}
        </DefaultInput.Root>

        <Button.Root
          className="col-span-3 justify-self-center w-[400px] flex flex-col justify-center items-center"
          type="submit"
        >
          {isPending ? <Loader.Root className="w-5 h-5" /> : "Adicionar Sessão"}
        </Button.Root>
      </form>
    </section>
  );
};

export default AddSessionModalContent;
