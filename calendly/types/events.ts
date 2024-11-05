export interface ListScheduledEventsParams {
    count?: number;                   // The number of rows to return (1 to 100)
    group?: string;                   // URI of the group
    invitee_email?: string;           // Email of the invitee
    max_start_time?: string;          // Include events with start times prior to this time (UTC)
    min_start_time?: string;          // Include events with start times after this time (UTC)
    organization?: string;            // URI of the organization
    page_token?: string;              // Token for pagination
    sort?: string;                    // Sort order, e.g., "start_time:asc"
    status?: 'active' | 'canceled';   // Event status
    user?: string;                    // URI of the user
}
