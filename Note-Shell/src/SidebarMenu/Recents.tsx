import { useEffect, useState } from "react";
import RecentIcon from "../assets/RecentIcon";
import axios from "axios";
function Recents() {
  type recentType = {
    id: string;
    folderId: string;
    title: string;
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
            <div
              key={item.id}
              className="flex flex-row gap-3 p-3 hover:bg-blue-500"
            >
              <RecentIcon />
              <h3>{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Recents;
