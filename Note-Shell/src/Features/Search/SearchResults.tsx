import { NavLink } from "react-router";
type allNotesType = {
  id: string;
  folderId: string;
  title: string;
  updatedAt: string;
  preview: string;
  folder: {
    name: string;
  };
};
type propstype = {
  results: allNotesType[];
};

export default function SearchResults({ results }: propstype) {
  function getdate(date: string): string {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  }

  return (
    <div className="overflow-y-auto no-scrollbar flex flex-col h-screen">
      <h1 className="text-headingcolor font-SourceSans3 text-2xl p-4 font-semibold">
        Search Results
      </h1>

      {results.length !== 0 ? (
        <div className="flex flex-col gap-3 pl-4 pr-4">
          {results.map((item) => (
            <NavLink
              to={`/folders/${item.folderId}/${item.folder.name}/content/${item.id}`}
              key={item.id}
              className={({ isActive }) =>
                `w-full flex flex-col p-3 transition-colors duration-200 ${
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
        </div>
      ) : (
        <h2 className="flex justify-center items-center text-menutextcolor">
          No Results Found
        </h2>
      )}
    </div>
  );
}
