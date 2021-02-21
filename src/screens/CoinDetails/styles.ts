import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginVertical: 10,
    width: '100%',
  },
  image: {
    height: 50,
    width: 50,
    marginRight: 10,
  },
  topTextContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    height: '100%',
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  symbol: {
    color: 'white',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currentPrice: {
    color: 'white',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  currentPriceValue: {
    color: 'white',
    fontSize: 20,
  },
  valueChangeContainer: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  valueLabel: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  },
  position: {
    color: 'white',
    fontSize: 16,
  },
  button: {
    flex: 1,
    marginVertical: 10,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
})

export default styles
