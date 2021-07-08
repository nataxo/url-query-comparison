import Snippet from '../Snippet';
import Form, {Props as FormPropsType} from '../Form';
import Table from '../Table';
import Footer from '../Footer';

import {Diff, Eq} from '../../types';

import styles from './styles.module.css';

type Props = {
    equal: Eq[],
    difference: Diff[],
} & FormPropsType;
const View = ({equal, difference, ...formProps}: Props) => {
    return (
        <div>
            <main className={styles.main}>
                <h1 className={styles.h1}>Compare Urls</h1>
                <Snippet>
                    <Form {...formProps} />
                </Snippet>
                <Snippet>
                    <h2 className={styles.h2}>Difference</h2>
                    {difference.length > 0 ? (
                        <Table
                            titles={['Param', 'First Url', 'Second Url']}
                            values={difference}
                        />
                    ) : (
                        <div className={styles.info}>No differences</div>
                    )}
                </Snippet>
                {equal.length > 0 && (
                    <Snippet>
                        <h2 className={styles.h2}>Equal</h2>
                        <Table titles={['Param', 'Value']} values={equal} />
                    </Snippet>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default View;
