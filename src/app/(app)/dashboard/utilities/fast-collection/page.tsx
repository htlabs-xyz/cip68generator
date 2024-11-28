import CSVReader from "./_components/upload-csv";
export default function UploadCSVPage() {
  return (
    <div className="py-8 px-10 m-auto flex flex-col max-md:px-0">
      <div className="rounded-xl p-6 bg-section shadow-md flex-wrap gap-3 space-y-5">
        <h1 className="text-2xl font-medium leading-7">Stogare</h1>

        <div className="mt-5">
          <CSVReader />
        </div>
      </div>
    </div>
  );
}
