import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subheading: {
    color: '#737373',
    fontSize: 18,
    marginVertical: 10,
  },
  image: {
    height: 175,
    resizeMode: 'contain',
  },
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#26242D',
    padding: 15,
    marginVertical: 20,
  },
  textInput: {
    fontSize: 24,
    color: 'white',
  },
  equal: {
    color: 'white',
    paddingHorizontal: 5,
    fontSize: 30,
  },
  symbol: {
    color: 'white',
  },
  button: {
    width: '100%',
    alignItems: 'center',
    marginTop: 'auto',
    marginVertical: 10,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#3F22AB',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loading: {
    marginLeft: 8,
  },
})

export default styles
