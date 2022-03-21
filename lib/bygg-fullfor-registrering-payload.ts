import { DinSituasjon, hentTekst, SisteStillingValg } from '../model/sporsmal';
import { SisteJobb, SkjemaState } from '../model/skjema';

export const aldriJobbet: SisteJobb = {
    label: 'X',
    konseptId: -1,
    styrk08: ['X'],
};

function byggFullforRegistreringPayload(skjemaState: SkjemaState) {
    const skjema = Object.keys(skjemaState)
        .filter((key) => key !== 'sisteJobb')
        .reduce(
            (resultat, key) => {
                const svarKey = (skjemaState as any)[key];

                resultat.besvarelse[key] = svarKey;
                resultat.teksterForBesvarelse.push({
                    sporsmalId: key,
                    sporsmal: hentTekst('nb', key),
                    svar: hentTekst('nb', svarKey),
                });
                return resultat;
            },
            { besvarelse: {}, teksterForBesvarelse: [] } as {
                besvarelse: Record<string, string>;
                teksterForBesvarelse: { sporsmalId: string; sporsmal: string; svar: string }[];
            }
        );

    const sisteStilling = () => {
        if (
            skjemaState.dinSituasjon === DinSituasjon.ALDRI_HATT_JOBB ||
            skjemaState.sisteStilling === SisteStillingValg.HAR_IKKE_HATT_JOBB
        ) {
            return aldriJobbet;
        }

        return skjemaState.sisteJobb;
    };

    return {
        besvarelse: skjema.besvarelse,
        sisteStilling: sisteStilling(),
        teksterForBesvarelse: skjema.teksterForBesvarelse,
    };
}

export default byggFullforRegistreringPayload;