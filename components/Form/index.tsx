import React from 'react';

import TextField from '../TextField';
import Button from '../Button';

import styles from './styles.module.css';

const FIRST_URL_PLACEHOLDER = 'first.com?alpha=1&beta=2';
const SECOND_URL_PLACEHOLDER = 'second.com?beta=3&gamma=2';
const IGNORE_PLACEHOLDER = 'beta,zetta';

export type Props = {
  firstUrl: string,
  onFirstUrlChange: (a: string) => void,
  secondUrl: string,
  onSecondUrlChange: (a: string) => void,
  ignoreParams: any,
  onIgnoreParamsChange: (a: string) => void,
  onSubmit: (a: React.SyntheticEvent<HTMLFormElement>) => void,
  onReset: () => void,
};

export default ({
    firstUrl,
    onFirstUrlChange,
    secondUrl,
    onSecondUrlChange,
    ignoreParams,
    onIgnoreParamsChange,
    onSubmit,
    onReset,
}: Props) =>
(<form onSubmit={onSubmit}>
        <TextField
            id="first-url"
            label="First Url"
            value={firstUrl}
            onChange={onFirstUrlChange}
            placeholder={FIRST_URL_PLACEHOLDER}
            autofocus={true}
        />
        <TextField
            id="second-url"
            label="Second Url"
            value={secondUrl}
            onChange={onSecondUrlChange}
            placeholder={SECOND_URL_PLACEHOLDER}
        />
        <TextField
            id="ignore-params"
            label="Ignore params"
            value={ignoreParams}
            onChange={onIgnoreParamsChange}
            placeholder={IGNORE_PLACEHOLDER}
            rows={1}
        />

        <div className={styles.buttonGroup}>
            <Button type="submit">
                Compare
            </Button>
            <Button type="reset" onClick={onReset}>
                Clean
            </Button>
        </div>
    </form>);
