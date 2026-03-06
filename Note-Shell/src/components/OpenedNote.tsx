import { useEffect, useRef, useState } from "react";
import DateIcon from "../assets/DateIcon";
import FolderIcon from "../assets/FolderIcon";
import ThreeDotIcon from "../assets/ThreeDotIcon";
import { getFolders, getNoteById } from "../api/get";
import FavoritesIcon from "../assets/FavoritesIcon";
import ArchivedIcon from "../assets/ArchivedIcon";
import TrashIcon from "../assets/TrashIcon";
import {
  patchMarkArchive,
  patchMarkFavorite,
  patchNoteContent,
  patchNoteName,
} from "../api/patch";
import { useNavigate, useParams } from "react-router";
import { deleteNote } from "../api/delete";
import DropdownArrowIcon from "../assets/DropdownArrowIcon";

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
  const [isfolderDropdown, setIsFolderDropDown] = useState(false);

  const navigate = useNavigate();
  const paramdata = useParams();

  async function markFavorite(id: string, value: boolean) {
    try {
      await patchMarkFavorite(id, value);

      setNote((prev) => (prev ? { ...prev, isFavorite: value } : prev));
      setIsThreeDotOpen(false);

      if (!value && window.location.pathname.includes("/favorites")) {
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
        navigate(-1);
      } else {
        navigate(`/folders/${paramdata.id}/${paramdata.name}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // title editing
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  async function updateNoteTitle() {
    if (!note || newTitle.trim() === "") {
      setIsEditingTitle(false);
      return;
    }

    try {
      await patchNoteName(note.id, newTitle);
      setNote((prev) => (prev ? { ...prev, title: newTitle } : prev));
      navigate(`/folders/${paramdata.id}/${paramdata.name}/content/${note.id}`);
    } catch (error) {
      console.error(error);
    }

    setIsEditingTitle(false);
  }

  // note content
  const [noteContent, setNoteContent] = useState("");

  useEffect(() => {
    if (!note) return;

    const delay = setTimeout(async () => {
      try {
        await patchNoteContent(note.id, noteContent);
      } catch (error) {
        console.error(error);
      }
    }, 800);

    return () => clearTimeout(delay);
  }, [noteContent]);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (id) {
      async function getdata() {
        const data = await getNoteById(id);

        setNote(data);
        setNoteContent(data.content);

        if (data.title === "Untitled Note" || data.title === "") {
          setIsEditingTitle(true);
          setNewTitle(data.title);
        }
      }

      getdata();
    }
  }, [id]);

  const date = new Date(note?.updatedAt ? note.updatedAt : "");

  // folders
  type folderType = {
    id: string;
    name: string;
  };

  const [folders, setFolders] = useState<folderType[]>([]);

  useEffect(() => {
    async function getdata() {
      const data = await getFolders();
      setFolders(data);
    }
    getdata();
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen w-full p-12">
        {/* Header-title and threedot button*/}
        <div className="flex flex-row justify-between p-2 ">
          {/* Note title with editing */}
          <div className="flex flex-row truncate w-8/10 overflow-scroll no-scrollbar ">
            {isEditingTitle ? (
              <input
                autoFocus
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onBlur={updateNoteTitle}
                onKeyDown={(e) => {
                  if (e.key === "Enter") updateNoteTitle();
                  if (e.key === "Escape") setIsEditingTitle(false);
                }}
                className="bg-transparent border-b border-white outline-none text-2xl font-semibold text-headingcolor"
              />
            ) : (
              <h1
                onDoubleClick={() => {
                  setIsEditingTitle(true);
                  setNewTitle(note?.title || "");
                }}
                className="text-headingcolor text-2xl font-SourceSans3 font-semibold cursor-pointer"
              >
                {note?.title}
              </h1>
            )}

            {note?.isFavorite && <FavoritesIcon active={note?.isFavorite} />}
          </div>

          {/* three dot */}
          <div className="relative">
            <button onClick={() => setIsThreeDotOpen((prev) => !prev)}>
              <ThreeDotIcon className="text-headingcolor hover:text-blue-500 transition" />
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
                  <div className="p-4 flex flex-row gap-3 hover:bg-blue-500 cursor-pointer items-center group">
                    <FavoritesIcon
                      active={note?.isFavorite}
                      className="text-menutextcolor group-hover:text-white transition"
                    />
                    <h1 className="group-hover:text-white transition">
                      {note?.isFavorite
                        ? "Remove from Favorites"
                        : "Add to Favorites"}
                    </h1>
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
                    <ArchivedIcon />
                    <h1>{note?.isArchived ? "Unarchive" : "Archive"}</h1>
                  </div>
                </li>

                <div className="border-b border-menutextcolor ml-4 w-8/10"></div>

                <li
                  onClick={async (e) => {
                    e.preventDefault();

                    const confirmDelete = window.confirm(
                      "Are you sure you want to delete this note?",
                    );

                    if (!confirmDelete) return;

                    try {
                      await deleteNote(id);
                      setIsThreeDotOpen(false);
                      setNote(null);
                      navigate(
                        `/trash/${paramdata.id}/${note?.title}/${paramdata.noteid}`,
                      );
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                >
                  <div className="p-4 flex flex-row gap-3 hover:bg-blue-500 cursor-pointer">
                    <TrashIcon />
                    <h3>Delete</h3>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* header- date and folder */}
        <div className="flex flex-col gap-3.5 font-SourceSans3 text-sm text-menutextcolor p-2">
          <div className="flex flex-row gap-5 pt-3">
            <DateIcon className="text-menutextcolor hover:text-blue-500 transition" />
            <h4>Date</h4>
            <h4 className="text-headingcolor font-semibold">
              {date.toLocaleDateString()}
            </h4>
          </div>

          <div className="border-b bg-secondary"></div>

          <div className="flex flex-row gap-5">
            <FolderIcon className="text-headingcolor hover:text-blue-500 transition" />
            <h4>Folder</h4>

            <div className="text-headingcolor truncate w-3xs font-semibold">
              <button
                className="flex flex-row"
                onClick={() => setIsFolderDropDown((prev) => !prev)}
              >
                {foldername}
                <DropdownArrowIcon />
              </button>

              <div
                className={`absolute bg-secondary overflow-hidden truncate mt-2 z-10 ${
                  isfolderDropdown ? "block" : "hidden"
                } rounded-2xl w-55`}
              >
                <ul className="p-2 text-sm text-body font-medium">
                  {folders.map((items) => (
                    <li key={items.id} className="hover:bg-blue-400">
                      {items.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* text area */}
        <div className="flex-1 min-h-0 w-full text-headingcolor p-2">
          <textarea
            ref={textareaRef}
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Enter Note"
            className="
              w-full
              h-full
              resize-none
              overflow-y-auto
              no-scrollbar
              bg-transparent
              outline-none
              border border-menutextcolor/30
              rounded-lg
              p-3
              focus:border-blue-500
            "
          />
        </div>
      </div>
    </>
  );
}

export default OpenedNote;
