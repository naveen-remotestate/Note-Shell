import axios from "axios";
import AddFolderIcon from "../assets/AddFolderIcon";
import CloseFolderIcon from "../assets/CloseFolderIcon";
import { useEffect, useState } from "react";
import { Link } from "react-router";

function Folders() {
  type folderType = {
    id: string;
    name: string;
  };

  const [folders, setFolders] = useState<folderType[]>([]);
  /////////////
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempName, setTempName] = useState("");
  const [originalName, setOriginalName] = useState("");
  //[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]
  async function getFolders() {
    try {
      const response = await axios.get(
        "https://nowted-server.remotestate.com/folders",
      );
      setFolders(response.data?.folders);
    } catch (error) {
      console.log(error);
    }
  }
  /////////////////////////////
  async function updateFolder(id: string) {
    if (!tempName.trim()) {
      setEditingId(null);
      return;
    }

    // prevent unnecessary PATCH
    if (tempName === originalName) {
      setEditingId(null);
      return;
    }

    try {
      await axios.patch(`https://nowted-server.remotestate.com/folders/${id}`, {
        name: tempName,
      });

      setFolders((prev) =>
        prev.map((folder) =>
          folder.id === id ? { ...folder, name: tempName } : folder,
        ),
      );
    } catch (error) {
      console.log(error);
    }

    setEditingId(null);
  }
  //[[[[[[[[[[[[[]]]]]]]]]]]]]
  useEffect(() => {
    getFolders();
  }, []);

  return (
    <div className="flex flex-col text-left overflow-scroll">
      <div className="flex flex-row justify-between pl-3 pr-3">
        <h5 className="text-xs font-semibold">Folders</h5>
        <AddFolderIcon />
      </div>

      <div className="flex flex-col overflow-y-auto max-h-96">
        {folders.map((item) => (
          <div
            key={item.id}
            className="w-full flex flex-row gap-3 p-3 hover:bg-blue-500 items-center"
          >
            <CloseFolderIcon />

            {editingId === item.id ? (
              <input
                autoFocus
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onBlur={() => updateFolder(item.id)} // click outside
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateFolder(item.id);
                  }
                  if (e.key === "Escape") {
                    setTempName(originalName);
                    setEditingId(null);
                  }
                }}
                className="bg-transparent border-b border-white outline-none w-full"
              />
            ) : (
              <Link
                to={`/folders/${item.id}/${item.name}`}
                className="w-full"
                onDoubleClick={(e) => {
                  e.preventDefault();
                  setEditingId(item.id);
                  setTempName(item.name);
                  setOriginalName(item.name);
                }}
              >
                <h3>{item.name}</h3>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Folders;
