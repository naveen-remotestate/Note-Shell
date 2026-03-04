import { useEffect, useRef, useState } from "react";
import DateIcon from "../assets/DateIcon";
import FolderIcon from "../assets/FolderIcon";
import ThreeDotIcon from "../assets/ThreeDotIcon";
import { getFolderNotesById, getNoteById } from "../api/get";
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

      // Only refresh favorites page
      if (!value && window.location.pathname.includes("/favorites")) {
        navigate("/favorites");
      }
    } catch (error) {
      console.error(error);
    }
  }
  const paramdata = useParams();
  // console.log(paramdata);
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

  //////////////Editing note title
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  //updating note tiltle
  async function updateNoteTitle() {
    if (!note || newTitle.trim() === "") {
      setIsEditingTitle(false);
      return;
    }

    try {
      await patchNoteName(note.id, newTitle);

      setNote((prev) => (prev ? { ...prev, title: newTitle } : prev));

      // force Notes list refresh
      navigate(`/folders/${paramdata.id}/${paramdata.name}/content/${note.id}`);
    } catch (error) {
      console.error(error);
    }

    setIsEditingTitle(false);
  }
  ///// edit the content of the note
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

  ///seting the text areaa heigth
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }, [noteContent]);
  /////////////////////
  useEffect(() => {
    if (id) {
      async function getdata() {
        const data = await getNoteById(id);

        setNote(data);
        setNoteContent(data.content);

        //  start editing title if a new note is coming
        if (data.title === "Untitled Note") {
          setIsEditingTitle(true);
          setNewTitle(data.title);
        }
      }

      getdata();
    }
  }, [id]);
  // const getdate:string|null =note?.updatedAt?
  const date = new Date(note?.updatedAt ? note.updatedAt : "");

  return (
    <>
      <div className="flex flex-col h-full w-full p-12">
        <div className="flex flex-row justify-between p-2">
          <div className="flex flex-row truncate w-8/10 overflow-scroll ">
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
            {note?.isFavorite ? (
              <FavoritesIcon active={note?.isFavorite} />
            ) : (
              <></>
            )}
          </div>

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
                {/* mark favorite from three dot */}
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

                {/* mark archive from three dot */}
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

                {/* delete from the threedot */}
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

                      // Clear current note
                      setNote(null);

                      // Navigate back to folder or previous screen
                      navigate(-1);
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
        <div
          id="frame20"
          className="flex flex-col gap-3.5 font-SourceSans3 text-sm text-menutextcolor p-2"
        >
          <div id="frame19a" className="flex flex-row gap-5 pt-3 ">
            <DateIcon className="text-menutextcolor hover:text-blue-500 transition" />
            <h4>Date</h4>
            <h4 className="text-headingcolor font-semibold  ">
              {date.toLocaleDateString()}
            </h4>
          </div>
          <div className="border-b bg-secondary"></div>
          <div id="frame19b" className="flex flex-row gap-5 ">
            <div>
              <FolderIcon className="text-headingcolor hover:text-blue-500 transition" />
            </div>
            <h4>Folder</h4>
            <h4 className="text-headingcolor truncate w-3xs font-semibold  ">
              {foldername}
            </h4>
          </div>
        </div>
        <div className="h-full w-full text-headingcolor p-2">
          <textarea
            ref={textareaRef}
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Enter Note"
            className="w-full min-h-30 resize-none overflow-hidden bg-transparent
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
