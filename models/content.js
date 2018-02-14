import * as R from 'ramda';
import { upload, fetchVideos } from '../services/content';

export default {
  namespace: 'content',
  state: {
    isUploading: false,
    contents: []
  },
  reducers: {
    updateState (state, { payload }) {
      return {...state, ...payload };
    },
  },
  effects: {
    *upload (action, { put, call }) {
      const { uri } = action.payload;
      yield put({ type: 'updateState', payload: { isUploading: true } })
      yield call(upload, { uri });
      yield put({ type: 'updateState', payload: { isUploading: false } })
    },
    *fetchVideos (action, { put, call }) {
      const contents = yield call(fetchVideos);
      yield put({ type: 'updateState', payload: { contents } })
    }
  },
  subscriptions: {
  }
}