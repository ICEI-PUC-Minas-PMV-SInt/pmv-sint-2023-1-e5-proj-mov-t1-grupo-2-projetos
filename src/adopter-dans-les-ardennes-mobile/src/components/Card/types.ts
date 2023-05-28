export interface ICard {
    name: string;
    img?: string;
    date?: string | string[];
    hour?: string;
    active?: boolean;
    showBorder?: boolean;
    showAvatar?: boolean;
    tagText?: string;
    showDeleteIcon?: boolean;
    textAlign?: string;
    phone?: string;
    email?: string;
    onPress?: (item: any) => void;
    paddingRight?: string | number;
    paddingLeft?: string | number;
    handleDelete?: () => void;
}