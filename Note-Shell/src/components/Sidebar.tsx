import PlusIcon from "../assets/PlusIcon";
import SearchIcon from "../assets/SearchIcon";
import Folders from "../SidebarMenu/Folders";
import More from "../SidebarMenu/More";
import Recents from "../SidebarMenu/Recents";

function Sidebar() {
  return (
    <>
      <div className="bg-primary w-20/100 h-full flex flex-col text-center gap-6 text-menutextcolor font-SourceSans3-600 font-semibold ">
        <div
          id="title-searchIcon"
          className=" p-7 flex flex-row  justify-between"
        >
          <div id="title">
            <h1 className="text-headingcolor font-KaushanScript text-2xl font-normal ">
              Note-Shell
            </h1>
          </div>
          <div id="search-icon">
            <SearchIcon />
          </div>
        </div>
        <div id="add-btn" className=" flex items-center justify-center">
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
        </div>
        <Recents />
        <Folders />
        <More />
      </div>
    </>
  );
}
export default Sidebar;
