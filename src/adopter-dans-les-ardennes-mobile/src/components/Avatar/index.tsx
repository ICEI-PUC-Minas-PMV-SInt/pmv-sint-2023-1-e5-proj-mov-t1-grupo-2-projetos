import React, {useEffect, useState} from 'react';
import {ImageProps, TouchableOpacity} from 'react-native';
import {Container, Label} from './styles';
import * as ImagePicker from 'expo-image-picker';
import {ImagePickerAsset} from 'expo-image-picker';

interface AvatarProps extends Omit<ImageProps, 'source'> {
    imageURI: string | null;
    width?: number;
    height?: number;
    onImageSelected?: (image: ImagePickerAsset) => void;
}

const Avatar = ({imageURI, width = 64, height = 64, onImageSelected, ...props}: AvatarProps) => {
    const [source, setSource] = useState<any>(null);

    useEffect(() => {
        if (imageURI) {
            setSource({uri: imageURI});
        } else {
            setSource(null);
        }
    }, [imageURI]);

    const openImagePicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            base64: true,
            allowsEditing: true,
            aspect: [1, 1],
        });

        if (!result.canceled) {
            const selectedImage = result.assets?.[0]
            onImageSelected?.(selectedImage);
        }
    };

    if (!onImageSelected) {
        return (
            <Container source={source} style={{width, height}} {...props} resizeMode="cover">
                {!source && <Label>Edit</Label>}
            </Container>
        );
    }

    return (
        <TouchableOpacity onPress={openImagePicker}>
            <Container source={source} style={{width, height}} {...props} resizeMode="cover">
                {!source && <Label>Edit</Label>}
            </Container>
        </TouchableOpacity>
    );
};

export default Avatar;