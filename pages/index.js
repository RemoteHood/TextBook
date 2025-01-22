export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">PDF Quiz Generator</h1>
        <p className="text-gray-600">Upload PDF to generate interactive quiz</p>
      </div>

      {/* Drag & Drop Box */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 h-48 flex items-center justify-center">
        <p className="text-gray-500">Drag and drop PDF here</p>
      </div>
    </div>
  );
}

