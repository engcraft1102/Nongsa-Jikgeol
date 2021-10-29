/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useCallback, useReducer, useState } from 'react'

import AuthTemplate from '../components/auth/AuthTemplate'
import AuthForm from '../components/auth/AuthForm'

const Login = () => {
  return (
    <AuthTemplate>
      <AuthForm type="login" />
    </AuthTemplate>
  )
}

export default Login
