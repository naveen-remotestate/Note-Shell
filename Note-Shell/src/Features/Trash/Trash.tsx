import { useCallback, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import { getTrash } from "../../api/NotesApi";
import NotesLoader from "../../components/UI/Theme/NotesLoader";
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
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const observerInstance = useRef<IntersectionObserver | null>(null);

  const fetchFirstTrashPage = useCallback(async () => {
    setLoading(true);
    setPage(1);

    const data = await getTrash(1, 15);
    const trashNotes = data || [];

    setAllTrashNotes(trashNotes);
    setHasMore(trashNotes.length === 15);

    setLoading(false);
  }, []);

  const fetchNextTrashNotes = useCallback(async (pageNumber: number) => {
    setLoading(true);

    const data = await getTrash(pageNumber, 15);

    const trashNotes = data || [];

    // console.log("trashNotes", trashNotes);

    if (trashNotes.length === 0) {
      setHasMore(false);
      setLoading(false);
      return;
    }

    setAllTrashNotes((prev) => {
      const ids = new Set(prev.map((n) => n.id));
      const filtered = trashNotes.filter(
        (n: allTrashNotesType) => !ids.has(n.id),
      );
      return [...prev, ...filtered];
    });

    if (trashNotes.length < 15) {
      setHasMore(false);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    const init = () => {
      if (page === 1) {
        fetchFirstTrashPage();
      } else if (hasMore) {
        fetchNextTrashNotes(page);
      }
    };
    init();
  }, [fetchFirstTrashPage, fetchNextTrashNotes, hasMore, page]);

  useEffect(() => {
    observerInstance.current?.disconnect();

    const observer = new IntersectionObserver(
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
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  function getdate(date: string): string {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  }
  return (
    <>
      <div className="flex flex-col h-full w-full">
        <div>
          <h1 className="text-headingcolor font-SourceSans3 text-2xl p-4 font-semibold ">
            Trash
          </h1>
        </div>
        {/* Scrollable Notes */}
        {loading && allTrashNotes.length === 0 ? (
          <NotesLoader />
        ) : (
          <div className="flex-1 overflow-y-auto no-scrollbar">
            {allTrashNotes.length != 0 ? (
              <div className="flex flex-col gap-3 pl-4 pr-4 pb-4">
                {allTrashNotes.map((item) => (
                  <NavLink
                    to={
                      "/Trash/" +
                      item.folderId +
                      "/" +
                      item.title +
                      "/" +
                      item.id
                    }
                    key={item.id}
                    // className="flex flex-col w-full h-fit bg-notesbg justify-center p-3 hover:bg-activecolor"
                    className={({ isActive }) =>
                      `w-full flex flex-col p-3 h-fit transition-colors duration-200 justify-center ${
                        isActive
                          ? "bg-activecolor text-white"
                          : "hover:bg-activecolor/40 bg-notesbg"
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
                <div ref={observerRef} className="h-10"></div>
                {loading && allTrashNotes.length > 0 && (
                  <div className="flex justify-center p-4 text-menutextcolor">
                    Loading more notes...
                  </div>
                )}
              </div>
            ) : (
              <h2 className="flex justify-center items-center text-menutextcolor ">
                The Trash is Empty
              </h2>
            )}
          </div>
        )}
      </div>
    </>
  );
}
export default Trash;
