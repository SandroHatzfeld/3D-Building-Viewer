import {create} from 'zustand'
import {subscribeWithSelector} from 'zustand/middleware'

export default create(subscribeWithSelector((set) => {
    return {
        phase: 'overview',

        viewDetail:() => {
            set(() => {
                return {phase: 'detail'}
            })
        },

        reset:() => {
            set(() => {
                return {
                    phase: 'overview',
                    currentRoom: null,
                    currentRoomPos: null
                }
            })
        },

        currentRoom: null,
        currentRoomPos: null,

        viewRoom:(room) => {
            set(() => {
                return {
                    currentRoom: room
                }
            })
        },

        viewRoomPos:(position) => {
            set(() => {
                return {
                    currentRoomPos: position
                }
            })
        },

        

    }
}))