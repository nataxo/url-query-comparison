import React from 'react';
import styles from './styles.module.css';

const Snippet = ({children}: {children: React.ReactNode}) => (
    <div className={styles.snippet}>
        {children}
    </div>
);

export default Snippet;
