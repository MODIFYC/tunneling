import { useSetAtom } from "jotai";
import { infosAtom } from "../../atoms/info";
import MapContainer from "../../components/MapContainer";
import Navigation from "../../components/Navigation";
import MarkersContainer from "../../components/MarkersContainer";
import axios from "axios";
import { useQuery } from "react-query";
import { Info } from "../../types/info";

function Home() {
  const setInfos = useSetAtom(infosAtom);
  const saveUnderwayInfos = useSetAtom(infosAtom);
  const { status } = useQuery(
    "infos",
    () => axios.get<{ message: string; data: Info[] }>("/api/infos"),
    {
      select: (result) => result.data.data, //검색했을때 해당 데이터 값 가져오는 코드
      onSuccess: (infos) => {
        setInfos(infos);
      },
    }
  );

  if (status === "loading") return <></>;

  return (
    <>
      <Navigation />
      <MapContainer />
      <MarkersContainer />
    </>
  );
}

export default Home;
