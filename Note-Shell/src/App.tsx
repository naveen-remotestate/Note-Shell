import Sidebar from "./components/Layout/Sidebar/Sidebar";
import Notes from "./components/Layout/NoteList/Notes";
import NoteContent from "./components/Layout/NoteContent/NoteContent";
import { BrowserRouter, Route, Routes } from "react-router";
import Favorites from "./Features/Favorite/Favorites";
import Archives from "./Features/Archive/Archive";
import Trash from "./Features/Trash/Trash";
import Restoretrash from "./Features/Trash/RestoreTrash";
import { useState } from "react";
import SearchResults from "./Features/Search/SearchResults";
import WelcomeNote from "./components/Layout/Welcome/WelcomeNote";
import type { ResponsePicked } from "./components/Types/NotesType";
function App() {
  const [searchResults, setSearchResults] = useState<ResponsePicked[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-row w-full h-screen overflow-hidden bg-white dark:bg-neutral-950">
          <div className="bg-primary w-20/100 h-full flex flex-col text-center gap-6 text-menutextcolor font-SourceSans3-600 font-semibold ">
            <Sidebar
              setSearchResults={setSearchResults}
              setIsSearching={setIsSearching}
            />
          </div>

          <Routes>
            <Route
              path=""
              element={
                <>
                  <div className="bg-secondary text-headingcolor w-25/100 h-full flex items-center justify-center">
                    <WelcomeNote />
                  </div>
                  <div className="bg-primary w-55/100 h-full flex"></div>
                </>
              }
            />
            {/* for notes or search results both*/}
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
              path="archives/:id/:name/:noteid"
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
