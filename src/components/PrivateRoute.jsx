import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import {useAuthStatus} from '../hooks/useAuthStatus'
import Spinner from './Spinner';

export default function PrivateRoute() {
    const { LoggedIn, checkStatus } = useAuthStatus();
    if (checkStatus) {
        return <Spinner />
    }
  return LoggedIn ? <Outlet /> : <Navigate to="/sign-in" />
}
