import React, { useState } from "react";
import "./App.css";

function DNAQueryTool() {
  const [sequence, setSequence] = useState("ACGTACGTACGTACGTACGT");
  const [queries, setQueries] = useState([
    { id: 1, l: 1, r: 10, type: "distinct", pattern: "" },
    { id: 2, l: 1, r: 10, type: "gcContent", pattern: "" },
  ]);
  const [results, setResults] = useState([]);

  const handleQueryChange = (id, field, value) => {
    setQueries(prev =>
      prev.map(q =>
        q.id === id
          ? { ...q, [field]: field === "l" || field === "r" ? Number(value) : value }
          : q
      )
    );
  };

  const addQuery = () => {
    setQueries(prev => [
      ...prev,
      {
        id: prev.length ? prev[prev.length - 1].id + 1 : 1,
        l: 1,
        r: Math.min(sequence.length, 5),
        type: "distinct",
        pattern: "",
      },
    ]);
  };

  const deleteQuery = id => {
    setQueries(prev => prev.filter(q => q.id !== id));
  };

  const runMoAlgorithm = () => {
    const n = sequence.length;
    if (!n || !/^[ACGTacgt]+$/.test(sequence)) {
      alert("Sequence should be non-empty and contain only A/C/G/T.");
      return;
    }

    const normalizedSeq = sequence.toUpperCase();
    const validQueries = [];
    queries.forEach((q, idx) => {
      const l = q.l - 1;
      const r = q.r - 1;
      if (l < 0 || r < 0 || l >= n || r >= n || l > r) return;
      validQueries.push({
        l,
        r,
        idx,
        type: q.type,
        pattern: (q.pattern || "").toUpperCase(),
      });
    });

    if (!validQueries.length) {
      alert("No valid queries.");
      return;
    }

    const blockSize = Math.max(1, Math.floor(Math.sqrt(n)));

    validQueries.sort((a, b) => {
      const blockA = Math.floor(a.l / blockSize);
      const blockB = Math.floor(b.l / blockSize);
      if (blockA !== blockB) return blockA - blockB;
      if (blockA % 2 === 0) return a.r - b.r;
      return b.r - a.r;
    });

    let curL = 0;
    let curR = -1;

    const freq = { A: 0, C: 0, G: 0, T: 0 };
    let distinct = 0;
    let gcCount = 0;
    let gaPairs = 0;
    const inRange = new Array(n).fill(false);

    const s = normalizedSeq.split("");
    const ans = new Array(queries.length).fill(null);

    const addIndex = idx => {
      if (inRange[idx]) return;
      const ch = s[idx];
      const prevFreq = freq[ch];
      freq[ch] = prevFreq + 1;
      if (prevFreq === 0) distinct += 1;
      if (ch === "G" || ch === "C") gcCount += 1;

      if (idx - 1 >= 0 && inRange[idx - 1]) {
        if (s[idx - 1] === "G" && s[idx] === "A") gaPairs += 1;
      }
      if (idx + 1 < n && inRange[idx + 1]) {
        if (s[idx] === "G" && s[idx + 1] === "A") gaPairs += 1;
      }

      inRange[idx] = true;
    };

    const removeIndex = idx => {
      if (!inRange[idx]) return;
      const ch = s[idx];

      if (idx - 1 >= 0 && inRange[idx - 1]) {
        if (s[idx - 1] === "G" && s[idx] === "A") gaPairs -= 1;
      }
      if (idx + 1 < n && inRange[idx + 1]) {
        if (s[idx] === "G" && s[idx + 1] === "A") gaPairs -= 1;
      }

      const prevFreq = freq[ch];
      freq[ch] = prevFreq - 1;
      if (prevFreq === 1) distinct -= 1;
      if (ch === "G" || ch === "C") gcCount -= 1;

      inRange[idx] = false;
    };

    const countPatternSlow = (l, r, pattern) => {
      if (!pattern.length) return 0;
      if (pattern.length === 1) {
        const ch = pattern[0];
        if (!freq[ch]) return 0;
        return freq[ch];
      }
      let cnt = 0;
      outer: for (let i = l; i + pattern.length - 1 <= r; i++) {
        for (let j = 0; j < pattern.length; j++) {
          if (s[i + j] !== pattern[j]) continue outer;
        }
        cnt++;
      }
      return cnt;
    };

    for (const q of validQueries) {
      while (curL > q.l) {
        curL--;
        addIndex(curL);
      }
      while (curR < q.r) {
        curR++;
        addIndex(curR);
      }
      while (curL < q.l) {
        removeIndex(curL);
        curL++;
      }
      while (curR > q.r) {
        removeIndex(curR);
        curR--;
      }

      const len = q.r - q.l + 1;

      if (q.type === "distinct") {
        ans[q.idx] = distinct;
      } else if (q.type === "mostFreq") {
        let bestBase = "A";
        let bestCount = freq["A"];
        for (const base of ["C", "G", "T"]) {
          if (freq[base] > bestCount) {
            bestCount = freq[base];
            bestBase = base;
          }
        }
        ans[q.idx] = `${bestBase} (${bestCount})`;
      } else if (q.type === "gcContent") {
        const percent = len > 0 ? (gcCount * 100) / len : 0;
        ans[q.idx] = `${percent.toFixed(2)}%`;
      } else if (q.type === "patternCount") {
        ans[q.idx] = countPatternSlow(q.l, q.r, q.pattern);
      } else if (q.type === "gaHotspot") {
        ans[q.idx] = gaPairs;
      } else {
        ans[q.idx] = null;
      }
    }

    setResults(ans);
  };

  return (
    <div className="dna-tool">
      <h1>DNA / Genome Range Query Tool (Mo&apos;s Algorithm)</h1>

      <div className="section">
        <h2>1. DNA Sequence</h2>
        <textarea
          value={sequence}
          onChange={e => setSequence(e.target.value)}
          rows={4}
          placeholder="Enter DNA sequence using only A/C/G/T"
        />
        <div>Length: {sequence.length}</div>
      </div>

      <div className="section">
        <h2>2. Queries</h2>
        <button type="button" onClick={addQuery}>
          Add Query
        </button>

        {queries.map((q, idx) => (
          <div key={q.id} className="query-row">
            <span>#{idx + 1}</span>
            <label>
              L
              <input
                type="number"
                min="1"
                value={q.l}
                onChange={e => handleQueryChange(q.id, "l", e.target.value)}
              />
            </label>
            <label>
              R
              <input
                type="number"
                min="1"
                value={q.r}
                onChange={e => handleQueryChange(q.id, "r", e.target.value)}
              />
            </label>
            <label>
              Type
              <select
                value={q.type}
                onChange={e => handleQueryChange(q.id, "type", e.target.value)}
              >
                <option value="distinct">Distinct nucleotides</option>
                <option value="mostFreq">Most frequent nucleotide</option>
                <option value="gcContent">GC content (%)</option>
                <option value="patternCount">Pattern count</option>
                <option value="gaHotspot">GA hotspot pairs</option>
              </select>
            </label>
            {q.type === "patternCount" && (
              <label>
                Pattern
                <input
                  type="text"
                  value={q.pattern}
                  onChange={e =>
                    handleQueryChange(q.id, "pattern", e.target.value.replace(/[^ACGTacgt]/g, ""))
                  }
                  placeholder="e.g. ACG"
                />
              </label>
            )}
            <button type="button" onClick={() => deleteQuery(q.id)}>
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="section">
        <h2>3. Run Mo&apos;s Algorithm</h2>
        <button type="button" onClick={runMoAlgorithm}>
          Run Analysis
        </button>
      </div>

      <div className="section">
        <h2>4. Results</h2>
        {queries.map((q, idx) => (
          <div key={q.id} className="result-row">
            <div>
              Query #{idx + 1}: L={q.l}, R={q.r}, type={q.type}
              {q.type === "patternCount" && q.pattern
                ? `, pattern="${q.pattern.toUpperCase()}"`
                : ""}
            </div>
            <div>Answer: {results[idx] !== null && results[idx] !== undefined ? results[idx] : "-"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DNAQueryTool;
