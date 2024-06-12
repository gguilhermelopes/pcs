import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <main className="flex flex-col items-center justify-center mt-20">
      <h2 className="text-xl text-primary dark:text-primary100 font-medium">
        Entre em sua conta
      </h2>
      <LoginForm />
    </main>
  );
};

export default LoginPage;
