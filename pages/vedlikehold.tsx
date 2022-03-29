import { Alert, BodyShort, GuidePanel } from '@navikt/ds-react';

import lagHentTekstForSprak, { Tekster } from '../lib/lag-hent-tekst-for-sprak';
import useSprak from '../hooks/useSprak';

const TEKSTER: Tekster<string> = {
    nb: {
        vedlikehold: 'Arbeidssøkerregistreringen er ikke tilgjengelig på grunn av vedlikehold.',
        provIgjen: 'Vennligst prøv igjen litt senere.',
        dagpenger:
            'Hvis du skal søke om dagpenger kan du sende inn søknaden nå, og registrere deg som arbeidssøker etterpå.',
    },
    en: {
        vedlikehold: 'Due to maintenance you can not register as a jobseeker at the moment.',
        provIgjen: 'Please try again later.',
        dagpenger:
            'If you are applying for unemployment benefits, you can submit the application now, and register as a jobseeker afterwards.',
    },
};

function Vedlikehold() {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());

    return (
        <GuidePanel poster>
            <BodyShort>{tekst('vedlikehold')}</BodyShort>
            <BodyShort spacing>{tekst('provIgjen')}</BodyShort>
            <Alert variant="info">{tekst('dagpenger')}</Alert>
        </GuidePanel>
    );
}

export default Vedlikehold;