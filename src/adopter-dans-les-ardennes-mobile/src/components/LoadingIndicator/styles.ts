import styled from "styled-components/native";


export const Loading = styled.ActivityIndicator.attrs(({theme,size}) => ({
    size,
    color: theme.colors.purple_300,
}))``;