import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
// import socketIOClient from 'socket.io-client';
import {useQuery, gql} from '@apollo/client';

// const socket = socketIOClient('https://epicore.herokuapp.com');

const GET_DISCOUNT = gql`
  query GetDiscount {
    discount {
      success
      discount {
        code
      }
    }
  }
`;

const Home = () => {
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const {loading, error, data} = useQuery(GET_DISCOUNT);

  useEffect(() => {
    if (loading) return;
    if (error) {
      return alert('something went wrong!');
    }

    if (data?.discount?.success) {
      setCode(data?.discount?.discount?.code);
    } else {
      setCode('EXPIRED');
      setShowCode(true);
    }
  }, [loading]);

  //   useEffect(() => {
  //     // Connecting Socket.io
  //     socket.on('codeVerifiedSuccessfully', () => {
  //       changeModalState();
  //     });
  //   }, []);

  const changeModalState = () => {
    setModalVisible((prevState) => !prevState.modalVisible);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.restaurantInfo}>
        <Image
          source={require('../assets/imgs/burger-king-logo.png')}
          style={styles.restaurantLogo}
        />
        <View>
          <Text style={styles.boldText}>Burger King</Text>
          <Text style={[styles.text, styles.category]}>Food</Text>
        </View>
      </View>
      <Image
        source={require('../assets/imgs/cover.jpg')}
        style={styles.coverImage}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.discountContainer}>
          {showCode ? (
            <Text
              style={[styles.code, code === 'EXPIRED' && styles.codeExpired]}>
              {code}
            </Text>
          ) : (
            <TouchableOpacity
              style={styles.discountButton}
              onPress={() => setShowCode(true)}>
              <Text style={styles.text}>Discount</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.text}>1648 Favorites</Text>
        </View>
      )}
      <Text style={[styles.boldText, styles.description]}>
        2 Big King Tower sandwiches for 45 EGP instead of 87 EGP
      </Text>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.container}>
          <View style={styles.modalView}>
            <Text style={styles.text}>Did you get your coupon?</Text>
            <View style={styles.restaurantInfo}>
              <TouchableOpacity
                style={styles.discountButton}
                onPress={changeModalState}>
                <Text style={styles.text}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.discountButton}
                onPress={changeModalState}>
                <Text style={styles.text}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

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
    marginTop: 10,
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
    marginHorizontal: 4,
  },
  code: {
    fontSize: 38,
    color: '#CDE126',
    fontWeight: 'bold',
    marginRight: 25,
  },
  codeExpired: {
    color: 'red',
    textDecorationLine: 'line-through',
  },
  description: {
    margin: 30,
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
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Home;
