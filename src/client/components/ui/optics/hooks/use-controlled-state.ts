import * as React from 'react';

export interface UseControlledStateProps<T> {
    value?: T;
    defaultValue?: T;
    onChange?: (next: T, ...args: any[]) => void;
}

export function useControlledState<T>(props: UseControlledStateProps<T>): [T, (nextValue: T, ...args: any[]) => void] {
    const { value, defaultValue, onChange } = props;

    const [state, setInternalState] = React.useState<T>(
        value !== undefined ? (value as T) : (defaultValue as T)
    );

    React.useEffect(() => {
        if (value !== undefined) setInternalState(value as T);
    }, [value]);

    const setState = React.useCallback(
        (next: T, ...args: any[]) => {
            setInternalState(next);
            onChange?.(next, ...args);
        },
        [onChange]
    );

    return [state, setState];
}
