import React from "react";
import styles from "./index.module.scss";

interface Props {
    text: string;
    type?: "button" | "submit" | "reset";
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    icon?: React.ReactNode | null;
}

const Button: React.FC<Props> = ({onClick, text, type = "button", icon}) => {
    return (
        <div>
            <button type={type} className={styles.btn} onClick={onClick}>
                {text}
                {icon && <div className={styles.icon}>{icon}</div>}
            </button>
        </div>
    );
};

export default Button;
