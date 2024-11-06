import { calendlyClient } from '../utils'; 
import { ListScheduledEventsParams } from '../types';

export async function listScheduledEvents(params: ListScheduledEventsParams) {

    const url = '/scheduled_events';
    const queryParams = new URLSearchParams();

    if (params.count) queryParams.append('count', params.count.toString());
    if (params.group) queryParams.append('group', params.group);
    if (params.invitee_email) queryParams.append('invitee_email', params.invitee_email);
    if (params.max_start_time) queryParams.append('max_start_time', params.max_start_time);
    if (params.min_start_time) queryParams.append('min_start_time', params.min_start_time);
    if (params.organization) queryParams.append('organization', params.organization);
    if (params.page_token) queryParams.append('page_token', params.page_token);
    if (params.sort) queryParams.append('sort', params.sort);
    if (params.status) queryParams.append('status', params.status);
    if (params.user) queryParams.append('user', params.user);

    try {
        const response = await calendlyClient().get(`${url}?${queryParams.toString()}`);
        return response.data; 
    } catch (error) {
        console.error('Error fetching scheduled events:', error.message);
        throw error; 
    }
}
