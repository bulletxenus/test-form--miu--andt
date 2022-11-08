import React from 'react';
import { createFilterOptions, TextField } from '@mui/material';
import {
    ApplicantIndividualCompanyOption,
    FilterOptionFn,
    GetOptionLabelFn,
    PositionsQueryType,
    RelationsQueryType,
    RenderInputFn,
    RenderOptionFn,
} from './types';
import {
    ApplicantIndividualCompanyPosition,
    ApplicantIndividualCompanyRelation,
} from '../graphQL/types/graphql';
import { selectorStyles } from './Selector';

export const filter = createFilterOptions<ApplicantIndividualCompanyOption>();

export const renderInput: RenderInputFn = (params, label) => (
    <TextField {...params} label={label} />
);

export const getOptionLabel: GetOptionLabelFn = (option) =>
    option.inputValue || option.name;

export const renderOption: RenderOptionFn = (props, option) => (
    <li {...props} style={selectorStyles.options}>
        {option.name}
    </li>
);

export const filterOption: FilterOptionFn = (options, state) => {
    const filtered = filter(options, state);
    if (state.inputValue !== '' && !filtered.length) {
        filtered.push({
            id: `${options.length - 1}-${state.inputValue}`,
            name: `Add "${state.inputValue}"`,
            inputValue: state.inputValue,
        });
    }
    return filtered;
};

export type GenType = RelationsQueryType & PositionsQueryType;

export const getUpdatingCallback =
    (
        key:
            | 'applicantIndividualCompanyRelations'
            | 'applicantIndividualCompanyPositions',
        newValue:
            | ApplicantIndividualCompanyRelation
            | ApplicantIndividualCompanyPosition
    ) =>
    <T extends GenType>(previousQueryResult: T) => {
        return {
            [key]: {
                data: [
                    ...previousQueryResult[key].data,
                    {
                        name: newValue.name,
                        id: newValue.id,
                    },
                ],
            },
        } as T;
    };

export const noop = () => {};
