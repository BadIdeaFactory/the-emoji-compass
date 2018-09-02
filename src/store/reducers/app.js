import {
  ADD_REQUEST_EMOJI,
  SET_RESPONSE_EMOJI,
  RESET_APP_STATE,
  SHOW_ANSWER_SCREEN
} from '../actions'
import { ROUTES } from '../../constants'
import symbols from '../../symbols.json'

const initialState = {
  symbols: symbols,
  route: ROUTES.MAIN,
  requestEmojis: [],
  responseEmojis: []
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
    default:
      return state
  }
}

export default app
