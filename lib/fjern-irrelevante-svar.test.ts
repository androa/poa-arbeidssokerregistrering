import { SkjemaState } from '../model/skjema';
import { oppdaterDinSituasjon, oppdaterUtdanning } from './skjema-state';
import { DinSituasjon, JaEllerNei, UtdanningGodkjentValg, Utdanningsnivaa } from '../model/sporsmal';

const sisteStilling = {
    label: 'Klovn kommunal sektor',
    styrk08: '5411',
    konseptId: 45779,
};

describe('Oppdatering av skjemastate', () => {
    test('setter sisteJobb til undefined hvis man endrer dinSituasjon til ALDRIJOBBET', () => {
        const state: SkjemaState = {
            dinSituasjon: DinSituasjon.MISTET_JOBBEN,
            sisteJobb: sisteStilling,
        };
        const oppdatertState = oppdaterDinSituasjon(state, DinSituasjon.ALDRI_HATT_JOBB);

        expect(oppdatertState.sisteJobb).toBe(undefined);
    });
    test('lar sisteJobb-verdien bli stående hvis man endrer dinSituasjon til noe annet enn ALDRIJOBBET', () => {
        const state: SkjemaState = {
            dinSituasjon: DinSituasjon.MISTET_JOBBEN,
            sisteJobb: sisteStilling,
        };
        const oppdatertState = oppdaterDinSituasjon(state, DinSituasjon.DELTIDSJOBB_VIL_MER);

        expect(oppdatertState.sisteJobb).toEqual(sisteStilling);
    });
    test('Setter alle utdanningsspm til INGEN_SVAR hvis man endrer dinSituasjon til VIL_FORTSETTE_I_JOBB', () => {
        const state: SkjemaState = {
            dinSituasjon: DinSituasjon.MISTET_JOBBEN,
            sisteJobb: sisteStilling,
            utdanning: Utdanningsnivaa.HOYERE_UTDANNING_1_TIL_4,
            utdanningBestatt: JaEllerNei.JA,
            utdanningGodkjent: UtdanningGodkjentValg.JA,
        };
        const oppdatertState = oppdaterDinSituasjon(state, DinSituasjon.VIL_FORTSETTE_I_JOBB);

        expect(oppdatertState.utdanning).toEqual(JaEllerNei.INGEN_SVAR);
        expect(oppdatertState.utdanningBestatt).toEqual(JaEllerNei.INGEN_SVAR);
        expect(oppdatertState.utdanningGodkjent).toEqual(UtdanningGodkjentValg.INGEN_SVAR);
    });
    test('setter godkjentUtdanning og bestaattUtdanning til undefined hvis man endrer utdanning til INGEN', () => {
        const state: SkjemaState = {
            utdanning: Utdanningsnivaa.HOYERE_UTDANNING_5_ELLER_MER,
            utdanningGodkjent: UtdanningGodkjentValg.JA,
            utdanningBestatt: JaEllerNei.JA,
        };
        const oppdatertState = oppdaterUtdanning(state, Utdanningsnivaa.INGEN_UTDANNING);

        expect(oppdatertState.utdanningBestatt).toBe(undefined);
        expect(oppdatertState.utdanningGodkjent).toBe(undefined);
    });
    test('lar godkjentUtdanning og bestaattUtdanning bli stående hvis utdanning endres til annet enn INGEN', () => {
        const state: SkjemaState = {
            utdanning: Utdanningsnivaa.HOYERE_UTDANNING_5_ELLER_MER,
            utdanningGodkjent: UtdanningGodkjentValg.JA,
            utdanningBestatt: JaEllerNei.JA,
        };
        const oppdatertState = oppdaterUtdanning(state, Utdanningsnivaa.GRUNNSKOLE);

        expect(oppdatertState.utdanningGodkjent).toEqual(UtdanningGodkjentValg.JA);
        expect(oppdatertState.utdanningBestatt).toEqual(JaEllerNei.JA);
    });
});
