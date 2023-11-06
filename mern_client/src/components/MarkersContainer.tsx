import { useAtom, useAtomValue } from 'jotai';
import React, { useCallback } from 'react'
import { mapAtom } from '../atoms/map';
import { infosAtom, selectInfoAtom } from '../atoms/info';
import { Info } from '../types/info';
import Marker from './common/Marker';
import InfoWindow from './common/InfoWindow';
import { useMutation } from 'react-query';
import { createInfo } from '../apis/info';
import { AxiosError } from 'axios';
import { HttpCode } from '../types/httpCode';


interface MarkersContainerProps {
    type?: "home" | "upload";
}

function MarkersContainer({ type = "home" }: MarkersContainerProps) {

    const map = useAtomValue(mapAtom);
    const infos = useAtomValue(infosAtom);
    const [selectInfo, setSelectInfo] = useAtom(selectInfoAtom);

    const { mutate } = useMutation(createInfo, {
        onSuccess: () => {
            alert("업로드 성공");
        },
        onError: (error: AxiosError) => {
            const errorStatus = error.response?.status;
            if (errorStatus === HttpCode.CONFLICT) {
                alert("중복된 데이터 입니다.");
            } else {
                alert("서버 에러!!");
            }
        },
    });

    const onSubmit = useCallback(() => {
        if (!selectInfo) return;
        mutate(selectInfo);
    }, [mutate, selectInfo]);

    if (!map || !infos) return null;

    return (
        <>
            {infos?.map((info: Info) => (
                <Marker
                    key={info.id}
                    map={map}
                    position={info.position}
                    content={'<div class="marker"/>'}
                    onClick={() => {
                        setSelectInfo(info); //info 값이 selectInfo의 상태로 업데이트
                        map.panTo(info.position);
                    }}
                />
            ))}
            {selectInfo && (
                <Marker
                    key={selectInfo.id}
                    map={map}
                    position={selectInfo.position}
                    content={'<div class="marker select" />'}
                    onClick={() => {
                        setSelectInfo(null); //이미 select가 된 마커 없애기
                    }}
                />
            )}
            <InfoWindow map={map} selectInfo={selectInfo}
                onSubmit={type === "upload" ? onSubmit : undefined} />
        </>
    );
}

export default MarkersContainer


