import { TilbakeTilJobbValg } from '../components/skjema/tilbake-til-jobb';
import {
    DinSituasjon,
    UtdanningGodkjentValg,
    JaEllerNei,
    Utdanningsnivaa,
    FremtidigSituasjon,
    SporsmalId,
} from './sporsmal';

export enum SkjemaSide {
    DinSituasjon = '0',
    SisteJobb = '1',
    Utdanning = '2',
    GodkjentUtdanning = '3',
    BestaattUtdanning = '4',
    Helseproblemer = '5',
    AndreProblemer = '6',
    Oppsummering = '8',
    SykmeldtFremtidigSituasjon = '9',
    AndreHensyn = '10',
    TilbakeTilJobb = '11',
    SkalTilbakeTilJobb = '12',
    FullforRegistrering = '13',
}

export type StandardSkjemaSide =
    | SkjemaSide.DinSituasjon
    | SkjemaSide.SisteJobb
    | SkjemaSide.Utdanning
    | SkjemaSide.GodkjentUtdanning
    | SkjemaSide.BestaattUtdanning
    | SkjemaSide.Helseproblemer
    | SkjemaSide.AndreProblemer
    | SkjemaSide.Oppsummering
    | SkjemaSide.FullforRegistrering;

export type SykmeldtSkjemaSide =
    | SkjemaSide.SykmeldtFremtidigSituasjon
    | SkjemaSide.Utdanning
    | SkjemaSide.GodkjentUtdanning
    | SkjemaSide.BestaattUtdanning
    | SkjemaSide.AndreHensyn
    | SkjemaSide.Oppsummering
    | SkjemaSide.TilbakeTilJobb
    | SkjemaSide.SkalTilbakeTilJobb
    | SkjemaSide.FullforRegistrering;

export type SisteStilling = {
    label: string;
    konseptId: Number;
    styrk08: string[];
}

export type Navigering<T extends SkjemaSide> = {
    neste?: T;
    forrige?: T;
};

export type NavigeringsTilstandsMaskin<T extends SkjemaSide> = Record<T, (state: SkjemaState) => Navigering<T>>;

export interface SkjemaState {
    dinSituasjon?: DinSituasjon;
    utdanning?: Utdanningsnivaa;
    utdanningGodkjent?: UtdanningGodkjentValg;
    utdanningBestatt?: JaEllerNei;
    andreForhold?: JaEllerNei;
    sisteStilling?: SisteStilling;
    helseHinder?: JaEllerNei;
    fremtidigSituasjon?: FremtidigSituasjon;
    tilbakeIArbeid?: TilbakeTilJobbValg;
}

const skjemasider = {
    [SporsmalId.dinSituasjon]: SkjemaSide.DinSituasjon,
    [SporsmalId.sisteStilling]: SkjemaSide.SisteJobb,
    [SporsmalId.utdanning]: SkjemaSide.Utdanning,
    [SporsmalId.utdanningBestatt]: SkjemaSide.BestaattUtdanning,
    [SporsmalId.utdanningGodkjent]: SkjemaSide.GodkjentUtdanning,
    [SporsmalId.andreForhold]: SkjemaSide.AndreProblemer,
    [SporsmalId.helseHinder]: SkjemaSide.Helseproblemer,
    [SporsmalId.tilbakeIArbeid]: SkjemaSide.TilbakeTilJobb,
    [SporsmalId.fremtidigSituasjon]: SkjemaSide.SykmeldtFremtidigSituasjon,
};

export const hentSkjemaside = (sporsmalId: SporsmalId) => skjemasider[sporsmalId];
