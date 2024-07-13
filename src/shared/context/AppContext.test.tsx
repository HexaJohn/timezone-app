import React from 'react'
import { render, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AppProvider, useAppContext } from './AppContext'

// A component that uses the context and exposes a way to dispatch actions
const TestComponent = ({ testId }: { testId: string }) => {
    const { state, dispatch } = useAppContext()
    return (
        <div>
            <span data-testid={`${testId}-time`}>{state.currentTime.toISOString()}</span>
            <span data-testid={`${testId}-offset`}>{state.offset}</span>
            <span data-testid={`${testId}-timezones`}>{state.timezones.join(', ')}</span>
            <button onClick={() => dispatch({ type: 'SET_OFFSET', payload: 60 })}>
                Set Offset
            </button>
            <button onClick={() => dispatch({ type: 'ADD_TIMEZONE', payload: 'America/New_York' })}>
                Add Timezone
            </button>
            <button onClick={() => dispatch({ type: 'REMOVE_TIMEZONE', payload: 'America/New_York' })}>
                Remove Timezone
            </button>
        </div>
    )
}

describe('AppContext', () => {
    it('provides the correct initial state', () => {
        const { getByTestId } = render(
            <AppProvider>
                <TestComponent testId="test1" />
            </AppProvider>
        )

        expect(getByTestId('test1-offset')).toHaveTextContent('0')
        expect(getByTestId('test1-timezones')).toHaveTextContent('')
    })

    it('updates state when dispatch is called', () => {
        const { getByTestId, getByText } = render(
            <AppProvider>
                <TestComponent testId="test2" />
            </AppProvider>
        )

        act(() => {
            getByText('Set Offset').click()
        })

        expect(getByTestId('test2-offset')).toHaveTextContent('60')
    })

    it('adds and removes timezones', () => {
        const { getByTestId, getByText } = render(
            <AppProvider>
                <TestComponent testId="test3" />
            </AppProvider>
        )

        act(() => {
            getByText('Add Timezone').click()
        })

        expect(getByTestId('test3-timezones')).toHaveTextContent('America/New_York')

        act(() => {
            getByText('Remove Timezone').click()
        })

        expect(getByTestId('test3-timezones')).toHaveTextContent('')
    })
})