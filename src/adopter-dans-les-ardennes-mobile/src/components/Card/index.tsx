import React from "react";

import CustomIcon, {IconType} from "src/components/CustomIcon";
import Avatar from "src/components/Avatar";
import {ICard} from "src/components/Card/types";

import {useTheme} from "styled-components";

import {
    Container,
    Content,
    Info,
    Name,
    Tag,
    TagText,
    Wrapper,
    IconWrapper,
    InfoWrapper
} from "./styles";

const Card = ({
                  name,
                  img,
                  hour,
                  date,
                  active,
                  showBorder = false,
                  showAvatar = false,
                  tagText,
                  showDeleteIcon = false,
                  textAlign,
                  onPress,
                  phone,
                  email,
                  paddingRight,
                  paddingLeft,
                  handleDelete
              }: ICard) => {

    const {colors} = useTheme()

    return (

        <Container isActive={active} showBorder={showBorder} onPress={onPress}>


            <Content>

                {showAvatar &&
                    <Avatar imageURI={img}/>
                }


                <Wrapper>
                    <Name textAlign={textAlign}>{name}</Name>
                    <InfoWrapper paddingRight={paddingRight} paddingLeft={paddingLeft}>
                        <Info>{date}</Info>
                        <Info>{hour}</Info>
                        <Info>{phone}</Info>
                        <Info>{email}</Info>
                    </InfoWrapper>

                </Wrapper>
                {tagText &&
                    <Tag>
                        <TagText>{tagText}</TagText>
                    </Tag>
                }
                {showDeleteIcon &&
                    <IconWrapper onPress={handleDelete}>
                        <CustomIcon
                            name="trash-2"
                            iconType={IconType.Feather}
                            isActive={false}
                            color={colors.gray_100}
                            size={21}/>
                    </IconWrapper>
                }
            </Content>


        </Container>
    )
}

export default Card;