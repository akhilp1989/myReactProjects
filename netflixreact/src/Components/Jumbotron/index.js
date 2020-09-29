import React from 'react';
import {Container,Inner} from './styles/jumbotron'

// eslint-disable-next-line no-empty-pattern
export default function Jumbotron({ children,direction = 'row' ,...restProps}) {
    return (
        <Inner direction={direction}>
           {children}
        </Inner>
    )
}

Jumbotron.Container = function JumbotronContainer({ children, ...restProps }) {
    return (<Container {...restProps}>{children}</Container>)
}