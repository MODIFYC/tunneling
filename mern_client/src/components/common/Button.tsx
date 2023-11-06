import { type } from "os";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { memo } from "react";

//props로 받아올것들
// children
// onClick
// type : "link" | "button"
// url

interface ButtonProps {
    children?: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: "link" | "button";
    url?: string;
}

const StyledButton = styled.button<ButtonProps>`
    outline: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;

    background: none;
    padding: 0;
    cursor: pointer;
`;

function Button({ children, onClick, type = "button", url }: ButtonProps) {
    // type 에 따라서 linkButton or Button일지 구별

    const RealButton = <StyledButton onClick={onClick}>{children} </StyledButton>;

    const RealLink = (
        <StyledButton>
            <Link to={url!}>{children}</Link>
        </StyledButton>
    );

    return type === "link" && url ? RealLink : RealButton;
}

export default memo(Button);