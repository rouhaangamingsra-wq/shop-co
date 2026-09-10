import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { firebaseEnabled, auth } from '../firebase/config'
import { setToken } from '../services/api'

const AuthContext = createContext(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsub = () => {}
    if (firebaseEnabled && auth) {
      unsub = auth.onAuthStateChanged(async (fbUser) => {
        if (fbUser) {
          const token = await fbUser.getIdToken()
          setToken(token)
          setUser({
            uid: fbUser.uid,
            name: fbUser.displayName || (fbUser.email ? fbUser.email[0].toUpperCase() : 'User'),
            email: fbUser.email,
            photoURL: fbUser.photoURL,
            role: 'user',
          })
        } else {
          setToken(null)
          setUser(null)
        }
        setLoading(false)
      })
    } else {
      // Mock mode: no persisted auth. Allow a guest session for UI testing.
      setLoading(false)
    }
    return () => unsub()
  }, [])

  const login = useCallback(async (email, password) => {
    if (!firebaseEnabled) {
      // Mock login for dev without Firebase
      const mockUser = {
        uid: 'mock-user',
        name: email ? email[0].toUpperCase() : 'User',
        email,
        photoURL: null,
        role: 'user',
      }
      setToken('mock-token')
      setUser(mockUser)
      return mockUser
    }
    const { signInWithEmailAndPassword } = await import('firebase/auth')
    const cred = await signInWithEmailAndPassword(auth, email, password)
    return cred.user
  }, [])

  const signup = useCallback(async (name, email, password) => {
    if (!firebaseEnabled) {
      const mockUser = { uid: 'mock-user', name, email, photoURL: null, role: 'user' }
      setToken('mock-token')
      setUser(mockUser)
      return mockUser
    }
    const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth')
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(cred.user, { displayName: name })
    return cred.user
  }, [])

  const logout = useCallback(async () => {
    if (firebaseEnabled && auth) {
      const { signOut } = await import('firebase/auth')
      await signOut(auth)
    }
    setToken(null)
    setUser(null)
  }, [])

  const value = { user, loading, login, signup, logout, firebaseEnabled }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
