import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  image: {
    height: 150,
    resizeMode: 'contain',
  },
  userContainer: {
    backgroundColor: '#26242D',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 100,
    marginVertical: 6,
    width: '100%',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  userImage: {
    height: 75,
    width: 75,
    marginRight: 12,
    borderRadius: 37.5,
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 6,
    fontSize: 20,
  },
  email: {
    color: '#777777',
    fontSize: 16,
  },
  netWorth: {
    color: 'white',
    padding: 12,
    fontSize: 14,
  },
  button: {
    marginTop: 'auto',
    backgroundColor: '#3F22AB',
    padding: 12,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
})

export default styles
