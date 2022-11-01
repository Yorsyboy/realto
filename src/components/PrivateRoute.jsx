import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import {useAuthStatus} from '../hooks/useAuthStatus'

export default function PrivateRoute() {
    const { LoggedIn, checkStatus } = useAuthStatus();
    if (checkStatus) {
        return <div>Loading...</div>
    }
  return LoggedIn ? <Outlet /> : <Navigate to="/sign-in" />
}
