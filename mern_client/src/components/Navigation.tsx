import React, { useCallback, useState } from "react";
import ShadowBox from "./common/ShadowBox";
import Button from "./common/Button";
import Span from "./common/Span";
import Divider from "./common/Divider";
import Block from "./common/Block";
import { GoPlus } from 'react-icons/go'
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { selectAtom } from "../atoms/search";
import { FiArrowLeft } from 'react-icons/fi';
import { BiSearch } from 'react-icons/bi';
import Input from "./common/Input";
import useInput from "../hooks/useinput";
import { infosAtom, selectInfoAtom } from "../atoms/info";
import { infos } from "../data/infos";
import { useQuery } from "react-query";
import { searchKeyword } from "../apis/search";
import { mapAtom } from "../atoms/map";

interface NavigationProps {
    type?: "home" | "upload";
}
function Navigation({ type = "home" }: NavigationProps) {

    const [select, setSelect] = useAtom(selectAtom);
    const { value, onChange } = useInput("");
    const setInfos = useSetAtom(infosAtom);
    const setSelectInfo = useSetAtom(selectInfoAtom);
    const map = useAtomValue(mapAtom);

    const [keyword, setKeyword] = useState('')
    const { status } = useQuery(
        ["search", keyword],
        () => searchKeyword(keyword),
        {
            enabled: keyword !== "",
            select: (result) => result.data.data,
            onSuccess: (infos) => {
                setInfos(infos)
                setSelectInfo(null);

                if (!map) return;

                const bounds = new naver.maps.LatLngBounds(
                    new naver.maps.LatLng(0, 0),
                    new naver.maps.LatLng(0, 0));

                infos.forEach((info) => {
                    bounds.extend(info.position);
                });

                map.panToBounds(bounds);
            },
        }
    );

    const onChangeSelect = useCallback(() => {
        setSelect(!select);
    }, [select, setSelect]);

    const onSubmit = useCallback(() => {
        setKeyword(value)
    }, [value]); //검색 정보 불러오기

    return (
        <ShadowBox>
            {
                type === 'upload' && select ? (
                    <Button onClick={onChangeSelect}>
                        <FiArrowLeft size={20} />
                    </Button>
                ) : (
                    <Button type="link" url="/">
                        <Span size="title">MERN</Span>
                    </Button>
                )}

            <Divider></Divider>
            {
                select ? (
                    <Input value={value} onChange={onChange} onSubmit={onSubmit} /> // 공백 클릭하면 텍스트 input가능하게
                ) : (
                    <Block height="28px" onClick={type === "upload" ? onChangeSelect : undefined} />
                )
            }



            {type === "upload" ? (
                <Button onClick={select ? onSubmit : onChangeSelect}>
                    <BiSearch size={20} />
                </Button>
            ) : (
                <Button type="link" url="/upload">
                    <GoPlus size={20} />
                </Button>
            )}
        </ShadowBox>);
}

export default Navigation;