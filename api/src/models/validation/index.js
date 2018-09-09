import { depotSchema, depotInitialValues } from './joi/depot'
import { farmSchema, farmInitialValues } from './joi/farm'
import { networkSchema, networkInitialValues} from './joi/network'
import { initiativeSchema, initiativeInitialValues } from './joi/initiative'
import {
  userSchema,
  userInitialValues,
  userSignUpSchema,
  recoverPasswordSchema,
  resetPasswordSchema,
  changeUserAccountSchema,
  changePasswordSchema
} from './joi/user'

export const schemas = {
  depot: depotSchema,
  farm: farmSchema,
  network: networkSchema,
  initiative: initiativeSchema,
  user: userSchema,
  signUp: userSignUpSchema,
  recoverPassword: recoverPasswordSchema,
  resetPassword: resetPasswordSchema,
  changeUserAccount: changeUserAccountSchema,
  changePassword: changePasswordSchema
}

export const initialValues = {
  depot: depotInitialValues,
  farm: farmInitialValues,
  initiative: initiativeInitialValues,
  user: userInitialValues,
  network: networkInitialValues
}
