// src/shared/context/AppContext.test.tsx

import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { AppProvider, useAppContext } from './AppContext'
import { Timezone } from '../../features/timezoneSearch/types'

/**
 * A test component that uses the AppContext and exposes its values for testing.
 */
const TestComponent: React.FC = () => {
    const { state, dispatch } = useAppContext()
    return (
        <div>
            <span data-testid="current-time">{state.currentTime.toISOString()}</span>
            <span data-testid="base-timezone">{state.baseTimezone}</span>
            <span data-testid="time-offset">{state.timeOffset}</span>
            <ul data-testid="selected-timezones">
                {state.selectedTimezones.map((tz) => (
                    <li key={tz.name}>{tz.name}</li>
                ))}
            </ul>
            <button onClick={() => dispatch({ type: 'SET_TIME_OFFSET', payload: 60 })}>
                Set Offset
            </button>
            <button
                onClick={() =>
                    dispatch({
                        type: 'ADD_TIMEZONE',
                        payload: { name: 'Europe/London', offset: 60 },
                    })
                }
            >
                Add Timezone
            </button>
            <button
                onClick={() =>
                    dispatch({ type: 'REMOVE_TIMEZONE', payload: 'Europe/London' })
                }
            >
                Remove Timezone
            </button>
        </div>
    )
}

describe('AppContext', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('provides the correct initial state', () => {
        const { getByTestId } = render(
            <AppProvider>
                <TestComponent />
            </AppProvider>
        )

        expect(getByTestId('time-offset').textContent).toBe('0')
        expect(getByTestId('selected-timezones').children.length).toBe(0)
    })

    it('updates time offset when dispatch is called', () => {
        const { getByTestId, getByText } = render(
            <AppProvider>
                <TestComponent />
            </AppProvider>
        )

        fireEvent.click(getByText('Set Offset'))

        expect(getByTestId('time-offset').textContent).toBe('60')
    })

    it('adds and removes timezones', () => {
        const { getByTestId, getByText } = render(
            <AppProvider>
                <TestComponent />
            </AppProvider>
        )

        fireEvent.click(getByText('Add Timezone'))

        expect(getByTestId('selected-timezones').textContent).toContain('Europe/London')

        fireEvent.click(getByText('Remove Timezone'))

        expect(getByTestId('selected-timezones').children.length).toBe(0)
    })

    it('updates current time', () => {
        const { getByTestId } = render(
            <AppProvider>
                <TestComponent />
            </AppProvider>
        )

        const initialTime = getByTestId('current-time').textContent

        vi.advanceTimersByTime(1000) // Advance time by 1 second

        const newTime = getByTestId('current-time').textContent
        expect(newTime).not.toBe(initialTime)
    })

    it('sets base timezone', async () => {
        const { getByTestId } = render(
            <AppProvider>
                <TestComponent />
            </AppProvider>
        )

        const initialTimezone = getByTestId('base-timezone').textContent

        const { dispatch } = useAppContext()
        dispatch({ type: 'SET_BASE_TIMEZONE', payload: 'America/New_York' })

        expect(getByTestId('base-timezone').textContent).toBe('America/New_York')
        expect(getByTestId('base-timezone').textContent).not.toBe(initialTimezone)
    })
})