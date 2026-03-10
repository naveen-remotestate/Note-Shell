import { useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router";
// import { getFolderNotesById } from "../api/get";
import { getFolderNotesById } from "../../../api/NotesApi";
import NotesLoader from "../../UI/Theme/NotesLoader";
function Notes() {
  const paramData = useParams(); //getting ID and Name of folder through params
  const folderHeading = paramData?.name;
  const folderId = paramData.id ? paramData.id : null;

  type allNotesType = {
    id: string;
    folderId: string;
    title: string;
    updatedAt: string;
    preview: string;
  };

  const [allNotes, setAllNotes] = useState<allNotesType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [Pagination, setStopPagination] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const observerInstance = useRef<IntersectionObserver | null>(null);

  async function getAllNotes(pageNumber: number) {
    if (!folderId || loading || Pagination) return;
    // console.log("pagNumber", pageNumber);
    setLoading(true);

    const data = await getFolderNotesById(folderId, pageNumber, 15);
    if (!data || data.notes.length === 0) {
      // stopPagination.current = true;
      setStopPagination(true);
      setLoading(false);
      observerInstance.current?.disconnect();
      return;
    }
    if (page > 1) {
      setAllNotes((prev) => {
        const ids = new Set(prev.map((n: allNotesType) => n.id));
        const filtered = data.notes.filter((n: allNotesType) => !ids.has(n.id));
        return [...prev, ...filtered];
      });
    } else {
      setAllNotes(data.notes);
    }

    if (data.notes.length < 15) {
      // stopPagination.current = true;
      setStopPagination(true);
      observerInstance.current?.disconnect();
    }
    setLoading(false);
  }
  const [isResetDone, setIsResetDone] = useState(false);

  useEffect(() => {
    setAllNotes([]);
    setPage(1);
    setLoading(false);
    // stopPagination.current = false;
    setStopPagination(false);
    observerInstance.current?.disconnect();
    setIsResetDone(true);
  }, [folderId]);

  useEffect(() => {
    if (isResetDone) {
      getAllNotes(page);
      setIsResetDone(false);
    }
  }, [isResetDone]);

  useEffect(() => {
    if (!isResetDone) {
      getAllNotes(page);
    }
  }, [page]);

  useEffect(() => {
    observerInstance.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: "200px",
      },
    );

    if (observerRef.current) {
      observerInstance.current.observe(observerRef.current);
    }

    return () => observerInstance.current?.disconnect();
  }, [loading]);

  function getdate(date: string): string {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  }
  return (
    // title is fixed
    <div className="flex flex-col h-full w-full">
      <div>
        <h1 className="text-headingcolor overflow-x-auto no-scrollbar font-SourceSans3 text-2xl p-4 font-semibold mr-5">
          {folderHeading}
        </h1>
      </div>

      {/* Scrollable Notes */}
      {loading && allNotes.length === 0 ? (
        <NotesLoader />
      ) : (
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {allNotes.length !== 0 ? (
            <div className="flex flex-col gap-3 pl-4 pr-4 pb-4">
              {allNotes.map((item) => (
                <NavLink
                  to={
                    "/folders/" +
                    item.folderId +
                    "/" +
                    paramData.name +
                    "/" +
                    "content/" +
                    item.id
                  }
                  key={`${item.id}`}
                  className={({ isActive }) =>
                    `w-full flex flex-col p-3 transition-colors duration-200 ${
                      isActive
                        ? "bg-activecolor text-white"
                        : "bg-notesbg hover:bg-activecolor/40"
                    }`
                  }
                >
                  <h2 className="w-full font-SourceSans3 overflow-hidden font-semibold text-2xl text-headingcolor pl-3 pr-3 truncate">
                    {item.title}
                  </h2>

                  <div className="flex flex-row overflow-hidden font-SourceSans3 text-menutextcolor p-3 gap-4">
                    <h3>{getdate(item.updatedAt)}</h3>
                    <h3 className="truncate">{item.preview}</h3>
                  </div>
                </NavLink>
              ))}
              <div ref={observerRef} className="h-10"></div>
              {loading && allNotes.length > 0 && (
                <div className="flex justify-center p-4 text-menutextcolor">
                  Loading more notes...
                </div>
              )}
            </div>
          ) : (
            <h2 className="flex justify-center items-center text-menutextcolor h-full">
              This Folder is Empty
            </h2>
          )}
        </div>
      )}
    </div>
  );
}
export default Notes;
