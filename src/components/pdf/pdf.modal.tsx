
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import PdfDisplay from "./pdf.display";
import ObjectBuilder from "@/modules/objects/objectBuilder";
import * as PDFJS from 'pdfjs-dist'
import { uploadFile } from "@/modules/actions/file.actions";

const PdfModal = () => {

  const [file, setFile] = useState<File | undefined>(undefined)
  const [uploadedFileURL, setUploadedFileURL] = useState('')
  const [error, setError] = useState('')
  const fileType = ['application/pdf']

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if(!event.target.files) return
    setFile(event.target.files[0])
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const type ='pdf'
    event.preventDefault();
    if (!file) return;
    try {
      const response = await uploadFile(file, type);
      if (response.ok) {
        console.log('File uploaded successfully');
      } else {
        console.error('Error uploading file');
      }
    } catch (error) {
      console.error('Error:', error);
    }
};


  return (
    <>
      <div className="absolute flex items-center justify-center w-screen h-screen bg-gray-900 bg-opacity-60 z-20 overflow-hidden">
        <div className="relative w-[60vw] h-[60vh] bg-background shadow-md">
          <Button
            className="absolute p-4 right-0 rounded-none"
            variant={"destructive"}
            onClick={() => PdfDisplay.setDisplay(false)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
              />
            </svg>
          </Button>
          <div className="px-4 py-1 border-b">
            <h3 className="text-xl font-semibold">Add Pdf</h3>
          </div>
          <div className="w-full h-full flex items-center justify-center">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Upload Pdf</CardTitle>
              </CardHeader>
              <CardContent>
                  <Input type="file" onChange={handleChange}/>
              </CardContent>
              <CardFooter>
                <Button type="submit">Upload</Button>
              </CardFooter>
            </Card>
          </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PdfModal;
