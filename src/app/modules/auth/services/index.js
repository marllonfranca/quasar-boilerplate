import store from 'src/app/infra/store'
import configureUser from 'src/bootstrap/configure/user'
import { promise } from 'src/app/support/utils'

/**
 * @param {Object} user
 * @param {string} token
 * @param {boolean} remember
 * @param {Function} success
 */
export const register = (user, token, remember, success) => {
  store
    .dispatch('setAuthRemember', remember)
    .then(
      store
        .dispatch('setAuthUser', configureUser(user))
        .then(
          store.dispatch('setAuthToken', token).then(success)
        )
    )
}

/**
 * @param {Function} success
 */
export const unRegister = (success) => {
  return promise((resolve, reject) => {
    const solver = () => {
      success()
      resolve()
    }
    store
      .dispatch('setAuthUser', undefined)
      .then(
        store.dispatch('setAuthToken', undefined).then(solver).catch(reject)
      )
      .catch(reject)
  })
}
