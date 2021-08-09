import React, { useState } from 'react';
import { Text,View,StyleSheet ,TextInput,} from 'react-native';
import { Button } from 'react-native';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';


const Login=()=>{
    const [hidePassword, setHidePassword] = useState(true);
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [googleSubmitting, setGoogleSubmitting] = useState(false);
    const [facebookSubmitting, setfacebookSubmitting] = useState(false);
    const myfunc=()=>{
        fetch('http://127.0.0.1:8000/api/login',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({"email":email,"password":password})
        })
        .then(resData=>{
            console.log(resData);}

        )
        .catch(err=>{
            console.log('ERROR:',err)}
        )
    }

    const getPassword = (params) => {
        // console.log("params :",params);
        setPassword(params);
        // console.log("password :",password);
    }


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

      const [users,setUsers]=useState(null);

        const signUpFacebook = async () => {
            setfacebookSubmitting(true);
            try {
            await Facebook.initializeAsync("529500404996224");
            
            const { type, token } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ["public_profile", "email"],
            });
            if (type === "success") {
                const { email} = users;
                const response = await fetch(
                `https://graph.facebook.com/me?fields=id,name,picture.type(large),email&access_token=${token}`);
                Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
                
                console.log('response',response);

                const data = await response.json();
                setUsers(data);
            } else {

            }
            } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
            }
        };
      

    return(
        <View style={styles.StyledContainer}>
            <View style={styles.InnerContainer}>
                <View style={styles.StyledFormArea}>

                    <Text style={styles.header}>Login Page</Text>

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
                            onChangeText={(value)=>getPassword(value)}        
                    />
                
                    <Button style={styles.btn} onPress={myfunc} color="#F21170" title="Login"></Button>
                

                
                    <View style={styles.line}>
                        <Text style={styles.center}>(or)</Text>
                        {!googleSubmitting && (
                            <Button style={styles.google}
                            onPress={handleGoogleSignin} 
                                 google={true} color="#F25287"  title="Signin With Google" /> )}
                            <Text ></Text>
                            {!facebookSubmitting && (
                            <Button 
                            onPress={signUpFacebook} color="#F25287" title="Signin With FaceBook"/>
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
            center:{
                alignSelf:'center',
                fontSize:15,
                margin:10
            },
            line:{
                marginTop:20
            }
            


 })
 

export default Login;