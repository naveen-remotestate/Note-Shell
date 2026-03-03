import Sidebar from "./components/Sidebar";
import Notes from "./components/Notes";
import NoteContent from "./components/NoteContent";
import { BrowserRouter, Route, Routes } from "react-router";
import Favorites from "./components/Favorites";
import Archives from "./components/Archive";
import Trash from "./components/Trash";
import Restoretrash from "./components/RestoreTrash";
import { useState } from "react";
import SearchResults from "./components/SearchResults";
function App() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-row w-full h-screen overflow-hidden">
          <div className="bg-primary w-20/100 h-full flex flex-col text-center gap-6 text-menutextcolor font-SourceSans3-600 font-semibold ">
            <Sidebar
              setSearchResults={setSearchResults}
              setIsSearching={setIsSearching}
            />
          </div>

          <Routes>
            <Route
              path="folders/:id/:name?"
              element={
                <>
                  <div className="bg-secondary w-25/100 h-full">
                    {isSearching ? (
                      <SearchResults results={searchResults} />
                    ) : (
                      <Notes />
                    )}
                  </div>
                  <div className="bg-primary w-55/100 h-full flex">
                    <NoteContent />
                  </div>
                </>
              }
            />
            {/* {" this is for favorite "} */}
            <Route
              path="favorites"
              element={
                <>
                  <div className="bg-secondary w-25/100 h-full">
                    <Favorites />
                  </div>
                  <div className="bg-primary w-55/100 h-full flex">
                    <NoteContent />
                  </div>
                </>
              }
            />
            <Route
              path="favorites/:id/:name/:noteid"
              element={
                <>
                  <div className="bg-secondary w-25/100 h-full">
                    <Favorites />
                  </div>
                  <div className="bg-primary w-55/100 h-full flex">
                    <NoteContent />
                  </div>
                </>
              }
            />

            {/* {" this is for Archives "} */}
            <Route
              path="archives"
              element={
                <>
                  <div className="bg-secondary w-25/100 h-full">
                    <Archives />
                  </div>
                  <div className="bg-primary w-55/100 h-full flex">
                    <NoteContent />
                  </div>
                </>
              }
            />
            <Route
              path="archives/:id/:title/:noteid"
              element={
                <>
                  <div className="bg-secondary w-25/100 h-full">
                    <Archives />
                  </div>
                  <div className="bg-primary w-55/100 h-full flex">
                    <NoteContent />
                  </div>
                </>
              }
            />
            {/* This is for Trash */}
            <Route
              path="trash"
              element={
                <>
                  <div className="bg-secondary w-25/100 h-full">
                    <Trash />
                  </div>
                  <div className="bg-primary w-55/100 h-full flex">
                    <NoteContent />
                  </div>
                </>
              }
            />

            <Route
              path="trash/:id/:name?/:noteid"
              element={
                <>
                  <div className="bg-secondary w-25/100 h-full">
                    <Trash key="diff-trash" />
                  </div>
                  <div className="bg-primary w-55/100 h-full flex">
                    <Restoretrash />
                  </div>
                </>
              }
            />

            <Route
              path="folders/:id/:name/:noteid"
              element={
                <>
                  <div className="bg-secondary w-25/100 h-full">
                    {isSearching ? (
                      <SearchResults results={searchResults} />
                    ) : (
                      <Notes />
                    )}
                  </div>
                  <div className="bg-primary w-55/100 h-full flex">
                    <NoteContent />
                  </div>
                </>
              }
            />
            <Route
              path="folders/:id/:name/content/:noteid"
              element={
                <>
                  <div className="bg-secondary w-25/100 h-full">
                    {isSearching ? (
                      <SearchResults results={searchResults} />
                    ) : (
                      <Notes />
                    )}
                  </div>
                  <div className="bg-primary w-55/100 h-full flex">
                    <NoteContent />
                  </div>
                </>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
