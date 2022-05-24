import React from 'react';
import Head from 'next/head';
import { Grid } from '@geist-ui/core';
import styled from 'styled-components';

import { pageContext } from '../utils/pageContext';
import { ExternalPageProps } from '../utils/declareSsrProps';

import { Header } from './Header';

interface PageProps {
    locale: ExternalPageProps['locale'];
    title: string;
}

const StyledPageContent = styled.div`
    padding: 20px 20px 0 20px;
`;

export const PageContent: React.FC = ({ children }) => {
    return (
        <Grid.Container gap={0}>
            <Grid xs={1} />
            <Grid xs={23}>
                <div className="flexRestore" style={{ width: '100%' }}>
                    {children}
                </div>
            </Grid>
        </Grid.Container>
    );
};

export const Page: React.FC<PageProps> = ({ title, locale, children }) => {
    return (
        <pageContext.Provider value={{ locale }}>
            <Head>
                <title>{title}</title>
            </Head>

            <Header />

            <StyledPageContent>{children}</StyledPageContent>
        </pageContext.Provider>
    );
};
