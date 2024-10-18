import React, { useState } from "react";
import axios from "axios"; // Import Axios

function App() {
  const [sentence, setSentence] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://road-final-projectapi-production.up.railway.app/predict",
        { text: sentence }
      );

      setResults([
        {
          sentence,
          prediction: response.data.prediction,
        },
        ...results,
      ]);

      setSentence("");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="h-screen grid grid-rows-[1fr_2fr] bg-[#f9f6f1]">
      {/* Upper 1/3 of the screen: Title and Input */}
      <div className="flex flex-col justify-center items-center p-8 space-y-8">
        {/* Title */}
        <h1 className="text-5xl font-extrabold text-[#171717] text-center">
          Sentence Classifier
        </h1>

        {/* Input Section */}
        <form
          onSubmit={handleSubmit}
          className="w-full sm:w-2/3 flex items-center space-x-4"
        >
          <input
            type="text"
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            placeholder="Enter a sentence"
            required
            className="w-full px-4 py-3 rounded-lg shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00a82e] text-[#171717]"
          />
          <button
            type="submit"
            className="bg-[#00a82e] hover:bg-green-700 text-white px-6 py-3 font-semibold rounded-lg shadow-lg transition duration-300"
          >
            Classify
          </button>
        </form>
      </div>

      {/* Lower 2/3 of the screen: Results */}
      <div className="flex justify-center overflow-y-auto p-4 bg-[#f9f6f1] rounded-t-3xl">
        <div className="w-full sm:w-2/3 space-y-4">
          {results.map((result, index) => (
            <div
              key={index}
              className={`flex justify-between p-4 rounded-lg shadow-md transition duration-300 ${
                result.prediction === "Positive" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <p className="text-lg font-semibold text-[#171717]">
                {result.sentence}
              </p>
              <p
                className={`text-lg font-semibold ${
                  result.prediction === "Positive"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {result.prediction}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
