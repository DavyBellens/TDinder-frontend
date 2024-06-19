import { getToken } from "@/util/token";
import { NextResponse } from "next/server";
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

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File;
  if (!file.name) {
    return NextResponse.json(
      {
        error: "no file provided",
      },
      {
        status: 400,
      }
    );
  }
  const blob = await put(file.name, file, {
    access: "public",
  });
  return Response.json(blob);
}


const uploadFile = async (file: FormData) => {
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
