import type {
  noteContentType,
  NotesType,
  recentResponeType,
} from "../components/Types/NotesType";
import CallApi from "./CallApi";
//geting all notes of a folder
// export async function getFolderNotesById(
//   folderId: string | null,
//   page: number,
//   limit: number = 15,
// ) {
//   try {
//     const response = await CallApi.get<NotesType>(
//       `/notes?archived=false&deleted=false&folderId=${folderId}&page=${page}&limit=${limit}`,
//     );

//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// }
//getting all notes with abort controller
export async function getFolderNotesById(
  folderId: string | null,
  page: number,
  limit: number = 15,
  options?: { signal?: AbortSignal },
) {
  try {
    const response = await CallApi.get<NotesType>(
      `/notes?archived=false&deleted=false&folderId=${folderId}&page=${page}&limit=${limit}`,
      {
        signal: options?.signal,
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

//getting all three recent notes
export async function getRecent() {
  try {
    const response = await CallApi.get<recentResponeType>("/notes/recent");
    return response.data?.recentNotes;
  } catch (error) {
    console.error(error);
  }
}

//getting the full note- content and details
export async function getNoteById(id: string | null) {
  try {
    const response = await CallApi.get<noteContentType>(`/notes/${id}`);
    // console.log(response.data.note);
    return response.data?.note;
  } catch (error) {
    console.log(error);
  }
}

//Search on Notes
export async function getSearch(searchInput: string) {
  try {
    const response = await CallApi.get<NotesType>(
      `/notes?archived=false&deleted=false&page=1&limit=all&search=${searchInput}`,
    );
    return response.data?.notes;
  } catch (error) {
    console.log(error);
  }
}

//geting deleted notes
export async function getTrash(page: number, limit: number = 15) {
  const response = await CallApi.get<NotesType>(
    `/notes?deleted=true&page=${page}&limit=${limit}`,
  );

  return response.data?.notes;
}

//getting Archive Notes
export async function getArchives(page: number, limit: number = 15) {
  const response = await CallApi.get<NotesType>(
    `/notes?archived=true&page=${page}&limit=${limit}`,
  );

  return response.data?.notes;
}
//getting all the favorite notes
export async function getFavorites(page: number, limit: number = 15) {
  const response = await CallApi.get<NotesType>(
    `/notes?favorite=true&page=${page}&limit=${limit}`,
  );

  return response.data?.notes;
}
//Delete note
export async function deleteNote(noteid: string) {
  try {
    await CallApi.delete(`/notes/${noteid}`);
  } catch (error) {
    console.log(error);
  }
}

//Moving notes to other folder
export async function patchNoteFolder(id: string, newfolder: string) {
  try {
    await CallApi.patch(`/notes/${id}`, {
      folderId: newfolder,
    });
  } catch (error) {
    console.error(error);
  }
}

//mark Fav or UnFav
export async function patchMarkFavorite(id: string, value: boolean) {
  return CallApi.patch(`/notes/${id}`, {
    isFavorite: value,
  });
}

//MArk Archive or Unarchive
export async function patchMarkArchive(id: string, value: boolean) {
  return CallApi.patch(`/notes/${id}`, {
    isArchived: value,
  });
}
//Edit Note title
export async function patchNoteName(id: string, notename: string) {
  await CallApi.patch(`/notes/${id}`, {
    title: notename,
  });
}

// Edit Note Content
export async function patchNoteContent(id: string, value: string) {
  await CallApi.patch(`/notes/${id}`, {
    content: value,
  });
}

//restore Note after Deletion
export async function postRestoreNoteById(noteid: string) {
  await CallApi.post(`/notes/${noteid}/restore`);
}

//Creating a new note
export async function postNote(
  folderid: string,
  title: string,
  content: string,
) {
  const res = await CallApi.post(`/notes`, {
    folderId: folderid,
    title: title,
    content: content,
    isFavorite: false,
    isArchived: false,
  });
  return res.data;
}
