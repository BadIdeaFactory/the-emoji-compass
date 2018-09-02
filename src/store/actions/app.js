import {
  ADD_REQUEST_EMOJI,
  SET_RESPONSE_EMOJI,
  RESET_APP_STATE,
  SHOW_ANSWER_SCREEN,
  UPDATE_HAND_POSITION
} from './'

export function addRequestEmoji (emoji) {
  return {
    type: ADD_REQUEST_EMOJI,
    emoji
  }
}

export function setResponseEmoji (emojis) {
  return {
    type: SET_RESPONSE_EMOJI,
    emojis
  }
}

export function resetAppState () {
  return {
    type: RESET_APP_STATE
  }
}

export function showAnswerScreen () {
  return {
    type: SHOW_ANSWER_SCREEN
  }
}

export function updateHandPosition (rotation) {
  return {
    type: UPDATE_HAND_POSITION,
    rotation
  }
}
