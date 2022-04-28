import { Navigering, NavigeringsTilstandsMaskin, SkjemaSide, SkjemaState, StandardSkjemaSide } from '../model/skjema';
import { DinSituasjon, Utdanningsnivaa } from '../model/sporsmal';

const TILSTANDER: NavigeringsTilstandsMaskin<StandardSkjemaSide> = {
    [SkjemaSide.DinSituasjon]: (skjemaState: SkjemaState) => {
        if (skjemaState.dinSituasjon === DinSituasjon.ALDRI_HATT_JOBB) {
            return {
                neste: SkjemaSide.Utdanning,
                forrige: undefined,
                fremdrift: 0,
            };
        }

        return {
            neste: SkjemaSide.SisteJobb,
            forrige: undefined,
            fremdrift: 0,
        };
    },
    [SkjemaSide.SisteJobb]: (skjemaState: SkjemaState) => {
        if (skjemaState.dinSituasjon === DinSituasjon.VIL_FORTSETTE_I_JOBB) {
            return {
                neste: SkjemaSide.Helseproblemer,
                forrige: SkjemaSide.DinSituasjon,
                fremdrift: 1 / 9,
            };
        }
        return {
            neste: SkjemaSide.Utdanning,
            forrige: SkjemaSide.DinSituasjon,
            fremdrift: 1 / 9,
        };
    },
    [SkjemaSide.Utdanning]: (skjemaState: SkjemaState) => {
        return {
            neste:
                skjemaState.utdanning === Utdanningsnivaa.INGEN_UTDANNING
                    ? SkjemaSide.Helseproblemer
                    : SkjemaSide.GodkjentUtdanning,
            forrige:
                skjemaState.dinSituasjon === DinSituasjon.ALDRI_HATT_JOBB
                    ? SkjemaSide.DinSituasjon
                    : SkjemaSide.SisteJobb,
            fremdrift: 2 / 9,
        };
    },
    [SkjemaSide.GodkjentUtdanning]: () => {
        return {
            neste: SkjemaSide.BestaattUtdanning,
            forrige: SkjemaSide.Utdanning,
            fremdrift: 3 / 9,
        };
    },
    [SkjemaSide.BestaattUtdanning]: () => {
        return {
            neste: SkjemaSide.Helseproblemer,
            forrige: SkjemaSide.GodkjentUtdanning,
            fremdrift: 4 / 9,
        };
    },
    [SkjemaSide.Helseproblemer]: (skjemaState: SkjemaState) => {
        return {
            neste: SkjemaSide.AndreProblemer,
            forrige:
                skjemaState.utdanning === Utdanningsnivaa.INGEN_UTDANNING
                    ? SkjemaSide.Utdanning
                    : SkjemaSide.BestaattUtdanning,
            fremdrift: 5 / 9,
        };
    },
    [SkjemaSide.AndreProblemer]: () => {
        return {
            neste: SkjemaSide.Oppsummering,
            forrige: SkjemaSide.Helseproblemer,
            fremdrift: 6 / 9,
        };
    },
    [SkjemaSide.Oppsummering]: () => {
        return {
            neste: SkjemaSide.FullforRegistrering,
            forrige: SkjemaSide.AndreProblemer,
            fremdrift: 7 / 9,
        };
    },
    [SkjemaSide.FullforRegistrering]: () => {
        return {
            neste: undefined,
            forrige: SkjemaSide.Oppsummering,
            fremdrift: 8 / 9,
        };
    },
};

export type StandardRegistreringTilstandsmaskin = (
    aktivSide: StandardSkjemaSide,
    state: SkjemaState
) => Navigering<StandardSkjemaSide>;
export const beregnNavigering: StandardRegistreringTilstandsmaskin = (aktivSide, state) => {
    return TILSTANDER[aktivSide](state);
};
