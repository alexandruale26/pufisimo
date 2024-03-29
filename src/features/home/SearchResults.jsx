import { useState, useEffect } from "react";
import Section from "../../shared/Section";
import LayoutSwitcher from "./LayoutSwitcher";
import PostLink from "../../shared/PostLink";
import { showSearchResultsTitle, isLayoutChangeAllowed, getGridModeFromStorage } from "./helpers";
import { saveToLocalStorage } from "../../utils/helpers";
import { GRID_STORAGE_NAME } from "./data";

const SearchResults = ({ hasSearchParams, posts, searchedParams }) => {
  const [gridMode, setGridMode] = useState(getGridModeFromStorage());
  const [allowLayoutChange, setAllowLayoutChange] = useState(isLayoutChangeAllowed());

  useEffect(() => {
    const setIfLayoutAllowed = (e) => {
      e.preventDefault();
      setAllowLayoutChange(isLayoutChangeAllowed());
    };

    window.addEventListener("resize", setIfLayoutAllowed);
    return () => window.removeEventListener("resize", setIfLayoutAllowed);
  }, []);

  const handleLayoutSwitch = (value) => {
    setGridMode(value);
    saveToLocalStorage(GRID_STORAGE_NAME, value);
  };

  return (
    <Section className="flex flex-col items-start justify-start gap-5 bg-transparent border-none p-0 shadow-none">
      <div className="w-full flex items-start gap-1 pl-1 select-none">
        <h2 className="w-full my-auto text-start text-2xl text-gray-700 font-medium leading-none">
          {showSearchResultsTitle(hasSearchParams, posts.length)}
        </h2>
        {hasSearchParams && allowLayoutChange && (
          <LayoutSwitcher isGridSelected={gridMode} onSelect={handleLayoutSwitch} />
        )}
      </div>

      {hasSearchParams === true && (
        <Section gridMode={gridMode} className="flex-col p-0 bg-transparent shadow-none rounded-none">
          {posts.map((post) => (
            <PostLink key={post.id} post={post} gridMode={gridMode} searchParams={searchedParams} />
          ))}
        </Section>
      )}

      {hasSearchParams === false && (
        <Section gridMode={true}>
          {posts.map((post) => (
            <PostLink key={post.id} post={post} gridMode={true} searchParams={searchedParams} />
          ))}
        </Section>
      )}
    </Section>
  );
};

export default SearchResults;
