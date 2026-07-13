import React from "react";
import "../style/Admin/GlobalSearchResults.css";

function GlobalSearchResults({
  searchText = "",
  results = [],
  onResultClick,
}) {
  const trimmedSearchText = searchText.trim();

  // Do not show the results box when search is empty
  if (!trimmedSearchText) {
    return null;
  }

  // Make sure results is always an array
  const safeResults = Array.isArray(results) ? results : [];

  const handleResultClick = (item) => {
    if (typeof onResultClick === "function") {
      onResultClick(item);
    } else {
      console.error(
        "GlobalSearchResults: onResultClick function is not provided."
      );
    }
  };

  const getTabLabel = (tab) => {
    const tabLabels = {
      members: "Members",
      reports: "Reports",
      experts: "Experts",
      events: "Events",
      enquiries: "Enquiries",
      batches: "Batches",
      transformations: "Transformations",
      membership: "Membership",
      overview: "Overview",
      about: "About",
      settings: "Settings",
    };

    return tabLabels[tab] || tab || "Unknown Section";
  };

  return (
    <div className="global-search-box">
      {safeResults.length === 0 ? (
        <div className="global-search-empty">
          <span className="empty-icon">🔍</span>

          <p>
            No result found for <strong>"{trimmedSearchText}"</strong>
          </p>

          <small>Try searching with a different name, email, or keyword.</small>
        </div>
      ) : (
        <>
          <div className="global-search-header">
            <span>
              {safeResults.length}{" "}
              {safeResults.length === 1 ? "result" : "results"} found
            </span>

            <small>Click a result to open its section</small>
          </div>

          <div className="global-search-list">
            {safeResults.slice(0, 12).map((item, index) => {
              const title =
                item?._displayTitle ||
                item?.name ||
                item?.title ||
                item?.projectName ||
                item?.expertName ||
                item?.eventName ||
                item?.email ||
                "Untitled Record";

              const subtitle =
                item?._displaySubtitle ||
                item?.email ||
                item?.specialization ||
                item?.batch ||
                item?.membership ||
                item?.timing ||
                item?.contact ||
                item?.mobile ||
                item?.phone ||
                item?.parentEmail ||
                item?.description ||
                "";

              const tabLabel = getTabLabel(item?.tab);

              return (
                <button
                  type="button"
                  key={`${item?.tab || "item"}-${
                    item?._id || item?.id || index
                  }`}
                  className="global-search-item"
                  onClick={() => handleResultClick(item)}
                >
                  <span className="global-search-icon">
                    {item?.icon || "📄"}
                  </span>

                  <div className="global-search-content">
                    <h4>{title}</h4>

                    {subtitle && (
                      <p className="global-search-subtitle">{subtitle}</p>
                    )}
                  </div>

                  <div className="global-search-meta">
                    {item?.type && (
                      <span className="global-search-type">{item.type}</span>
                    )}

                    <span className="global-search-tab">
                      Open {tabLabel} →
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {safeResults.length > 12 && (
            <div className="global-search-more">
              Showing 12 of {safeResults.length} results
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default GlobalSearchResults;