import { Container, Navbar } from "@/components";
import React, { type FC } from "react";

interface Props {
    children: React.ReactNode;
}

const SiteLayout: FC<Props> = ({ children }) => {
    return (
        <>
            <Navbar />
            <main>
                <Container>{children}</Container>
            </main>
        </>
    );
};

export default SiteLayout;
