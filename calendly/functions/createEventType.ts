import { calendlyClient } from '../utils'; 

import { EventTypeData } from '../types'; 

export async function createEventType(eventData: EventTypeData) {
    try {
        const response = await calendlyClient().post('/one_off_event_types', eventData); 
        return response.data; 
    } catch (error) {
        console.error('Error creating event type:', error.message);
        throw error; 
    }
}

