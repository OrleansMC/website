import "@/styles/popup.module.scss";
import { useEffect, useState } from 'react'

type PopUpProps = {
    show: boolean;
    footer?: JSX.Element;
    title?: string;
    onClose?: () => void;
    children: JSX.Element;
};

export default function PopUp(popUpProps: PopUpProps) {
    const [outing, setOuting] = useState(false);
    const [firstRender, setFirstRender] = useState(false);

    useEffect(() => {
        if (!firstRender) {
            setFirstRender(true);
            return;
        };

        if (!popUpProps.show) {
            setOuting(true);
            setTimeout(() => {
                setOuting(false);
            }, 250);
        }
    }, [popUpProps.show]);

    return (
        <div className={"popup z-50" + (popUpProps.show ? " active" : "") + (outing ? " outing" : "")}>
            <div className={"popup__content"}>
                <div className={"popup__content__header"}>
                    <h3 className="font-semibold text-2xl"
                    >{popUpProps.title}</h3>
                    <span className="material-symbols-rounded" onClick={popUpProps.onClose}>close</span>
                </div>
                <div className={"popup__content__body"}>
                    {popUpProps.children}
                </div>
                <div className={"popup__content__footer"}>
                    {popUpProps.footer}
                </div>
            </div>
        </div>
    )
}