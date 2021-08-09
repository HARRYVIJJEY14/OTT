import React, { useState } from 'react';
import { Text,View,StyleSheet ,TextInput,} from 'react-native';
import { Button } from 'react-native';
import * as Google from 'expo-google-app-auth';


const Register=()=>{
        const [hidePassword, setHidePassword] = useState(true);
        
        const [name, setName] = useState('');
        const [email,setEmail]=useState('');
        const [password,setPassword]=useState('');
        const [googleSubmitting, setGoogleSubmitting] = useState(false);

        function signIn(){
            fetch('http://127.0.0.1:8000/api/signup',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"name":name,"email":email,"password":password})
            })
            .then(resData=>{
                console.log(resData);}
            )
            .catch(err=>{
                console.log('ERROR:',err)}
            )
        };

        const handleGoogleSignin=()=>{
            setGoogleSubmitting(true);
            const config={
              androidClientId:`42866674679-8vmd9utf6shfmh9esla40i950b4bic57.apps.googleusercontent.com`,
              scopes:['profile','email'],
            };
            Google.logInAsync(config)
              .then((result) => {
                const { type, user } = result;
        
                
                if (type == 'success') {
                  const { email, name, photoUrl } = user;
                 
                  setTimeout(() => navigation.navigate('Welcome', { email, name, photoUrl }), 600);
                } else {
                  console.log('Google Signin was cancelled');
                }
                setGoogleSubmitting(false);
              })
              .catch((error) => {
                console.log('An error occurred. Check your network and try again');
                console.log(error);
                setGoogleSubmitting(false);
              });
          };
          


    return(
        <View style={styles.StyledContainer}>
            <View style={styles.InnerContainer}>
                <View style={styles.StyledFormArea}>

                            <Text style={styles.header}>Sign Up</Text>

                                <TextInput style={styles.textview}
                                
                                    placeholder="Your-Name" 
                                    placeholderTextColor='gray'
                                    value={name} 
                                    onChangeText={(value)=>setName(value)}
                                />
                                <TextInput style={styles.textview}
                                        
                                        placeholder="Email-Address" 
                                        keyboardType="email-address"
                                        placeholderTextColor='gray'
                                        value={email} 
                                        onChangeText={(value)=>setEmail(value)}
                                />
                                <TextInput style={styles.textview}
                                        placeholder="Secure-Key"
                                        secureTextEntry={hidePassword}
                                        isPassword={true}
                                        hidePassword={hidePassword}
                                        setHidePassword={setHidePassword}
                                        value={password} 
                                        onChangeText={(value)=>setPassword(value)}
                                />
                
                                <Button style={styles.btn} color="#F21170" title="SignUp" onPress={()=>signIn()}></Button>
                
                            <View style={styles.line}>
                                <Text style={styles.center}>(or)</Text>
                                {!googleSubmitting && (
                                <Button style={styles.google} color="#F25287"
                                 onPress={handleGoogleSignin} 
                                 google={true}
                                    title="Signin With Google" />
                                    )}  
                                     
                            </View>
                </View>
            </View>
        </View>
        );};

 const styles = StyleSheet.create({
            StyledContainer:{
                
                padding:10,
                marginTop:10
            },
            header:{
                alignSelf:'center',
                fontSize:20
            },
            textview:{
                padding:10,
                borderWidth:1,
                paddingLeft:20,
                margin:8,
                color:'green',
                borderRadius:10
            },
            btn:{
                
            },
            center:{
                alignSelf:'center',
                fontSize:15,
                margin:10
            },
            google:{        
            },
            line:{
                marginTop:20
            }
            


 })
 

export default  Register;