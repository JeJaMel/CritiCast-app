import { LinearGradient } from 'expo-linear-gradient';
import { ColorValue } from 'react-native';


interface Props {
    colors: readonly [ColorValue, ColorValue, ...ColorValue[]];
}

const GradientDivider = ({ colors }: Props) => (
    <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="h-px"
    />
);

export default GradientDivider;