import React from 'react';
import axios from 'axios';

const CreateNFTCol = () => {
  const handleClick = async () => {
    try {
      const createNftResponse = await createNftCollection();
      console.log('Response:', createNftResponse.data);

      const blockchainResponse = await fetchBlockchainData(createNftResponse.data.txId);
      console.log('Blockchain Response:', blockchainResponse);
      // Handle the blockchain response data here
    } catch (error) {
      console.error('Error:', error);
      // Handle errors here
    }
  };

  const createNftCollection = async () => {
    const data = {
      contractType: 'nft',
      chain: 'ethereum-sepolia',
      name: 'My NFT Collection',
      symbol: 'MyNFT',
      owner: '0x40eFf8C0b6eCEb8430737104BaF0620F7e177A26'
    };

    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': 't-65240e08b1499c0020537f13-5447d43d49f74be6a91bb497'
    };

    return axios.post('https://api.tatum.io/v4/contract/deploy', data, { headers });
  };

  const fetchBlockchainData = async (txId) => {
    const chain = 'ETH'; // Chain identifier
    const headers = {
      'x-api-key': 't-65240e08b1499c0020537f13-5447d43d49f74be6a91bb497'
    };

    return fetch(`https://api.tatum.io/v3/blockchain/sc/address/${chain}/${txId}`, { headers });
  };

  return (
    <div>
      <button onClick={handleClick}>Create NFT Collection</button>
    </div>
  );
};

export default CreateNFTCol;
