import { useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router";
import { getArchives } from "../../api/NotesApi";
import NotesLoader from "../../components/UI/Theme/NotesLoader";
function Archives() {
  type allArchivesNotesType = {
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

  const [allArchivesNotes, setAllArchivesNotes] = useState<
    allArchivesNotesType[]
  >([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [stopPagination, setStopPagination] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const observerInstance = useRef<IntersectionObserver | null>(null);

  async function getAllArchives(pageNumber: number) {
    if (loading || stopPagination) return;

    setLoading(true);

    const data = await getArchives(pageNumber, 15);

    if (!data || data.length === 0) {
      setStopPagination(true);
      setLoading(false);
      observerInstance.current?.disconnect();
      return;
    }

    setAllArchivesNotes((prev) => {
      const ids = new Set(prev.map((n) => n.id));
      const filtered = data.filter((n: allArchivesNotesType) => !ids.has(n.id));
      return [...prev, ...filtered];
    });
    if (data.length < 15) {
      setStopPagination(true);
      observerInstance.current?.disconnect();
    }
    setLoading(false);
  }

  useEffect(() => {
    setAllArchivesNotes([]);
    setPage(1);
    setLoading(false);
    setStopPagination(false);
    observerInstance.current?.disconnect();
  }, [paramdata.id]);

  useEffect(() => {
    getAllArchives(page);
  }, [page, paramdata.id]);

  useEffect(() => {
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
            Archives
          </h1>
        </div>
        {/* Scrollable Notes */}
        {loading && allArchivesNotes.length === 0 ? (
          <NotesLoader />
        ) : (
          <div className="flex-1 overflow-y-auto no-scrollbar">
            {allArchivesNotes.length != 0 ? (
              <div className="flex flex-col gap-3 pl-4 pr-4 pb-4">
                {allArchivesNotes.map((item) => (
                  <NavLink
                    to={
                      "/archives/" +
                      item.folderId +
                      "/" +
                      item.folder.name +
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
                {loading && allArchivesNotes.length > 0 && (
                  <div className="flex justify-center p-4 text-menutextcolor">
                    Loading more notes...
                  </div>
                )}
              </div>
            ) : (
              <h2 className="flex justify-center items-center text-menutextcolor ">
                No Archives
              </h2>
            )}
          </div>
        )}
      </div>
    </>
  );
}
export default Archives;
