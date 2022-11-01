import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateRoute() {
    const loggedIn = false;
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />
}
