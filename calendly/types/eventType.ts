export interface Location {
    kind: string;                // Type of location (e.g., 'custom', 'physical')
    location?: string;           // Custom location details
    additional_info?: string;    // Any additional information
}

export interface DateSetting {
    type: 'date_range';          // Allowed value must be 'date_range'
    start_date: string;          // Start date in YYYY-MM-DD format
    end_date: string;            // End date in YYYY-MM-DD format
}

export interface EventTypeData {
    name: string;                // Event type name (<= 55 characters)
    host: string;                // Host user URI
    co_hosts?: string[];         // Collection of co-hosts (<= 9 items)
    duration: number;            // Duration in minutes (<= 720)
    timezone?: string;           // Timezone used for meeting
    date_setting: DateSetting;   // Date range settings
    location?: Location;         // Location details
}
