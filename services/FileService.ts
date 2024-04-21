import { getToken } from "@/util/token";
import blob from "@vercel/blob";

const uploads = "/uploads";

const uploadFile = async (file: FormData) => {
  const {url} = await blob.put(`${uploads}/${file.get('filename')}`, URL.createObjectURL(file), {access: "public"})
  const token = getToken();
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/files", {
    method: "POST",
    body: file,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const deleteFile = async (filename: string) => {
  const {url} = await blob.del(`${uploads}/${filename}`)
};

const FileService = {
  uploadFile,
  deleteFile,
};

export default FileService;
