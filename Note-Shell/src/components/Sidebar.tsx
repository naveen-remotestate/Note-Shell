import PlusIcon from "../assets/PlusIcon";
import SearchIcon from "../assets/SearchIcon";
import Folders from "../SidebarMenu/Folders";
import More from "../SidebarMenu/More";
import Recents from "../SidebarMenu/Recents";

function Sidebar() {
  return (
    <>
      <div className="bg-primary p-7 w-20/100 h-full flex flex-col text-center gap-7 text-menutextcolor font-SourceSans3-600 font-semibold ">
        <div id="title-searchIcon" className="  flex flex-row  justify-between">
          <div id="title">
            <h1 className="text-white font-KaushanScript text-2xl font-normal ">
              Note-Shell
            </h1>
          </div>
          <div id="search-icon">
            <SearchIcon />
          </div>
        </div>
        <div id="add-btn">
          <button className=" justify-center w-100/100 gap-2.5 bg-secondary  text-white font-semibold py-2 px-4 rounded inline-flex items-center">
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
