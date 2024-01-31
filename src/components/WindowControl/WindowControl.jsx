import { useEffect, useState } from "react";
import "./WindowControl.css"
import { Image } from "react-bootstrap";
const WindowControl = ({ max, min, close }) => {
    const [isMaximized, setIsMaximized] = useState();



    useEffect(() => {

        if (typeof window.id !== 'undefined') {
            const maximized = window.electron.isMaximized();
            setIsMaximized(maximized);
        }

    }, [])
    const maximize = async () => {
        window.electron.maximize();
        // 상태 업데이트를 위해 약간의 지연 후 상태 확인
        setTimeout(async () => {
            const maximized = await window.electron.isMaximized();
            setIsMaximized(maximized);
        }, 100);
    };

    const unmaximize = async () => {
        window.electron.unmaximize();
        // 상태 업데이트를 위해 약간의 지연 후 상태 확인
        setTimeout(async () => {
            const maximized = await window.electron.isMaximized();
            setIsMaximized(maximized);
        }, 100);
    };

    return (
        <div className="control-container">
            {min && <Image className="img"
                src="/minimize.png"
                onClick={() => window.electron.minimize()} />}
            {max && (!isMaximized) && <Image className="img maxi"
                src="/maximize.png"
                onClick={maximize} />}
            {max && isMaximized && <Image className="img maxi"
                src="/unmaximize.png"
                onClick={unmaximize} />}
            {close && <Image className="img"
                src="/close.png"
                onClick={() => window.electron.closeWindow()} />}

        </div>
    )
}

export default WindowControl;