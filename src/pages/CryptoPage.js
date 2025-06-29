import React, { useState } from 'react';
import styles from './CryptoPage.module.css';
import { useNavigate } from 'react-router-dom';
import funWords from './funWords.json'

const CryptoPage = () => {
    const [text, setText] = useState('');
    const [encryptedText, setEncryptedText] = useState('');
    const [key, setKey] = useState('');
    const [operation, setOperation] = useState(false);
    const [copySuccess, setCopySuccess] = useState('');
    const navigate = useNavigate();

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleKeyChange = (event) => {
        setKey(event.target.value);
    };

    const encryptCaesar = (inputText, key) => {
        if (!key || key.length == 0) {
            alert("Kluc neni pritomny");
            return;
        }
        let result = '';
        let keyValue = 0;
        let konstant = 'peristeronic'
        inputText += konstant;

        for (let i = inputText.length; i < 255; i++) {
            const min = 32;
            const max = 126;
            const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;
            const randomChar = String.fromCharCode(randomCode);
            console.log(randomCode, randomChar);

            inputText += randomChar;
        }
        console.log(inputText);
        console.log(inputText.length)

        for (let i = 0; i < key.length; i++) {
            keyValue += key.charCodeAt(i);
        }

        for (let i = 0; i < inputText.length; i++) {
            console.log(inputText);
            const shiftedChar = String.fromCharCode(inputText.charCodeAt(i) + keyValue);
            result += shiftedChar;
        }

        return result;
    };

    const decryptCaesar = (inputText, key) => {
        let result = '';
        let keyValue = 0;
        for (let i = 0; i < key.length; i++) {
            keyValue += key.charCodeAt(i);
        }
        for (let i = 0; i < inputText.length; i++) {
            const shiftedChar = String.fromCharCode(inputText.charCodeAt(i) - keyValue);
            result += shiftedChar;
        }

        const searchWord = 'peristeronic';
        const index = result.indexOf(searchWord);

        if (index !== -1) {
            return result.substring(0, index);
        } else {
            return result;
        }

        return result;
    }

    const funCypherEncrypt = () =>{
        return text.split('').map(char =>{
            if(char ===' '){
                return 'a';
            }
            return funWords[char.toLowerCase()]||(char);
        }).join(' ');
    }

    const handleButtonClickEncrypt = () => {
        const wordCount = text.trim().split(/\s+/).length;
        // if (wordCount <= 3) {
        //     setEncryptedText(funCypherEncrypt());
        //     return;
        // } 

        const newText = encryptCaesar(text, key);
        // const newText = encryptFun(text, key);

        setEncryptedText(newText);
        setOperation(false);

    };
    const handleButtonClickDencrypt = () => {
        const newText = decryptCaesar(text, key);
        setEncryptedText(newText);
        setOperation(true);
    };

    const copyToClipboard = () => {
        if (!encryptedText) return;
        navigator.clipboard.writeText(encryptedText)
            .then(() => {
                setCopySuccess('Skopírované do schránky!');
                setTimeout(() => setCopySuccess(''), 2000);
            })
            .catch(() => {
                setCopySuccess('Kopírovanie sa nepodarilo.');
            });
    };

    const deleteContent = () => {
        setText('');
    }


    const handleGoToImageTool = () => {
        navigate('/chess');
    };

    return (
        <div className={styles.container}>
            <h1>Symetrické šifrovanie</h1>

            <textarea type="text" value={text} onChange={handleTextChange} placeholder="Napíš text sem..." className={styles.textInput} />
            <button className={styles.deleteButton} onClick={deleteContent}>Vymazať</button>

            <input type="text" value={key} onChange={handleKeyChange} placeholder="Kľúč" className={styles.keyInput} />

            <div className={styles.buttons}>
                <button onClick={handleButtonClickEncrypt}>Šifrovať</button>
                <button onClick={handleButtonClickDencrypt}>Dešifrovať</button>
                {/* <button onClick={handleGoToImageTool}>Obrázkový nástroj</button> */}
            </div>


            <p className={styles.plaintext}><strong>Pôvodný text:</strong> {text}</p>
            {operation ? <p><strong>Dešifrovaný text</strong> </p> : <p><strong>Zašifrovaný text</strong></p>}
            <p className={styles.result} style={{
                backgroundColor: encryptedText ? '#fff' : 'transparent',
            }}>{encryptedText}</p>

            {encryptedText && (
                <button className={styles.copyButton} onClick={copyToClipboard}>
                    Skopírovať text
                </button>
            )}

            {copySuccess && <p className={styles.copyMessage}>{copySuccess}</p>}
        </div>
    );
};

export default CryptoPage;