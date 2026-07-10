import React from "react";
import "../style/Admin/GlobalSearchResults.css";

function GlobalSearchResults({ searchText, results, onResultClick }) {
  if (!searchText.trim()) return null;

  return (
    <div className="global-search-box">
      {results.length === 0 ? (
        <div className="global-search-empty">
          <span className="empty-icon">🔍</span>
          <p>No result found for "{searchText}"</p>
          <small>Try different keywords</small>
        </div>
      ) : (
        <>
          <div className="global-search-header">
            <span>{results.length} result{results.length !== 1 ? "s" : ""} found</span>
            <small>Click to navigate</small>
          </div>

          {results.slice(0, 12).map((item, index) => {
            const title =
              item._displayTitle ||
              item.name ||
              item.title ||
              item.email ||
              "Untitled Record";

            const subtitle =
              item._displaySubtitle ||
              item.email ||
              item.specialization ||
              item.batch ||
              item.membership ||
              item.timing ||
              item.contact ||
              item.mobile ||
              item.phone ||
              item.parentEmail ||
              "";

            // ⭐ Show which section this will open
            const tabLabel = {
              members: "Members",
              reports: "Reports",
              experts: "Experts",
              events: "Events",
              enquiries: "Enquiries",
              batches: "Batches",
              transformations: "Transformations",
              membership: "Membership",
            }[item.tab] || item.tab;

            return (
              <button
                key={item._id || item.id || index}
                className="global-search-item"
                onClick={() => onResultClick(item)}
              >
                <span className="global-search-icon">{item.icon || "📄"}</span>

                <div className="global-search-content">
                  <h4>{title}</h4>
                  {subtitle && (
                    <p className="global-search-subtitle">{subtitle}</p>
                  )}
                </div>

                <div className="global-search-meta">
                  <span className="global-search-type">{item.type}</span>
                  <span className="global-search-tab">→ {tabLabel}</span>
                </div>
              </button>
            );
          })}
        </>
      )}
    </div>
  );
}

export default GlobalSearchResults;