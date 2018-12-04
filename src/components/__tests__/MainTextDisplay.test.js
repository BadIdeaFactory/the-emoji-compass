import React from 'react'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import MainTextDisplay from '../MainTextDisplay'

describe('<MainTextDisplay />', () => {
  const mockStore = configureStore()

  it('renders first set of instructions when it is supposed to', () => {
    const state = {
      app: {
        symbols: [],
        needlePosition: null,
        activeNeedle: 1
      }
    }
    const store = mockStore(state)
    const wrapper = shallow(<MainTextDisplay store={store} />)
    expect(wrapper.dive().state('textDisplay')).toEqual('INSTRUCTION1')
  })

  it('renders second set of instructions when it is supposed to', () => {
    const state = {
      app: {
        symbols: [],
        needlePosition: null,
        activeNeedle: 2
      }
    }
    const store = mockStore(state)
    const wrapper = shallow(<MainTextDisplay store={store} />)
    expect(wrapper.dive().state('textDisplay')).toEqual('INSTRUCTION2')
  })

  it('renders emoji description when the active needle position is some number', () => {
    const state = {
      app: {
        symbols: [],
        needlePosition: 200,
        activeNeedle: 3
      }
    }
    const store = mockStore(state)
    const wrapper = shallow(<MainTextDisplay store={store} />)
    expect(wrapper.dive().state('textDisplay')).toEqual('EMOJI_DESCRIPTION')
  })

  // Test fails if the active needle is pointing at the emoji at position zero
  // but the text description displays instructions instead.
  it('renders emoji description when the active needle position is at zero', () => {
    const state = {
      app: {
        symbols: [],
        needlePosition: 0,
        activeNeedle: 1
      }
    }
    const store = mockStore(state)
    const wrapper = shallow(<MainTextDisplay store={store} />)
    expect(wrapper.dive().state('textDisplay')).toEqual('EMOJI_DESCRIPTION')
  })

})
