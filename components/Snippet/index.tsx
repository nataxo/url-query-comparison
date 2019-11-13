import React from 'react';
import styled from 'reshadow';
import styles from './styles.css';

const Snippet = ({children}: {children: React.ReactNode}) => styled(styles)(
    <div>
        {children}
    </div>
);

export default Snippet;
