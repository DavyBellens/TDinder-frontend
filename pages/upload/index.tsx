import Head from "next/head";
import { useState } from "react";

const uploadPage: React.FC = () => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const handleUpload = async () => {
    const formdata = new FormData();
    if (file) {
      formdata.append("file", file);
      const response = await fetch("/services/FileService", {
        method: "POST",
        body: formdata,
      });
      console.log(response);
    }
  };
  return (
    <>
      <div className="app">
        <Head>
          <title>Upload</title>
        </Head>
        <main className="flex flex-col items-center">
          <form>
            <input
              type="file"
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  console.log(files[0]);
                  setFile(files[0]);
                }
              }}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleUpload();
              }}
            >
              Submit
            </button>
          </form>
        </main>
      </div>
    </>
  );
};

export default uploadPage;
