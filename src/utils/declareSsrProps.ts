import { GetServerSidePropsContext } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

import { routes } from '../hooks/router';

interface SSRProps {
    user: Session['user'];
    locale: 'en' | 'ru';
    req: GetServerSidePropsContext['req'];
    params: Record<string, string>;
}

export interface ExternalPageProps extends SSRProps {
    ssrData: any;
    [key: string]: any;
}

export function declareSsrProps<T = ExternalPageProps>(cb: ({ user, locale, req, params }: SSRProps) => T) {
    return async ({ locale, req, params }: GetServerSidePropsContext) => {
        const session = await getSession({ req });

        if (!session) {
            return {
                redirect: {
                    destination: routes.signIn(),
                    permanent: false,
                },
            };
        }

        const resProps = await cb({
            req,
            user: session.user,
            locale: locale as SSRProps['locale'],
            params: params as Record<string, string>,
        });

        return {
            props: {
                ...resProps,
                locale,
                params: params as Record<string, string>,
                user: session.user,
                i18n: (await import(`../../i18n/${locale}.json`)).default,
            },
        };
    };
}