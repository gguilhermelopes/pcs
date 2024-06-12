import notify from "@/helpers/notify";
import { Login } from "@/interfaces/login";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const login = async (data: Login) => {
  const response = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

const useLogin = () => {
  const router = useRouter();

  const mutate = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.error) {
        notify(
          "Credenciais inválidas. Verifique seu usuário e senha.",
          "error"
        );
      } else {
        router.push("/sessions");
        router.refresh();
        notify("Login feito com sucesso.", "success");
      }
    },
    onError: (error) => {
      notify("Ocorreu um erro ao tentar fazer o login.", "error");
      console.error(error);
    },
  });

  return mutate;
};

export default useLogin;
