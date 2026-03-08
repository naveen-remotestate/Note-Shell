import { useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router";
import { getFavorites } from "../../api/NotesApi";

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
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  async function getAllFavorites(pageNumber: number) {
    if (loading) return;

    setLoading(true);

    const data = await getFavorites(pageNumber, 15);

    if (!data || data.length === 0) {
      setLoading(false);
      return;
    }

    setAllFavoritesNotes((prev) => {
      const ids = new Set(prev.map((n) => n.id));
      const filtered = data.filter(
        (n: allFavoritesNotesType) => !ids.has(n.id),
      );
      return [...prev, ...filtered];
    });

    setLoading(false);
  }

  useEffect(() => {
    getAllFavorites(page);
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
      <div className="flex flex-col h-full w-full no-scrollbar">
        <div>
          <h1 className="text-headingcolor font-SourceSans3 text-2xl p-4 font-semibold ">
            Favorites
          </h1>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {allFavoritesNotes.length != 0 ? (
            <div className="flex flex-col gap-3 pl-4 pr-4 pb-4">
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
                    `w-full flex  flex-col p-3 h-fit transition-colors duration-200 justify-center ${
                      isActive
                        ? "bg-activecolor text-white"
                        : "hover:bg-activecolor/40 bg-notesbg"
                    }`
                  }
                  // className="flex flex-col w-full h-fit bg-notesbg justify-center p-3 hover:bg-activecolor"
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
            </div>
          ) : (
            <h2 className="flex justify-center items-center text-menutextcolor ">
              No Favorites
            </h2>
          )}
        </div>
      </div>
    </>
  );
}
export default Favorites;
