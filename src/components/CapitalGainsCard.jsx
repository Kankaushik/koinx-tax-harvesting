import React from "react";

const fmt = (n) => {
  if (n === undefined || n === null) return "₹0.00";
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  if (abs >= 10000000) return `${sign}₹${(abs / 10000000).toFixed(2)}Cr`;
  if (abs >= 100000) return `${sign}₹${(abs / 100000).toFixed(2)}L`;
  return `${sign}₹${abs.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const CapitalGainsCard = ({ gains, title, variant, savings }) => {
  if (!gains) return null;
  const isBlue = variant === "blue";
  const cardBg = isBlue ? "bg-blue-600" : "bg-[#1e293b]";
  const rowHover = isBlue ? "hover:bg-blue-500" : "hover:bg-[#263548]";
  const mutedText = isBlue ? "text-blue-200" : "text-gray-400";
  const divider = isBlue ? "border-blue-500" : "border-gray-700";
  const netBg = isBlue ? "bg-blue-700" : "bg-[#0f172a]";

  return (
    <div className={`${cardBg} rounded-2xl p-5 flex-1`}>
      <h2 className="text-base font-semibold text-white mb-5">{title}</h2>

      {/* Column headers */}
      <div className="grid grid-cols-3 mb-2">
        <span className={`text-xs font-medium ${mutedText}`}></span>
        <span className={`text-xs font-medium ${mutedText} text-right`}>
          Short-term
        </span>
        <span className={`text-xs font-medium ${mutedText} text-right`}>
          Long-term
        </span>
      </div>

      {/* Profits row */}
      <div
        className={`grid grid-cols-3 py-2 rounded-lg px-2 ${rowHover} transition-colors`}
      >
        <span className="text-sm text-white">Profits</span>
        <span className="text-sm text-green-400 text-right font-medium">
          {fmt(gains.stcg.profits)}
        </span>
        <span className="text-sm text-green-400 text-right font-medium">
          {fmt(gains.ltcg.profits)}
        </span>
      </div>

      {/* Losses row */}
      <div
        className={`grid grid-cols-3 py-2 rounded-lg px-2 ${rowHover} transition-colors`}
      >
        <span className="text-sm text-white">Losses</span>
        <span className="text-sm text-red-400 text-right font-medium">
          {fmt(gains.stcg.losses)}
        </span>
        <span className="text-sm text-red-400 text-right font-medium">
          {fmt(gains.ltcg.losses)}
        </span>
      </div>

      {/* Net Capital Gains row */}
      <div
        className={`grid grid-cols-3 py-2 rounded-lg px-2 ${rowHover} transition-colors`}
      >
        <span className="text-sm text-white">Net Capital Gains</span>
        <span
          className={`text-sm text-right font-medium ${gains.stcg.net >= 0 ? "text-green-400" : "text-red-400"}`}
        >
          {fmt(gains.stcg.net)}
        </span>
        <span
          className={`text-sm text-right font-medium ${gains.ltcg.net >= 0 ? "text-green-400" : "text-red-400"}`}
        >
          {fmt(gains.ltcg.net)}
        </span>
      </div>

      {/* Divider */}
      <div className={`border-t ${divider} my-3`} />

      {/* Realised Capital Gains */}
      <div
        className={`${netBg} rounded-xl px-4 py-3 flex justify-between items-center`}
      >
        <span className="text-sm font-semibold text-white">
          Realised Capital Gains
        </span>
        <span
          className={`text-base font-bold ${gains.realised >= 0 ? "text-green-400" : "text-red-400"}`}
        >
          {fmt(gains.realised)}
        </span>
      </div>

      {/* Savings */}
      {savings !== null && savings !== undefined && savings > 0 && (
        <div className="mt-3 bg-green-500 bg-opacity-20 border border-green-500 border-opacity-40 rounded-xl py-2 px-4 text-center">
          <span className="text-green-300 text-sm font-semibold">
            You save {fmt(savings)} in taxes!
          </span>
        </div>
      )}
    </div>
  );
};

export default CapitalGainsCard;
