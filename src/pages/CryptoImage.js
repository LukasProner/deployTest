import React, { useState } from 'react';

const CryptoImage = () => {
    const [encryptedImageURL, setEncryptedImageURL] = useState(null);
    const [decryptedImageURL, setDecryptedImageURL] = useState(null);
    const [imageCanvas, setImageCanvas] = useState(null); // uchovanie canvasu pre neskoršie dešifrovanie

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

                // Šifrovanie
                const encryptedImageData = encryptPixels(imageData);
                ctx.putImageData(encryptedImageData, 0, 0);

                const url = canvas.toDataURL();
                setEncryptedImageURL(url);
                setImageCanvas(canvas); // uložíme canvas pre neskoršiu dešifráciu
            };
            img.src = event.target.result;
        };

        reader.readAsDataURL(file);
    };

    const handleDecrypt = () => {
        if (!imageCanvas) return;

        const ctx = imageCanvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, imageCanvas.width, imageCanvas.height);

        const decryptedImageData = decryptPixels(imageData);
        ctx.putImageData(decryptedImageData, 0, 0);

        const url = imageCanvas.toDataURL();
        setDecryptedImageURL(url);
    };

    function encryptPixels(imageData) {
        const data = imageData.data;
        const key = [
            15, 3, 200, 42, 77, 128, 56, 99, 12, 234, 17, 81, 213, 64, 145, 37,
            250, 29, 111, 8, 170, 199, 66, 120, 87, 190, 101, 222, 14, 73, 133, 180,
            5, 254, 68, 92, 147, 36, 210, 19, 84, 163, 230, 40, 138, 9, 60, 186,
            33, 119, 241, 105, 172, 97, 58, 201, 149, 26, 212, 140, 6, 223, 165, 50
        ];
        const keyLength = key.length;

        for (let i = 0, j = 0; i < data.length; i++) {
            if (i % 4 !== 3) {
                if(i > data.length / 3){
                    data[i] = (data[i] + key[j % keyLength] + 50) % 256;
                } else if(i > data.length / 2){
                    data[i] = (data[i] + key[j % keyLength] + 3) % 256;
                } else {
                    data[i] = (data[i] + key[j % keyLength]) % 256;
                }
                j++;
            }
        }

        return imageData;
    }

    function decryptPixels(imageData) {
        const data = imageData.data;
        const key = [
            15, 3, 200, 42, 77, 128, 56, 99, 12, 234, 17, 81, 213, 64, 145, 37,
            250, 29, 111, 8, 170, 199, 66, 120, 87, 190, 101, 222, 14, 73, 133, 180,
            5, 254, 68, 92, 147, 36, 210, 19, 84, 163, 230, 40, 138, 9, 60, 186,
            33, 119, 241, 105, 172, 97, 58, 201, 149, 26, 212, 140, 6, 223, 165, 50
        ];
        const keyLength = key.length;

        for (let i = 0, j = 0; i < data.length; i++) {
            if (i % 4 !== 3) {
                if(i > data.length / 3){
                    data[i] = (data[i] - key[j % keyLength] - 50 + 256) % 256;
                } else if(i > data.length / 2){
                    data[i] = (data[i] - key[j % keyLength] - 3 + 256) % 256;
                } else {
                    data[i] = (data[i] - key[j % keyLength] + 256) % 256;
                }
                j++;
            }
        }

        return imageData;
    }

    return (
        <div>
            <h2>Zašifrovanie obrázka</h2>
            <input type="file" accept="image/*" onChange={handleFileChange} />

            {encryptedImageURL && (
                <div>
                    <h3>Zašifrovaný obrázok:</h3>
                    <img src={encryptedImageURL} alt="Encrypted" style={{ maxWidth: '100%' }} />
                    <button onClick={handleDecrypt}>Dešifrovať</button>
                </div>
            )}

            {decryptedImageURL && (
                <div>
                    <h3>Dešifrovaný obrázok:</h3>
                    <img src={decryptedImageURL} alt="Decrypted" style={{ maxWidth: '100%' }} />
                </div>
            )}
        </div>
    );
};

export default CryptoImage;
