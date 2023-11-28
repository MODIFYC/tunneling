import React, { useEffect, useRef } from 'react';
import { infos } from '../../../data/infos';

interface WarningMarkerProps {
    map: naver.maps.Map;
}

function WarningMarker({ map }: WarningMarkerProps) {
    const markerRef = useRef<null | naver.maps.Marker>(null);

    useEffect(() => {
        const fetchData = () => {
            if (infos.length > 0) {
                if (!markerRef.current) {
                    createMarkers(infos);
                }
            }
        };

        fetchData();
    }, [infos]);

    const createMarkers = (data: any) => {
        if (!map) {
            return; // map이 없으면 함수를 빠져나감
        }

        data.forEach((item: any) => {
            const marker = new naver.maps.Marker({
                map,
                position: new naver.maps.LatLng(item.position.lat, item.position.lng),
                icon: {
                    url: '/warning_marker.png', // 사용자 정의 이미지 경로
                    size: new naver.maps.Size(32, 32), // 이미지 크기 지정
                    origin: new naver.maps.Point(0, 0), // 이미지의 원점 지정
                    anchor: new naver.maps.Point(16, 32), // 이미지의 앵커(기준점) 지정
                },
            });

            // 클릭 이벤트 처리 등 추가 설정...
            naver.maps.Event.addListener(marker, 'click', function () {
                const infowindow = new naver.maps.InfoWindow({
                    content: `<div">${item.placeName}</div>`,
                });
                infowindow.open(map, marker.getPosition());
            });

            // markerRef에 마커 저장
            markerRef.current = marker;
        });
    };

    useEffect(() => {
        return () => {
            // 컴포넌트가 언마운트되면 마커 제거
            markerRef.current?.setMap(null);
        };
    }, []);

    return null;
}

export default WarningMarker;
