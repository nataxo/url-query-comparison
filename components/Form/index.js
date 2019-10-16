import styled from 'reshadow';

import TextField from '../TextField';
import Button from '../Button';

import styles from './styles.css';

const FIRST_URL_PLACEHOLDER = 'first.com?alpha=1&beta=2';
const SECOND_URL_PLACEHOLDER = 'second.com?beta=3&gamma=2';
const IGNORE_PLACEHOLDER = 'beta,zetta';

export default ({
    firstUrl,
    onFirstUrlChange,
    secondUrl,
    onSecondUrlChange,
    ignoreParams,
    onIgnoreParamsChange,
    onSubmit,
    onReset,
}) =>
    styled(styles)(
        <form>
            <TextField
                id="first-url"
                label="First Url"
                value={firstUrl}
                onChange={onFirstUrlChange}
                placeholder={FIRST_URL_PLACEHOLDER}
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

            <buttonGroup>
                <Button type="submit" onClick={onSubmit}>
                    Compare
                </Button>
                <Button type="reset" onClick={onReset}>
                    Clean
                </Button>
            </buttonGroup>
        </form>,
    );
