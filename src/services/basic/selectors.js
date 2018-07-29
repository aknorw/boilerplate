import { createSelector } from 'reselect'

export const selectBasicState = ({ basic }) => basic

export const selectFoo = () => createSelector(selectBasicState, basicState => basicState.foo)
