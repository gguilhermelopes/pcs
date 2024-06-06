import { Suspense } from "react";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <main className="flex flex-col items-center justify-center mt-20">
      <h2 className="text-xl text-primary dark:text-primary100 font-medium">
        Entre em sua conta
      </h2>
      <Suspense fallback={<div>Carregando...</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
};

export default LoginPage;
