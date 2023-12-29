import { useAtom, useAtomValue } from "jotai";
import React, { useEffect } from "react";
import { mapAtom } from "../atoms/map";
import { underwayInfosAtom, selectUnderwayInfoAtom } from "../atoms/info";
import { Info } from "../types/info";
import InfoWindow from "./common/InfoWindow";
import { getUnderwayInfos } from "../apis/underwayInfo";
import WarningMarker from "./common/WarningMarker";

interface MarkersContainerProps {
  type?: "home" | "upload";
}

function MarkersContainer({ type = "home" }: MarkersContainerProps) {
  const map = useAtomValue(mapAtom);

  useEffect(() => {
    getUnderwayInfos();
  }, []);

  const underwayInfos = useAtomValue(underwayInfosAtom);
  const [selectUnderwayInfo, setSelectUnderwayInfo] = useAtom(
    selectUnderwayInfoAtom
  );

  if (!map || !underwayInfos) return null;

  return (
    <>
      {underwayInfos?.map((underwayInfo: Info) => (
        <WarningMarker
          key={`warning-${underwayInfo.id || "defaultKey"}`}
          map={map}
          position={underwayInfo.position}
          content={'<div class="warningMarker"/>'}
          onClick={() => {
            setSelectUnderwayInfo(underwayInfo);
            map.panTo(underwayInfo.position);
          }}
        />
      ))}

      {selectUnderwayInfo && (
        <WarningMarker
          key={`underway-${selectUnderwayInfo.id || "defaultKey"}`}
          map={map}
          position={selectUnderwayInfo.position}
          content={'<div class="warningMarker select"/>'}
          onClick={() => {
            setSelectUnderwayInfo(null); // 이미 select가 된 마커 없애기
          }}
        />
      )}
      <InfoWindow
        map={map}
        selectInfo={selectUnderwayInfo}
        onSubmit={type === "upload" ? undefined : undefined}
      />
    </>
  );
}

export default MarkersContainer;
