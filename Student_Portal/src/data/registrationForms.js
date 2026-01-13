// Default registration form configuration
// This can be customized per event in the events data

export const defaultRegistrationForm = {
    fields: [
        {
            id: 'name',
            type: 'text',
            label: 'Full Name',
            placeholder: 'Enter your full name',
            required: true
        },
        {
            id: 'email',
            type: 'email',
            label: 'Email Address',
            placeholder: 'Enter your email',
            required: true
        },
        {
            id: 'phone',
            type: 'tel',
            label: 'Phone Number',
            placeholder: '10-digit mobile number',
            required: true
        },
        {
            id: 'rollNumber',
            type: 'text',
            label: 'Roll Number',
            placeholder: 'e.g., 21BCE1234',
            required: true
        },
        {
            id: 'department',
            type: 'select',
            label: 'Department',
            required: true,
            options: [
                { value: 'CSE', label: 'Computer Science & Engineering' },
                { value: 'ECE', label: 'Electronics & Communication' },
                { value: 'EEE', label: 'Electrical & Electronics' },
                { value: 'MECH', label: 'Mechanical Engineering' },
                { value: 'CIVIL', label: 'Civil Engineering' },
                { value: 'OTHER', label: 'Other' }
            ]
        },
        {
            id: 'year',
            type: 'radio',
            label: 'Year of Study',
            required: true,
            options: [
                { value: '1', label: '1st Year' },
                { value: '2', label: '2nd Year' },
                { value: '3', label: '3rd Year' },
                { value: '4', label: '4th Year' }
            ]
        },
        {
            id: 'experience',
            type: 'textarea',
            label: 'Relevant Experience (Optional)',
            placeholder: 'Any prior experience related to this event...',
            required: false,
            rows: 3
        },
        {
            id: 'terms',
            type: 'checkbox',
            label: 'Terms & Conditions',
            checkboxLabel: 'I agree to the event terms and conditions',
            required: true
        }
    ]
};

// Example of a custom form for a specific event type
export const workshopRegistrationForm = {
    fields: [
        {
            id: 'name',
            type: 'text',
            label: 'Full Name',
            placeholder: 'Enter your full name',
            required: true
        },
        {
            id: 'email',
            type: 'email',
            label: 'Email Address',
            placeholder: 'Enter your email',
            required: true
        },
        {
            id: 'phone',
            type: 'tel',
            label: 'Phone Number',
            placeholder: '10-digit mobile number',
            required: true
        },
        {
            id: 'rollNumber',
            type: 'text',
            label: 'Roll Number',
            placeholder: 'e.g., 21BCE1234',
            required: true
        },
        {
            id: 'laptop',
            type: 'radio',
            label: 'Will you bring your own laptop?',
            required: true,
            options: [
                { value: 'yes', label: 'Yes, I will bring my laptop' },
                { value: 'no', label: 'No, I need a system' }
            ]
        },
        {
            id: 'dietaryRestrictions',
            type: 'select',
            label: 'Dietary Preferences',
            required: false,
            helpText: 'For refreshments during the workshop',
            options: [
                { value: 'none', label: 'No restrictions' },
                { value: 'vegetarian', label: 'Vegetarian' },
                { value: 'vegan', label: 'Vegan' }
            ]
        },
        {
            id: 'terms',
            type: 'checkbox',
            label: 'Terms',
            checkboxLabel: 'I agree to the workshop guidelines and code of conduct',
            required: true
        }
    ]
};
