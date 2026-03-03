import { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router";
import { getFavorites, getFolderNotesById } from "../api/get";

function Favorites() {
  type allFavoritesNotesType = {
    id: string;
    folderId: string;
    title: string;
    updatedAt: string;
    preview: string;
    folder: {
      name: string;
    };
  };
  const paramdata = useParams();

  const [allFavoritesNotes, setAllFavoritesNotes] = useState<
    allFavoritesNotesType[]
  >([]);

  useEffect(() => {
    async function getdata() {
      const data = await getFavorites();
      setAllFavoritesNotes(data);
    }
    getdata();
  }, [paramdata.id]);
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
              Favorites
            </h1>
          }
        </div>
        {allFavoritesNotes.length != 0 ? (
          <div className="flex flex-col gap-3 pl-4 pr-4">
            {allFavoritesNotes.map((item) => (
              <NavLink
                to={
                  "/favorites/" +
                  item.folderId +
                  "/" +
                  item.folder.name +
                  "/" +
                  item.id
                }
                key={item.id}
                className={({ isActive }) =>
                  `w-full flex flex-col p-3 h-fit transition-colors duration-200 justify-center ${
                    isActive ? "bg-blue-500 text-white" : "hover:bg-blue-500/40"
                  }`
                }
                // className="flex flex-col w-full h-fit bg-notesbg justify-center p-3 hover:bg-blue-500"
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
            No Favorites
          </h2>
        )}
      </div>
    </>
  );
}
export default Favorites;
