import React, { useState } from "react";

const fmtPrice = (n) => {
  if (n === undefined || n === null) return "₹0";
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  if (abs >= 10000000) return `${sign}₹${(abs / 10000000).toFixed(2)}Cr`;
  if (abs >= 100000) return `${sign}₹${(abs / 100000).toFixed(2)}L`;
  if (abs >= 1000)
    return `${sign}₹${abs.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
  if (abs < 0.0001 && abs !== 0) return `${sign}₹${abs.toExponential(2)}`;
  return `${sign}₹${abs.toFixed(2)}`;
};

const fmtQty = (n, coin) => {
  if (Math.abs(n) < 0.0001 && n !== 0) return `${n.toExponential(2)} ${coin}`;
  return `${parseFloat(n.toFixed(6))} ${coin}`;
};

const VISIBLE_DEFAULT = 7;

const HoldingsTable = ({
  holdings,
  selectedIndices,
  toggleHolding,
  toggleAll,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [sortDir, setSortDir] = useState(null); // null | 'asc' | 'desc'

  const allSelected =
    holdings.length > 0 && holdings.every((_, i) => selectedIndices.has(i));
  const someSelected = selectedIndices.size > 0 && !allSelected;

  const sorted = [...holdings].sort((a, b) => {
    if (!sortDir) return 0;
    return sortDir === "asc"
      ? a.stcg.gain - b.stcg.gain
      : b.stcg.gain - a.stcg.gain;
  });

  const visible = showAll ? sorted : sorted.slice(0, VISIBLE_DEFAULT);

  const toggleSort = () => {
    setSortDir((prev) =>
      prev === null ? "desc" : prev === "desc" ? "asc" : null,
    );
  };

  return (
    <div className="bg-[#1e293b] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700">
        <h2 className="text-base font-semibold text-white">Holdings</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px]">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-5 py-3 text-left">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={(e) => toggleAll(e.target.checked)}
                  className="w-4 h-4 accent-blue-500 cursor-pointer"
                />
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Asset
              </th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Holdings
                <br />
                <span className="text-gray-500 normal-case font-normal">
                  Avg Buy Price
                </span>
              </th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Current Price
              </th>
              <th
                className="px-5 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer select-none"
                onClick={toggleSort}
              >
                Short-Term
                <span className="ml-1 text-gray-500">
                  {sortDir === "asc" ? "↑" : sortDir === "desc" ? "↓" : "↕"}
                </span>
              </th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Long-Term
              </th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Amount to Sell
              </th>
            </tr>
          </thead>
          <tbody>
            {visible.map((h, vi) => {
              const idx = holdings.indexOf(h);
              const isSelected = selectedIndices.has(idx);
              const hasLogo = h.logo && !h.logo.includes("DefaultCoin");

              return (
                <tr
                  key={`${h.coin}-${idx}`}
                  onClick={() => toggleHolding(idx)}
                  className={`cursor-pointer border-b border-gray-700 transition-colors ${
                    isSelected
                      ? "bg-blue-900 bg-opacity-30"
                      : "hover:bg-[#263548]"
                  }`}
                >
                  {/* Checkbox */}
                  <td
                    className="px-5 py-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleHolding(idx)}
                      className="w-4 h-4 accent-blue-500 cursor-pointer"
                    />
                  </td>

                  {/* Asset */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {hasLogo ? (
                        <img
                          src={h.logo}
                          alt={h.coin}
                          className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        className="w-9 h-9 rounded-full bg-gray-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ display: hasLogo ? "none" : "flex" }}
                      >
                        {h.coin.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {h.coinName}
                        </p>
                        <p className="text-xs text-gray-400">{h.coin}</p>
                      </div>
                    </div>
                  </td>

                  {/* Holdings */}
                  <td className="px-5 py-4 text-right">
                    <p className="text-sm text-white">
                      {fmtQty(h.totalHolding, h.coin)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {fmtPrice(h.averageBuyPrice)}/{h.coin}
                    </p>
                  </td>

                  {/* Current Price */}
                  <td className="px-5 py-4 text-right">
                    <p className="text-sm text-white">
                      {fmtPrice(h.currentPrice)}
                    </p>
                  </td>

                  {/* Short Term */}
                  <td className="px-5 py-4 text-right">
                    {Math.abs(h.stcg.gain) < 1e-9 ? (
                      <span className="text-gray-500 text-sm">—</span>
                    ) : (
                      <>
                        <p
                          className={`text-sm font-medium ${h.stcg.gain >= 0 ? "text-green-400" : "text-red-400"}`}
                        >
                          {fmtPrice(h.stcg.gain)}
                        </p>
                        <p className="text-xs text-gray-400">
                          {fmtQty(h.stcg.balance, h.coin)}
                        </p>
                      </>
                    )}
                  </td>

                  {/* Long Term */}
                  <td className="px-5 py-4 text-right">
                    {Math.abs(h.ltcg.gain) < 1e-9 ? (
                      <span className="text-gray-500 text-sm">—</span>
                    ) : (
                      <>
                        <p
                          className={`text-sm font-medium ${h.ltcg.gain >= 0 ? "text-green-400" : "text-red-400"}`}
                        >
                          {fmtPrice(h.ltcg.gain)}
                        </p>
                        <p className="text-xs text-gray-400">
                          {fmtQty(h.ltcg.balance, h.coin)}
                        </p>
                      </>
                    )}
                  </td>

                  {/* Amount to Sell */}
                  <td className="px-5 py-4 text-right">
                    {isSelected && h.totalHolding > 0 ? (
                      <span className="bg-blue-600 bg-opacity-30 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full border border-blue-500 border-opacity-40">
                        {fmtQty(h.totalHolding, h.coin)}
                      </span>
                    ) : (
                      <span className="text-gray-600 text-sm">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* View All — LEFT aligned */}
      {!showAll && holdings.length > VISIBLE_DEFAULT && (
        <div className="px-5 py-4 border-t border-gray-700">
          <button
            onClick={() => setShowAll(true)}
            className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            View all
          </button>
        </div>
      )}
      {showAll && (
        <div className="px-5 py-4 border-t border-gray-700">
          <button
            onClick={() => setShowAll(false)}
            className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            View less
          </button>
        </div>
      )}
    </div>
  );
};

export default HoldingsTable;
