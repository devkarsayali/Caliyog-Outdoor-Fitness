import React from "react";
import "../style/Admin/GlobalSearchResults.css";

function GlobalSearchResults({ searchText, results, onResultClick }) {
  if (!searchText.trim()) return null;

  return (
    <div className="global-search-box">
      {results.length === 0 ? (
        <div className="global-search-empty">No result found</div>
      ) : (
        results.slice(0, 8).map((item, index) => (
          <button
            key={index}
            className="global-search-item"
            onClick={() => onResultClick(item)}
          >
            <span className="global-search-icon">{item.icon}</span>
            <div>
              <h4>{item.title}</h4>
              <p>{item.type}</p>
            </div>
          </button>
        ))
      )}
    </div>
  );
}

export default GlobalSearchResults;
