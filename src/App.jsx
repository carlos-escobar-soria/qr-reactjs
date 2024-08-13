import { useCallback, useRef, useState } from 'react';
import './App.css'
import QRCode from 'react-qr-code';
import { toPng } from 'html-to-image';


function App() {
  const svgRef = useRef(null);
  const [ textConvert, setTextConvert] = useState('');
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    if (textConvert.trim()) {
      setGenerated(true);
    }
  }
  
  const changeText = (event) => {
    const text = event.target.value;
    setTextConvert(text);
  }

  const handleeDownload = () => { 
    const svgElement = svgRef.current.querySelector('svg');
    if (svgElement) {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'qrcode.svg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }


  const handleDownloadPNG = useCallback(() => {
    if( svgRef.current == null ) {
      return;
    }
    toPng(svgRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = "my-image-name.png"
        link.href = dataUrl
        link.click()
      })
      .catch((error) => {
        console.log(error);
      })
  }, [svgRef])

  return (
    <>
      <h1> QR Scesi </h1>
      <input 
        style={{marginBottom: "1%"}}
        type = "text" 
        name = "texttoqr"
        placeholder = ' Ingresa un Texto'
        onChange={ changeText }
        value = { textConvert }
      />
      <button
        style={{marginLeft: "1%"}} 
        onClick={ handleGenerate }> Generar </button>
      {generated && (
        <div 
          ref={svgRef} 
          style={{ height: "auto", margin: "0 auto", maxWidth: 100, width: "100%" }}>
              <QRCode
                  size={300}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={textConvert}
                  renderAs="svg"
                  viewBox={`0 0 256 256`}
              />
          </div>)}

        {generated && (<button  
            onClick={handleeDownload}
            style={{marginTop: "1%"}}
          > Download SVG </button>)
        }
        {generated &&(<button
          onClick={handleDownloadPNG}
          style={{marginTop: "1%"}}
        > Download PNG</button>)}
    </>
  )
}

export default App
