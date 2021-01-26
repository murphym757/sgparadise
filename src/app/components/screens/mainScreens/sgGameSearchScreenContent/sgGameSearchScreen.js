import React, { useState, useEffect, useContext } from 'react'
import { 
    View, 
    Text, 
    Button, 
    Image,
    FlatList, 
    ScrollView, 
    SafeAreaView,
    TouchableOpacity 
} from 'react-native'
import axios from 'axios'
import {
    TestImageDB,
    SearchBar,
    SgSearchQuery,
    SearchGameTitle,
    SearchGameData
} from '../../index'
import {CurrentThemeContext} from '../../../../../../assets/styles/globalTheme'
import {
    CustomInputField
  } from '../../../../../../assets/styles/authScreensStyling'

export default function SgGameSearchScreen({navigation, route}, props) {
    const colors = useContext(CurrentThemeContext)
    const testGamesDb = TestImageDB.results
    const searchType = props.searchType
    console.log(searchType)
    const [ searchQuery, setSearchQuery ] = useState('')

    function filterList(testGamesDb) {
        return testGamesDb.filter(
        (testGame) =>
            testGame.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
            testGame.publisher
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
            testGame.releaseYear
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
            testGame.platform
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
    }

    function onSearch() {
        return (searchQuery) => setSearchQuery(searchQuery)
    }

    function resetSearchQuery() {
        setSearchQuery('')
    }

    function gameIcon() {
        return (
            <FlatList
                data={filterList(testGamesDb)}
                keyboardShouldPersistTaps='always' 
                keyExtractor={item => item.id}
                contentContainerStyle={{
                    justifyContent: 'center'
                }}
                renderItem={({ item }) => (
                <View style={{
                    flexDirection: 'column',
                    flex: 1,
                    marginBottom: 120
                }}>
                    <View>
                        <Image
                            source={{
                                uri: item.gameImages.gameplay[0]
                            }}
                            style={{ 
                            height: 180,
                            marginLeft: 20,
                            marginRight: 20,
                            marginTop: 20,
                            flexWrap:'wrap',
                            resizeMode: 'cover', 
                            borderTopLeftRadius: 25,
                            borderTopRightRadius: 25,
                            zIndex: 3
                        }}/>
                    </View>
                    <View style={{ 
                        marginLeft: 20,
                        marginRight: 20,
                        marginTop: 20,
                        flexWrap:'wrap',
                        height: 180,
                        opacity: 0.65,
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                        backgroundColor: colors.primaryColorLight,
                        zIndex: 2,
                        width: '90.5%',
                        position: 'absolute',
                        right: 0
                    }}/>
                    <View style={{ 
                        marginLeft: 20,
                        marginRight: 20,
                        marginTop: 200,
                        flexWrap:'wrap',
                        height: 120,
                        borderBottomLeftRadius: 25,
                        borderBottomRightRadius: 25,
                        backgroundColor: colors.primaryColorLight,
                        zIndex: 2,
                        width: '90.5%',
                        position: 'absolute',
                        right: 0
                    }}/>

                    {/* Top Row */}

                    <View style={{flexDirection:'row', zIndex: 4, position: 'absolute', marginTop: 35, paddingLeft: 260}}> 
                        <Image 
                            source={{
                                uri: item.gameImages.coverArt
                            }}
                            style={{ 
                            height: 150, 
                            width: 120, 
                            resizeMode: 'stretch', 
                            borderRadius: 25 / 2,
                            justifyContent: 'flex-end'}}
                        />
                    </View>

                    {/* ------- */}
                    {/* Bottom Row */}
                    <View style={{flexDirection:'row', zIndex: 4, position: 'absolute', marginTop: 210}}> 
                        <View style={{ flex: 1 }}>
                            <View style={{flexDirection:'row'}}>
                                <SearchGameTitle style={{flex:1, textAlign: 'left', marginLeft: 40, fontSize: (item.name).length <= 20 ? 15 : 9}}>{item.name}</SearchGameTitle>
                                <SearchGameData style={{flex:1, textAlign: 'right', marginRight: 40}}>{item.platform}</SearchGameData>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <SearchGameData style={{flex:1, textAlign: 'left', marginLeft: 40}}>{item.releaseDate}</SearchGameData>
                                <SearchGameData style={{flex:1, textAlign: 'right', marginRight: 40}}>{item.publisher}</SearchGameData>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <SearchGameData style={{flex:1, textAlign: 'left', marginLeft: 40}}>{item.rating}</SearchGameData>
                            </View>
                        </View>
                    </View>
                </View>
                )}
            />
        )
    }
        
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <CustomInputField
            placeholderTextColor={colors.primaryColor}
            placeholder='Search Games'
            onChangeText={onSearch()}
            value={searchQuery}
            color={colors.primaryColor}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
        />
        <ScrollView 
            scrollEventThrottle={16}
        >
            <View style={{ flex: 1 }}>
                <Text>
                    Add Games
                </Text>
            </View>
            <View>
                {gameIcon()}
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}