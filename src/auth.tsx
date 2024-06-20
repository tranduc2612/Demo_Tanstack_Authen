import * as React from 'react'
import { localStorageService } from './ultis/localStorageService'
import { fetchLogin } from './api/auth/service'

export interface AuthContext {
  isAuthenticated: boolean
  login: (username: string,password: string) => Promise<void>
  logout: () => Promise<void>
  token: string | null
}

const AuthContext = React.createContext<AuthContext | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = React.useState<string | null>(localStorageService.get<string>(localStorageService.LOCAL_STORAGE_KEYS.ACCESS_TOKEN) || null)
  const isAuthenticated = !!token

  console.log(token)

  const logout = React.useCallback(async () => {
    // await sleep(250)
    //call api
    localStorageService.clearAll()
    setToken(null)
  }, [])

  const login = React.useCallback(async (username: string,password: string) => {
    // await sleep(500)
    const data = await fetchLogin({
      username: username,
      password: password
    });
    // call api

    setToken(data.token)
  }, [])

  React.useEffect(() => {
    setToken(localStorageService.get<string>(localStorageService.LOCAL_STORAGE_KEYS.ACCESS_TOKEN) || null)
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
