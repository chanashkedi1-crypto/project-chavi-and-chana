import SearchBar from "../Common/Search";
import Select from "../Common/Select";

export default function PostFilter({
  search,
  setSearch,
  postsScope,
  setPostsScope,
}) {
  return (
    <div className="post-filters">
      <SearchBar
        value={search.value}
        onChange={(value) =>
          setSearch((prev) => ({ ...prev, value }))
        }
        searchType={search.type}
        onSearchTypeChange={(type) =>
          setSearch((prev) => ({ ...prev, type }))
        }
        placeholder="Search posts..."
        searchOptions={[
          { value: "title", label: "By Title" },
          { value: "id", label: "By ID" },
        ]}
      />

      <Select
        value={postsScope}
        onChange={setPostsScope}
        options={[
          { value: "all", label: "All posts" },
          { value: "mine", label: "My posts" },
        ]}
      />
    </div>
  );
}