import { getApps, initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'
import { firebaseConfiguration } from './firebase-mode.js'

// Emulator mode ignores ALL real-project configuration and never falls back.
const selected = firebaseConfiguration(import.meta.env)
export const emulatorMode = selected.emulator
export const firebaseProjectConfig = selected.config
const requiredConfig = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId']
const isConfigured = requiredConfig.every(key => firebaseProjectConfig[key])
const appName = emulatorMode ? 'dominance-emulator' : '[DEFAULT]'
const existing = getApps().find(app => app.name === appName)
const emulatorConnected = Symbol.for('dominance.localEmulatorsConnected')
if (emulatorMode && existing && (existing.options.projectId !== 'demo-dominance' || existing.options.apiKey !== 'demo-only-key' || !existing[emulatorConnected])) {
  throw new Error('Refusing to reuse a Firebase app without verified local emulator connections.')
}
export const firebaseApp = isConfigured ? (existing || initializeApp(firebaseProjectConfig, appName)) : null
export const auth = firebaseApp ? getAuth(firebaseApp) : null
export const db = firebaseApp ? getFirestore(firebaseApp) : null
if (emulatorMode && !existing) {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', {disableWarnings:true})
  connectFirestoreEmulator(db, '127.0.0.1', 8080)
  firebaseApp[emulatorConnected] = true
}
// Services without emulators are unavailable in this isolated testing mode.
export const realtimeDb = firebaseApp && !emulatorMode ? getDatabase(firebaseApp) : null
export const storage = firebaseApp && !emulatorMode ? getStorage(firebaseApp) : null
