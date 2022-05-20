import { NextPageWithAuth } from '../types/nextPageWithAuth';

import { ExternalPageProps } from './declareSsrProps';

export const declarePage = (Сomponent: (props: ExternalPageProps) => JSX.Element, options: { private: boolean }) => {
    if (options.private) {
        (Сomponent as NextPageWithAuth).auth = true;
    }

    return Сomponent;
};
