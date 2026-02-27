import { useEffect, useState } from "react";
import RecentIcon from "../assets/RecentIcon";
import axios from "axios";
import { Link } from "react-router";
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
    getRecent();
  }, []);

  async function getRecent() {
    try {
      const response = await axios.get(
        "https://nowted-server.remotestate.com/notes/recent",
      );
      setRecents(response.data?.recentNotes);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="flex flex-col text-left ">
        <div className="flex flex-row justify-between pl-3 pr-3 ">
          <h5 className="text-xs font-semibold">Recents</h5>
        </div>
        <div className="flex flex-col ">
          {recents.map((item) => (
            <Link
              to={
                "/folders/" +
                item.folderId +
                "/" +
                item.folder.name + //put folder name here
                "/" +
                "content/" +
                item.id
              }
              key={item.id}
            >
              <div className="flex flex-row gap-3 p-3 hover:bg-blue-500 truncate">
                <RecentIcon />
                <h3>{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
export default Recents;
