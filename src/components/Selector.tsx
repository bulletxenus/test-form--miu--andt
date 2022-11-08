import React, { CSSProperties, useCallback } from 'react';
import { Autocomplete } from '@mui/material';
import { Form } from 'antd';

import {
    filterOption,
    getOptionLabel,
    renderInput,
    renderOption,
    InputComponent,
    SelectorProps,
    noop,
    CompareOptions,
} from '.';
import { useUpdateCache } from './hooks';

export const Selector = React.memo<SelectorProps>(
    ({
        options,
        styles,
        updateQuery = noop,
        placeholder,
        onChange = noop,
        multiple,
    }) => {
        const { status } = Form.Item.useStatus();

        const addField = useUpdateCache(options, onChange, updateQuery);

        const renderInputComponent = useCallback<InputComponent>(
            (params) => renderInput(params, placeholder),
            [placeholder]
        );

        const compareOptions: CompareOptions = useCallback(
            (e, value) => e.name === value?.inputValue || e.name === value.name,
            []
        );

        return (
            <>
                <Autocomplete
                    options={options.data}
                    renderInput={renderInputComponent}
                    getOptionLabel={getOptionLabel}
                    renderOption={renderOption}
                    filterOptions={filterOption}
                    onChange={addField}
                    clearOnBlur
                    blurOnSelect
                    style={styles}
                    classes={{
                        root: status === 'error' ? 'error_validation' : '',
                    }}
                    multiple={multiple}
                    isOptionEqualToValue={compareOptions}
                />
            </>
        );
    }
);

export type SelectorStyles = {
    options: CSSProperties;
};

export const selectorStyles: SelectorStyles = {
    options: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
    },
};
