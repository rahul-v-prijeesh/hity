import React, { useEffect } from 'react';
import { app } from './base';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
  Console,
  FlatList,
} from 'react-native';
const db = app.firestore(); 
import DropDownPicker from 'react-native-dropdown-picker';
import { RFValue } from 'react-native-responsive-fontsize';
export default class App extends React.Component {
   constructor() {
    super();
    this.state = {
      fileUrl:null,
      fileUrl2:null,
      fileUrl3:null,
      file:null,
      direction:"north",
      sqm:""
    };
  }
 
   onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();

    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
     var file1=await fileRef.getDownloadURL()
    this.setState({fileUrl:file1});
  };
    onFileChange2 = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();

    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
     var file1=await fileRef.getDownloadURL()
    this.setState({fileUrl2:file1});
  };
     onFileChange3 = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();

    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
     var file1=await fileRef.getDownloadURL()
    this.setState({fileUrl3:file1});
  };
   onSubmit = async () => {
    
      await db
        .collection('users')
        .doc()
        .set({
         
          plan: this.state.fileUrl,
          pic: this.state.fileUrl2,
          p3d: this.state.fileUrl3,
          area: this.state.sqm,
          direction: this.state.direction,
        });
      alert('File added');
    
  };
render(){
  return (
    <View style={styles.container}>
    
      plan
        <input
          style={{ marginTop: 20, marginLeft: 20 }}
          type="file"
          onChange={this.onFileChange}
        />
     picture   <input
          style={{ marginTop: 20, marginLeft: 20 }}
          type="file"
          onChange={this.onFileChange2}
        />
          3d   <input
          style={{ marginTop: 20, marginLeft: 20 }}
          type="file"
          onChange={this.onFileChange3}
        />
                <TextInput
              style={styles.textInput}
              placeholder="Sq.m"
              onChangeText={(text) => {
                if(text===""){
                    this.setState({sqm:0});
                }else if(parseInt(text)){
                  this.setState({sqm:parseInt(text)});
                }
                else{
                 this.setState({sqm:0});
                }
              }}
              value={this.state.sqm}
            />
             <DropDownPicker
          items={[
          //{label:"any",value:"any"},
          {label:"north",value:"north"},
          {label:"south",value:"south"},
          {label:"east",value:"east"},
          {label:"west",value:"west"}
          ]}
          defaultValue={this.state.direction}
          containerStyle={{
            height: RFValue(50),
            borderRadius: RFValue(20),
            marginBottom: RFValue(10),
            width: RFValue(130),
            marginLeft: RFValue(10),
            marginTop: RFValue(40),
          }}
          style={{ backgroundColor: '#ffd232', width: RFValue(300) }}
          dropDownStyle={{ backgroundColor: '#eeeeee', width: RFValue(330) }}
          labelStyle={{
            color: 'black',
          }}
         onChangeItem={(item) => {
            console.log(item.value);
            this.setState({
              direction: item.value,
            
            });
          }}
        />
<TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            this.onSubmit()
          }}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

    </View>
  );
}}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#Fffde0',
    flexDirection: 'column',
  },
  inputBox: {
    width: RFValue(160),
    height: RFValue(40),
    borderWidth: RFValue(1.5),

    fontSize: RFValue(20),
    marginTop: RFValue(30),
    marginLeft: RFValue(70),
  },

  submitButton: {
    backgroundColor: '#FF0000',
    width: RFValue(140),
    height: RFValue(40),
    marginTop: RFValue(40),
    marginLeft: RFValue(100),
    borderWidth: RFValue(1.5),
  },
  submitButtonText: {
    padding: 10,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: 'white',
    marginTop: -4,
  }, textInput: {
    borderWidth: 1,
    width: 150,
    height: 40,
    marginTop: 5,
    marginLeft: 10,
  },
});