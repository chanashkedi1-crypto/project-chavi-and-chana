export default function SearchBar({
  value,
  onChange,
  searchType,
  onSearchTypeChange,
  searchOptions,
  placeholder = "Search...",
  className = "",
}) {
  return (
    <div className={`search-bar ${className}`}>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />

      {searchOptions && (
        <select
          value={searchType}
          onChange={(e) => onSearchTypeChange(e.target.value)}
        >
          {searchOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
