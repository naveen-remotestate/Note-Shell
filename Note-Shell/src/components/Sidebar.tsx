import { useEffect, useState } from "react";
import PlusIcon from "../assets/PlusIcon";
import SearchIcon from "../assets/SearchIcon";
import Folders from "../SidebarMenu/Folders";
import More from "../SidebarMenu/More";
import Recents from "../SidebarMenu/Recents";
import { getSearch } from "../api/get";

function Sidebar() {
  const [search, setSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!searchInput.trim()) {
      setSearchResults([]);
      return;
    }

    const delay = setTimeout(async () => {
      const data = await getSearch(searchInput);
      setSearchResults(data);
    }, 600);

    return () => clearTimeout(delay);
  }, [searchInput]);
  return (
    <div className="h-screen flex flex-col justify-between overflow-scroll">
      <div>
        <div className=" p-7 flex flex-row  justify-between">
          <div id="title">
            <h1 className="text-headingcolor font-KaushanScript text-2xl font-normal ">
              Note-Shell
            </h1>
          </div>
          <div onClick={() => setSearch((prev) => !prev)}>
            <SearchIcon />
          </div>
        </div>
        <div className=" flex flex-col items-center justify-center">
          {search ? (
            <div className="relative w-4/5">
              <div className="absolute inset-y-0 left-3 flex items-center">
                <SearchIcon />
              </div>

              <input
                type="text"
                placeholder="Search note"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-secondary text-headingcolor py-2 pl-10 pr-4 rounded outline-none"
              />
            </div>
          ) : (
            <button
              onClick={() => console.log("New note clicked")}
              className="w-80/100 flex items-center justify-center gap-2.5 
             bg-secondary text-headingcolor py-2 px-4 rounded
             transition-transform duration-100 hover:bg-blue-500
             active:scale-95"
            >
              <PlusIcon />
              New Note
            </button>
          )}
        </div>

        <Recents />
        <Folders />
      </div>
      <More />
    </div>
  );
}
export default Sidebar;
