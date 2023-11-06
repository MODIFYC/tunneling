import { useEffect } from "react";
import MapContainer from "../../components/MapContainer";
import MarkersContainer from "../../components/MarkersContainer";
import Navigation from "../../components/Navigation";
import { useAtom, useSetAtom } from "jotai";
import { infosAtom, selectInfoAtom } from "../../atoms/info";
import SearchBoard from "../../components/SearchBoard";

function Upload() {

    const setInfos = useSetAtom(infosAtom);
    const setSelectInfo = useSetAtom(selectInfoAtom);

    useEffect(() => {
        setInfos(null);
        setSelectInfo(null);
    }, []); //초기화

    return (
        <>
            <Navigation type="upload" />
            <MapContainer />
            <MarkersContainer type="upload" />
            <SearchBoard />
        </>
    );
}

export default Upload; //다른 곳에서 Upload 쓸수 있도록