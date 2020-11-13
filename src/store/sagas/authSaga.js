import { put } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import { delay } from "redux-saga/effects";
import axios from "axios";
import * as actions from "../actions/actionIndex";

export function* logoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put({ type: actionTypes.AUTH_LOGOUT });
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCAkP78pf_qe6c6HabGE9EyELTW-xYQbpA";
  if (!action.isSignup) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCAkP78pf_qe6c6HabGE9EyELTW-xYQbpA";
  }

  try {
    const response = yield axios.post(url, {
      email: action.email,
      password: action.password,
      returnSecureToken: true,
    });

    let expirationDate = new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );

    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", response.data.localId);

    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    );

    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem("token");

  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    if (expirationDate < new Date()) {
      yield put(actions.logout());
    } else {
      const userId = localStorage.getItem("userId");
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}
