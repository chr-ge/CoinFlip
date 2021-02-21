import React, { useEffect } from 'react'
import { Image, Text, View, Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Auth, Hub } from 'aws-amplify'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { useAppContext } from '../../contexts/AppContext'
import styles from './styles'
const image = require('../../../assets/images/Saly-1.png')

const WelcomeScreen = () => {
  const navigation = useNavigation()
  const { setUserId } = useAppContext()

  const federatedSignIn = async (provider: CognitoHostedUIIdentityProvider) => {
    try {
      await Auth.federatedSignIn({ provider })
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const fetch = async () => {
      const user = await Auth.currentAuthenticatedUser()
      if (user) {
        setUserId(user.attributes.sub)
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Root' }],
          })
        )
      }
    }
    fetch()

    Hub.listen('auth', ({ payload: { event, data } }) => {
      if (event === 'signIn') {
        setUserId(data.signInUserSession.accessToken.payload.sub)
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Root' }],
          })
        )
      }
    })
  }, [])

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={image} />
      <Text style={styles.heading}>Welcome to CoinFlip</Text>
      <Text style={styles.subheading}>
        Invest your virtual $100,000 and compete with others.
      </Text>
      <View style={styles.authButtons}>
        <Pressable
          onPress={() =>
            federatedSignIn(CognitoHostedUIIdentityProvider.Google)
          }
          style={[styles.authButton, { backgroundColor: '#4285F4' }]}
          android_disableSound
        >
          <AntDesign name='google' size={30} color='white' />
          <Text style={[styles.authText, { color: 'white' }]}>
            Login with Google
          </Text>
        </Pressable>
        <Pressable
          onPress={() => federatedSignIn(CognitoHostedUIIdentityProvider.Apple)}
          style={[styles.authButton, { backgroundColor: 'white' }]}
          android_disableSound
        >
          <AntDesign name='apple1' size={30} color='black' />
          <Text style={styles.authText}>Login with Apple</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default WelcomeScreen
