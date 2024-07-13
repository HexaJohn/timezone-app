import React from 'react'
import { render, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AppProvider, useAppContext } from './AppContext'

// This component is used to test the AppContext
// It renders the current state and provides buttons to dispatch actions
const TestComponent = ({ testId }: { testId: string }) => {
    // Use our custom hook to access the context
    const { state, dispatch } = useAppContext()

    return (
        <div>
            {/* Display the current time from the state */}
            <span data-testid={`${testId}-time`}>{state.currentTime.toISOString()}</span>

            {/* Display the current offset from the state */}
            <span data-testid={`${testId}-offset`}>{state.timeOffset}</span>

            {/* Display all timezones from the state */}
            <span data-testid={`${testId}-timezones`}>{state.timezones.join(', ')}</span>

            {/* Button to set the offset to 60 minutes */}
            <button onClick={() => dispatch({ type: 'SET_OFFSET', payload: 60 })}>
                Set Offset
            </button>

            {/* Button to add a timezone */}
            <button onClick={() => dispatch({ type: 'ADD_TIMEZONE', payload: 'America/New_York' })}>
                Add Timezone
            </button>

            {/* Button to remove a timezone */}
            <button onClick={() => dispatch({ type: 'REMOVE_TIMEZONE', payload: 'America/New_York' })}>
                Remove Timezone
            </button>
        </div>
    )
}

// Main test suite for AppContext
describe('AppContext', () => {
    // Test case: Check if the initial state is correctly provided by the context
    it('provides the correct initial state', () => {
        // Render the TestComponent wrapped in AppProvider
        const { getByTestId } = render(
            <AppProvider>
                <TestComponent testId="test1" />
            </AppProvider>
        )

        // Check if the initial offset is 0
        expect(getByTestId('test1-offset')).toHaveTextContent('0')

        // Check if the initial timezones list is empty
        expect(getByTestId('test1-timezones')).toHaveTextContent('')
    })

    // Test case: Verify that the state updates when an action is dispatched
    it('updates state when dispatch is called', () => {
        // Render the TestComponent wrapped in AppProvider
        const { getByTestId, getByText } = render(
            <AppProvider>
                <TestComponent testId="test2" />
            </AppProvider>
        )

        // Use act to wrap the state update
        // This ensures that all updates are processed before making assertions
        act(() => {
            // Click the button to set the offset
            getByText('Set Offset').click()
        })

        // Check if the offset has been updated to 60
        expect(getByTestId('test2-offset')).toHaveTextContent('60')
    })

    // Test case: Verify that timezones can be added and removed from the state
    it('adds and removes timezones', () => {
        // Render the TestComponent wrapped in AppProvider
        const { getByTestId, getByText } = render(
            <AppProvider>
                <TestComponent testId="test3" />
            </AppProvider>
        )

        // Add a timezone
        act(() => {
            // Click the button to add a timezone
            getByText('Add Timezone').click()
        })

        // Check if the timezone was added correctly
        expect(getByTestId('test3-timezones')).toHaveTextContent('America/New_York')

        // Remove the timezone
        act(() => {
            // Click the button to remove the timezone
            getByText('Remove Timezone').click()
        })

        // Check if the timezone was removed correctly
        expect(getByTestId('test3-timezones')).toHaveTextContent('')
    })
})