import { Navbar } from "@/components";
import React, { type FC } from "react";

interface Props {
    children: React.ReactNode;
}

const SiteLayout: FC<Props> = ({ children }) => {
    return (
        <div className="relative">
            <Navbar />
            <main>
                {children}
            </main>
        </div>
    );
};

export default SiteLayout;
