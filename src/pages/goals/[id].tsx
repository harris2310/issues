import { useEffect, useState } from 'react';
import useSWR, { unstable_serialize } from 'swr';
import styled from 'styled-components';
import { Grid } from '@geist-ui/core';

import { createFetcher } from '../../utils/createFetcher';
import { declareSsrProps } from '../../utils/declareSsrProps';
import { declarePage } from '../../utils/declarePage';
import { Page, PageContent } from '../../components/Page';
import { IssueHeader } from '../../components/IssueHeader';
import { Tag } from '../../components/Tag';
import { cardBorderColor } from '../../design/@generated/themes';
import { dateAgo } from '../../utils/dateTime';

const refreshInterval = 3000;

const fetcher = createFetcher((_, id: string) => ({
    goal: [
        {
            id,
        },
        {
            id: true,
            title: true,
            description: true,
            state: {
                title: true,
            },
            createdAt: true,
            updatedAt: true,
            project: {
                slug: true,
                title: true,
                description: true,
            },
            computedIssuer: {
                id: true,
                name: true,
                email: true,
            },
            computedOwner: {
                id: true,
                name: true,
                email: true,
            },
        },
    ],
}));

const HR = styled.div`
    border-top: 1px solid ${cardBorderColor};
    margin: 40px -20px;
`;

const StyledCard = styled.div`
    border: 1px solid ${cardBorderColor};
    border-radius: 6px;
    padding: 12px 20px;
    min-height: 180px;
`;

export const getServerSideProps = declareSsrProps(async ({ user, params: { id } }) => ({
    ssrData: await fetcher(user, id),
}));

export default declarePage(
    ({ user, locale, ssrData, params: { id } }) => {
        const [mounted, setMounted] = useState(false);

        useEffect(() => {
            const lazySubsTimer = setTimeout(() => setMounted(true), refreshInterval);

            return () => clearInterval(lazySubsTimer);
        }, []);

        const { data } = useSWR(mounted ? [user, id] : null, (...args) => fetcher(...args), {
            fallback: {
                [unstable_serialize([user, id])]: ssrData,
            },
            refreshInterval,
        });

        const { goal } = data ?? ssrData;

        return (
            <Page locale={locale} title={goal.title}>
                <PageContent>
                    <IssueHeader
                        issue={goal}
                        extras={
                            <>
                                <Tag title={goal.state.title} color="rgba(255, 255, 255, 0.4)" /> • updated{' '}
                                {dateAgo(goal.updatedAt)} • 0 comments
                            </>
                        }
                    />
                </PageContent>

                <HR />

                <PageContent>
                    <Grid.Container>
                        <Grid xs={16}>
                            <div className="flexRestore" style={{ width: '100%' }}>
                                <StyledCard>
                                    {goal.description}
                                    <br />
                                    Issued by {goal.computedIssuer.name}
                                </StyledCard>
                            </div>
                        </Grid>
                        <Grid xs={8}></Grid>
                    </Grid.Container>
                </PageContent>

                <PageContent>
                    <pre>{JSON.stringify(goal, null, 2)}</pre>
                </PageContent>
            </Page>
        );
    },
    { private: true },
);
