import { Jobbsituasjon } from '../components/skjema/din-situasjon';
import { Utdanningsnivaa } from '../components/skjema/utdanning';
import { GodkjentUtdanningValg } from '../components/skjema/utdanning-godkjent';
import { SykmeldtValg } from '../components/skjema/sykmeldt-fremtidig-situasjon';
import { TilbakeTilJobbValg } from '../components/skjema/tilbake-til-jobb';

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

export type Navigering<T extends SkjemaSide> = {
    neste?: T;
    forrige?: T;
};

export type NavigeringsTilstandsMaskin<T extends SkjemaSide> = Record<T, (state: SkjemaState) => Navigering<T>>;

export type SkjemaVerdi<T> = { verdi: T; tekst: string };

export interface SkjemaState {
    dinSituasjon?: SkjemaVerdi<Jobbsituasjon>;
    utdanning?: SkjemaVerdi<Utdanningsnivaa>;
    utdanningGodkjent?: SkjemaVerdi<GodkjentUtdanningValg>;
    utdanningBestatt?: SkjemaVerdi<JaEllerNei>;
    andreForhold?: SkjemaVerdi<JaEllerNei>;
    sisteStilling?: SkjemaVerdi<string>;
    helseHinder?: SkjemaVerdi<JaEllerNei>;
    fremtidigSituasjon?: SkjemaVerdi<SykmeldtValg>;
    tilbakeIArbeid?: SkjemaVerdi<TilbakeTilJobbValg>;
}

export enum JaEllerNei {
    JA = 'ja',
    NEI = 'nei',
}
