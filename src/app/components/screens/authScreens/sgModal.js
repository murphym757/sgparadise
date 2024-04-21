import React, { useState, useContext } from 'react'
import { Alert, StyleSheet, SafeAreaView, View, Pressable } from 'react-native'
import { customRefinementContext } from 'main/sgGameSearchScreenContent/sgAlgoliaComponents/sgAlgoliaRefinementContext'
import { useClearRefinements } from 'react-instantsearch-core'
import {
  ViewContainer,
  ContentContainer,
  FontAwesomeIcon,
  faFilter,
  AlgoliaSearchTitleText
} from 'index'
import { Searchbar, Button, Modal, Portal, Text, Switch } from "react-native-paper"


export function ModalButton(props) { 
  const customRefinements = useContext(customRefinementContext)
  const colors = props.refinementColors
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false)
  const [isSwitchOneOn, setIsSwitchOneOn] = useState(false)
  const [isSwitchTwoOn, setIsSwitchTwoOn] = useState(false)
  const [isSwitchThreeOn, setIsSwitchThreeOn] = useState(false)
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

  function refinementSeparator(groupTitle, groupData, colors, isSwitchOn, onToggleSwitch) {
    return (
      <View style={{paddingBottom: 35}}>
        {customRefinements.customRefinementList(groupTitle, groupData, colors, isSwitchOn, onToggleSwitch)}
      </View>
    )
  }

  function refinementListRender() {
  const onToggleSwitch1 = () => setIsSwitchOneOn(!isSwitchOneOn)
  const onToggleSwitch2 = () => setIsSwitchTwoOn(!isSwitchTwoOn)
  const onToggleSwitch3 = () => setIsSwitchThreeOn(!isSwitchThreeOn)
    return (
      <SafeAreaView>
            <View>
              <ContentContainer>
                <AlgoliaSearchTitleText>Games</AlgoliaSearchTitleText>
                
              </ContentContainer>
                {refinementSeparator('Sub Genres', 'gameSubgenre', colors, isSwitchOneOn, onToggleSwitch1)}
                {refinementSeparator('Genres', 'gameGenre', colors, isSwitchTwoOn, onToggleSwitch2)}
                {refinementSeparator('Consoles', 'consoleName', colors, isSwitchThreeOn, onToggleSwitch3)}
            </View>
            {customRefinements.customRefinementListButtons(colors, setVisible, visible)}
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

  function reactPaperModal() {
    const containerStyle = {
      backgroundColor: colors.primaryColor, 
      padding: 30,
      margin: 20,
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
    }
    return (
      <View>
        <Portal>
          <Modal 
            visible={visible}
            onDismiss={() => setVisible(false)} 
            contentContainerStyle={containerStyle}
          >
            {refinementListRender()}
          </Modal>
        </Portal>
        <Button 
            icon="filter"
            color={colors.primaryColorAlt}
            labelStyle={{ fontSize: props.fontSizeProp }}
            onPress={() => setVisible(true)}
          />
      </View>
    );
  }
        
  return (
    <View>
      {reactPaperModal()}
    </View>
  );
}