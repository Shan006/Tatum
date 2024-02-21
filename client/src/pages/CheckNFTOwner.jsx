import React, { useEffect } from 'react';
import axios from 'axios';

const OwnerDataFetcher = () => {
  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = 'https://api.tatum.io/v4/data/owners/address';

      const params = {
        tokenAddress: '0xe80a1a2ad296839bb40f1caf24d3508df1971c062edfbd12e53420bab0978f32',
        chain: 'ethereum',
        address: '0x40eFf8C0b6eCEb8430737104BaF0620F7e177A26'
      };

      const headers = {
        'Content-Type': 'application/json',
        'x-api-key': 't-65240e08b1499c0020537f13-5447d43d49f74be6a91bb497' // Replace with your actual API key
      };

      try {
        const response = await axios.get(apiUrl, { params, headers });
        console.log('Response:', response.data);
        // Handle the response data here
      } catch (error) {
        console.error('Error:', error);
        // Handle errors here
      }
    };

    fetchData();
  }, []);

  return <div>Fetching owner data...</div>;
};

export default OwnerDataFetcher;
