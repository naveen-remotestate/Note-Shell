import { useEffect, useState } from "react";
import RecentIcon from "../assets/RecentIcon";
import { NavLink } from "react-router";
import { getRecent } from "../api/get";
function Recents() {
  type recentType = {
    id: string;
    folderId: string;
    title: string;
    folder: {
      name: string;
    };
  };

  const [recents, setRecents] = useState<recentType[]>([]);

  useEffect(() => {
    async function getdata() {
      const data = await getRecent();
      setRecents(data);
    }
    getdata();
  }, []);

  return (
    <>
      <div className="flex flex-col text-left ">
        <div className="flex flex-row justify-between pl-3 pr-3 pt-3 ">
          <h5 className="text-xs font-semibold">Recents</h5>
        </div>
        <div className="flex flex-col ">
          {recents.map((item) => (
            <NavLink
              to={
                "/folders/" +
                item.folderId +
                "/" +
                item.folder.name + //put folder name here
                "/" +
                "content/" +
                item.id
              }
              className={({ isActive }) =>
                `transition-colors duration-200 ${
                  isActive ? "bg-blue-500 text-white" : "hover:bg-blue-500/40"
                }`
              }
              key={item.id}
            >
              <div className="flex flex-row gap-3 p-3 hover:bg-blue-500 truncate">
                <RecentIcon className="text-menutextcolor transition" />
                <h3>{item.title}</h3>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}
export default Recents;
