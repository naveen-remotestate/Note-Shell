export type foldertype = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type folderResponseType = {
  folders: foldertype[];
};
