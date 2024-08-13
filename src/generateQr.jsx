import { useRef } from "react";
import QRCode from "react-qr-code";

export default function GenerateQr(textToString) { 
    const svgRef = useRef(null);

    return <>
        <div style={{ height: "auto", margin: "0 auto", maxWidth: 100, width: "100%" }}>
            <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={textToString}
                renderAs="svg"
                ref={svgRef}
                viewBox={`0 0 256 256`}
            />
        </div>
        <button  style={{marginTop: "1%"}}> download </button>
    </>
}