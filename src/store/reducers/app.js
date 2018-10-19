import {
  ADD_REQUEST_EMOJI,
  SET_RESPONSE_EMOJI,
  RESET_APP_STATE,
  SHOW_ANSWER_SCREEN,
  UPDATE_HAND_POSITION,
  SET_ACTIVE_HAND
} from '../actions'
import symbols from '../../symbols.json'
import { ROUTES } from '../../constants'
import { getEmojiPosition } from '../../utils'

const initialState = {
  symbols: symbols,
  route: ROUTES.MAIN,
  requestEmojis: [],
  responseEmojis: [],
  handPosition: null,
  activeHand: 1
}

const testAnswerScreenState = {
  symbols: symbols,
  route: ROUTES.ANSWER,
  requestEmojis: [symbols[4], symbols[12], symbols[22]],
  responseEmojis: [symbols[31], symbols[8], symbols[17]]
}

const app = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REQUEST_EMOJI:
      return {
        ...state,
        requestEmojis: [...state.requestEmojis, action.emoji]
      }
    case SET_RESPONSE_EMOJI:
      return {
        ...state,
        responseEmojis: [...action.emojis]
      }
    case SHOW_ANSWER_SCREEN:
      return {
        ...state,
        route: ROUTES.ANSWER
      }
    case RESET_APP_STATE:
      return initialState
    case UPDATE_HAND_POSITION: 
      return {
        ...state,
        handPosition: getEmojiPosition(action.rotation, state.symbols)
      }
    case SET_ACTIVE_HAND:
      return {
        ...state,
        activeHand: action.hand,
        // Reset hand position
        handPosition: null
      }
    default:
      return state
  }
}

export default app
