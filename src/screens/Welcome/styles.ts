import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    height: '40%',
    aspectRatio: 1,
  },
  heading: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20,
  },
  subheading: {
    fontSize: 20,
    color: '#909090',
    textAlign: 'center',
  },
  authButtons: {
    marginTop: 'auto',
    width: '100%'
  },
  authButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 10,
    padding: 12
  },
  authText: {
    marginLeft: 6,
    fontSize: 18
  }
})

export default styles
