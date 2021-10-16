/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  RefreshControl,
  Modal,
  Pressable,
} from 'react-native';
import {connect} from 'react-redux';

import {Icon, Header} from 'react-native-elements';

import colors from '../../utils/colors';

import {
  getContact,
  refreshingContact,
  deleteContact,
} from '../../stores/actions/contact';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const HomeScreen = ({
  getContactList,
  contactList,
  isRefreshing,
  refreshContactList,
  deleteContactById,
  navigation,
  setContactId,
  createSuccess,
  resetStatus,
  isError,
  error,
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    getContactList();
  }, []);

  useEffect(() => {
    if (isRefreshing) {
      getContactList();
    }
  }, [isRefreshing]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    position: 'relative',
  };

  const handleEdit = id => {
    setContactId(id);
    navigation.push('Detail');
  };

  const handleAdd = () => {
    setContactId('');
    navigation.push('Detail');
  };

  const randomColor = () => {
    let color = '#';
    for (let i = 0; i < 3; i++) {
      color += (
        '0' +
        Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)
      ).slice(-2);
    }
    return color;
  };

  const validURL = str => {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i',
    ); // fragment locator
    return !!pattern.test(str);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header
        placement="left"
        leftComponent={{
          text: 'CONTACT APPS',
          style: {color: '#fff', padding: 10},
        }}
        rightComponent={{
          text: 'ADD',
          onPress: handleAdd,
          style: {color: '#fff', padding: 10},
        }}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => refreshContactList()}
            colors={[colors.brightNavyBlue]}
          />
        }>
        <View style={styles.scrollInfo}>
          <Text style={{color: colors.white}}>
            Tarik ke bawah untuk <Text>Memperbaharui Data.</Text>
          </Text>
        </View>
        <View
          style={{
            backgroundColor: colors.white,
          }}>
          {contactList.map(item => (
            <View key={item.id} style={[styles.containerCard]}>
              {validURL(item.photo) ? (
                <Image
                  style={styles.wrapperPhoto}
                  source={{
                    uri: item.photo,
                  }}
                />
              ) : (
                <View
                  style={[
                    styles.wrapperPhoto,
                    {backgroundColor: randomColor()},
                  ]}>
                  <Text style={styles.textPhoto}>
                    {item.firstName.slice(0, 2)}
                  </Text>
                </View>
              )}

              <View style={styles.wrapperText}>
                <Text
                  style={
                    styles.textName
                  }>{`${item.firstName} ${item.lastName}`}</Text>
                <Text
                  style={{
                    color: '#575757',
                    fontSize: 12,
                  }}>{`${item.age} Years Old`}</Text>
              </View>
              <View style={styles.wrapperAction}>
                <Icon
                  raised
                  name="edit"
                  type="FontAwesome5"
                  color="#517fa4"
                  size={14}
                  onPress={() => handleEdit(item.id)}
                />
                <Icon
                  raised
                  name="close"
                  type="Ionicons"
                  color={colors.cinnabar}
                  size={14}
                  onPress={() => deleteContactById(item.id)}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isError}
        onRequestClose={() => {
          resetStatus(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[styles.modalText, {color: 'red'}]}>Error</Text>
            <Text style={styles.modalText}>{error.message}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                resetStatus(false);
              }}>
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  containerCard: {
    padding: 20,
    margin: 6,
    borderRadius: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 0.2,
    backgroundColor: '#fff',
    borderColor: 'grey',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  scrollInfo: {
    marginTop: 0,
    width: '100%',
    height: 36,
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: colors.starCommandBlue,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  wrapperText: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 10,
  },
  textName: {
    fontSize: 16,
    marginBottom: 4,
  },
  wrapperAction: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  wrapperPhoto: {
    width: 54,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 54 / 2,
    overflow: 'hidden',
    marginRight: 20,
  },
  textPhoto: {
    color: 'white',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
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
    borderRadius: 4,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
});

function mapStateToProps(state) {
  const {contact} = state;
  const {contactList, isRefreshing, createSuccess, isError, error} = contact;

  return {
    contactList,
    isRefreshing,
    createSuccess,
    isError,
    error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getContactList: () => dispatch(getContact()),
    refreshContactList: () => dispatch(refreshingContact()),
    deleteContactById: id => dispatch(deleteContact(id)),
    setContactId: id => dispatch({type: 'SET_CONTACT_ID', payload: id}),
    resetStatus: payload => dispatch({type: 'RESET_STATUS', payload}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
