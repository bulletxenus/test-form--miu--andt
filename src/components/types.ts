import {
    CSSProperties,
    HTMLAttributes,
    ReactNode,
    SyntheticEvent,
} from 'react';
import { AutocompleteRenderInputParams } from '@mui/material/Autocomplete/Autocomplete';
import { FilterOptionsState } from '@mui/base/AutocompleteUnstyled/useAutocomplete';
import {
    ApplicantIndividualCompanyPosition,
    ApplicantIndividualCompanyPositionPaginator,
    ApplicantIndividualCompanyRelation,
    ApplicantIndividualCompanyRelationPaginator,
} from '../graphQL/types/graphql';

export type ApplicantIndividualCompanyOption = (
    | ApplicantIndividualCompanyRelation
    | ApplicantIndividualCompanyPosition
) & { inputValue?: string };

export enum ApplicantCompanyKeys {
    ApplicantIndividualCompanyRelations = 'applicantIndividualCompanyRelations',
    ApplicantIndividualCompanyPositions = 'applicantIndividualCompanyPositions',
}

export type RelationsQueryType = {
    [ApplicantCompanyKeys.ApplicantIndividualCompanyRelations]: ApplicantIndividualCompanyRelationPaginator;
};
export type PositionsQueryType = {
    [ApplicantCompanyKeys.ApplicantIndividualCompanyPositions]: ApplicantIndividualCompanyPositionPaginator;
};

export type OptionsType =
    | ApplicantIndividualCompanyRelationPaginator
    | ApplicantIndividualCompanyPositionPaginator;

export type UpdateQuery = <
    T extends ApplicantIndividualCompanyPosition &
        ApplicantIndividualCompanyRelation
>(
    newValue: T
) => void;

export type FormOnChangeHandler = (
    event:
        | ApplicantIndividualCompanyOption
        | ApplicantIndividualCompanyOption[]
        | null
) => void;

export type SelectorProps = {
    options: OptionsType;
    styles: CSSProperties;
    updateQuery?: UpdateQuery;
    placeholder?: string;
    multiple?: boolean;
    onChange?: FormOnChangeHandler;
};

export type UseUpdateCacheFn = (
    options: OptionsType,
    onChange: FormOnChangeHandler,
    updateQuery: UpdateQuery
) => UpdateOptionsFn;

export type RenderInputFn = (
    params: AutocompleteRenderInputParams,
    label?: string
) => ReactNode;

export type GetOptionLabelFn = (
    option: ApplicantIndividualCompanyOption
) => string;

export type RenderOptionFn = (
    props: HTMLAttributes<HTMLLIElement>,
    option: ApplicantIndividualCompanyOption
) => ReactNode;

export type FilterOptionFn = (
    options: ApplicantIndividualCompanyOption[],
    state: FilterOptionsState<ApplicantIndividualCompanyOption>
) => ApplicantIndividualCompanyOption[];

export type UpdateOptionsFn = (
    event: SyntheticEvent,
    newValue:
        | ApplicantIndividualCompanyOption
        | ApplicantIndividualCompanyOption[]
        | null
) => void;

export type InputComponent = (
    params: AutocompleteRenderInputParams
) => ReactNode;

export type onChangeInputHandler = (e: SyntheticEvent) => void;

export type Upd = <TData>(previousQueryResult: TData) => TData;

export type AppStyles = {
    app: CSSProperties;
    form: CSSProperties;
    selectorContainer: CSSProperties;
    selector: CSSProperties;
    description: CSSProperties;
    loader: CSSProperties;
};

export type CompareOptions = <T extends ApplicantIndividualCompanyOption>(
    option: T,
    value: T
) => boolean;
