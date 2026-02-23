import React from 'react';
import { ImageStyle, ViewStyle } from 'react-native';
import FastImage, { FastImageProps, ResizeMode } from 'react-native-fast-image';
import { moderateScale } from '@/styles/scaling';

export interface ImageCompProps extends Omit<FastImageProps, 'style' | 'resizeMode'> {
    /** Image source URI or require() */
    source: { uri: string } | number;
    /** Width of the image (number or string like '100%') */
    width?: number | string;
    /** Height of the image (number or string like '100%') */
    height?: number | string;
    /** Border radius for circular/square rounded images */
    borderRadius?: number;
    /** Make the image circular (overrides borderRadius if provided) */
    circular?: boolean;
    /** Resize mode: 'contain', 'cover', 'stretch', 'center', 'repeat' */
    resizeMode?: ResizeMode;
    /** Custom style to override default styles */
    style?: ImageStyle | ViewStyle;
    /** Size preset for common use cases */
    size?: 'small' | 'medium' | 'large' | 'xlarge';
}

const sizePresets = {
    small: moderateScale(40),
    medium: moderateScale(60),
    large: moderateScale(100),
    xlarge: moderateScale(150),
};

const ImageComp: React.FC<ImageCompProps> = ({
    source,
    width,
    height,
    borderRadius,
    circular = false,
    resizeMode = FastImage.resizeMode.cover,
    style,
    size,
    ...props
}) => {
    // Calculate dimensions
    const imageWidth = width || (size ? sizePresets[size] : undefined);
    const imageHeight = height || (size ? sizePresets[size] : undefined);

    // Calculate border radius
    let finalBorderRadius = borderRadius;
    if (circular && imageWidth && imageHeight) {
        // For circular images, use half of the smallest dimension (only if both are numbers)
        if (typeof imageWidth === 'number' && typeof imageHeight === 'number') {
            finalBorderRadius = Math.min(imageWidth, imageHeight) / 2;
        } else if (typeof imageWidth === 'number') {
            finalBorderRadius = imageWidth / 2;
        } else if (typeof imageHeight === 'number') {
            finalBorderRadius = imageHeight / 2;
        }
    }

    const imageStyle: ImageStyle = {
        width: imageWidth,
        height: imageHeight,
        borderRadius: finalBorderRadius,
    };

    return (
        <FastImage
            source={typeof source === 'number' ? source : { uri: source.uri }}
            style={[imageStyle, style]}
            resizeMode={resizeMode}
            {...props}
        />
    );
};

export default ImageComp;
