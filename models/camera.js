import * as R from 'ramda';
import {
  askCameraPermission,
  askAudioRecordingPermission
} from '../services/camera';

export default {
  namespace: 'camera',
  state: {
    hasCameraPermission: null,
    hasAudioRecordingPermission: null,
    isRecording: false,
    recordedUri: null
  },
  reducers: {
    updateState (state, { payload }) {
      return {...state, ...payload };
    },
  },
  effects: {
    *askRecordingPermission (action, { put, call }) {
      const cameraPermission = yield call(askCameraPermission);
      const audioRecordingPermission = yield call(askAudioRecordingPermission);
      const [ hasCameraPermission, hasAudioRecordingPermission ] = R.map(
        R.equals('granted'),
        [cameraPermission, audioRecordingPermission]
      );
      yield put({
        type: 'updateState',
        payload: { hasCameraPermission, hasAudioRecordingPermission }
      });
    }
  },
  subscriptions: {
  }
}