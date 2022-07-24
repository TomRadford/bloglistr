import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import { Group, Button, Text } from '@mantine/core'

const Toggleable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)
    const showWhenVisible = { display: visible ? '' : 'none' }
    const hideWhenVisible = { display: visible ? 'none' : '' }

    const toggleVisibility = () => setVisible(!visible)

    useImperativeHandle(ref, () => {
        return { toggleVisibility }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button
                    size="md"
                    fullWidth
                    variant="subtle"
                    leftIcon={props.icon}
                    mb="md"
                    onClick={toggleVisibility}
                >
                    <Text>{props.buttonLabel}</Text>
                </Button>
            </div>

            <div style={showWhenVisible}>
                {props.children}
                <Group m={5} position="center">
                    <Button
                        size="sm"
                        variant="subtle"
                        onClick={toggleVisibility}
                    >
                        Cancel
                    </Button>
                </Group>
            </div>
        </div>
    )
})

Toggleable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
}

Toggleable.displayName = 'Toggleble'

export default Toggleable
