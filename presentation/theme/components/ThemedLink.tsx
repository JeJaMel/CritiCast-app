import { Link, LinkProps } from 'expo-router';
import { useThemeColor } from '../hooks/use-theme-color';
import { StyleProp, TextStyle } from 'react-native';

interface Props extends LinkProps {
    children?: React.ReactNode;
    style?: StyleProp<TextStyle>;
}

const ThemedLink = ({ style, ...rest }: Props) => {
    const primaryColor = useThemeColor({}, 'primary');

    return (
        <Link
            style={[
                {
                    color: primaryColor,
                },
                style,
            ]}
            {...rest}
        />
    );
};
export default ThemedLink; 