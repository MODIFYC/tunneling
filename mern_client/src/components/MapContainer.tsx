import React from 'react'
import Map from './common/Map'
import { mapAtom } from '../atoms/map'
import { useSetAtom } from 'jotai';
import { selectInfoAtom } from '../atoms/info';

function MapContainer() {

    const setMap = useSetAtom(mapAtom);
    const setSelectInfo = useSetAtom(selectInfoAtom);

    const initMap = (map: naver.maps.Map) => {
        setMap(map);
        naver.maps.Event.addListener(map, "click", () => {
            //selectInfo == null ->  map을 누르면 인포윈도우 닫기 기능 구현
            setSelectInfo(null);
        });
    };

    return (
        <Map width='100%' height='100%' initMap={initMap} />
    )
}

export default MapContainer