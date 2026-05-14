import SearchBar from "../Common/Search";
import Select from "../Common/Select";

export default function TodoFilter({
  search,
  setSearch,
  filter,
  setFilter,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="todo-filter">
      <SearchBar
        value={search.value}
        onChange={(value) =>
          setSearch((prev) => ({ ...prev, value }))
        }
        searchType={search.type}
        onSearchTypeChange={(type) =>
          setSearch((prev) => ({ ...prev, type }))
        }
        placeholder="Search todos..."
        searchOptions={[
          { value: "title", label: "By Title" },
          { value: "id", label: "By ID" },
        ]}
      />

      <Select
        value={filter}
        onChange={setFilter}
        options={[
          { value: "all", label: "All" },
          { value: "completed", label: "Completed" },
          { value: "uncompleted", label: "Not Completed" },
        ]}
      />

      <Select
        value={sortBy}
        onChange={setSortBy}
        options={[
          { value: "id", label: "Sort by ID" },
          { value: "title", label: "Sort by Title" },
          { value: "completed", label: "Sort by Completed" },
        ]}
      />
    </div>
  );
}