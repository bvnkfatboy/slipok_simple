'use client';

import axios from 'axios';
import React, { useState } from 'react';

const MyComponent = () => {
  const [slipOKData, setSlipOKData] = useState([]);
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

    setIsLoading(true);

    try {
      const res = await axios.post('https://api.slipok.com/api/line/apikey/22150', formData, {
        headers: {
          'x-authorization': 'SLIPOK39PWP7N',
          //   'Content-Type': 'multipart/form-data',
        },
      });

      if (res.status === 200) {
        setSlipOKData(res.data.data);
        console.log('Slipok data: ', res.data);
      } else {
        throw new Error('Failed to send a request');
      }
    } catch (error) {
      console.log('Error during fetching data: ', error);
      console.log('Error details:', error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleFileUpload}>
        <input type="file" onChange={handleFile} />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Uploading...' : 'Upload File'}
        </button>
      </form>
      {slipOKData.length > 0 && (
        <div>
          <h3>Uploaded Data:</h3>
          <pre>{JSON.stringify(slipOKData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default MyComponent;
