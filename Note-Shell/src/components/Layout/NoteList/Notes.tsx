import { useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router";
import { getFolderNotesById } from "../../../api/NotesApi";
import NotesLoader from "../../UI/Theme/NotesLoader";

type allNotesType = {
  id: string;
  folderId: string;
  title: string;
  updatedAt: string;
  preview: string;
};

function Notes() {
  const paramData = useParams();
  const folderHeading = paramData?.name;
  const folderId = paramData.id ? paramData.id : null;

  const [allNotes, setAllNotes] = useState<allNotesType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const observerInstance = useRef<IntersectionObserver | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!folderId) return;

    abortControllerRef.current?.abort();
    observerInstance.current?.disconnect();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const fetchFirstPage = async () => {
      setAllNotes([]);
      setPage(1);
      setHasMore(true);
      setLoading(true);

      const data = await getFolderNotesById(folderId, 1, 15, {
        signal: controller.signal,
      });

      if (controller.signal.aborted) return;

      const notes = data?.notes || [];
      setAllNotes(notes);

      if (notes.length < 15) {
        setHasMore(false);
      }

      setLoading(false);
    };

    fetchFirstPage();

    return () => {
      controller.abort();
    };
  }, [folderId]);

  useEffect(() => {
    if (!folderId || page <= 1 || !hasMore) return;

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const fetchNextPage = async () => {
      setLoading(true);

      const data = await getFolderNotesById(folderId, page, 15, {
        signal: controller.signal,
      });

      if (controller.signal.aborted) return;

      const notes = data?.notes || [];

      if (notes.length === 0) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      setAllNotes((prev) => {
        const ids = new Set(prev.map((n) => n.id));
        const filtered = notes.filter((n: allNotesType) => !ids.has(n.id));
        return [...prev, ...filtered];
      });

      if (notes.length < 15) {
        setHasMore(false);
      }

      setLoading(false);
    };

    fetchNextPage();

    return () => {
      controller.abort();
    };
  }, [folderId, hasMore, page]);

  useEffect(() => {
    observerInstance.current?.disconnect();

    if (!hasMore || loading) return;

    observerInstance.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { root: null, rootMargin: "200px" },
    );

    if (observerRef.current) {
      observerInstance.current.observe(observerRef.current);
    }

    return () => observerInstance.current?.disconnect();
  }, [hasMore, loading]);

  function getdate(date: string): string {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div>
        <h1 className="text-headingcolor overflow-x-auto no-scrollbar font-SourceSans3 text-2xl p-4 font-semibold mr-5">
          {folderHeading}
        </h1>
      </div>

      {loading && allNotes.length === 0 ? (
        <NotesLoader />
      ) : !loading && allNotes.length === 0 ? (
        <h2 className="flex justify-center items-center text-menutextcolor h-full">
          This Folder is Empty
        </h2>
      ) : (
        <div className="flex-1 overflow-y-auto no-scrollbar">
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
                key={item.id}
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

            {hasMore && <div ref={observerRef} className="h-10"></div>}

            {loading && allNotes.length > 0 && (
              <div className="flex justify-center p-4 text-menutextcolor">
                Loading more notes...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default Notes;
