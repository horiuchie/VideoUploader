import { Notifications } from 'expo';
import React from 'react';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';
import { StackNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import CaptureScreen from '../screens/CaptureScreen';
import SubmitScreen from '../screens/SubmitScreen';
import CompleteScreen from '../screens/CompleteScreen';

export const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
    },
    Capture: {
      screen: CaptureScreen
    },
    Submit: {
      screen: SubmitScreen
    },
    Complete: {
      screen: CompleteScreen
    }
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
      headerStyle: {
        backgroundColor: '#AAA',
      }
    }),
  }
);

@connect(({ router }) => ({ router }))
class RootNavigator extends React.Component {
  
  componentWillMount () {
    BackHandler.addEventListener('hardwareBackPress', this.backHandle);
  }
  
  componentDidMount () {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle);
    this._notificationSubscription && this._notificationSubscription.remove();
  }
  
  backHandle = () => {
    const { dispatch, router } = this.props;
    if (router.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  }

  render () {
    const { dispatch, router } = this.props;
    //
    const navigation = addNavigationHelpers({ dispatch, state: router });
    return <RootStackNavigator navigation={navigation} />;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };
}

export default RootNavigator;
