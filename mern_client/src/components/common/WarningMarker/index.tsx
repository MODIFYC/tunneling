import React, { useEffect, useRef } from "react";

interface WarningMarkerProps {
  map: naver.maps.Map;
  position: {
    lat: number;
    lng: number;
  };
  content: string;
  onClick?: () => void;
}

function WarningMarker({
  map,
  position,
  content,
  onClick,
}: WarningMarkerProps) {
  useEffect(() => {
    let marker: naver.maps.Marker | null = null;

    if (map) {
      marker = new naver.maps.Marker({
        map,
        position: new naver.maps.LatLng(position.lat, position.lng),
        icon: {
          url: "/warning_marker.png", // Customize the icon URL
          size: new naver.maps.Size(32, 32), // Specify the icon size
          origin: new naver.maps.Point(0, 0), // Specify the origin of the icon
          anchor: new naver.maps.Point(16, 32), // Specify the anchor point of the icon
        },
      });
    }

    if (onClick) {
      naver.maps.Event.addListener(marker, "click", onClick);
      map.panTo(position);
    }

    return () => {
      marker?.setMap(null);
    };
  }, [map]);

  return null;
}

export default WarningMarker;
