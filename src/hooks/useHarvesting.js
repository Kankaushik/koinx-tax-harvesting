import { useState, useEffect, useMemo } from "react";
import { fetchCapitalGains, fetchHoldings } from "../api/mockApi";

const useHarvesting = () => {
  const [capitalGains, setCapitalGains] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [selectedIndices, setSelectedIndices] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [gainsData, holdingsData] = await Promise.all([
          fetchCapitalGains(),
          fetchHoldings(),
        ]);
        setCapitalGains(gainsData.capitalGains);
        setHoldings(holdingsData);
      } catch (err) {
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const afterGains = useMemo(() => {
    if (!capitalGains) return null;

    let stcgProfits = capitalGains.stcg.profits;
    let stcgLosses = capitalGains.stcg.losses;
    let ltcgProfits = capitalGains.ltcg.profits;
    let ltcgLosses = capitalGains.ltcg.losses;

    selectedIndices.forEach((idx) => {
      const holding = holdings[idx];
      if (!holding) return;

      // STCG
      if (holding.stcg.gain > 0) {
        stcgProfits += holding.stcg.gain;
      } else if (holding.stcg.gain < 0) {
        stcgLosses += Math.abs(holding.stcg.gain);
      }

      // LTCG
      if (holding.ltcg.gain > 0) {
        ltcgProfits += holding.ltcg.gain;
      } else if (holding.ltcg.gain < 0) {
        ltcgLosses += Math.abs(holding.ltcg.gain);
      }
    });

    const round2 = (n) => Math.round(n * 100) / 100;

    const stcgNet = stcgProfits - stcgLosses;
    const ltcgNet = ltcgProfits - ltcgLosses;

    return {
      stcg: {
        profits: round2(stcgProfits),
        losses: round2(stcgLosses),
        net: round2(stcgNet),
      },
      ltcg: {
        profits: round2(ltcgProfits),
        losses: round2(ltcgLosses),
        net: round2(ltcgNet),
      },
      realised: round2(stcgNet + ltcgNet),
    };
  }, [capitalGains, holdings, selectedIndices]);

  const preGains = useMemo(() => {
    if (!capitalGains) return null;
    const round2 = (n) => Math.round(n * 100) / 100;
    const stcgNet = capitalGains.stcg.profits - capitalGains.stcg.losses;
    const ltcgNet = capitalGains.ltcg.profits - capitalGains.ltcg.losses;
    return {
      stcg: {
        profits: round2(capitalGains.stcg.profits),
        losses: round2(capitalGains.stcg.losses),
        net: round2(stcgNet),
      },
      ltcg: {
        profits: round2(capitalGains.ltcg.profits),
        losses: round2(capitalGains.ltcg.losses),
        net: round2(ltcgNet),
      },
      realised: round2(stcgNet + ltcgNet),
    };
  }, [capitalGains]);

  const toggleHolding = (idx) => {
    setSelectedIndices((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const toggleAll = (checked) => {
    if (checked) {
      setSelectedIndices(new Set(holdings.map((_, i) => i)));
    } else {
      setSelectedIndices(new Set());
    }
  };

  const savings =
    preGains && afterGains ? preGains.realised - afterGains.realised : 0;

  return {
    preGains,
    afterGains,
    holdings,
    selectedIndices,
    toggleHolding,
    toggleAll,
    loading,
    error,
    savings,
  };
};

export default useHarvesting;
