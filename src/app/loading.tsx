import { Loader } from "@/components/UI/Loader";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Loader.Root />
    </div>
  );
};

export default Loading;
