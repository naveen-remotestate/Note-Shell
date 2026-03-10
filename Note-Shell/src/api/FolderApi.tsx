import type { folderResponseType } from "../components/Types/FolderType";
import CallApi from "./CallApi";

// Geting all the folders
export async function getFolders() {
  try {
    const response = await CallApi.get<folderResponseType>("/folders");
    return response.data?.folders;
  } catch (error) {
    console.log(error);
  }
}

// creating a new folder
export async function postFolder(folderName: string) {
  await CallApi.post(`/folders`, {
    name: folderName,
  });
  // return response.data;
}

// edit folder name
export async function patchFolderName(id: string, foldername: string) {
  await CallApi.patch(`/folders/${id}`, {
    name: foldername,
  });
}

//delete folder
export async function deleteFolder(folderId: string) {
  try {
    await CallApi.delete(`/folders/${folderId}`);
  } catch (error) {
    console.log(error);
  }
}
