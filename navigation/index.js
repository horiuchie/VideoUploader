import { RootStackNavigator } from './RootNavigation';

export function routerReducer(state, action = {}) {
  return RootStackNavigator.router.getStateForAction(action, state);
}
