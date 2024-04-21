import { getToken } from "@/util/token";
import { put } from "@vercel/blob";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/files";

const getFile = async (fileName: string) => {
  try {
    const token = getToken();
    const res = await fetch(`${baseUrl}/${fileName}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.blob();
  } catch (error) {
    console.log(error);
  }
};

const uploadFile = async (filename: string, file: Blob) => {
  const token = getToken();
  if (token) {
    const { url } = await put(process.env.BLOB_PICTURES_DIRECTORY + filename, file, { access: "public" });
    return url;
  }
};

const deleteFile = async (filename: string) => {
  const token = getToken();
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/files/" + filename, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const FileService = {
  getFile,
  uploadFile,
  deleteFile,
};

export default FileService;
