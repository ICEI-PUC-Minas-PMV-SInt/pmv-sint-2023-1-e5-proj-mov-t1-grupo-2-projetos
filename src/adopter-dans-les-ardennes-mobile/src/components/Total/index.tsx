import React from 'react'

import {ITotal} from 'src/components/Total/types'

import {Text, Container} from './styles'

const Total = ({content, style}: ITotal) => {
    return (
        <Container top={style?.top}>
            <Text>Total of {content}</Text>
        </Container>
    )
}

export default Total;
