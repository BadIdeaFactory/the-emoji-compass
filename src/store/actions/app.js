import {
  ADD_REQUEST_EMOJI,
  ADD_RESPONSE_EMOJI,
  SET_RESPONSE_EMOJI,
  RESET_APP_STATE,
  SHOW_ANSWER_SCREEN,
  UPDATE_NEEDLE_POSITION,
  SET_ACTIVE_NEEDLE
} from './'

export function addRequestEmoji (emoji) {
  return {
    type: ADD_REQUEST_EMOJI,
    emoji
  }
}

export function addResponseEmoji (emoji) {
  return {
    type: ADD_RESPONSE_EMOJI,
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

export function updateNeedlePosition (rotation) {
  return {
    type: UPDATE_NEEDLE_POSITION,
    rotation
  }
}

export function setActiveNeedle (needleId) {
  return {
    type: SET_ACTIVE_NEEDLE,
    needleId
  }
}