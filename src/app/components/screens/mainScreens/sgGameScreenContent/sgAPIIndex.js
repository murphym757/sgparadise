import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Button, FlatList, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import { imagesConfig } from '../../../../../server/config/config'

// App Styling
import {
    Container,
    MainFont,
    TestImageDB,
    SearchGameTitle,
    SearchGameData,
    dayTime,
    nightTime
} from '../../index'

export function consoleImages() {
    const dayImages = [
        { 
            id: '0', 
            systemLogo: imagesConfig.sgallDayImage, 
            systemLogoSelected: imagesConfig.sgallDayImagePicked, 
            systemgbId:[6,141,31,29,8], 
            systemigdbId: [29,84,30,78,64] 
        },
        { 
            id: '1', 
            systemLogo: imagesConfig.sggDayImage,
            systemLogoSelected: imagesConfig.sggDayImagePicked, 
            systemConsoleFamily: "Genesis/Mega Drive",
            systemConsoleGeneration: "4th",
            systemConsoleGenerationTimeline: "(1987–1997)",
            systemConsoleDescription: "The Sega Mega Drive (or Sega Genesis as its known here in North America) is a 16-bit video game console. The console is a part of the vaunted fourth generation of game consoles which spans from 1987–1997. The console is also Sega’s third entry into the home video gaming industry. It’s direct competitor was Nintendo’s Super Famicom (or Super Nintendo).",
            systemgbId: 6, 
            systemigdbId: 29,
            "Japan": [
                {
                    systemName: "Sega Mega Drive",
                    localCurrency: "¥",
                    systemPriceAtRelease: 21000,
                    systemReleaseDateJP: 10/29/1988,
                    totalSales: [
                        {
                            1988: 400000,
                            1989: 600000,
                            1990: 900000,
                            1991: 700000,
                            1992: 400000,
                            1993: 450000,
                            1994: 100000,
                            1995: 30000,
                            1996: null,
                            1997: null,
                            1998: null,
                            1999: null,
                            2000: null,
                            2001: null
                        }
                    ]
                }
            ],
            "Europe": [
                {
                    systemName: "Sega Mega Drive",
                    localCurrency: "£",
                    systemPriceAtRelease: 190, 
                    systemReleaseDatePAL: 9/14/1990,
                    totalSales: [
                        {
                            1988: null,
                            1989: null,
                            1990: 600000,
                            1991: 1200000,
                            1992: 3600000,
                            1993: 1850000,
                            1994: 1020000,
                            1995: 500000,
                            1996: 200000,
                            1997: 200000,
                            1998: null,
                            1999: null,
                            2000: null,
                            2001: null
                        }
                    ]
                }
            ],
            "North America": [
                {
                    systemName: "Sega Genesis",
                    localCurrency: "$", 
                    systemPriceAtRelease: 190,
                    systemReleaseDateNA: 8/14/1989,
                    totalSales: [
                        {
                            1989: 500000,
                            1990: 1000000,
                            1991: 1600000,
                            1992: 4500000,
                            1993: 5900000,
                            1994: 4000000,
                            1995: 2100000,
                            1996: 1315904,
                            1997: 477920,
                            1998: 2658971,
                            1999: 931013,
                            2000: 54337,
                            2001: 1316
                        }
                    ]
                }
            ]
        },
        { 
            id: '2', 
            systemLogo: imagesConfig.sg1000DayImage,  
            systemLogoSelected: imagesConfig.sg1000DayImagePicked,
            systemConsoleFamily: "SG-1000",
            systemConsoleGeneration: "3rd",
            systemConsoleGenerationTimeline: "(1983–1993)",
            systemConsoleDescription: "The Sega SG-1000 is an 8-bit video game console. The console is a part of the third generation of game consoles which spans from 1983–1993. This console would mark Sega’s initial entry into the home video gaming industry. It’s direct competitor was Nintendo’s Family Computer (or Famicom). However, outside of Japan it commonly referred to as the Nintendo Entertainment System (NES).",  
            systemgbId: 141, 
            systemigdbId: 84,
            "Japan": [
                {
                    systemName: "Sega SG-1000",
                    localCurrency: "¥",
                    systemPriceAtRelease: 15000,
                    systemReleaseDateJP: 7/15/1983,
                    totalSales: [
                        {
                            1983: 200000,
                            1984: 240000,
                            1985: 280000,
                            1986: 280000
                        }
                    ]
                }
            ],
            "Europe": [
                {
                    systemName: null, 
                    localCurrency: null,
                    systemPriceAtRelease: null,
                    systemReleaseDatePAL: null,
                    totalSales: null
                }
            ],
            "North America": [
                {
                    systemName: null,
                    localCurrency: null,
                    systemPriceAtRelease: null, 
                    systemReleaseDatePAL: null,
                    totalSales: null
                }
            ] 
        },
        { 
            id: '3', 
            systemLogo: imagesConfig.sg32xDayImage,  
            systemLogoSelected: imagesConfig.sg32xDayImagePicked,
            systemConsoleFamily: "Genesis/Mega Drive",
            systemConsoleGeneration: "4th",
            systemConsoleGenerationTimeline: "(1987–1997)",
            systemConsoleDescription: "The Sega 32X is a peripheral for the Mega Drive/Genesis that iimproved the console’s processing power. The peripheral went by a different name in each region it was released in, but each carried the 32X moniker. The peripheral served as Sega initial foray into the 32-bit era of gaming, at least until Sega released the Sega Saturn. The Sega Saturn would go on to blend the CD capabilities of the Sega CD, while implementing the processing power of the 32x.", 
            systemgbId: 31, 
            systemigdbId: 30,
            "Japan": [
                {
                    systemName: "Sega Super 32X",
                    localCurrency: "¥",
                    systemPriceAtRelease: 16800,
                    systemReleaseDateJP: 12/3/1994,
                    totalSales: [
                        {
                           1994: 100000
                        }
                    ]
                }
            ],
            "Europe": [
                {
                    systemName: "Sega Mega Drive 32X",
                    localCurrency: "£", 
                    systemPriceAtRelease: 170,  
                    systemReleaseDatePAL: 12/4/1994,
                    totalSales: [
                        {
                            1994: 65000
                        }
                    ]
                }
            ],
            "North America": [
                {
                    systemName: "Sega Genesis 32X",
                    localCurrency: "$", 
                    systemPriceAtRelease: 160, 
                    systemReleaseDateNA: 11/21/1994,
                    totalSales: [
                        {
                            1994: 500000
                        }
                    ]
                }
            ]
        },
        { 
            id: '4', 
            systemLogo: imagesConfig.sgcdDayImage, 
            systemLogoSelected: imagesConfig.sgcdDayImagePicked, 
            systemConsoleFamily: "Genesis/Mega Drive",
            systemConsoleGeneration: "4th",
            systemConsoleGenerationTimeline: "(1987–1997)",
            systemConsoleDescription: "The Sega CD (or Mega-CD outside of North America and Brazil) and CD-ROM peripheral for the Mega Drive/Genesis. Its purpose was to give Sega and advantage over Nintendo. Not to be outdone by Sega, Nintendo would later develop a CD-ROM peripheral of its own called the “PlayStation”. However, it would later be cancelled in favor of Sony releasing the PlayStation on its own. The rest is history.",
            systemgbId: 29, 
            systemigdbId: 78,
            "Japan": [
                {
                    systemName: "Sega Mega-CD",
                    localCurrency: "¥",
                    systemPriceAtRelease: 49800, 
                    systemReleaseDateJP: 12/12/1991,
                    totalSales: [
                        {
                           1991: 200000,
                           1992: 80000,
                           1993: 420000,
                           1994: 150000
                        }
                    ]
                }
            ],
            "Europe": [
                {
                    systemName: "Sega Mega-CD",
                    localCurrency: "£", 
                    systemPriceAtRelease: 270, 
                    systemReleaseDatePAL: 4/2/1993,
                    totalSales: [
                        {
                            1991: null,
                            1992: null,
                            1993: 210000,
                            1994: 205000
                        }
                    ]
                }
            ],
            "North America": [
                {
                    systemName: "Sega CD",
                    localCurrency: "$",
                    systemPriceAtRelease: 300,  
                    systemReleaseDateNA: 10/15/1992,
                    totalSales: [
                        {
                            1991: null,
                            1992: 220000,
                            1993: 1080000,
                            1994: 200000
                        }
                    ]
                }
            ]
        },
        { 
            id: '5', 
            systemLogo: imagesConfig.sgmsDayImage, 
            systemLogoSelected: imagesConfig.sgmsDayImagePicked,
            systemConsoleFamily: "SG-1000",
            systemConsoleGeneration: "3rd",
            systemConsoleGenerationTimeline: "(1983–1993)",
            systemConsoleDescription: "The Sega Master System is an 8-bit video game console. The console is a part of the third generation of game consoles which spans from 1983–1993. The Master System is technically Sega second entry in it’s stored history, but it also serves as the third variation of the SG-1000 console. However, it would be released in the US, UK, and Brazil (all of switch would serve as major markets for Sega). The console was meant to serve as a direct competitor to the Nintendo Entertainment System (NES).",  
            systemgbId: 8, 
            systemigdbId: 64,
            "Japan": [
                {
                    systemName: "Sega Master System",
                    localCurrency: "¥", 
                    systemPriceAtRelease: 19800,
                    systemReleaseDateJP: 10/20/1985,
                    totalSales: [
                        {
                            1985: 370000,
                            1986: 630000,
                            1987: 1080000,
                            1988: 240000,
                            1989: 200000,
                            1990: null,
                            1991: null,
                            1992: null,
                            1993: null,
                            1994: null
                        }
                    ]
                }
            ],
            "Europe": [
                {
                    systemName: "Sega Master System",
                    localCurrency: "£", 
                    systemPriceAtRelease: 100, 
                    systemReleaseDatePAL: 6/1/1987,
                    totalSales: [
                        {
                            1985: null,
                            1986: null,
                            1987: 155000,
                            1988: 195000,
                            1989: 350000,
                            1990: 725000,
                            1991: 2415000,
                            1992: 2360000,
                            1993: 750000,
                            1994: 4460000,
                        }
                    ]
                }
            ],
            "North America": [
                {
                    systemName: "Sega Master System",
                    localCurrency: "$", 
                    systemPriceAtRelease: 150, 
                    systemReleaseDateNA: 9/1/1986,
                    totalSales: [
                        {
                            1985: null,
                            1986: 125000,
                            1987: 500000,
                            1988: 1040000,
                            1989: null,
                            1990: null,
                            1991: 2000000,
                            1992: null,
                            1993: null,
                            1994: null
                        }
                    ]
                }
            ]  
        },
      ];
    const nightImages = [
        { 
            id: '0', 
            systemLogo: imagesConfig.sgallNightImage, 
            systemLogoSelected: imagesConfig.sgallNightImagePicked, 
            systemgbId:[6,141,31,29,8], 
            systemigdbId: [29,84,30,78,64] 
        },
        { 
            id: '1', 
            systemLogo: imagesConfig.sggNightImage, 
            systemLogoSelected: imagesConfig.sggNightImagePicked, 
            systemConsoleFamily: "Genesis/Mega Drive",
            systemConsoleGeneration: "4th",
            systemConsoleGenerationTimeline: "(1987–1997)",
            systemConsoleDescription: "The Sega Mega Drive (or Sega Genesis as its known here in North America) is a 16-bit video game console. The console is a part of the vaunted fourth generation of game consoles which spans from 1987–1997. The console is also Sega’s third entry into the home video gaming industry. It’s direct competitor was Nintendo’s Super Famicom (or Super Nintendo).",
            systemgbId: 6, 
            systemigdbId: 29,
            "Japan": [
                {
                    systemName: "Sega Mega Drive",
                    localCurrency: "¥",
                    systemPriceAtRelease: 21000,
                    systemReleaseDateJP: 10/29/1988,
                    totalSales: [
                        {
                            1988: 400000,
                            1989: 600000,
                            1990: 900000,
                            1991: 700000,
                            1992: 400000,
                            1993: 450000,
                            1994: 100000,
                            1995: 30000,
                            1996: null,
                            1997: null,
                            1998: null,
                            1999: null,
                            2000: null,
                            2001: null
                        }
                    ]
                }
            ],
            "Europe": [
                {
                    systemName: "Sega Mega Drive",
                    localCurrency: "£",
                    systemPriceAtRelease: 190, 
                    systemReleaseDatePAL: 9/1/1990,
                    totalSales: [
                        {
                            1988: null,
                            1989: null,
                            1990: 600000,
                            1991: 1200000,
                            1992: 3600000,
                            1993: 1850000,
                            1994: 1020000,
                            1995: 500000,
                            1996: 200000,
                            1997: 200000,
                            1998: null,
                            1999: null,
                            2000: null,
                            2001: null
                        }
                    ]
                }
            ],
            "North America": [
                {
                    systemName: "Sega Genesis",
                    localCurrency: "$", 
                    systemPriceAtRelease: 190, 
                    systemReleaseDateNA: 8/14/1989,
                    totalSales: [
                        {
                            1988: null,
                            1989: 500000,
                            1990: 1000000,
                            1991: 1600000,
                            1992: 4500000,
                            1993: 5900000,
                            1994: 4000000,
                            1995: 2100000,
                            1996: 1315904,
                            1997: 477920,
                            1998: 2658971,
                            1999: 931013,
                            2000: 54337,
                            2001: 1316
                        }
                    ]
                }
            ]
        },
        { 
            id: '2', 
            systemLogo: imagesConfig.sg1000NightImage,  
            systemLogoSelected: imagesConfig.sg1000NightImagePicked, 
            systemConsoleFamily: "SG-1000",
            systemConsoleGeneration: "3rd",
            systemConsoleGenerationTimeline: "(1983–1993)",
            systemConsoleDescription: "The Sega SG-1000 is an 8-bit video game console. The console is a part of the third generation of game consoles which spans from 1983–1993. This console would mark Sega’s initial entry into the home video gaming industry. It’s direct competitor was Nintendo’s Family Computer (or Famicom). However, outside of Japan it commonly referred to as the Nintendo Entertainment System (NES).",  
            systemgbId: 141, 
            systemigdbId: 84,
            "Japan": [
                {
                    systemName: "Sega SG-1000",
                    localCurrency: "¥",
                    systemPriceAtRelease: 15000,
                    systemReleaseDateJP: 7/15/1983,
                    totalSales: [
                        {
                            1983: 200000,
                            1984: 240000,
                            1985: 280000,
                            1986: 280000
                        }
                    ]
                }
            ],
            "Europe": [
                {
                    systemName: null,
                    localCurrency: null,
                    systemPriceAtRelease: null, 
                    systemReleaseDatePAL: null,
                    totalSales: null
                }
            ],
            "North America": [
                {
                    systemName: null,
                    localCurrency: null,
                    systemPriceAtRelease: null, 
                    systemReleaseDatePAL: null,
                    totalSales: null
                }
            ] 
        },
        { 
            id: '3', 
            systemLogo: imagesConfig.sg32xNightImage,  
            systemLogoSelected: imagesConfig.sg32xNightImagePicked, 
            systemConsoleFamily: "Genesis/Mega Drive",
            systemConsoleGeneration: "4th",
            systemConsoleGenerationTimeline: "(1987–1997)",
            systemConsoleDescription: "The Sega 32X is a peripheral for the Mega Drive/Genesis that iimproved the console’s processing power. The peripheral went by a different name in each region it was released in, but each carried the 32X moniker. The peripheral served as Sega initial foray into the 32-bit era of gaming, at least until Sega released the Sega Saturn. The Sega Saturn would go on to blend the CD capabilities of the Sega CD, while implementing the processing power of the 32x.", 
            systemgbId: 31, 
            systemigdbId: 30,
            "Japan": [
                {
                    systemName: "Sega 32X",
                    localCurrency: "¥",
                    systemPriceAtRelease: 16800,
                    systemReleaseDateJP: 12/3/1994,
                    totalSales: [
                        {
                           1994: 100000
                        }
                    ]
                }
            ],
            "Europe": [
                {
                    systemName: "Sega 32X",
                    localCurrency: "£", 
                    systemPriceAtRelease: 170, 
                    systemReleaseDatePAL: 12/4/1994,
                    totalSales: [
                        {
                            1994: 65000
                        }
                    ]
                }
            ],
            "North America": [
                {
                    systemName: "Sega 32X",
                    localCurrency: "$", 
                    systemPriceAtRelease: 160, 
                    systemReleaseDateNA: 11/21/1994,
                    totalSales: [
                        {
                            1994: 500000
                        }
                    ]
                }
            ]
        },
        { 
            id: '4', 
            systemLogo: imagesConfig.sgcdNightImage,  
            systemLogoSelected: imagesConfig.sgcdNightImagePicked, 
             systemConsoleFamily: "Genesis/Mega Drive",
            systemConsoleGeneration: "4th",
            systemConsoleGenerationTimeline: "(1987–1997)",
            systemConsoleDescription: "The Sega CD (or Mega-CD outside of North America and Brazil) and CD-ROM peripheral for the Mega Drive/Genesis. Its purpose was to give Sega and advantage over Nintendo. Not to be outdone by Sega, Nintendo would later develop a CD-ROM peripheral of its own called the “PlayStation”. However, it would later be cancelled in favor of Sony releasing the PlayStation on its own. The rest is history.",
            systemgbId: 29, 
            systemigdbId: 78,
            "Japan": [
                {
                    systemName: "Sega Mega-CD",
                    localCurrency: "¥",
                    systemPriceAtRelease: 49800, 
                    systemReleaseDateJP: 12/12/1991,
                    totalSales: [
                        {
                           1991: 200000,
                           1992: 80000,
                           1993: 420000,
                           1994: 150000
                        }
                    ]
                }
            ],
            "Europe": [
                {
                    systemName: "Sega Mega-CD",
                    localCurrency: "£", 
                    systemPriceAtRelease: 270, 
                    systemReleaseDatePAL: 4/2/1993,
                    totalSales: [
                        {
                            1991: null,
                            1992: null,
                            1993: 210000,
                            1994: 205000
                        }
                    ]
                }
            ],
            "North America": [
                {
                    systemName: "Sega CD",
                    localCurrency: "$",
                    systemPriceAtRelease: 300, 
                    systemReleaseDateNA: 10/15/1992,
                    totalSales: [
                        {
                            1991: null,
                            1992: 220000,
                            1993: 1080000,
                            1994: 200000
                        }
                    ]
                }
            ]
        },
        { 
            id: '5', 
            systemLogo: imagesConfig.sgmsNightImage, 
            systemLogoSelected: imagesConfig.sgmsNightImagePicked, 
            systemConsoleFamily: "SG-1000",
            systemConsoleGeneration: "3rd",
            systemConsoleGenerationTimeline: "(1983–1993)",
            systemConsoleDescription: "The Sega Master System is an 8-bit video game console. The console is a part of the third generation of game consoles which spans from 1983–1993. The Master System is technically Sega second entry in it’s stored history, but it also serves as the third variation of the SG-1000 console. However, it would be released in the US, UK, and Brazil (all of switch would serve as major markets for Sega). The console was meant to serve as a direct competitor to the Nintendo Entertainment System (NES).",  
            systemgbId: 8, 
            systemigdbId: 64,
            "Japan": [
                {
                    systemName: "Sega Master System",
                    localCurrency: "¥", 
                    systemPriceAtRelease: 19800,
                    systemReleaseDateJP: 10/20/1985,
                    totalSales: [
                        {
                            1985: 370000,
                            1986: 630000,
                            1987: 1080000,
                            1988: 240000,
                            1989: 200000,
                            1990: null,
                            1991: null,
                            1992: null,
                            1993: null,
                            1994: null
                        }
                    ]
                }
            ],
            "Europe": [
                {
                    systemName: "Sega Master System",
                    localCurrency: "£", 
                    systemPriceAtRelease: 100, 
                    systemReleaseDatePAL: 6/1/1987,
                    totalSales: [
                        {
                            1985: null,
                            1986: null,
                            1987: 155000,
                            1988: 195000,
                            1989: 350000,
                            1990: 725000,
                            1991: 2415000,
                            1992: 2360000,
                            1993: 750000,
                            1994: 4460000,
                        }
                    ]
                }
            ],
            "North America": [
                {
                    systemName: "Sega Master System",
                    localCurrency: "$", 
                    systemPriceAtRelease: 150, 
                    systemReleaseDateNA: 9/1/1986,
                    totalSales: [
                        {
                            1985: null,
                            1986: 125000,
                            1987: 500000,
                            1988: 1040000,
                            1989: null,
                            1990: null,
                            1991: 2000000,
                            1992: null,
                            1993: null,
                            1994: null
                        }
                    ]
                }
            ]   
        },
    ];
    if (nightTime) {return nightImages}
    if (dayTime) {return dayImages}
   }

  export function setImage(imageWidth, imageHeight, imageUrl) {
    return (
        <Image
            style={{
                width: imageWidth,
                height: imageHeight
            }}
            source={{
                uri: "" + imageUrl + "",
            }}
        />
    )
}

export function modalConfirmation(resetConfirmation, setConfirmation) {
  return (
        <View style={{ flexDirection: 'row' }}>
            <Button
                onPress={() => resetConfirmation}
                title="No"
            />
            <Button
                onPress={() => setConfirmation}
                title="Yes"
            />
        </View>
  )
}

export function searchGameIcon(colors, item) {
        return (
            <View>
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
        )
    }
    