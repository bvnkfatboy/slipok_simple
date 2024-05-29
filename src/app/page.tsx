'use client';

import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import MainLayout from '@/components/layout/main';
import { Input } from '@/components/ui/input';

export default function Home() {
  const [slipOKData, setSlipOKData] = useState<{
    amount?: number;
    senderBankName?: string;
    senderAccountName?: string;
    receiverBankName?: string;
    receiverAccountName?: string;
    date?: string;
  }>({});
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFile = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async (e: any) => {
    e.preventDefault();

    if (!file) {
      console.log('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    const headers = {
      Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_SLIPOK_API_KEY,
    };
    try {
      const res = await axios.post('https://developer.easyslip.com/api/v1/verify', formData, {
        headers,
      });

      if (res.status === 200) {
        setSlipOKData({
          amount: res.data.data.amount.amount,
          senderBankName: res.data.data.sender.bank.name,
          senderAccountName: res.data.data.sender.account.name.th,
          receiverBankName: res.data.data.receiver.bank.name,
          receiverAccountName: res.data.data.receiver.account.name.th,
          date: new Date(res.data.data.date).toLocaleDateString(),
        });
        // console.log('Slipok data: ', res.data.data);
      } else {
        throw new Error('Failed to send a request');
      }
    } catch (error) {
      console.log('Error during fetching data: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-6 py-6">
          <h1 className="text-center text-3xl font-bold">เช็คสลิปออนไลน์</h1>
        </header>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="checker flex flex-col items-center justify-center space-y-4 rounded-lg bg-gray-100 p-6">
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold">อัพโหลดไฟล์ภาพ</h2>
              <p className="text-gray-500 dark:text-gray-400"></p>
            </div>

            {file && (
              <div className="flex  w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                <Image
                  //@ts-ignore
                  src={URL.createObjectURL(file)}
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
                disabled={isLoading || !file}
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

          <div className="infomation space-y-4 rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">รายละเอียด</h2>
              <p className="text-gray-500 dark:text-gray-400"></p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">จำนวนเงิน</p>
                <p className="text-gray-500 dark:text-gray-400">
                  {slipOKData.amount ? slipOKData.amount + ' บาท' : '-'}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">วันที่</p>
                <p className="text-gray-500 dark:text-gray-400">{slipOKData.date ? slipOKData.date : '-'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">บัญชีผู้ส่ง</p>
                <p className="text-gray-500 dark:text-gray-400">
                  {slipOKData.senderBankName ? slipOKData.senderBankName : '-'}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">ชื่อบัญชีผู้ส่ง</p>
                <p className="text-gray-500 dark:text-gray-400">
                  {slipOKData.senderAccountName ? slipOKData.senderAccountName : '-'}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">บัญชีผู้รับ</p>
                <p className="text-gray-500 dark:text-gray-400">
                  {slipOKData.receiverBankName ? slipOKData.receiverBankName : '-'}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">ชื่อบัญชีผู้รับ</p>
                <p className="text-gray-500 dark:text-gray-400">
                  {slipOKData.receiverAccountName ? slipOKData.receiverAccountName : '-'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
