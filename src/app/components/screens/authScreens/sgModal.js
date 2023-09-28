import React, { useState, useContext } from 'react';
import { Alert, Modal, StyleSheet, SafeAreaView, Text, View, Pressable } from 'react-native';
import { useClearRefinements } from 'react-instantsearch-hooks';
import {
  ViewContainer,
  ContentContainer,
  FontAwesomeIcon,
  faFilter,
  AlgoliaSearchTitleText,
  customRefinementContext,
} from 'index';

export function ModalButton(props) { 
  const customRefinements = useContext(customRefinementContext)
  const colors = props.refinementColors
  const [modalVisible, setModalVisible] = useState(false);
  const { canRefine: canClear, refine: clear } = useClearRefinements();

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
          shadowColor: colors.black,
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
          backgroundColor: colors.secondaryColor,
      },
      buttonClose: {
          backgroundColor:  colors.secondaryColor,
      },
      textStyle: {
        color: colors.primaryColor,
          fontWeight: 'bold',
          textAlign: 'center',
      },
      modalText: {
          marginBottom: 15,
          textAlign: 'center',
      },
  });


  function refinementListRender() {
    return (
      <SafeAreaView>
            <ViewContainer>
              <ContentContainer>
                <AlgoliaSearchTitleText>Games</AlgoliaSearchTitleText>
              </ContentContainer>
              {customRefinements.customRefinementList('Sub Genres', 'gameSubgenre', colors)}
              {customRefinements.customRefinementList('Genres', 'gameGenre', colors)}
              {customRefinements.customRefinementList('Consoles', 'consoleName', colors)}
            </ViewContainer>
            {customRefinements.customRefinementListButtons(colors, setModalVisible, modalVisible)}
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