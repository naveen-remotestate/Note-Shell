import { useEffect, useState } from "react";
import RecentIcon from "../../../../assets / Icons/RecentIcon";
import { NavLink } from "react-router";
import { getRecent } from "../../../../api/NotesApi";
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
                item.folder.name +
                "/" +
                "content/" +
                item.id
              }
              className={({ isActive }) =>
                `transition-colors duration-200 ${
                  isActive
                    ? "bg-activecolor text-white"
                    : "hover:bg-activecolor/40"
                }`
              }
              key={item.id}
            >
              <div className="flex flex-row gap-3 p-3 hover:bg-activecolor truncate">
                <div>
                  <RecentIcon className="text-menutextcolor transition" />
                </div>
                <h3 className="truncate ">{item.title}</h3>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}
export default Recents;
