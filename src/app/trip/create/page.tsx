import CreateTripFormComponent from "./components/create-trip-form";

const CreateTripPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-8">
      <h1 className="text-3xl font-bold text-[#0D171C]">Crie sua viagem</h1>

      <div className="w-full p-5 sm:max-w-[500px] ">
        <CreateTripFormComponent />
      </div>
    </div>
  );
};

export default CreateTripPage;
