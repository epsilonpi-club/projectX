// Mock data for SAC Dashboard

export const pendingEvents = [
    {
        id: 1,
        name: 'Tech Fest 2025',
        club: 'TechnoVision Club',
        clubId: 'technovision',
        date: '2025-01-25',
        time: '9:00 AM - 6:00 PM',
        venue: 'Auditorium A',
        expectedParticipants: 500,
        budget: 75000,
        category: 'Technical',
        description: 'Annual technical festival featuring robotics competitions, coding challenges, hackathons, and tech talks by industry experts. The event aims to promote technological innovation among students.',
        submittedAt: '2025-01-17',
        submittedBy: 'Rahul Verma',
        hasConflict: true,
        conflictEvent: 'Music Workshop',
        attachments: [
            { name: 'Event Proposal.pdf', type: 'pdf' },
            { name: 'Budget Sheet.xlsx', type: 'excel' }
        ]
    },
    {
        id: 2,
        name: 'Annual Sports Meet',
        club: 'Athletics Club',
        clubId: 'athletics',
        date: '2025-01-28',
        time: '8:00 AM - 5:00 PM',
        venue: 'Main Ground',
        expectedParticipants: 1000,
        budget: 150000,
        category: 'Sports',
        description: 'College-wide sports competition featuring track and field events, team sports, and individual competitions. Winners will represent the college at inter-college meets.',
        submittedAt: '2025-01-15',
        submittedBy: 'Priya Singh',
        hasConflict: false,
        attachments: [
            { name: 'Sports Event Plan.pdf', type: 'pdf' }
        ]
    },
    {
        id: 3,
        name: 'Cultural Night',
        club: 'Drama Society',
        clubId: 'drama',
        date: '2025-02-02',
        time: '5:00 PM - 10:00 PM',
        venue: 'Open Air Theatre',
        expectedParticipants: 300,
        budget: 45000,
        category: 'Cultural',
        description: 'An evening of cultural performances including drama, dance, and music acts by various club members. Special guest performances from alumni.',
        submittedAt: '2025-01-18',
        submittedBy: 'Ananya Sharma',
        hasConflict: false,
        attachments: [
            { name: 'Performance Schedule.pdf', type: 'pdf' },
            { name: 'Stage Requirements.pdf', type: 'pdf' }
        ]
    },
    {
        id: 4,
        name: 'Photography Exhibition',
        club: 'Lens & Frame Club',
        clubId: 'photography',
        date: '2025-02-05',
        time: '10:00 AM - 6:00 PM',
        venue: 'Art Gallery',
        expectedParticipants: 150,
        budget: 20000,
        category: 'Arts',
        description: 'Showcase of best photographs clicked by club members throughout the semester. Theme: "Perspectives of Campus Life".',
        submittedAt: '2025-01-19',
        submittedBy: 'Vikram Joshi',
        hasConflict: false,
        attachments: [
            { name: 'Exhibition Layout.pdf', type: 'pdf' }
        ]
    },
    {
        id: 5,
        name: 'Startup Workshop',
        club: 'E-Cell',
        clubId: 'ecell',
        date: '2025-02-08',
        time: '2:00 PM - 6:00 PM',
        venue: 'Seminar Hall 1',
        expectedParticipants: 200,
        budget: 30000,
        category: 'Workshop',
        description: 'Workshop on entrepreneurship basics, idea validation, and pitching. Guest speakers from successful startups.',
        submittedAt: '2025-01-20',
        submittedBy: 'Arjun Mehta',
        hasConflict: true,
        conflictEvent: 'Faculty Meeting',
        attachments: [
            { name: 'Workshop Agenda.pdf', type: 'pdf' }
        ]
    }
];

export const approvedEvents = [
    {
        id: 101,
        name: 'Music Fest',
        club: 'Melody Club',
        date: '2025-01-22',
        venue: 'Auditorium B',
        expectedParticipants: 400,
        approvedAt: '2025-01-18',
        approvedBy: 'SAC Head'
    },
    {
        id: 102,
        name: 'Debate Competition',
        club: 'Literary Society',
        date: '2025-01-23',
        venue: 'Seminar Hall 2',
        expectedParticipants: 100,
        approvedAt: '2025-01-16',
        approvedBy: 'SAC Head'
    },
    {
        id: 103,
        name: 'Art Exhibition',
        club: 'Fine Arts Club',
        date: '2025-01-24',
        venue: 'Art Gallery',
        expectedParticipants: 200,
        approvedAt: '2025-01-15',
        approvedBy: 'SAC Head'
    }
];

export const recentActivity = [
    {
        id: 1,
        action: 'approved',
        eventName: 'Music Fest',
        clubName: 'Melody Club',
        timestamp: '2 hours ago'
    },
    {
        id: 2,
        action: 'rejected',
        eventName: 'Late Night Party',
        clubName: 'Entertainment Club',
        reason: 'Inappropriate timing',
        timestamp: '5 hours ago'
    },
    {
        id: 3,
        action: 'approved',
        eventName: 'Art Exhibition',
        clubName: 'Fine Arts Club',
        timestamp: 'Yesterday'
    },
    {
        id: 4,
        action: 'approved',
        eventName: 'Debate Competition',
        clubName: 'Literary Society',
        timestamp: '2 days ago'
    }
];

export const documents = [
    {
        id: 1,
        eventName: 'Music Fest',
        eventId: 101,
        documentType: 'Conduct Letter',
        status: 'signed',
        createdAt: '2025-01-18',
        downloadUrl: '#'
    },
    {
        id: 2,
        eventName: 'Music Fest',
        eventId: 101,
        documentType: 'Facility Request',
        status: 'signed',
        createdAt: '2025-01-18',
        downloadUrl: '#'
    },
    {
        id: 3,
        eventName: 'Debate Competition',
        eventId: 102,
        documentType: 'Conduct Letter',
        status: 'signed',
        createdAt: '2025-01-16',
        downloadUrl: '#'
    },
    {
        id: 4,
        eventName: 'Art Exhibition',
        eventId: 103,
        documentType: 'Conduct Letter',
        status: 'pending',
        createdAt: '2025-01-15',
        downloadUrl: '#'
    },
    {
        id: 5,
        eventName: 'Art Exhibition',
        eventId: 103,
        documentType: 'Budget Sanction',
        status: 'pending',
        createdAt: '2025-01-15',
        downloadUrl: '#'
    }
];

export const calendarEvents = [
    { date: '2025-01-22', name: 'Music Fest', venue: 'Auditorium B', category: 'Cultural' },
    { date: '2025-01-23', name: 'Debate Competition', venue: 'Seminar Hall 2', category: 'Academic' },
    { date: '2025-01-24', name: 'Art Exhibition', venue: 'Art Gallery', category: 'Arts' },
    { date: '2025-01-25', name: 'Music Workshop', venue: 'Auditorium A', category: 'Cultural' },
    { date: '2025-01-27', name: 'Yoga Session', venue: 'Main Ground', category: 'Sports' },
    { date: '2025-01-28', name: 'Guest Lecture', venue: 'Seminar Hall 1', category: 'Academic' },
    { date: '2025-01-30', name: 'Career Fair', venue: 'Exhibition Hall', category: 'Academic' }
];

export const stats = {
    pending: pendingEvents.length,
    approved: 47,
    eventsToday: 3,
    eventsThisWeek: 8
};
