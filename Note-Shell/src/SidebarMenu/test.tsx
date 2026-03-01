import AddFolderIcon from "../assets/AddFolderIcon";
import CloseFolderIcon from "../assets/CloseFolderIcon";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getFolders } from "../api/get";
import { patchFolderName } from "../api/patch";
import { postFolder } from "../api/post";
import TrashIcon from "../assets/TrashIcon";
import { deleteFolder } from "../api/delete";

function Folders() {
  type folderType = {
    id: string;
    name: string;
  };

  const [folders, setFolders] = useState<folderType[]>([]);
  const [newFoldername, setNewFolderName] = useState<string>("");
  const [folderIdToEdit, setFolderIdToEdit] = useState<string | null>("");

  // Fetch folders on mount
  useEffect(() => {
    async function getData() {
      const data = await getFolders();
      setFolders(data);
    }
    getData();
  }, []);

  // Rename folder
  async function updateFolderName(id: string) {
    if (!newFoldername.trim()) {
      setFolderIdToEdit(null);
      return;
    }
    try {
      await patchFolderName(id, newFoldername);
      setFolders((prev) =>
        prev.map((folder) =>
          folder.id === id ? { ...folder, name: newFoldername } : folder,
        ),
      );
    } catch (error) {
      console.log(error);
    }
    setFolderIdToEdit(null);
  }

  // Add new folder
  const handleAddFolder = async () => {
    const name = prompt("Enter folder name");
    if (!name || !name.trim()) return;

    try {
      const newFolder = await postFolder(name);
      setFolders((prev) => [...prev, newFolder]); // update list in real-time
    } catch (error) {
      console.log(error);
    }
  };

  // Delete folder
  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // prevent navigation
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this folder? This will delete all notes inside.",
    );
    if (!confirmDelete) return;

    try {
      await deleteFolder(id);
      setFolders((prev) => prev.filter((f) => f.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col text-left overflow-scroll">
      <div className="flex flex-row justify-between pl-3 pr-3">
        <h5 className="text-xs font-semibold">Folders</h5>
        <div onClick={handleAddFolder} className="cursor-pointer">
          <AddFolderIcon />
        </div>
      </div>

      <div className="flex flex-col overflow-y-auto max-h-96">
        {folders.map((item) => (
          <div
            key={item.id}
            className="w-full flex flex-row gap-3 p-3 hover:bg-blue-500 items-center"
          >
            <CloseFolderIcon />

            {folderIdToEdit === item.id ? (
              <input
                autoFocus
                value={newFoldername}
                onChange={(e) => setNewFolderName(e.target.value)}
                onBlur={() => updateFolderName(item.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") updateFolderName(item.id);
                  if (e.key === "Escape") setFolderIdToEdit(null);
                }}
                className="bg-transparent border-b border-white outline-none w-full"
              />
            ) : (
              <>
                <Link
                  to={`/folders/${item.id}/${item.name}`}
                  className="flex-1"
                  onDoubleClick={(e) => {
                    e.preventDefault();
                    setFolderIdToEdit(item.id);
                    setNewFolderName(item.name);
                  }}
                >
                  <h3>{item.name}</h3>
                </Link>

                <div onClick={(e) => handleDelete(e, item.id)}>
                  <TrashIcon className="cursor-pointer text-white hover:text-red-500" />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Folders;
