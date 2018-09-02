import {
  ADD_REQUEST_EMOJI,
  SET_RESPONSE_EMOJI,
  RESET_APP_STATE,
  SHOW_ANSWER_SCREEN,
  UPDATE_HAND_POSITION
} from '../actions'
import symbols from '../../symbols.json'
import { ROUTES } from '../../constants'
import { getEmojiPosition } from '../../utils'

const initialState = {
  symbols: symbols,
  route: ROUTES.MAIN,
  requestEmojis: [],
  responseEmojis: [],
  handPosition: null
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
    default:
      return state
  }
}

export default app
