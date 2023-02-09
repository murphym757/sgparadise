import React, { useState, useContext } from 'react'
import { Alert, Modal, Button,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image, Pressable, ScrollView } from 'react-native';
import { useClearRefinements,
  useCurrentRefinements,
  useRefinementList, } from 'react-instantsearch-hooks';
import { 
  CurrentThemeContext, 
  MainFontPills, 
  MainHeading,
  ViewContainer,
  ContentContainer,
  MainFont,
  FontAwesomeIcon,
  faFilter,
  MainSubFont,
  AlgoliaSearchListLabelText,
  AlgoliaSearchTitleText,
} from 'index'

export function ModalButton({ onToggleModal, onChange }) { 
  const colors = useContext(CurrentThemeContext)
  const [modalVisible, setModalVisible] = useState(false);
  const { canRefine: canClear, refine: clear } = useClearRefinements();
  const { items: currentRefinements } = useCurrentRefinements();
  const totalRefinements = currentRefinements.reduce(
    (acc, { refinements }) => acc + refinements.length,
    0
  );
  const styles = StyleSheet.create({
      centeredView: {
          flex: 1,
          ///justifyContent: 'center', This centers the modal in the modal of the page. This may be ideal for a confirmation message or the last page of the game upload process.
          //alignItems: 'center', This centers the modal from the sides.
          marginTop: 22
      },
      modalView: {
          margin: 20,
          backgroundColor: colors.primaryColor,
          borderRadius: 20,
          padding: 30,
          shadowColor: '#000',
          shadowOffset: {
          width: 0,
          height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
      },
      button: {
          borderRadius: 20,
          padding: 10,
          elevation: 2,
      },
      buttonOpen: {
          backgroundColor: '#F194FF',
      },
      buttonClose: {
          backgroundColor: '#2196F3',
      },
      textStyle: {
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
      },
      modalText: {
          marginBottom: 15,
          textAlign: 'center',
      },
  });

  function customRefinementListButtons() {
    return (
      <View style={{flexDirection: 'row'}}>
      <View style={{
        flex: 1,
        alignItems: 'center',
        marginTop: 18
      }}>
        <Button
          title="Clear all"
          color={colors.primaryFontColor}
          disabled={!canClear}
          onPress={() => {
            clear();
            () => setModalVisible(!modalVisible)
          }}
        />
      </View>
      <View style={{
        flex: 1,
        alignItems: 'center',
        marginTop: 18
      }}>
        <Button
          onPress={() => setModalVisible(!modalVisible)}
          title="See results"
          color={colors.primaryFontColor}
        />
      </View>
    </View>
    )
  }

  function customRefinementList(title, searchAttribute) {
    const listTitle = title
    const attributeName = searchAttribute
    const { items, refine } = useRefinementList({ attribute: attributeName });
  
    return (
      <View style={{marginTop: 32}}>
      <Text style={{color: colors.primaryFontColor}}>{listTitle}</Text>
      <ScrollView style={{height: 150}}>
        {items.map((item) => {
          return (
            <TouchableOpacity
              key={item.label}
              style={{
                paddingVertical: 12,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderColor: colors.primaryColorLight,
                alignItems: 'center',
              }}
              onPress={() => {
                refine(item.label);
              }}
            >
              <AlgoliaSearchListLabelText style={{fontFamily: item.isRefined ? 'SpartanBlack' : 'SpartanRegular'}}>
                {item.label}
              </AlgoliaSearchListLabelText>
             
              <View style={{
                backgroundColor: colors.primaryColorLight,
                borderRadius: 24,
                paddingVertical: 4,
                paddingHorizontal: 8,
                marginLeft: 4,
              }}>
                <Text style={{color: colors.secondaryColor, fontWeight: '800'}}>{item.count}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
        </ScrollView>
      </View>
    )
  }

  function refinementListRender() {
    return (
      <SafeAreaView>
            <ViewContainer>
              <ContentContainer>
                <AlgoliaSearchTitleText>Games</AlgoliaSearchTitleText>
              </ContentContainer>
              {customRefinementList('Sub Genres', 'gameSubgenre')}
              {customRefinementList('Genres', 'gameGenre')}
              {customRefinementList('Consoles', 'consoleName')}
            </ViewContainer>
            {customRefinementListButtons()}
          </SafeAreaView>
    )
  }

  function modalFunc() {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {refinementListRender()}
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {modalVisible == true
          ? <View></View>
          : <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(true)}>
              <Text style={styles.textStyle}>Filters 
                <FontAwesomeIcon 
                    icon={ faFilter } color={colors.primaryColorAlt} size={15}
                />
                </Text>
            </Pressable>
        }
      
      </View>
    );
  }
        
  return (
    <View>
      {modalFunc()}
    </View>
  );
}