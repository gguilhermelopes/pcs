import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { SingleValue } from "react-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Patient } from "@/interfaces/patient";
import useSingleSession from "@/hooks/useSingleSession";
import useCreateSession from "@/hooks/useCreateSession";
import formatDateTimeForInput from "@/helpers/formatDateTimeForInput";
import { SessionFormSchema } from "../../../lib/schema";
import { DefaultInput } from "../UI/DefaultInput";
import { Button } from "../UI/Button";
import { Loader } from "../UI/Loader";
import CloseButton from "../UI/Button/CloseButton";
import SelectPatient, { Option } from "./SelectPatient";
import { Checkbox } from "../UI/Checkbox";
import useEditSession from "@/hooks/useEditSession";

interface SessionModalContentProps {
  patients: Patient[];
  setIsAddSessionModalOpen: Dispatch<SetStateAction<boolean>>;
  isEdit?: boolean;
  sessionId?: string;
}

export type SessionFormData = z.infer<typeof SessionFormSchema>;

const SessionModalContent = ({
  patients,
  setIsAddSessionModalOpen,
  isEdit,
  sessionId,
}: SessionModalContentProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SessionFormData>({
    resolver: zodResolver(SessionFormSchema),
  });

  console.log(patients);

  const { mutate: createSession, isPending: isCreateSessionPending } =
    useCreateSession(setIsAddSessionModalOpen);
  const { mutate: editSession, isPending: isEditSessionPending } =
    useEditSession(sessionId || "", setIsAddSessionModalOpen);
  const { data: session, isLoading: isSessionPending } = useSingleSession(
    sessionId || "",
    isEdit || false
  );
  const [selectedTherapist, setSelectedTherapist] = useState("Terapeuta");

  useEffect(() => {
    if (isEdit && session) {
      setSelectedTherapist(session.therapist);
    }
  }, [isEdit, session]);

  const submitFormHandler: SubmitHandler<SessionFormData> = (data) => {
    const patient = patients.find((patient) => patient.id === data.patientId);
    if (!patient) return;

    const { therapistId } = patient;
    const finalData = { ...data, therapistId };
    isEdit ? editSession(finalData) : createSession(finalData);
  };

  const handlePatientChange = (event: SingleValue<Option>) => {
    const selectedPatient = event?.value;
    const patient = patients.find((patient) => patient.id === selectedPatient);
    setSelectedTherapist(patient?.therapist || "Terapeuta");
  };

  const handleCloseModalClick = () => {
    setIsAddSessionModalOpen(false);
  };

  const mappedPatients = patients.map((patient) => ({
    value: patient.id,
    label: patient.name,
  }));

  if (isSessionPending) return <Loader.Root className="w-5 h-5" />;
  const isPending = isCreateSessionPending || isEditSessionPending;

  return (
    <section className="relative py-6 px-12 flex flex-col bg-neutral-300 dark:bg-neutral-900 rounded-lg">
      <h1 className="text-xl font-semibold text-center mb-4">
        {isEdit ? "Editar sessão" : "Adicionar nova sessão"}
      </h1>
      <CloseButton handleCloseModalClick={handleCloseModalClick} />
      <form
        className="grid grid-cols-3 gap-x-12 gap-y-4 mt-4"
        onSubmit={handleSubmit(submitFormHandler)}
      >
        <DefaultInput.Root>
          <DefaultInput.Label
            label="Paciente"
            id="patientId-label"
            htmlFor="patientId"
          />
          <Controller
            control={control}
            name="patientId"
            defaultValue={isEdit && session ? session.patientId : ""}
            render={({ field: { onChange, onBlur, ref } }) => (
              <SelectPatient
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                handlePatientChange={handlePatientChange}
                mappedPatients={mappedPatients}
                selectedPatient={
                  isEdit && session
                    ? { value: session.patientId, label: session.patient }
                    : null
                }
              />
            )}
          />
          {errors.patientId?.message && (
            <DefaultInput.ErrorMessage message={errors.patientId.message} />
          )}
        </DefaultInput.Root>

        <DefaultInput.Root title="Selecione o paciente e o terapeuta será selecionado automaticamente.">
          <DefaultInput.Label
            label="Terapeuta"
            id="therapistId-label"
            htmlFor="therapistId"
          />
          <DefaultInput.Content
            disabled
            id="therapistId"
            placeholder="Terapeuta"
            {...register("therapistId")}
            value={selectedTherapist}
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
          />
          <DefaultInput.Content
            id="sessionDate"
            placeholder="Data da sessão"
            type="datetime-local"
            defaultValue={
              isEdit && session
                ? formatDateTimeForInput(session.sessionDate)
                : ""
            }
            {...register("sessionDate")}
          />
          {errors.sessionDate?.message && (
            <DefaultInput.ErrorMessage message={errors.sessionDate.message} />
          )}
        </DefaultInput.Root>
        <DefaultInput.Root>
          <DefaultInput.Label
            label="Duração da sessão (minutos)"
            id="sessionDuration-label"
            htmlFor="sessionDuration"
          />
          <DefaultInput.Content
            type="number"
            placeholder="Duração da sessão em minutos"
            id="sessionDuration"
            defaultValue={isEdit && session ? session.sessionDuration : ""}
            {...register("sessionDuration")}
          />
          {errors.sessionDuration?.message && (
            <DefaultInput.ErrorMessage
              message={errors.sessionDuration.message}
            />
          )}
        </DefaultInput.Root>

        <Checkbox.Root className="flex items-center gap-4">
          <Checkbox.Input
            type="checkbox"
            id="isRemote"
            defaultChecked={isEdit && session ? session.isRemote : false}
            {...register("isRemote")}
          />
          <Checkbox.Label
            label="Sessão remota?"
            id="isRemote-label"
            htmlFor="isRemote"
          />
          {errors.isRemote?.message && (
            <DefaultInput.ErrorMessage message={errors.isRemote.message} />
          )}
        </Checkbox.Root>
        <Checkbox.Root className="flex items-center gap-4">
          <Checkbox.Input
            type="checkbox"
            id="isAuthorized"
            defaultChecked={isEdit && session ? session.isAuthorized : false}
            {...register("isAuthorized")}
          />
          <Checkbox.Label
            label="Sessão autorizada?"
            id="isAuthorized-label"
            htmlFor="isAuthorized"
          />
          {errors.isAuthorized?.message && (
            <DefaultInput.ErrorMessage message={errors.isAuthorized.message} />
          )}
        </Checkbox.Root>

        <DefaultInput.Root>
          <DefaultInput.Label label="Token" id="token-label" htmlFor="token">
            Token de autorização
          </DefaultInput.Label>
          <DefaultInput.Content
            defaultValue={isEdit && session ? session.token : ""}
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
          />
          <DefaultInput.Content
            id="authorizationDate"
            placeholder="Data da autorização"
            type="date"
            defaultValue={
              isEdit && session?.authorizationDate
                ? session.authorizationDate.split("T")[0]
                : ""
            }
            {...register("authorizationDate")}
          />
          {errors.authorizationDate?.message && (
            <DefaultInput.ErrorMessage
              message={errors.authorizationDate.message}
            />
          )}
        </DefaultInput.Root>

        <Checkbox.Root className="flex items-center gap-4">
          <Checkbox.Input
            type="checkbox"
            id="hasPatientAttended"
            defaultChecked={
              isEdit && session ? session.hasPatientAttended : false
            }
            {...register("hasPatientAttended")}
          />
          <Checkbox.Label
            label="Paciente compareceu?"
            id="hasPatientAttended-label"
            htmlFor="hasPatientAttended"
          />
          {errors.hasPatientAttended?.message && (
            <DefaultInput.ErrorMessage
              message={errors.hasPatientAttended.message}
            />
          )}
        </Checkbox.Root>
        <DefaultInput.Root>
          <DefaultInput.Label
            label="Valor da sessão"
            id="sessionValue-label"
            htmlFor="sessionValue"
          />
          <DefaultInput.Content
            type="number"
            placeholder="Valor da sessão em reais"
            id="sessionValue"
            defaultValue={isEdit && session ? session.sessionValue : ""}
            {...register("sessionValue")}
          />
          {errors.sessionValue?.message && (
            <DefaultInput.ErrorMessage message={errors.sessionValue.message} />
          )}
        </DefaultInput.Root>

        <Checkbox.Root className="flex items-center gap-4">
          <Checkbox.Input
            type="checkbox"
            id="isPaid"
            defaultChecked={isEdit && session ? session.isPaid : false}
            {...register("isPaid")}
          />
          <Checkbox.Label
            label="Sessão paga?"
            id="isPaid-label"
            htmlFor="isPaid"
          />
          {errors.isPaid?.message && (
            <DefaultInput.ErrorMessage message={errors.isPaid.message} />
          )}
        </Checkbox.Root>
        <DefaultInput.Root>
          <DefaultInput.Label
            label="Data do pagamento"
            id="paymentDate-label"
            htmlFor="paymentDate"
          />
          <DefaultInput.Content
            id="paymentDate"
            placeholder="Data do pagamento"
            type="date"
            defaultValue={
              isEdit && session?.paymentDate
                ? session.paymentDate.split("T")[0]
                : ""
            }
            {...register("paymentDate")}
          />
          {errors.paymentDate?.message && (
            <DefaultInput.ErrorMessage message={errors.paymentDate.message} />
          )}
        </DefaultInput.Root>

        <Checkbox.Root className="flex items-center gap-4">
          <Checkbox.Input
            type="checkbox"
            id="isAccounted"
            defaultChecked={isEdit && session ? session.isAccounted : false}
            {...register("isAccounted")}
          />
          <Checkbox.Label
            label="Sessão contabilizada?"
            id="isAccounted-label"
            htmlFor="isAccounted"
          />
          {errors.isAccounted?.message && (
            <DefaultInput.ErrorMessage message={errors.isAccounted.message} />
          )}
        </Checkbox.Root>
        <DefaultInput.Root>
          <DefaultInput.Label
            label="Data da contabilização"
            id="accountDate-label"
            htmlFor="accountDate"
          />
          <DefaultInput.Content
            id="accountDate"
            placeholder="Data da contabilização"
            type="date"
            defaultValue={
              isEdit && session?.accountDate
                ? session.accountDate.split("T")[0]
                : ""
            }
            {...register("accountDate")}
          />
          {errors.accountDate?.message && (
            <DefaultInput.ErrorMessage message={errors.accountDate.message} />
          )}
        </DefaultInput.Root>

        <Button.Root
          className="col-span-3 justify-self-center w-[600px] flex flex-col justify-center items-center"
          type="submit"
        >
          {isPending ? (
            <Loader.Root className="w-5 h-5" />
          ) : (
            `${isEdit ? "Editar" : "Adicionar"} Sessão`
          )}
        </Button.Root>
      </form>
    </section>
  );
};

export default SessionModalContent;
