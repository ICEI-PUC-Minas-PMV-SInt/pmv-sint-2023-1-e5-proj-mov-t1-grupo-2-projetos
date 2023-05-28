import {Dispatch, SetStateAction, useState} from 'react';
import {StyleProp, TextStyle} from "react-native";
import DropDownPicker, {ListModeType, ModeType} from 'react-native-dropdown-picker';
import {RFValue} from 'react-native-responsive-fontsize';

import theme from 'src/styles/theme';

import {Label} from './styles';

export interface IItems {
    label: string;
    value: string | number | boolean;
}

interface IDropDown {
    items: IItems[];
    value: string | number | null;
    setValue?: Dispatch<SetStateAction<string | null>>;
    label?: string;
    zIndex?: number;
    zIndexInverse?: number;
    placeholder?: string;
    borderRadius?: string | number;
    borderColor?: string | number;
    selectedItemContainerColor?: string;
    onChangeSearchText?: (text) => void;
    searchable?: boolean;
    multiple?: boolean;
    setItems?: Dispatch<SetStateAction<{ label: string; value: string; }[]>>
    mode?: ModeType | undefined
    badgeColors?: string;
    badgeDotColors?: string;
    badgeTextStyle?: StyleProp<TextStyle>;
    listMode?: ListModeType | undefined;
    onSelectItem?: (items: IItems[] | IItems) => void;
}

const Dropdown = ({
                      items,
                      label,
                      zIndex,
                      zIndexInverse,
                      placeholder,
                      borderRadius,
                      setValue,
                      value,
                      borderColor,
                      selectedItemContainerColor,
                      onChangeSearchText,
                      searchable = true,
                      multiple = false,
                      setItems,
                      mode,
                      badgeColors,
                      badgeDotColors,
                      badgeTextStyle,
                      listMode = "SCROLLVIEW",
                      onSelectItem,
                  }: IDropDown) => {

    const [open, setOpen] = useState(false);

    return (
        <>
            {label && <Label>{label}</Label>}
            <DropDownPicker
                searchable={searchable}
                disableLocalSearch={true}
                onChangeSearchText={onChangeSearchText}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                zIndex={zIndex}
                zIndexInverse={zIndexInverse}
                placeholder={placeholder}
                searchPlaceholder="Search by name..."
                multiple={multiple}
                listMode={listMode}
                mode={mode}
                badgeColors={badgeColors}
                badgeDotColors={badgeDotColors}
                badgeTextStyle={badgeTextStyle}
                dropDownDirection={"BOTTOM"}
                onSelectItem={onSelectItem}
                searchTextInputProps={{
                    maxLength: 25
                }}
                style={{
                    backgroundColor: theme.colors.white_100,
                    borderRadius: borderRadius ?? RFValue(4),
                    borderWidth: 0,
                    borderColor: theme.colors.white_100,

                }}
                dropDownContainerStyle={{
                    backgroundColor: theme.colors.white_100,
                    borderWidth: 0,
                    borderColor: theme.colors.white_100,
                    position: 'relative',
                    top: 0
                }}
                listMessageContainerStyle={{
                    borderColor: theme.colors.white_100,
                    borderWidth: 0
                }}
                textStyle={{
                    fontSize: RFValue(12),
                    fontFamily: theme.fonts.Poppins_Regular,
                    color: theme.colors.gray_100,
                }}
                arrowIconStyle={{
                    width: RFValue(12),
                    height: RFValue(12)
                }}
                tickIconStyle={{
                    width: RFValue(12),
                    height: RFValue(12)
                }}
                searchContainerStyle={{
                    borderBottomColor: theme.colors.white_100,
                }}
                searchTextInputStyle={{
                    borderWidth: 0,
                    borderBottomWidth: 0,
                    borderBottomColor: theme.colors.gray_100

                }}
                searchPlaceholderTextColor={theme.colors.gray_100}

            />
        </>
    );
};

export default Dropdown;