import ConvertorForm from "./Components/ConvertorForm";

export default function Home() {
  return (
    <div>
      <h2 className="w-full flex justify-center text-4xl p-4">
        Currency Converter
      </h2>
      <ConvertorForm />
    </div>
  );
}
