import { JaEllerNei, SkjemaVerdi, SkjemaSide, SkjemaState } from '../model/skjema';
import { Jobbsituasjon } from '../components/skjema/din-situasjon';
import { Utdanningsnivaa } from '../components/skjema/utdanning';
import { GodkjentUtdanningValg } from '../components/skjema/utdanning-godkjent';
import { Reducer } from 'react';
import { SykmeldtValg } from '../components/skjema/sykmeldt-fremtidig-situasjon';
import { TilbakeTilJobbValg } from '../components/skjema/tilbake-til-jobb';

export type SkjemaReducer = Reducer<SkjemaState, SkjemaAction>;
export type SkjemaAction =
    | { type: SkjemaSide.DinSituasjon; value: SkjemaVerdi<Jobbsituasjon> }
    | { type: SkjemaSide.Utdanning; value: SkjemaVerdi<Utdanningsnivaa> }
    | { type: SkjemaSide.GodkjentUtdanning; value: SkjemaVerdi<GodkjentUtdanningValg> }
    | { type: SkjemaSide.BestaattUtdanning; value: SkjemaVerdi<JaEllerNei> }
    | { type: SkjemaSide.Helseproblemer; value: SkjemaVerdi<JaEllerNei> }
    | { type: SkjemaSide.AndreProblemer; value: SkjemaVerdi<JaEllerNei> }
    | { type: SkjemaSide.SisteJobb; value: SkjemaVerdi<string> }
    | { type: SkjemaSide.SykmeldtFremtidigSituasjon; value: SkjemaVerdi<SykmeldtValg> }
    | { type: SkjemaSide.TilbakeTilJobb; value: SkjemaVerdi<TilbakeTilJobbValg> };

export function skjemaReducer(state: SkjemaState, action: SkjemaAction): SkjemaState {
    switch (action.type) {
        case SkjemaSide.DinSituasjon: {
            if (action.value.verdi === Jobbsituasjon.ALDRIJOBBET) {
                return {
                    ...state,
                    dinSituasjon: action.value,
                    sisteJobb: undefined,
                };
            }
            return {
                ...state,
                dinSituasjon: {
                    ...action.value,
                },
            };
        }
        case SkjemaSide.Utdanning: {
            if (action.value.verdi === Utdanningsnivaa.INGEN) {
                return {
                    ...state,
                    utdanning: action.value,
                    godkjentUtdanning: undefined,
                    bestaattUtdanning: undefined,
                };
            }
            return {
                ...state,
                utdanning: action.value,
            };
        }
        case SkjemaSide.SisteJobb: {
            return {
                ...state,
                sisteJobb: action.value,
            };
        }
        case SkjemaSide.GodkjentUtdanning: {
            return {
                ...state,
                godkjentUtdanning: action.value,
            };
        }
        case SkjemaSide.BestaattUtdanning: {
            return {
                ...state,
                bestaattUtdanning: action.value,
            };
        }
        case SkjemaSide.Helseproblemer: {
            return {
                ...state,
                helseproblemer: action.value,
            };
        }
        case SkjemaSide.AndreProblemer: {
            return {
                ...state,
                andreProblemer: action.value,
            };
        }
        case SkjemaSide.SykmeldtFremtidigSituasjon: {
            return {
                ...state,
                sykmeldtFremtidigSituasjon: action.value,
            };
        }
        case SkjemaSide.TilbakeTilJobb: {
            return {
                ...state,
                tilbakeTilJobb: action.value,
            };
        }
    }

    return state;
}
