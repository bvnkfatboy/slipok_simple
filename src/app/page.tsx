'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import MainLayout from '@/components/layout/main';
import { Input } from '@/components/ui/input';

import { postSlipOK } from '@/lib/action';

export default function Home() {
  const [slipOKData, setSlipOKData] = useState([]);
  const [files, setFiles] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFile = (e: any) => {
    setFiles(e.target.files[0]);
  };

  // console.log("Select files: ", files);

  const handleFileUpload = async (e: any) => {
    // setIsLoading(true);
    // const response = await postSlipOK(file);
    // setSlipOKData(response.data);
    // setIsLoading(false);
    // console.log(response.data);

    e.preventDefault();

    const formData = new FormData();
    formData.append('files', files);

    try {
      const res = await fetch('https://api.slipok.com/api/line/apikey/22150', {
        method: 'POST',
        headers: {
          'x-authorization': 'SLIPOK39PWP7N',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (res.ok) {
        console.log('Request successful');
      } else {
        throw new Error('Failed to send a request');
      }

      const data = await res.json();
      // setSlipOkData(data.data);
      console.log('Slipok data: ', data);
    } catch (error) {
      console.log('Error during fetching data: ', error);
    }
  };

  return (
    <MainLayout>
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-6 py-6">
          <h1 className="text-center text-3xl font-bold">เช็คสลิปออนไลน์</h1>
        </header>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center space-y-4 rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold">อัพโหลดไฟล์ภาพ</h2>
              <p className="text-gray-500 dark:text-gray-400"></p>
            </div>

            {files && (
              <div className="flex  w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                <Image
                  //@ts-ignore
                  src={URL.createObjectURL(files)}
                  alt="Preview"
                  className="m-6 rounded-lg"
                  width={300}
                  height={300}
                  objectFit="contain"
                />
              </div>
            )}
            <form className="grid w-full max-w-sm items-center gap-1.5" onSubmit={handleFileUpload}>
              <Input className="" type="file" onChange={handleFile} accept="image/*" />
              <button
                className="flex items-center justify-center rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
                type="submit"
                disabled={isLoading || !files}
              >
                {isLoading ? (
                  <svg
                    className="mr-2 h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  'Upload'
                )}
              </button>
            </form>
          </div>
          <div className="space-y-4 rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">รายละเอียด</h2>
              <p className="text-gray-500 dark:text-gray-400"></p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {slipOKData.map((data: any, index) => (
                <div key={index} className="space-y-1">
                  <p className="text-sm font-medium">{data.name}</p>
                  <p className="text-gray-500 dark:text-gray-400">{data.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

function CloudUploadIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  );
}
