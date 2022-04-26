import { useEffect, useState } from 'react';
import { Loader } from '@navikt/ds-react';
import useSWR from 'swr';
import { useRouter } from 'next/router';

import { SkjemaSide } from '../model/skjema';
import { Formidlingsgruppe, RegistreringType } from '../model/registrering';
import { fetcher } from '../lib/api-utils';
import { useConfig } from '../contexts/config-context';
import { Config } from '../model/config';
import { loggAktivitet } from '../lib/amplitude-typescript';

function skalVideresendesTilDittNAV(data: any) {
    const { formidlingsgruppe, underOppfolging } = data;
    return formidlingsgruppe === Formidlingsgruppe.ARBS && underOppfolging === true;
}

function hentNesteSideUrl(data: any, dittNavUrl: string) {
    const { registreringType } = data;

    switch (registreringType) {
        case RegistreringType.ORDINAER_REGISTRERING: {
            return `/skjema/${SkjemaSide.DinSituasjon}/`;
        }
        case RegistreringType.SYKMELDT_REGISTRERING: {
            return `/sykmeldt/`;
        }
        case RegistreringType.REAKTIVERING: {
            return '/reaktivering/';
        }
        case RegistreringType.SPERRET: {
            return '/veiledning/sperret/';
        }
        case RegistreringType.ALLEREDE_REGISTRERT: {
            if (skalVideresendesTilDittNAV(data)) {
                return `${dittNavUrl}?goTo=registrering`;
            }
            return '/veiledning/allerede-registrert/';
        }
        default:
            return '/';
    }
}

const Start = () => {
    const { dittNavUrl } = useConfig() as Config;
    const { data, error } = useSWR('api/startregistrering/', fetcher);
    const [loggetStart, setLoggetStart] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!data || !dittNavUrl) {
            return;
        }

        if (!loggetStart) {
            loggAktivitet({
                aktivitet: 'Start registrering',
                registreringstype: data.registreringType,
            });
            setLoggetStart(true);
        }
    }, [data, dittNavUrl, loggetStart]);

    useEffect(() => {
        if (!data || !dittNavUrl) {
            return;
        }

        router.push(hentNesteSideUrl(data, dittNavUrl));
    }, [data, router, dittNavUrl]);

    useEffect(() => {
        if (error) {
            router.push('/feil/');
        }
    }, [error, router]);

    return (
        <div style={{ textAlign: 'center' }}>
            <Loader variant="neutral" size="2xlarge" title="venter..." />
        </div>
    );
};

export default Start;
