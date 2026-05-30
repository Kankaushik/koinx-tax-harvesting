import React, { useState } from "react";
import Header from "./components/Header";
import CapitalGainsCard from "./components/CapitalGainsCard";
import HoldingsTable from "./components/HoldingsTable";
import useHarvesting from "./hooks/useHarvesting";

const disclaimerPoints = [
  "Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.",
  "Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.",
  "Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.",
  "Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.",
  "Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.",
];

function App() {
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);

  const {
    preGains,
    afterGains,
    holdings,
    selectedIndices,
    toggleHolding,
    toggleAll,
    loading,
    error,
    savings,
  } = useHarvesting();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="bg-red-900 bg-opacity-30 border border-red-700 rounded-xl p-6 text-center">
          <p className="text-red-400 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 text-sm text-blue-400 hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const disclaimerTitle =
    "Important Notes " + String.fromCharCode(38) + " Disclaimers";

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Header />
      <div className="max-w-6xl mx-auto px-4 pb-10">
        <div className="flex items-center gap-3 mb-5">
          <h1 className="text-xl font-bold text-white">Tax Harvesting</h1>
          <div className="relative group">
            <a href="#" className="text-blue-400 hover:underline">
              Know More
            </a>
            <div className="absolute left-0 top-7 z-50 w-72 bg-[#1e293b] border border-gray-700 rounded-xl p-4 shadow-xl hidden group-hover:block">
              <p className="text-sm text-gray-300 leading-relaxed">
                Tax-loss harvesting is the process of selling assets at a loss
                to offset capital gains and reduce your overall tax liability.
                Select holdings below to see how it impacts your gains in real
                time.{" "}
                <a href="#" className="text-blue-400 hover:underline">
                  Know More
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#1e293b] border border-gray-700 rounded-xl mb-6 overflow-hidden">
          <button
            onClick={() => setDisclaimerOpen((p) => !p)}
            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#263548] transition-colors"
          >
            <span className="text-blue-400 text-base font-bold">i</span>
            <span className="text-sm font-semibold text-white flex-1">
              {disclaimerTitle}
            </span>
            <span
              className="text-gray-400 text-sm"
              style={{
                display: "inline-block",
                transform: disclaimerOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            >
              ▲
            </span>
          </button>

          {disclaimerOpen && (
            <div className="px-4 pb-4 border-t border-gray-700">
              <ul className="mt-3 space-y-2">
                {disclaimerPoints.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-300"
                  >
                    <span className="text-gray-500 mt-1 flex-shrink-0">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <CapitalGainsCard
            gains={preGains}
            title="Pre Harvesting"
            variant="dark"
          />
          <CapitalGainsCard
            gains={afterGains}
            title="After Harvesting"
            variant="blue"
            savings={savings}
          />
        </div>

        <HoldingsTable
          holdings={holdings}
          selectedIndices={selectedIndices}
          toggleHolding={toggleHolding}
          toggleAll={toggleAll}
        />
      </div>
    </div>
  );
}

export default App;
