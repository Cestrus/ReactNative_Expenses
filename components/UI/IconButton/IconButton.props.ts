import { PressableProps } from 'react-native';
import { IconProps } from '@expo/vector-icons/build/createIconSet';
import glyphMap from '@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/Ionicons.json';

type GlyphsType = keyof typeof glyphMap;

export interface IIconButtonProps extends PressableProps {
  icon: GlyphsType;
  color: Pick<IconProps<GlyphsType>, 'color'>['color'];
  size: Pick<IconProps<GlyphsType>, 'size'>['size'];
}
