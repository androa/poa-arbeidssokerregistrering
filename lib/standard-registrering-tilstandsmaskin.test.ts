import { beregnNavigering } from './standard-registrering-tilstandsmaskin';
import { Utdanningsnivaa } from '../components/skjema/utdanning';
import { SkjemaSide } from '../model/skjema';
import { DinSituasjon } from '../model/sporsmal';

describe('Standard registrering tilstandsmaskin', () => {
    describe('din situasjon', () => {
        it('returnerer SisteJobb som neste når mistet jobb', () => {
            const state = beregnNavigering(SkjemaSide.DinSituasjon, {
                dinSituasjon: { verdi: DinSituasjon.MISTET_JOBBEN, tekst: '' },
            });
            expect(state.neste).toBe(SkjemaSide.SisteJobb);
        });
        it('returnerer Utdanning som neste når aldri jobbet', () => {
            const state = beregnNavigering(SkjemaSide.DinSituasjon, {
                dinSituasjon: { verdi: DinSituasjon.ALDRI_HATT_JOBB, tekst: '' },
            });
            expect(state.neste).toBe(SkjemaSide.Utdanning);
        });
    });
    describe('siste jobb', () => {
        it('returnerer Utdanning som neste side', () => {
            const state = beregnNavigering(SkjemaSide.SisteJobb, {
                dinSituasjon: { verdi: DinSituasjon.MISTET_JOBBEN, tekst: '' },
                sisteStilling: { verdi: 'Kokk', tekst: 'Kokk' },
            });
            expect(state.neste).toBe(SkjemaSide.Utdanning);
        });
        it('returnerer Din situasjon som forrige side', () => {
            const state = beregnNavigering(SkjemaSide.SisteJobb, {
                dinSituasjon: { verdi: DinSituasjon.MISTET_JOBBEN, tekst: '' },
                sisteStilling: { verdi: 'Kokk', tekst: 'Kokk' },
            });
            expect(state.forrige).toBe(SkjemaSide.DinSituasjon);
        });
    });
    describe('utdanning', () => {
        it('returnerer GodkjentUtdanning som neste side når har høyere utdanning', () => {
            const state = beregnNavigering(SkjemaSide.Utdanning, {
                dinSituasjon: { verdi: DinSituasjon.MISTET_JOBBEN, tekst: '' },
                sisteStilling: { verdi: 'Kokk', tekst: 'Kokk' },
                utdanning: { verdi: Utdanningsnivaa.HOYERE_UTDANNING_5_ELLER_MER, tekst: '' },
            });
            expect(state.neste).toBe(SkjemaSide.GodkjentUtdanning);
        });
        it('returnerer Helseproblemer som neste side når ingen utdanning', () => {
            const state = beregnNavigering(SkjemaSide.Utdanning, {
                dinSituasjon: { verdi: DinSituasjon.MISTET_JOBBEN, tekst: '' },
                sisteStilling: { verdi: 'Kokk', tekst: 'Kokk' },
                utdanning: { verdi: Utdanningsnivaa.INGEN_UTDANNING, tekst: '' },
            });
            expect(state.neste).toBe(SkjemaSide.Helseproblemer);
        });
        it('returnerer DinSituasjon som forrige side når aldri jobbet', () => {
            const state = beregnNavigering(SkjemaSide.Utdanning, {
                dinSituasjon: { verdi: DinSituasjon.ALDRI_HATT_JOBB, tekst: '' },
                sisteStilling: { verdi: 'Kokk', tekst: 'Kokk' },
                utdanning: { verdi: Utdanningsnivaa.HOYERE_UTDANNING_5_ELLER_MER, tekst: '' },
            });
            expect(state.forrige).toBe(SkjemaSide.DinSituasjon);
        });
        it('returnerer SisteJobb som forrige side når mistet jobb', () => {
            const state = beregnNavigering(SkjemaSide.Utdanning, {
                dinSituasjon: { verdi: DinSituasjon.MISTET_JOBBEN, tekst: '' },
                sisteStilling: { verdi: 'Kokk', tekst: 'Kokk' },
                utdanning: { verdi: Utdanningsnivaa.HOYERE_UTDANNING_5_ELLER_MER, tekst: '' },
            });
            expect(state.forrige).toBe(SkjemaSide.SisteJobb);
        });
    });
    describe('GodkjentUtdanning', () => {
        it('returnerer BestattUtdanning som neste', () => {
            const { neste } = beregnNavigering(SkjemaSide.GodkjentUtdanning, {});
            expect(neste).toBe(SkjemaSide.BestaattUtdanning);
        });

        it('returnerer Utdanning som forrige', () => {
            const { forrige } = beregnNavigering(SkjemaSide.GodkjentUtdanning, {});
            expect(forrige).toBe(SkjemaSide.Utdanning);
        });
    });

    describe('BestattUtdanning', () => {
        it('returnerer Helseproblemer som neste', () => {
            const { neste } = beregnNavigering(SkjemaSide.BestaattUtdanning, {});
            expect(neste).toBe(SkjemaSide.Helseproblemer);
        });

        it('returnerer GodkjentUtdanning som forrige', () => {
            const { forrige } = beregnNavigering(SkjemaSide.BestaattUtdanning, {});
            expect(forrige).toBe(SkjemaSide.GodkjentUtdanning);
        });
    });

    describe('Helseproblemer', () => {
        it('returnerer AndreProblemer som neste', () => {
            const { neste } = beregnNavigering(SkjemaSide.Helseproblemer, {});
            expect(neste).toBe(SkjemaSide.AndreProblemer);
        });

        it('returnerer Utdanning som forrige når ingen utdanning', () => {
            const { forrige } = beregnNavigering(SkjemaSide.Helseproblemer, {
                utdanning: { verdi: Utdanningsnivaa.INGEN_UTDANNING, tekst: '' },
            });
            expect(forrige).toBe(SkjemaSide.Utdanning);
        });

        it('returnerer BestattUtdanning som forrige når man har utdanning', () => {
            const { forrige } = beregnNavigering(SkjemaSide.Helseproblemer, {
                utdanning: { verdi: Utdanningsnivaa.GRUNNSKOLE, tekst: '' },
            });
            expect(forrige).toBe(SkjemaSide.BestaattUtdanning);
        });
    });

    describe('AndreProblemer', () => {
        it('returnerer Helseproblemer som forrige', () => {
            const { forrige } = beregnNavigering(SkjemaSide.AndreProblemer, {});
            expect(forrige).toBe(SkjemaSide.Helseproblemer);
        });

        it('returnerer Oppsummering som neste', () => {
            const { neste } = beregnNavigering(SkjemaSide.AndreProblemer, {});
            expect(neste).toBe(SkjemaSide.Oppsummering);
        });
    });
});
