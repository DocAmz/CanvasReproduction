'use client'
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import imageDisplay from "./image.display";
import Image from "next/image";
import ObjectBuilder from "@/modules/objects/objectBuilder";

const ImageModal = () => {

  const [file, setFile] = useState<File | undefined>(undefined)
  const [uploadedFileURL, setUploadedFileURL] = useState('')
  const [error, setError] = useState('')

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if(!event.target.files) return
    setFile(event.target.files[0])
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if(!file) return
    const Builder = new ObjectBuilder()
    const fileType = file.type
    const url = URL.createObjectURL(file)
    const acceptedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/svg+xml"]

    if (!acceptedTypes.includes(fileType)) {
      setError("Only image files are allowed")
      return
    }

    if(fileType === 'image/svg+xml') {
      await Builder.createSvgElement(url)
    } else {
      await Builder.createImage(url)
    }
    imageDisplay.setDisplay(false)
  }

  useEffect(() => {
    const previewImage = async () => {
      if(!file) return
      const url = URL.createObjectURL(file)
      setUploadedFileURL(url)
    }
  })

  return (
    <>
      <div className="absolute flex items-center justify-center w-screen h-screen bg-gray-900 bg-opacity-60 z-20 overflow-hidden">
        <div className="relative w-[60vw] h-[60vh] bg-background shadow-md">
          <Button
            className="absolute p-4 right-0 rounded-none"
            variant={"destructive"}
            onClick={() => imageDisplay.setDisplay(false)}
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
            <h3 className="text-xl font-semibold">Add image</h3>
          </div>
          <div className="w-full h-full flex items-center justify-center">
          {uploadedFileURL && <Image width={200} height={150} src={uploadedFileURL} alt="Uploaded content"/>}
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Upload Image</CardTitle>
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

export default ImageModal;
