import React, {useState, useEffect} from 'react';

import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
} from 'react-native';
import {Input, Header} from 'react-native-elements';
import {connect} from 'react-redux';

import {createContact, updateContact} from '../../stores/actions/contact';

const styles = StyleSheet.create({
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

const DetailContact = ({
  navigation,
  createContactList,
  createSuccess,
  isLoading,
  contactId,
  resetStatus,
  isEdit,
  detail,
  updateContactList,
  isError,
  error,
}) => {
  const [data, setData] = useState(
    detail || {
      firstName: '',
      lastName: '',
      age: '',
      photo: '',
    },
  );

  useEffect(() => {
    if (contactId) {
    }
    return () => {
      resetStatus(false);
    };
  }, [contactId, resetStatus]);

  const handleChange = (key, value) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  const handleSubmit = () => {
    if (isEdit) {
      updateContactList(data);
    } else {
      createContactList(data);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <Header
        placement="left"
        leftComponent={{
          icon: 'arrow-back',
          onPress: () => navigation.goBack(),
          type: 'Ionicons',
          color: '#fff',
          iconStyle: {color: '#fff'},
        }}
        centerComponent={{
          text: isEdit ? 'EDIT CONTACT APPS' : 'CONTACT APPS',
          style: {color: '#fff'},
        }}
        rightComponent={{
          text: 'SAVE',
          onPress: handleSubmit,
          style: {color: '#fff'},
        }}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Input
            placeholder="Firstname"
            value={data.firstName}
            onChangeText={value => handleChange('firstName', value)}
          />
          <Input
            placeholder="Lastname"
            value={data.lastName}
            onChangeText={value => handleChange('lastName', value)}
          />
          <Input
            placeholder="Age"
            value={data.age.toString()}
            onChangeText={value => handleChange('age', value)}
            keyboardType="number-pad"
          />
          <Input
            placeholder="Photo"
            value={data.photo}
            onChangeText={value => handleChange('photo', value)}
          />
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={createSuccess}
        onRequestClose={() => {
          resetStatus(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[styles.modalText, {color: 'green'}]}>Error</Text>
            <Text style={styles.modalText}>
              {isEdit ? 'Update Contact Success!' : 'Create Contact Success!'}
            </Text>
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
      <Modal
        animationType="fade"
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

function mapStateToProps(state) {
  const {contact} = state;
  const {createSuccess, contactId, isLoading, contactList, isError, error} =
    contact;
  const detail = contactList.find(item => item.id === contactId);

  return {
    createSuccess,
    isLoading,
    contactId,
    isEdit: contactId.length > 0,
    detail,
    isError,
    error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createContactList: payload => dispatch(createContact(payload)),
    updateContactList: payload => dispatch(updateContact(payload)),
    resetStatus: payload => dispatch({type: 'RESET_STATUS', payload}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailContact);
