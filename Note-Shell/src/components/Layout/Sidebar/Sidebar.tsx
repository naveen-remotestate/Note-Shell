import { useEffect, useState } from "react";
import PlusIcon from "../../../assets / Icons/PlusIcon";
import SearchIcon from "../../../assets / Icons/SearchIcon";
import Folders from "./SidebarElements/Folders";
import More from "./SidebarElements/More";
import Recents from "./SidebarElements/Recents";
import { getSearch } from "../../../api/NotesApi";

import { NavLink, useLocation, useNavigate } from "react-router";
import ToggleTheme from "../../UI/Theme/ToggleTheme";
import CrossIcon from "../../../assets / Icons/CrossIcon";
import { postNote } from "../../../api/NotesApi";
import type { ResponsePicked } from "../../Types/NotesType";

type SidebarPropsType = {
  setSearchResults: React.Dispatch<React.SetStateAction<ResponsePicked[]>>;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
};
function Sidebar({ setSearchResults, setIsSearching }: SidebarPropsType) {
  const [search, setSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  // const [searchResults, setSearchResults] = useState([]);

  const location = useLocation();
  useEffect(() => {
    const init = () => {
      setSearchInput(""); //empty
      setSearchResults([]); //empty
      setIsSearching(false); //false
    };
    init();
  }, [location.pathname, setIsSearching, setSearchResults]);

  useEffect(() => {
    if (!searchInput.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    //applied delay of 600ms for search
    const delay = setTimeout(async () => {
      const data = await getSearch(searchInput);
      setSearchResults(data ? data : []);
      setIsSearching(true);
    }, 600);

    return () => clearTimeout(delay);
  }, [searchInput, setIsSearching, setSearchResults]);

  // console.log(searchResults);

  const navigate = useNavigate();
  //creating note
  async function createNewNote() {
    const partsOfUrl = location.pathname.split("/");

    const folderId = partsOfUrl[2];
    const folderName = partsOfUrl[3];

    if (!folderId) {
      alert("Please select a folder first");
      return;
    }

    try {
      const newNote = await postNote(folderId, "Untitled Note", "");

      navigate(`/folders/${folderId}/${folderName}/content/${newNote.id}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className=" h-screen flex flex-col ">
      <div>
        <div className=" p-7 flex flex-row  justify-between">
          <NavLink to={""}>
            <h1 className="text-headingcolor font-KaushanScript text-2xl font-normal ">
              Note-Shell
            </h1>
          </NavLink>
          <div>
            <ToggleTheme />
          </div>
          <div onClick={() => setSearch((prev) => !prev)}>
            {search ? (
              <div>
                <CrossIcon className="w-5 h-5 text-menutextcolor hover:text-red-500 transition" />
              </div>
            ) : (
              <SearchIcon className="text-menutextcolor" />
            )}
          </div>
        </div>
        <div className=" flex flex-col items-center justify-center">
          {search ? (
            <div className="relative w-4/5">
              <div className="absolute inset-y-0 left-3 flex items-center">
                <SearchIcon className="text-menutextcolor" />
              </div>

              <input
                autoFocus
                type="text"
                placeholder="Search note"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-secondary text-headingcolor py-2 pl-10 pr-4 rounded outline-none"
              />
            </div>
          ) : (
            <button
              onClick={createNewNote}
              className="w-80/100 flex items-center justify-center gap-2.5 
             bg-secondary text-headingcolor py-2 px-4 rounded
             transition-transform duration-100 hover:bg-activecolor
             active:scale-95"
            >
              <PlusIcon className="text-menutextcolor  transition" />
              New Note
            </button>
          )}
        </div>

        <Recents />
      </div>
      <div className="flex-1 min-h-17">
        <Folders />
      </div>
      <More />
    </div>
  );
}
export default Sidebar;
