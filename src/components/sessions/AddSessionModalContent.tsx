import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Patient } from "@/interfaces/patient";
import { AddSessionFormSchema } from "../../../lib/schema";
import { DefaultInput } from "../UI/DefaultInput";
import { Button } from "../UI/Button";
import useCreateSession from "@/hooks/useCreateSession";
import { useRouter } from "next/navigation";

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
    formState: { errors },
  } = useForm<AddSessionFormData>({
    resolver: zodResolver(AddSessionFormSchema),
  });
  const { mutate, isSuccess } = useCreateSession();
  const router = useRouter();
  const [therapist, setTherapist] = useState("Terapeuta");

  useEffect(() => {
    if (isSuccess) {
      setIsAddSessionModalOpen(false);
      router.refresh();
    }
  }, [isSuccess]);

  const submitFormHandler: SubmitHandler<AddSessionFormData> = (data) => {
    const patient = patients.find((patient) => patient.id === data.patientId);

    if (!patient) return;

    const { therapistId } = patient;
    const finalData = { ...data, therapistId };
    mutate(finalData);
  };

  const handlePatientChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedPatient = event.target.value;
    const patient = patients.find((patient) => patient.id === selectedPatient);
    setTherapist(patient?.therapist || "Terapeuta");
  };

  return (
    <section className="py-4 px-8 flex flex-col bg-neutral-300 dark:bg-neutral-900 rounded-lg">
      <h2 className="text-xl text-center">Adicionar nova sessão</h2>
      <form
        className="grid grid-cols-2 gap-x-12 gap-y-4 mt-4"
        onSubmit={handleSubmit(submitFormHandler)}
      >
        <select
          id="patientId"
          {...register("patientId")}
          onChange={handlePatientChange}
        >
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.name}
            </option>
          ))}
        </select>
        <DefaultInput.Root>
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
          className="grid col-span-2 justify-self-center w-[400px]"
          type="submit"
        >
          Enviar
        </Button.Root>
      </form>
    </section>
  );
};

export default AddSessionModalContent;
