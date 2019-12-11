import firebase from 'firebase/app';
import firebaseConfig from '../apiKeys.json';

const firebaseApp = () => {
  if (!firebase.apps.lenth) {
    firebase.initializeApp(firebaseConfig.firebaseKeys);
  }
};

export default { firebaseApp };
