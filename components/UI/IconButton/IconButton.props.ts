import { PressableProps } from 'react-native';
import { IconProps } from '@expo/vector-icons/build/createIconSet';
import glyphMap from '@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/Ionicons.json';

type Glyphs = keyof typeof glyphMap;

export interface IIconButtonProps extends PressableProps, Pick<IconProps<Glyphs>, 'color' | 'name' | 'size'> {}
