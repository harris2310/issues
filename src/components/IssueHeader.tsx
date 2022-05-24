import React from 'react';
import styled from 'styled-components';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { routes } from '../hooks/router';

interface IssueHeaderProps {
    issue: {
        id: string;
        title: string;
        project: {
            id: string;
            slug: string;
            title: string;
            description?: string;
        };
    };
    extras?: React.ReactNode;
}

const StyledIssueHeader = styled.div``;
const StyledIssueHeaderProjectTitle = styled.div`
    font-weight: 600;
`;
const StyledIssueHeaderTitle = styled.div`
    font-size: 3rem;
    font-weight: 700;
    line-height: 1.2;
`;
const StyledIssueHeaderExtras = styled.div`
    padding-top: 10px;
`;

export const IssueHeader: React.FC<IssueHeaderProps> = ({ issue, extras }) => {
    const t = useTranslations('IssueHeader');

    return (
        <StyledIssueHeader>
            <StyledIssueHeaderProjectTitle>
                {t('Project')} —{' '}
                <Link href={routes.project(issue.project.slug)} passHref>
                    <a title={issue.project.description}>{issue.project.title}</a>
                </Link>
            </StyledIssueHeaderProjectTitle>
            <StyledIssueHeaderTitle>{issue.title}</StyledIssueHeaderTitle>

            {extras && <StyledIssueHeaderExtras>{extras}</StyledIssueHeaderExtras>}
        </StyledIssueHeader>
    );
};
