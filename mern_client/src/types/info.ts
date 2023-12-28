export type Info = {
    id: number;
    addressName: string;
    placeName: string;
    position: {
        lat: number; //위도
        lng: number; //경도
    };
};
