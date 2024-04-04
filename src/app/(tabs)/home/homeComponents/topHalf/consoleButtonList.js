import React from 'react'
import { View, FlatList } from 'react-native'
import { Button } from 'react-native-paper'
import { Image } from 'expo-image'

export function ConsoleButtonList(props) {
    const { colors, imagesConfig, activeButton, setActiveButton } = props
         //*------Material Button for Console Icons (Move to a separate file later on)------*//
        function sgConsoleIconButtonGroup() {
            const consoleListArray = [
                {id: 'sgGenesis', consoleName: 'Genesis', consoleIcon: imagesConfig.sgGENIcon},
                {id: 'sg1000', consoleName: 'SG-1000', consoleIcon: imagesConfig.sg1000Icon},
                {id: 'sgMS', consoleName: 'Master System', consoleIcon: imagesConfig.sgMSIcon},
                {id: 'sgGG', consoleName: 'Game Gear', consoleIcon: imagesConfig.sgGGIcon},
                {id: 'sgSat', consoleName: 'Saturn', consoleIcon: imagesConfig.sgSATIcon},
                {id: 'sg32X', consoleName: '32X', consoleIcon: imagesConfig.sg32XIcon},
                {id: 'sgCD', consoleName: 'CD', consoleIcon: imagesConfig.sgCDIcon}
            ]
            const handleButtonPress = (buttonId) => {
                setActiveButton(buttonId);
                console.log(`Button ${buttonId} pressed`);
            };
            const defaultStyling = {
                backgroundColor: colors.primaryColor,
                borderColor: colors.secondaryFontColor,
                color: colors.secondaryColor
            }
            const activeStyling = {
                backgroundColor: colors.secondaryColor,
                borderColor: colors.secondaryFontColor,
                color: colors.primaryColorAlt
            }
            const renderItem = ({ item }) => {
                const isPressed = activeButton === item.id
                const itemStyle = isPressed ? activeStyling : defaultStyling
                return (
                    <View>
                        {materialButton(item.consoleIcon, item.consoleName, handleButtonPress, item, itemStyle)}
                    </View>
                )
            }
            
            return (
                <View style={{flexDirection: 'row', paddingVertical: 20}}>
                    <FlatList
                        contentContainerStyle={{}}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={consoleListArray}
                        keyboardShouldPersistTaps="always"
                        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                    />
                </View>
            );
        }
    //*-----Material Button for Console Icons------*//
    function materialButton(buttonIcon, buttonText, handleButtonPress, item, miniStyling) {
        return (
            <Button
                theme={{ colors: { primary: miniStyling.color, outline:  miniStyling.borderColor } }}
                icon={({ size, color }) => (
                    <Image
                        source={{ uri: buttonIcon }}
                        style={{ width: size, height: size, tintColor: miniStyling.primaryColorAlt }}
                    />
                )}
                uppercase={false}
                mode="outlined" 
                onPress={() => handleButtonPress(item.id)}>
                    {buttonText}
            </Button>
            
        )
    }
        return sgConsoleIconButtonGroup();
}