import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import { pageContext } from '../utils/pageContext';
import { ExternalPageProps } from '../utils/ssrProps';

import { Header } from './Header';
import { Footer } from './Footer';

interface PageProps {
    locale: ExternalPageProps['locale'];
    title: string;
}

const StyledContent = styled.div`
    /* presses the footer to the bottom*/
    min-height: calc(100vh - 160px);
`;

export const Page: React.FC<PageProps> = ({ title, locale, children }) => {
    return (
        <pageContext.Provider value={{ locale }}>
            <Head>
                <title>{title}</title>
            </Head>
            <Header />
            <StyledContent>{children}</StyledContent>
            <Footer />
        </pageContext.Provider>
    );
};
