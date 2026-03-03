import ArchivedIcon from "../assets/ArchivedIcon";
import FavoritesIcon from "../assets/FavoritesIcon";
import TrashIcon from "../assets/TrashIcon";
import { Link, NavLink } from "react-router";
function More() {
  return (
    <>
      <div className="flex flex-col text-left ">
        <div className="flex flex-row justify-between pl-3 pr-3 ">
          <h5 className="text-xs font-semibold">More</h5>
        </div>
        <div className="flex flex-col ">
          <NavLink
            to={"favorites"}
            className={({ isActive }) =>
              `transition-colors duration-200 ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-blue-500/40"
              }`
            }
          >
            <div className="flex flex-row gap-3 p-3 hover:bg-blue-500">
              <FavoritesIcon />
              <h3>Favorites</h3>
            </div>
          </NavLink>
          <NavLink
            to={"Trash"}
            className={({ isActive }) =>
              `transition-colors duration-200 ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-blue-500/40"
              }`
            }
          >
            <div className="flex flex-row gap-3 p-3 hover:bg-blue-500">
              <TrashIcon />
              <h3>Trash</h3>
            </div>
          </NavLink>
          <NavLink
            to={"archives"}
            className={({ isActive }) =>
              `transition-colors duration-200 ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-blue-500/40"
              }`
            }
          >
            <div className="flex flex-row gap-3 p-3 hover:bg-blue-500">
              <ArchivedIcon />
              <h3>Archived Notes</h3>
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
}
export default More;
