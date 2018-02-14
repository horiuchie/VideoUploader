import { Permissions } from 'expo';

export const askCameraPermission = async () => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  return status;
};

export const askAudioRecordingPermission = async () => {
  const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
  return status;
};
