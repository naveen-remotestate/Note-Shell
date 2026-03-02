import { useEffect, useState } from "react";
import DateIcon from "../assets/DateIcon";
import FolderIcon from "../assets/FolderIcon";
import ThreeDotIcon from "../assets/ThreeDotIcon";
import { getNoteById } from "../api/get";
import FavoritesIcon from "../assets/FavoritesIcon";
import ArchivedIcon from "../assets/ArchivedIcon";
import TrashIcon from "../assets/TrashIcon";
import { patchMarkArchive, patchMarkFavorite } from "../api/patch";
import { useNavigate } from "react-router";
type propType = {
  id: string;
  foldername: string | null;
};

function OpenedNote({ id, foldername }: propType) {
  type noteType = {
    id: string;
    title: string;
    content: string;
    isFavorite: boolean;
    isArchived: boolean;
    createdAt: string;
    updatedAt: string;
  };
  const [note, setNote] = useState<noteType | null>(null);
  const [isThreeDotOpen, setIsThreeDotOpen] = useState(false);

  const navigate = useNavigate();

  async function markFavorite(id: string, value: boolean) {
    try {
      await patchMarkFavorite(id, value);

      setNote((prev) => (prev ? { ...prev, isFavorite: value } : prev));
      setIsThreeDotOpen(false);
      if (!value) {
        navigate("/favorites");
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function markArchive(id: string, value: boolean) {
    try {
      await patchMarkArchive(id, value);

      setNote((prev) => (prev ? { ...prev, isArchived: value } : prev));
      setIsThreeDotOpen(false);
      if (!value) {
        navigate("/archives");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (id) {
      async function getdata() {
        const data = await getNoteById(id);
        setNote(data);
      }
      getdata();
    }
  }, [id]);
  // const getdate:string|null =note?.updatedAt?
  const date = new Date(note?.updatedAt ? note.updatedAt : "");

  return (
    <>
      <div id="frame18" className="flex flex-col h-full w-full p-12">
        <div className="flex flex-row justify-between p-2">
          <div className="flex flex-row">
            <h1 className="text-headingcolor text-2xl font-SourceSans3 font-semibold">
              {note?.title}
            </h1>
            {note?.isFavorite ? (
              <FavoritesIcon active={note?.isFavorite} />
            ) : (
              <></>
            )}
          </div>

          <div className="relative">
            <button onClick={() => setIsThreeDotOpen((prev) => !prev)}>
              <ThreeDotIcon />
            </button>

            <div
              className={`absolute right-0 mt-2 z-10 ${
                isThreeDotOpen ? "block" : "hidden"
              } rounded-2xl w-55`}
            >
              <ul className="rounded-sm bg-highlightednotecolor text-sm font-semibold text-headingcolor">
                <li
                  onClick={() =>
                    note?.isFavorite
                      ? markFavorite(id, false)
                      : markFavorite(id, true)
                  }
                >
                  <div className="p-4 flex flex-row gap-3 hover:bg-blue-500 cursor-pointer">
                    {note?.isFavorite ? (
                      <>
                        <FavoritesIcon active={note?.isFavorite} />
                        <h1>Remove from Favorites</h1>
                      </>
                    ) : (
                      <>
                        <FavoritesIcon active={note?.isFavorite} />
                        <h1>Add to Favorites</h1>
                      </>
                    )}
                  </div>
                </li>
                <li
                  onClick={() =>
                    note?.isArchived
                      ? markArchive(id, false)
                      : markArchive(id, true)
                  }
                >
                  <div className="p-4 flex flex-row gap-3 hover:bg-blue-500 cursor-pointer">
                    {note?.isArchived ? (
                      <>
                        <ArchivedIcon />
                        <h1>Unarchive</h1>
                      </>
                    ) : (
                      <>
                        <ArchivedIcon />
                        <h1>Archive</h1>
                      </>
                    )}
                  </div>
                </li>
                <div className="border-b border-menutextcolor ml-4 w-8/10"></div>
                <li className="p-4 flex flex-row gap-3 hover:bg-blue-500  cursor-pointer">
                  <TrashIcon /> Delete
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          id="frame20"
          className="flex flex-col gap-3.5 font-SourceSans3 text-sm text-menutextcolor p-2"
        >
          <div id="frame19a" className="flex flex-row gap-5 pt-3 ">
            <DateIcon />
            <h4>Date</h4>
            <h4 className="text-headingcolor font-semibold  ">
              {date.toLocaleDateString()}
            </h4>
          </div>
          <div className="border-b bg-secondary"></div>
          <div id="frame19b" className="flex flex-row gap-5 ">
            <FolderIcon />
            <h4>Folder</h4>
            <h4 className="text-headingcolor font-semibold  ">{foldername}</h4>
          </div>
        </div>
        <div className="h-90/100 w-full text-headingcolor p-2">
          <textarea
            name="postContent"
            defaultValue={note?.content}
            placeholder="Enter Note"
            className="h-full w-full wrap-normal"
          />
        </div>
      </div>
    </>
  );
}
export default OpenedNote;
