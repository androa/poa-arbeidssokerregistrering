import { BodyShort, GuidePanel, Heading } from '@navikt/ds-react';
import styles from './guidepanel.module.css';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import useSprak from '../../hooks/useSprak';

const TEKSTER: Tekster<string> = {
    nb: {
        tittel: 'Rettigheter',
        kravPaVurdering:
            'Du har krav på at NAV vurderer behovet ditt for veiledning. Dette er en rettighet du har etter NAV-loven § 14a.',
        brev: 'Du får et brev der du kan lese mer om tjenestene vi foreslår for deg.',
    },
};

const RettigheterPanel = () => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprak());

    return (
        <GuidePanel className={styles.rettigheter} poster>
            <Heading size={'small'}>{tekst('tittel')}</Heading>
            <ul>
                <li>{tekst('kravPaVurdering')}</li>
                <li>{tekst('brev')}</li>
            </ul>
        </GuidePanel>
    );
};

export default RettigheterPanel;