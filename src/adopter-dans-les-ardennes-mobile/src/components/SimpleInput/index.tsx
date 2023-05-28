import {Container, Input, ISimpleInputStyle, Label} from "src/components/SimpleInput/styles";

interface ISimpleInput {
    label: string;
    style?: ISimpleInputStyle;

}

const SimpleInput = ({label, style, ...rest}: ISimpleInput) => {
    return (
        <Container>
            <Label>{label}</Label>
            <Input textAlignVertical={style?.textAlignVertical} height={style?.height}
                   {...rest} autoCapitalize="none"/>
        </Container>
    )
}
export default SimpleInput;