import React from 'react'
import { useState } from 'react'

const QrCode = () => {
    const [img, setImg] = useState("")
    const [loading, setLoading] = useState(false)
    const [qrData, setQrData] = useState("")
    const [qrSize, setQrSize] = useState("")

    async function generateQR() {
        setLoading(true);
        try {
            if (!qrData || !qrSize) {
                alert("Please Enter Both Data And Size For The Qr Code.");
                setLoading(false);
                return;
            }
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
            setImg(url);
        } catch (error) {
            console.error("Error Generating Qr Code", error);
        } finally {
            setLoading(false);
        }
    }
    function downloadQR() {
        fetch(img).then((response) => response.blob()).then((blob) => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "MA Qr code.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link)
        })
            .catch((error) => {
                console.log("Error Downlaod Qr Code, error")
            })
    }

    return (
        <div className='app-container'>
            <h1>QR CODE GENERATOR</h1>
            {loading && <p>Please Wait....</p>}
            {img && <img className='qr-code-image' src={img} alt='Generated Qr Code' />}
            <div>
                <label htmlFor='dataInput' className='input-label'>Data For Qr Code</label>
                <input type="text" placeholder='Enter Data For Qr Code' id='dataInput' value={qrData} onChange={(e) => setQrData(e.target.value)} />
                <label htmlFor="sizeInput" className='input-label'>Image Size (e.g., 150)</label>
                <input type="text" placeholder='Enter Image Size' id='sizeInput' value={qrSize} onChange={(event) => setQrSize(event.target.value)} />
                <button onClick={generateQR} className='generate-button' disabled={loading}>Generate Qr Code</button>
                <button onClick={downloadQR} className='download-button'>Download Qr Code</button>
            </div>
            <p className='footer'>Designed By <a href='#'>Maria Anith Developer</a></p>
        </div>
    )
}

export default QrCode
