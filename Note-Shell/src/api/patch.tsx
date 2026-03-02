import axios from "axios";

export async function patchFolderName(id: string, foldername: string) {
  await axios.patch(`https://nowted-server.remotestate.com/folders/${id}`, {
    name: foldername,
  });
}
export async function patchMarkFavorite(id: string, value: boolean) {
  return axios.patch(`https://nowted-server.remotestate.com/notes/${id}`, {
    isFavorite: value,
  });
}

export async function patchMarkArchive(id: string, value: boolean) {
  return axios.patch(`https://nowted-server.remotestate.com/notes/${id}`, {
    isArchived: value,
  });
}
