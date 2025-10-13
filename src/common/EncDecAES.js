import CryptoAesCbc from 'react-native-crypto-aes-cbc';

let key = 'I0BUQVNLQVJIZWFsdGhAMg==';
let iV = 'MDAwMDAwMDAwMDAwMDAwMA==';
let encString = '',
  decString = '';

export const encryptText = text => {
  CryptoAesCbc.encryptInBase64(iV, key, text, '128').then(encryptString => {
    encString = encryptString;
    console.log(encString);
    const requestBody = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({body: encString}),
    };
    console.log(requestBody);
    return encString;
  });
};

export const decryptText = text => {
  console.log('text to be decrypted ', text);
  CryptoAesCbc.decryptByBase64(iV, key, text, '128')
    .then(decryptString => {
      console.log('decrypted text', decryptString);
    })
    .catch(err => {
      console.log('Error', err);
    });
};
