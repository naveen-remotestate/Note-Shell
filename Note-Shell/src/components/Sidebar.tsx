import PlusIcon from "../assets/PlusIcon";
import SearchIcon from "../assets/SearchIcon";

function Sidebar() {
  return (
    <>
      <div className="bg-primary  w-20/100 h-full">
        <div id="title-searchIcon" className="pr-10 pl-10">
          <div
            id="title"
            className="flex flex-row align-middle  justify-between"
          >
            <h1 className="text-white font-KaushanScript text-2xl font-normal ">
              Note-Shell
            </h1>
            <SearchIcon />
          </div>
          <div id="search-icon"></div>
        </div>
        <div id="add-btn">
          <button className="bg-secondary hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center">
            <PlusIcon />
            New Note
          </button>
        </div>
      </div>
    </>
  );
}
export default Sidebar;
