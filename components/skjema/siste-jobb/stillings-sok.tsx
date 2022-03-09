import { useCallback, useState } from 'react';
import styles from './autosuggest.module.css';
const Autosuggest = require('react-autosuggest');
import getConfig from 'next/config';

interface StillingsSokProps {
    onClose: (value?: any) => void;
}

const StillingsSok = (props: StillingsSokProps) => {
    const { onClose } = props;
    const [resultat, setResultat] = useState([] as any[]);
    const [value, setValue] = useState<string>('');
    const { basePath } = getConfig().publicRuntimeConfig;

    const onSuggestionsFetchRequested = useCallback(
        async ({ value }: { value: string }) => {
            const url = `${basePath}/api/yrke-med-styrk?yrke=${value}`;
            const response = await fetch(url);
            const json = await response.json();
            setResultat(json.typeaheadYrkeList || []);
        },
        [basePath, setResultat]
    );

    const inputProps = {
        value,
        className: 'navds-text-field__input navds-body-short navds-body-medium',
        autoFocus: true,
        onBlur: () => onClose(),
        onChange: (e: any) => {
            if (e.type === 'change') {
                setValue(e.target.value);
            }
        },
    };

    return (
        <div className={styles.stillingsSokWrapper}>
            <Autosuggest
                theme={styles}
                suggestions={resultat}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={() => setResultat([])}
                getSuggestionValue={(val: any) => {
                    return val;
                }}
                onSuggestionSelected={(event: any, { suggestionValue }: { suggestionValue: any }) => {
                    onClose(suggestionValue);
                }}
                renderSuggestion={(val: any) => {
                    return <span>{val.label}</span>;
                }}
                inputProps={inputProps}
            />
        </div>
    );
};

export default StillingsSok;
