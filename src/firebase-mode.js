export const EMULATOR_PROJECT = 'demo-dominance';
export function firebaseConfiguration(env) {
  const emulator = env.MODE === 'emulator' || env.VITE_USE_FIREBASE_EMULATORS === 'true';
  if (emulator && (!env.DEV || env.MODE !== 'emulator')) {
    throw new Error('Firebase emulator testing requires the dedicated development emulator mode.');
  }
  if (emulator) return {emulator:true, config:{apiKey:'demo-only-key',authDomain:'demo-dominance.invalid',projectId:EMULATOR_PROJECT,storageBucket:'demo-dominance.invalid',messagingSenderId:'000000000000',appId:'demo-only-app'}};
  return {emulator:false,config:{apiKey:env.VITE_FIREBASE_API_KEY,authDomain:env.VITE_FIREBASE_AUTH_DOMAIN,databaseURL:env.VITE_FIREBASE_DATABASE_URL,projectId:env.VITE_FIREBASE_PROJECT_ID,storageBucket:env.VITE_FIREBASE_STORAGE_BUCKET,messagingSenderId:env.VITE_FIREBASE_MESSAGING_SENDER_ID,appId:env.VITE_FIREBASE_APP_ID,measurementId:env.VITE_FIREBASE_MEASUREMENT_ID}};
}
