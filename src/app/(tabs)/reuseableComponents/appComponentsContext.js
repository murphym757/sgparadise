import React, { createContext } from 'react'
import { View, FlatList } from 'react-native'
import { Link } from "expo-router"
import { TextInput, Button } from 'react-native-paper'


import {
    Container,
    ContentDivider,
    ContentRow,
    CustomInputField,
    FooterFont,
    FooterLink,
    MainFont,
    MainSecondaryFont,
    MainSubFont,
    TouchableButton,
    TouchableButtonFont,
} from 'index';

//*-------------------*//

    //*----App Wide Button----*//
        function LinkButton({errors, href, children, onPress, ...props}) {
            if (!errors) {
                return (
                    <Link href={href} asChild>
                        <Button {...props} onPress={onPress}>
                            {children}
                        </Button>
                    </Link>
                );
            }
            return (
                <Button {...props} onPress={onPress}>
                    {children}
                </Button>
            )
        }
        function sgButton(buttonData) {
            const button = {
                backgroundColor: buttonData.backgroundColor,
                errors: buttonData.buttonErrors,
                fontColor: buttonData.buttonColor,
                function: buttonData.buttonFunction,
                link: buttonData.buttonLink,
                title: buttonData.buttonTitle,
                verticalSpacing: buttonData.buttonVerticalSpacing
            }
            return (
                <View style={{ paddingVertical: button.verticalSpacing }}>
                    <LinkButton
                        errors={button.errors}
                        href={button.link}
                        style={{ buttonColor: button.fontColor, backgroundColor: button.backgroundColor }}
                        mode="contained"
                        onPress={button.function}
                    >
                        {button.title}
                    </LinkButton>
                </View>
            )
        }
    //*----App Wide Button----*//

const appWideComponentsData = {
    sgButton,
}

export const appWideComponentsContext = createContext(appWideComponentsData)