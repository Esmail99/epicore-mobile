import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';

class App extends Component {
  constructor() {
    super();
    this.state = {
      showCode: false,
    };
  }

  render() {
    const {showCode} = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.restaurantInfo}>
          <Image
            source={require('./assets/imgs/burger-king-logo.png')}
            style={styles.restaurantLogo}
          />
          <View>
            <Text style={styles.boldText}>Burger King</Text>
            <Text style={[styles.text, styles.category]}>Food</Text>
          </View>
        </View>
        <Image
          source={require('./assets/imgs/cover.jpg')}
          style={styles.coverImage}
        />
        <View style={styles.discountContainer}>
          {showCode ? (
            <Text style={styles.code}>6587</Text>
          ) : (
            <TouchableOpacity
              style={styles.discountButton}
              onPress={() => {
                this.setState({
                  showCode: true,
                });
              }}>
              <Text style={styles.text}>Discount</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.text}>1648 Favorites</Text>
        </View>
        <Text style={[styles.boldText, styles.description]}>
          2 Big King Tower sandwiches for 45 EGP instead of 87 EGP
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  text: {
    fontSize: 20,
    color: '#364343',
  },
  boldText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  restaurantInfo: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingLeft: 25,
  },
  restaurantLogo: {
    width: 100,
    resizeMode: 'contain',
    marginRight: 7,
  },
  category: {
    fontSize: 15,
  },
  coverImage: {
    width: '100%',
    resizeMode: 'contain',
    marginTop: 15,
    marginBottom: 30,
  },
  discountContainer: {
    width: '100%',
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  discountButton: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: '#CDE126',
  },
  code: {
    fontSize: 38,
    color: '#CDE126',
    fontWeight: 'bold',
    marginRight: 25,
  },
  description: {
    margin: 30,
  },
});

export default App;
