import React, { useEffect, useState } from 'react'
import { Info } from '../../../types/info';
import './InfoWindow.css'

interface InfoWindowProps {
  map: naver.maps.Map;
  selectInfo: Info | null;
  onSubmit?: () => void;
}

function InfoWindow({ map, selectInfo, onSubmit }: InfoWindowProps) {

  const [infoWindow, setInfoWindow] = useState<naver.maps.InfoWindow | null>(
    null);

  useEffect(() => { //인포윈도우 초기화
    const _infoWindow = new naver.maps.InfoWindow({
      content: '',
      backgroundColor: "transparent", //투명
      borderWidth: 0,
      disableAnchor: true,
      pixelOffset: new naver.maps.Point(10, -20),
    });

    setInfoWindow(_infoWindow);

    return () => {
      _infoWindow?.setMap(null);
    };
  }, []);

  useEffect(() => {
    if (!infoWindow || !map) return;
    if (selectInfo) { //마커가 클릭되면??
      infoWindow.setContent(InfoWindowMaker(selectInfo, onSubmit));
      infoWindow.open(map, selectInfo.position); //위도와 경도 가져오기 selectInfo.position으로
    } else {
      infoWindow.close();
    }
  }, [selectInfo])

  return (
    null
  );
}

function InfoWindowMaker(selectInfo: Info, onSubmit?: () => void) {
  const infoWindowBox = document.createElement("div");
  infoWindowBox.className = "infoBox";

  const infoWindowPlace = document.createElement("div");
  infoWindowPlace.className = "infoPlaceName";
  infoWindowPlace.innerHTML = `${selectInfo.placeName}`;
  infoWindowBox.appendChild(infoWindowPlace);
  // <div class='infoBox'>  
  //   <div class='infoPlaceName'></div>
  // </div>위에 코드와 같다.

  const infoWindowAddress = document.createElement("div");
  infoWindowAddress.className = "infoAddressName";
  infoWindowAddress.innerHTML = `${selectInfo.addressName}`;
  infoWindowBox.appendChild(infoWindowAddress);

  if (onSubmit) {
    const infoWindowButton = document.createElement("div");
    infoWindowButton.className = "infoSubmit";
    infoWindowButton.innerHTML = "등록";
    infoWindowButton.onclick = onSubmit;
    infoWindowBox.appendChild(infoWindowButton);
  }

  return infoWindowBox;
}

export default InfoWindow;