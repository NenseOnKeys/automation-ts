/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/HzOYRWtjXAn
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/

/** Add border radius CSS variable to your global CSS:

:root {
  --radius: 0.5rem;
}
**/
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

export function Component() {
  return (
    <div key="1" className="flex min-h-screen w-full">
      <div className="hidden w-64 shrink-0 border-r bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900 md:block">
        <div className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter your email" type="email" />
          </div>
          <div className="grid gap-2">
            <Label className="flex items-center gap-2">
              <Checkbox id="option1" />
              Option 1
            </Label>
            <Label className="flex items-center gap-2">
              <Checkbox id="option2" />
              Option 2
            </Label>
            <Label className="flex items-center gap-2">
              <Checkbox id="option3" />
              Option 3
            </Label>
            <Label className="flex items-center gap-2">
              <Checkbox id="option4" />
              Option 4
            </Label>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center border-b bg-white px-6 dark:border-gray-800 dark:bg-gray-900">
          <h1 className="text-lg font-semibold">Web Application</h1>
        </header>
        <main className="flex-1 p-6">
          <div className="grid gap-6">
            <div className="flex flex-col items-center gap-4">
              <img
                alt="Preview"
                className="w-full max-w-[600px] rounded-lg border border-gray-200 dark:border-gray-800 dark:border-gray-800"
                height={400}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "600/400",
                  objectFit: "cover",
                }}
                width={600}
              />
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <LayoutGridIcon className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <ListIcon className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <MaximizeIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex justify-end">
              <Button>
                <DownloadIcon className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function DownloadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  )
}


function LayoutGridIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  )
}


function ListIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  )
}


function MaximizeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  )
}
