import { cn } from "@/lib/utils";
import { type FC } from "react";

interface Props {
    children: React.ReactNode;
    className?: string;
}

const Container: FC<Props> = ({ children, className }) => {
    return (
        <div className={cn("mx-auto px-4 2xl:max-w-7xl xl:max-w-6xl", className)}>{children}</div>
    );
};

export default Container;
