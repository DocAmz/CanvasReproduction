"use client"
import HeadingEditor from '@/components/header'
import imageDisplay from '@/components/image/image.display'
import ImageModal from '@/components/image/image.modal'
import pdfDisplay from '@/components/pdf/pdf.display'
import PdfModal from '@/components/pdf/pdf.modal'
import { Button } from '@/components/ui/button'
import CanvasEditor from '@/modules/editor'
import { observer } from 'mobx-react'



const Page = observer(() => {


  return (
    <>
      <header className='absolute w-full z-10 overflow-hidden'>
        <HeadingEditor />
      </header>
      {
        imageDisplay.isDisplay && <ImageModal />
      }
      {
        pdfDisplay.isDisplay && <PdfModal />
      }
      <main className="flex h-[100vh] flex-col items-center justify-between">
          <CanvasEditor />
      </main>
    </>

  )
})

export default Page
