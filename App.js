import React, { useCallback, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useFonts, Oswald_400Regular } from '@expo-google-fonts/inter';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Icon from 'react-native-ico-material-design';

// refs:
// https://blog.logrocket.com/using-material-ui-in-react-native/

const DATA = [
  {
    title: null,
    data: [{title: 'Welcome, Adam'}]
  },
  {
    title: null,
    data: [{title: 'Meet Your Coach: Solmaz Barghgirs',
    imageUrlId: 154,}]
  },
  {
    title: 'Discover More Courses',
    data: [{
        title: 'ULTIMATE EDGE',
        subtitle: 'The #1 Self-Improvement of...',
        category: 'Relationships',
        imageUrlId: 177,
        contentType: 'video'
      }, {
        title: 'TIME OF YOUR LIFE',
        subtitle: 'Eliminate Your "To-Do" List and Make T...',
        category: 'Productivity',
        imageUrlId: 829,
        contentType: 'video'
      }, {
        title: 'ULTIMATE RELATIONSHIP PROGRAM',
        subtitle: '10 Days to Creating Lasting & Impactful Changes',
        category: 'Love & Relationships',
        imageUrlId: 380,
        contentType: 'video'
      }, {
        title: 'PERSONAL POWER',
        subtitle: '30-Day Program for Unlimited Success',
        category: 'Peak Performance',
        imageUrlId: 741,
        contentType: 'audio'
      }, {
        title: 'MASTERING INFLUENCE',
        subtitle: '10 Steps to Master the Art of Enrolment',
        category: 'Career & Business',
        imageUrlId: 871,
        contentType: 'audio'
      }, {
        title: 'CREATING LASTING CHANGE',
        subtitle: 'Learn the Strategies to...',
        category: 'Leadership',
        imageUrlId: 865,
        contentType: 'audio'
      }, {
        title: 'THE BODY YOUR DESERVE',
        subtitle: 'Sustainable Weight Loss Strategies t...',
        category: 'Health & Energy',
        imageUrlId: 685,
        contentType: 'audio'
      }, {
        title: 'MONEY MATTERS',
        subtitle: 'Adopt the Tactics to Thrive in the On...',
        category: 'Relationships',
        imageUrlId: 866,
        contentType: 'audio'
      }]
  }
];

const getImageUrlFromId = ({id, pixels = 600, grayscale = false}) => {
  return { uri: `https://picsum.photos/id/${id}/${pixels}?${grayscale?'grayscale':''}` };
};

const image = { uri: "https://picsum.photos/id/685/600" };

const Item = ({ data }) => (
  <View style={styles.item}>
    <ImageBackground source={getImageUrlFromId({id:data.imageUrlId})} resizeMode="cover" style={styles.image} imageStyle={{borderRadius: 6}}>
      <Text style={styles.title}>{data.title}</Text>
      {data.subtitle && <Text style={styles.subtitle}>{data.subtitle}</Text>}
      {data.category &&
        <View style={styles.categoryTextAdornment}>
          <View style={styles.categoryTextAdornmentLeft}>
            <Text style={styles.categoryText}>{data.category}</Text>
          </View>
          <View style={styles.categoryTextAdornmentRight}>
            <Icon style={styles.mediaType} name="headset" color="white" />
          </View>
        </View>}
    </ImageBackground>
  </View>
);

const CourseListView = () => (
  <SafeAreaView style={styles.container}>
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Item data={item} />}
      renderSectionHeader={({ section: { title } }) => (title &&
        <Text style={styles.header}>{title}</Text>
      )}
    />
  </SafeAreaView>
);

//const App = () => (
//  <View style={styles.container}>
//    <Text style={styles.text}>Open up App.js to start working on your apps!!</Text>
//    <StatusBar style="auto" />
//</View>
//);


// let customFonts = {
//   'Inter-Black': require('./assets/Inter-SemiBoldItalic.otf'),
//   'Inter-SemiBoldItalic': 'https://rsms.me/inter/font-files/Inter-SemiBoldItalic.otf?v=3.12',
// };

//const _loadFontsAsync = async () => {
//  await Font.loadAsync(customFonts);
//  this.setState({ fontsLoaded: true });
//}

//export default function App() {
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        //await Font.loadAsync(customFonts);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  //let [fontsLoaded] = useFonts({
  //  Oswald_400Regular,
  //});
  let [fontsLoaded] = useFonts({
    //'Oswald': require('./assets/Oswald-Regular.ttf'),
    'Inter-SemiBoldItalic': require('./assets/Inter-SemiBoldItalic2.otf'),
    'Oswald-Regular': require('./assets/Oswald-Regular.ttf'),
    'Oswald-Medium': require('./assets/fonts/oswald/Oswald-Medium.ttf'),
    //'Inter-SemiBoldItalic': 'https://rsms.me/inter/font-files/Inter-SemiBoldItalic.otf?v=3.12',
  });

  //_loadFontsAsync;

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      onLayout={onLayoutRootView}>
      {/* <Text style={{ fontFamily: 'Inter-SemiBoldItalic', fontSize: 40 }}>Oswald Regular 400</Text> */}
      <CourseListView/>
    </View>
  );
}

export class App2 extends React.Component {
  state = {
    fontsLoaded: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    }

    // return (
    //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //     <Text>Platform Default</Text>
    //     <Text style={{ fontFamily: 'Inter-Black' }}>Inter Black</Text>
    //     <Text style={{ fontFamily: 'Inter-SemiBoldItalic' }}>Inter SemiBoldItalic</Text>
    //   </View>
    // );
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'Inter-SemiBoldItalic', fontSize: 40 }}>Oswald Regular 400</Text>
      </View>
    );
  }
}

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Open up App.js to start working on your apps!!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }
//export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#222',
    color: '#fff',
    justifyContent: 'center',
  },
  text: {
    color: '#fff'
  },
  item: {
    backgroundColor: "#222",
    //margin: 0,
    paddingLeft: 20,
    paddingRight: 20,
    //marginBottom: -5,
    marginVertical: 8,
    borderRadius: 5,
  },
  header: {
    color: '#fff',
    //fontFamily: 'Inter-SemiBoldItalic',
    marginLeft: 35,
    fontSize: 18,
    backgroundColor: "#222"
  },
  title: {
    color: '#fff',
    fontFamily: 'Oswald-Medium',
    marginTop: 25,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 26,
    lineHeight: 30
  },
  subtitle: {
    color: '#fff',
    //fontFamily: 'Arial',
    margin: 20,
    fontSize: 18
  },
  categoryText: {
    color: '#fff',
  },
  mediaType: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 15,
  },
  categoryTextAdornmentLeft: {
    flex: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  categoryTextAdornmentRight: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  categoryTextAdornment: {
    //color: '#fff',
    //margin: 20,
    //fontSize: 12,

    flexDirection: 'row',
    //flex: 1,
    //flexWrap: 'nowrap',

    alignItems: 'center',
    //justifyContent: 'flex-start',
    //justifyContent: 'space-between',
    
    //pointerEvents: none,
    backgroundColor: 'rgba(52, 52, 52, .6)',
    //opacity: 0.7,
    //border: none,
    color: '#fff',
    paddingLeft: 15,
    //paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    //textAlign: center,
    //textDecoration: none,
    //display: inline-block,
    marginRight: 13,
    marginLeft: 15,
    marginBottom: 10,
    borderRadius: 100,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    borderRadius: 5,
  },
});
