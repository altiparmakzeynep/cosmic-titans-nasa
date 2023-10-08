
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, Touchable, TouchableOpacity, StyleSheet, Image, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WebView from 'react-native-webview';
import TypingText from 'react-native-typing-text';

function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: '#0B3D91' }}>
      <Image
        style={styles.backImage}
        source={{
          uri: 'https://cdn.pixabay.com/photo/2022/07/01/00/39/titan-7294742_1280.jpg',
        }}
      />
      
      {/* <Text style = {{color: 'white', fontSize: 24, fontWeight:'bold', marginBottom: 30, alignSelf:'center'}}>March 25 3023</Text> */}
      <TypingText
          color = "white"
          text = "March 25 3023"
      />
      <TouchableOpacity 
        onPress = {() => navigation.navigate('teleskop') }
        style = {styles.firstButton}>
        <Text style = {styles.buttonTxt}>Teleskop</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress = {() => navigation.navigate('weather') }
        style = {styles.buttons}>
        <Text style = {styles.buttonTxt}>Hava Durumu</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress = {() => navigation.navigate('history') }
        style = {styles.buttons}>
        <Text style = {styles.buttonTxt}>Tarihçe</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress = {() => navigation.navigate('titan') }
        style = {styles.lastButton}>
        <Text style = {styles.buttonTxt}>Titan Yol Haritası</Text>
      </TouchableOpacity>
     
    </SafeAreaView>
  );
}

function Teleskop({navigation}) {
  const sketchfabIframe = `
  <iframe title="Titan 3D Globe" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share width="100%" height="100%" src="https://sketchfab.com/models/4c9017c279f5480d94a6b2ca15386421/embed?ui_theme=dark"></iframe>
`;
    return (
      <SafeAreaView style={styles.container}>
        <WebView
          source={{ html: sketchfabIframe }}
          scalesPageToFit
          style={{ flex: 1, width: '100%', height: '100%', backgroundColor: 'black' }}
        />
      </SafeAreaView>
    );
}
function Game({navigation}) {
    return (
      <SafeAreaView style={styles.container}>
        <WebView
          source={{ html: 'sketchfabIframe' }}
          scalesPageToFit
          style={{ flex: 1, width: '100%', height: '100%', backgroundColor: 'black' }}
        />
      </SafeAreaView>
    );
}

function WeatherStatus({navigation}) {
    return (
      <SafeAreaView style={styles.weatherContainer}>
       <Text style = {{color: 'white', fontSize: 24, fontWeight: '200', textAlign:'center', marginTop: 50}}> March 25 {"\n"} Foggy and windy {"\n"} -170°C </Text>
       <Image style = {{width: 500, height:700, position: 'absolute', zIndex: -1}} source={{uri: 'https://i0.wp.com/photos.smugmug.com/Portfolio/i-pwm4mjF/0/309db957/O/Remark.gif?w=900&ssl=1'}} />
       <Image
        style={styles.tinyLogo}
        source={require('./src/screens/fog.png')}
      />
       <ScrollView style = {{marginTop: 100}}>
        <View style = {{flexDirection: 'row'}}>
        <View style = {{width: 70, height: 100, borderWidth: 0.5, borderRadius:5, borderColor: 'white', marginHorizontal: 10, alignItems:'center', justifyContent:'center'}}>
          <Text style = {{color:'white'}}>March 26</Text>
          <Text style = {{color:'white'}}></Text>
          <Text  style = {{color:'white'}}>-170°C</Text>
          <Image
          style={styles.miniLogo}
          source={require('./src/screens/fog.png')}/>
        </View>
        <View style = {{width: 70, height: 100, borderWidth: 0.5, borderRadius:5, borderColor: 'white', marginHorizontal: 10, alignItems:'center',justifyContent:'center'}}>
          <Text style = {{color:'white'}}>March 27</Text>
          <Text style = {{color:'white'}}></Text>
          <Text  style = {{color:'white'}}>-170°C</Text>
          <Image
            style={styles.miniLogo}
            source={require('./src/screens/fog.png')}/>
        </View>
        <View style = {{width: 70, height: 100, borderWidth: 0.5,borderRadius:5,  borderColor: 'white', marginHorizontal: 10, alignItems:'center', justifyContent:'center'}}>
          <Text style = {{color:'white'}}>March 28</Text>
          <Text style = {{color:'white'}}></Text>
          <Text  style = {{color:'white'}}>-170°C</Text>
          <Image
            style={styles.miniLogo}
            source={require('./src/screens/fog.png')}/>
        </View>
        <View style = {{width: 70, height: 100, borderWidth: 0.5,borderRadius:5,  borderColor: 'white', marginHorizontal: 10, alignItems:'center', justifyContent:'center'}}>
          <Text style = {{color:'white'}}>March 29</Text>
          <Text style = {{color:'white'}}></Text>
          <Text style = {{color:'white'}}>-170°C</Text>
          <Image
            style={styles.miniLogo}
            source={require('./src/screens/fog.png')}/>
        </View>
        <View style = {{width: 70, height: 100, borderWidth: 0.5,borderRadius:5,  borderColor: 'white', marginHorizontal: 10, alignItems:'center', justifyContent:'center'}}>
          <Text style = {{color:'white'}}>March 29</Text>
          <Text style = {{color:'white'}}></Text>
          <Text style = {{color:'white'}}>-170°C</Text>
          <Image
            style={styles.miniLogo}
            source={require('./src/screens/fog.png')}/>
        </View>        
        </View>
        
       </ScrollView>
      </SafeAreaView>
    );
}

const History = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (scrollViewRef.current) {
        const nextPosition = scrollPosition + 0.75;
        scrollViewRef.current.scrollTo({ y: nextPosition * 10, animated: true });
        setScrollPosition(nextPosition);
      }
    }, 200); // Her saniyede bir kaydır

    return () => {
      clearInterval(scrollInterval);
    };
  }, [scrollPosition]);

  const handleScroll = () => {
    // Kullanıcı ekranı dokunduğunda kaymayı durdur
    if (scrollPosition) {
      // setScrollEnabled(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.backImage}
        source={{
          uri: 'https://cdn.pixabay.com/photo/2022/07/01/00/39/titan-7294742_1280.jpg',
        }}
      />
      <ScrollView
        scrollEventThrottle={400} 
        ref={scrollViewRef}
        style={styles.scrollView}
        onScroll={handleScroll}
      >
        <Text style={styles.text}>Dutch astronomer Christiaan Huygens discovered Saturn's largest moon, Titan, on March 25, 1655. {"\n"} {"\n"} It was nearly 300 years later, in 1944, when Dutch-American astronomer Gerard Kuiper discovered one of the characteristics that makes Titan exceptional: this distant moon actually has an atmosphere. {"\n"} {"\n"} The first spacecraft to explore Titan, Pioneer 11, flew through the Saturn system on Sept. 1, 1979.  {"\n"} {"\n"} Astronomers on Earth had previously studied Titan’s temperature, and calculated its mass, and Pioneer 11 confirmed those characteristics. {"\n"} {"\n"} Because of Titan’s extended and opaque atmosphere, scientists at the time thought (incorrectly, it turns out) that Titan might be the largest moon in the solar system.  {"\n"} {"\n"}Pioneer 11 also saw hints of a bluish haze in Titan’s upper atmosphere, which scientists predicted the Voyager spacecraft would be able to see.</Text>
      </ScrollView>
    </SafeAreaView>
  );
};
function TitanPath({navigation}) {
  return (
    <SafeAreaView style={styles.titanPathContainer}>
       <Image
        style={styles.backImage}
        source={{
          uri: 'https://cdn.pixabay.com/photo/2022/07/01/00/39/titan-7294742_1280.jpg',
        }}
      />
     {/* <Text style = {{color: 'white', fontSize: 24, fontWeight: '200', textAlign:'center', marginTop: 50}}>  </Text> */}
     <TypingText
        color = "white"
        text = "Merhaba! birazdan seni Titan'a uğurlayacağımız için çok heyecenlıyız. Ama öncesinde çok kısa bilgilendirme yapacağız. Hazırsan başlayalım!"
      />
       <TouchableOpacity 
        onPress = {() => navigation.navigate('firstQuestion') }
        style = {styles.nextButton}>
        <Text style = {styles.buttonTxt}>Hazırım</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
function FirstQuestion({navigation}) {
    return (
      <SafeAreaView style={styles.questionContainer}>
        <View style = {{position: 'absolute', width: 500, height:700, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}></View>
        <Image style = {{width: 500, height:700, position: 'absolute', zIndex: -1}} source={{uri: 'https://i.pinimg.com/originals/85/45/27/85452729e29da56b29ed73ac93dfcd79.gif'}} />
        <Text style = {{color: 'white', fontSize: 24, textAlign: 'center', fontWeight: '400', marginBottom: 100}}>Bu yolculuk en az 7 yıl sürecek</Text>
        <View style = {{flexDirection: 'row'}}>
        <TouchableOpacity 
          onPress = {() => navigation.navigate('secondQuestion') }
          style = {styles.yesNoBtn}>
          <Text style = {{color: 'white', fontSize: 20, textAlign: 'center', fontWeight: '200' }}>İleri</Text>
        </TouchableOpacity>
       
      </View>
      </SafeAreaView>
    );
}
function SecondQuestion({navigation}) {
  return (
    <SafeAreaView style={styles.questionContainer}>
      <View style = {{position: 'absolute', width: 500, height:700, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}></View>
        <Image style = {{width: 500, height:700, position: 'absolute', zIndex: -1}} source={{uri: 'https://i.pinimg.com/originals/85/45/27/85452729e29da56b29ed73ac93dfcd79.gif'}} />
        <Text style = {{color: 'white', fontSize: 24, textAlign: 'center', fontWeight: '400', marginBottom: 100}}>Dünya'dan uzaklaşmak duygusal etkiler, bozulmuş uyku ve günlük ritimler dahil olmak üzere çok sayıda zorlukla başa çıkmayı gerektirecektir. </Text>
        <View style = {{flexDirection: 'row'}}>
        <TouchableOpacity 
          onPress = {() => navigation.navigate('thirdQuestion') }
          style = {styles.yesNoBtn}>
          <Text style = {{color: 'white', fontSize: 20, textAlign: 'center', fontWeight: '200' }}>İlerle</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
function ThirdQuestion({navigation}) {
  return (
    <SafeAreaView style={styles.questionContainer}>
      <View style = {{position: 'absolute', width: 500, height:700, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}></View>
        <Image style = {{width: 500, height:700, position: 'absolute', zIndex: -1}} source={{uri: 'https://i.pinimg.com/originals/85/45/27/85452729e29da56b29ed73ac93dfcd79.gif'}} />
        <Text style = {{color: 'white', fontSize: 24, textAlign: 'center', fontWeight: '400', marginBottom: 100}}>Sınırlı malzeme ve tıbbi bakıma erişim, uzun mesafeli iletişim gecikmeleri, erişilebilirlik sorunları ve çok daha fazlası yaşanabilecektir.</Text>
        <View style = {{flexDirection: 'row'}}>
        <TouchableOpacity 
          onPress = {() => navigation.navigate('thirdQuestion') }
          style = {styles.yesNoBtn}>
          <Text style = {{color: 'white', fontSize: 20, textAlign: 'center', fontWeight: '200' }}>İlerle</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="teleskop" component={Teleskop} />
        <Stack.Screen name="weather" component={WeatherStatus} />
        <Stack.Screen name="history" component={History} />
        <Stack.Screen name="titan" component={TitanPath} />
        <Stack.Screen name="firstQuestion" component={FirstQuestion} />
        <Stack.Screen name="secondQuestion" component={SecondQuestion} />
        <Stack.Screen name="thirdQuestion" component={ThirdQuestion} />


        <Stack.Screen name="game" component={Game} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  buttons:{
    // backgroundColor: '#FC3D21',
    width: 280,
    height: 50,
    borderRadius: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: "#0B3D91",
    borderColor: '#0B3D91',
    shadowOpacity: 0.9,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    borderWidth: 0
  },
  firstButton:{
    // backgroundColor: '#FC3D21',
    width: 280,
    height: 50,
    borderRadius: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 20,
    shadowColor: "#0B3D91",
    borderColor: '#0B3D91',
    shadowOpacity: 0.9,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    borderWidth: 0
  },
  buttonTxt:{
    color: 'white',
    fontSize: 35,
    fontWeight: '200',
    marginLeft: 10
  },
  backImage: {
    position: 'absolute',
    zIndex: -2,
    width:'100%',
    height:'105%'
  },
  container:{
    flex: 1,
    backgroundColor:'black'
  },
  weatherContainer:{
    flex: 1,
    backgroundColor:'black',
    alignItems: 'center', 
  },
  tinyLogo:{
    width: 100,
    height: 100,
    marginTop: 100
  },
  miniLogo:{
    width: 30,
    height: 30,
  },
  historyContainer:{
    flex: 1,
    backgroundColor:'black',
    padding: 100
  },
  text:{
    color:'white',
    fontSize: 36, 
    textAlign: 'center',
    fontWeight:'300'
  },
  titanPathContainer:{
    flex: 1,
    backgroundColor:'black',
    alignItems: 'center', 
    justifyContent: 'center'
  },
  nextButton:{
    // backgroundColor: '#FC3D21',
    width: 280,
    height: 50,
    borderRadius: 5,
    borderColor:'pink',
    borderWidth: 1,
    alignItems: 'center',
    alignSelf:'center',
    marginTop: 300
  },
  questionContainer:{
    flex: 1,
    backgroundColor:'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  yesNoBtn:{
    width: 100,
    height: 30,
    borderWidth:0.5,
    borderColor:'white',
    alignItems: 'center',
    justifyContent:'center',
    marginHorizontal: 10
  }
})
export default App;