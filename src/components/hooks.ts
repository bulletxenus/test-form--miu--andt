import { useCallback } from 'react';
import { UpdateOptionsFn, UseUpdateCacheFn } from './types';

export const useUpdateCache: UseUpdateCacheFn = (
    options,
    onChange,
    updateQuery
) =>
    useCallback<UpdateOptionsFn>(
        (event, newValue) => {
            if (Array.isArray(newValue)) {
                newValue
                    .filter(
                        (el) =>
                            el.inputValue &&
                            !options.data.some(
                                (option) => option.name === el.inputValue
                            )
                    )
                    .forEach((elem) => {
                        updateQuery &&
                            updateQuery({
                                name: elem.inputValue!,
                                id: elem.id,
                            });
                    });
                onChange(
                    newValue.map((el) => {
                        return el.inputValue
                            ? { name: el.inputValue!, id: el.id }
                            : el;
                    })
                );
            } else if (newValue && newValue.inputValue && updateQuery) {
                const newOption = {
                    name: newValue.inputValue,
                    id: newValue.id,
                };
                updateQuery(newOption);
                onChange(newOption);
            } else {
                onChange(newValue);
            }
        },
        [updateQuery, onChange, options]
    );
