import { Ionicons } from '@expo/vector-icons';
import { Text, Pressable, PressableProps, StyleSheet } from 'react-native';
import { useThemeColor } from '../hooks/use-theme-color';

interface Props extends PressableProps {
    children: string;
    icon?: keyof typeof Ionicons.glyphMap;
    Buttonclassname?: string;
    textClassname?: string;
}

const ThemedButton = ({ children, icon, Buttonclassname, textClassname, ...rest }: Props) => {
    const primaryColor = useThemeColor({}, 'primary');

    return (
        <Pressable
            {...(Buttonclassname
                ? ({ className: Buttonclassname } as any)
                : {
                    style: ({ pressed }: { pressed: boolean }) => [
                        {
                            backgroundColor: pressed ? primaryColor + '90' : primaryColor,
                        },
                        styles.button,
                    ],
                })}
            {...rest}
        >
            <Text
                {...(textClassname
                    ? ({ className: textClassname } as any)
                    : { style: { color: 'white' } })}
            >
                {children}
            </Text>

            {icon && (
                <Ionicons
                    name={icon}
                    size={24}
                    color="white"
                    style={{ marginHorizontal: 5 }}
                />
            )}
        </Pressable>
    );
};
export default ThemedButton;

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
});