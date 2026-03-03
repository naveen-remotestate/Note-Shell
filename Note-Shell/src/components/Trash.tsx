import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { getTrash } from "../api/get";
function Trash() {
  type allTrashNotesType = {
    id: string;
    folderId: string;
    title: string;
    updatedAt: string;
    preview: string;
    folder: {
      name: string;
    };
  };

  const [allTrashNotes, setAllTrashNotes] = useState<allTrashNotesType[]>([]);

  useEffect(() => {
    async function getdata() {
      const data = await getTrash();
      setAllTrashNotes(data);
    }
    getdata();
  }, []);
  function getdate(date: string): string {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  }
  return (
    <>
      <div className="overflow-y-auto flex flex-col h-screen">
        <div>
          {
            <h1 className="text-headingcolor font-SourceSans3 text-2xl p-4 font-semibold ">
              Trash
            </h1>
          }
        </div>
        {allTrashNotes.length != 0 ? (
          <div className="flex flex-col gap-3 pl-4 pr-4">
            {allTrashNotes.map((item) => (
              <NavLink
                to={
                  "/trash/" + item.folderId + "/" + item.title + "/" + item.id
                }
                key={item.id}
                // className="flex flex-col w-full h-fit bg-notesbg justify-center p-3 hover:bg-blue-500"
                className={({ isActive }) =>
                  `w-full flex flex-col p-3 h-fit transition-colors duration-200 justify-center ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-500/40 bg-notesbg"
                  }`
                }
              >
                <h2 className=" w-full font-SourceSans3 font-semibold text-2xl text-headingcolor pl-3 pr-3 truncate">
                  {item.title}
                </h2>
                <div className="flex flex-row overflow-hidden font-SourceSans3 text-menutextcolor p-3 gap-4">
                  <h3>{getdate(item.updatedAt)}</h3>
                  <h3>{item.preview}</h3>
                </div>
              </NavLink>
            ))}
          </div>
        ) : (
          <h2 className="flex justify-center items-center text-menutextcolor ">
            The Trash is Empty
          </h2>
        )}
      </div>
    </>
  );
}
export default Trash;
