// Mock Data for Club Portal

export const currentClub = {
    id: 'CLB001',
    name: 'Tech Club',
    description: 'Fostering innovation and technical excellence through hackathons, workshops, and coding competitions. Join us to explore cutting-edge technologies and build amazing projects together.',
    category: 'Technical',
    logo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&h=150&fit=crop',
    email: 'techclub@college.edu',
    instagram: '@techclub_official',
    website: 'https://techclub.college.edu',
    facultyAdvisor: {
        name: 'Dr. Rajesh Kumar',
        email: 'rajesh.kumar@college.edu',
        department: 'Computer Science'
    },
    members: 450,
    eventsHosted: 24,
    totalRegistrations: 3500
};

export const clubMembers = [
    {
        id: 'USR001',
        name: 'Praneeth Chetty',
        email: 'praneeth.c21@college.edu',
        rollNumber: '21BCE1234',
        role: 'lead',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
        joinedAt: '2024-06-15'
    },
    {
        id: 'USR002',
        name: 'Ananya Sharma',
        email: 'ananya.s22@college.edu',
        rollNumber: '22BCE2345',
        role: 'lead',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
        joinedAt: '2024-06-15'
    },
    {
        id: 'USR003',
        name: 'Vikram Singh',
        email: 'vikram.s21@college.edu',
        rollNumber: '21BCE3456',
        role: 'member',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
        joinedAt: '2024-08-01'
    },
    {
        id: 'USR004',
        name: 'Meera Patel',
        email: 'meera.p23@college.edu',
        rollNumber: '23BCE4567',
        role: 'scanner',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces',
        joinedAt: '2024-09-10'
    }
];

export const events = [
    {
        id: 'EVT001',
        clubId: 'CLB001',
        name: 'TechFest 2026 - Hackathon',
        description: 'Annual 24-hour hackathon where talented developers collaborate to build innovative solutions. Open to all students with programming experience.',
        date: '2026-01-15',
        startTime: '09:00',
        endTime: '09:00',
        endDate: '2026-01-16',
        venue: 'Main Auditorium',
        expectedParticipants: 200,
        totalSeats: 200,
        status: 'approved',
        poster: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=250&fit=crop',
        registrationDeadline: '2026-01-12',
        hasBudget: true,
        budgetAmount: 50000,
        budgetDescription: 'Prizes, refreshments, venue setup, printing',
        isPaid: false,
        registrationFee: 0,
        registrationForm: {
            fields: [
                { id: 'teamName', type: 'text', label: 'Team Name', required: true },
                { id: 'teamSize', type: 'select', label: 'Team Size', required: true, options: ['2', '3', '4'] },
                { id: 'experience', type: 'radio', label: 'Experience Level', required: true, options: ['Beginner', 'Intermediate', 'Advanced'] },
                { id: 'laptop', type: 'checkbox', label: 'I will bring my own laptop', required: false }
            ]
        },
        formLocked: true,
        createdAt: '2025-12-01',
        approvedAt: '2025-12-05',
        registrations: 155
    },
    {
        id: 'EVT002',
        clubId: 'CLB001',
        name: 'AI/ML Workshop Series',
        description: 'A comprehensive 3-day workshop covering fundamentals of Artificial Intelligence and Machine Learning with hands-on projects.',
        date: '2026-02-01',
        startTime: '10:00',
        endTime: '17:00',
        endDate: '2026-02-03',
        venue: 'Computer Lab 3',
        expectedParticipants: 60,
        totalSeats: 60,
        status: 'approved',
        poster: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=250&fit=crop',
        registrationDeadline: '2026-01-28',
        hasBudget: true,
        budgetAmount: 15000,
        budgetDescription: 'Resource materials, refreshments',
        isPaid: true,
        registrationFee: 200,
        paymentMode: 'UPI to techclub@upi',
        registrationForm: null,
        formLocked: false,
        createdAt: '2025-12-10',
        approvedAt: '2025-12-15',
        registrations: 38
    },
    {
        id: 'EVT003',
        clubId: 'CLB001',
        name: 'Web Development Bootcamp',
        description: 'Learn modern web development from scratch. Covers HTML, CSS, JavaScript, React, and Node.js.',
        date: '2026-02-15',
        startTime: '09:00',
        endTime: '16:00',
        venue: 'Seminar Hall B',
        expectedParticipants: 80,
        totalSeats: 80,
        status: 'pending',
        poster: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
        registrationDeadline: '2026-02-12',
        hasBudget: false,
        isPaid: true,
        registrationFee: 150,
        paymentMode: 'Cash at venue',
        registrationForm: null,
        formLocked: false,
        createdAt: '2026-01-05',
        registrations: 0
    },
    {
        id: 'EVT004',
        clubId: 'CLB001',
        name: 'Code Quest - Competitive Programming',
        description: 'Test your algorithmic skills in this competitive programming contest. Prizes worth 20k!',
        date: '2026-02-20',
        startTime: '14:00',
        endTime: '18:00',
        venue: 'Computer Lab 1',
        expectedParticipants: 100,
        totalSeats: 100,
        status: 'draft',
        poster: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=250&fit=crop',
        registrationDeadline: '2026-02-18',
        hasBudget: true,
        budgetAmount: 25000,
        budgetDescription: 'Prize money, certificates',
        isPaid: false,
        registrationForm: null,
        formLocked: false,
        createdAt: '2026-01-08',
        registrations: 0
    },
    {
        id: 'EVT005',
        clubId: 'CLB001',
        name: 'Cloud Computing Seminar',
        description: 'Introduction to cloud platforms - AWS, Azure, and GCP. Guest speakers from industry.',
        date: '2025-12-10',
        startTime: '11:00',
        endTime: '13:00',
        venue: 'Main Auditorium',
        expectedParticipants: 150,
        totalSeats: 150,
        status: 'completed',
        poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop',
        registrationDeadline: '2025-12-08',
        hasBudget: false,
        isPaid: false,
        registrationForm: null,
        formLocked: true,
        createdAt: '2025-11-20',
        approvedAt: '2025-11-25',
        registrations: 142
    }
];

export const registrations = [
    {
        id: 'REG001',
        eventId: 'EVT001',
        userId: 'STU001',
        name: 'Rahul Verma',
        rollNumber: '21BCE5678',
        email: 'rahul.v21@college.edu',
        phone: '9876543210',
        department: 'CSE',
        year: '3rd Year',
        formData: {
            teamName: 'Code Warriors',
            teamSize: '4',
            experience: 'Advanced',
            laptop: true
        },
        status: 'registered',
        qrCode: 'TECH-EVT001-STU001-7X9K2',
        attended: false,
        registeredAt: '2026-01-05T10:30:00'
    },
    {
        id: 'REG002',
        eventId: 'EVT001',
        userId: 'STU002',
        name: 'Priya Nair',
        rollNumber: '22BCE1234',
        email: 'priya.n22@college.edu',
        phone: '9876543211',
        department: 'CSE',
        year: '2nd Year',
        formData: {
            teamName: 'Binary Brains',
            teamSize: '3',
            experience: 'Intermediate',
            laptop: true
        },
        status: 'registered',
        qrCode: 'TECH-EVT001-STU002-3M5P8',
        attended: true,
        attendedAt: '2026-01-15T09:15:00',
        markedBy: 'USR004',
        registeredAt: '2026-01-06T14:20:00'
    },
    {
        id: 'REG003',
        eventId: 'EVT001',
        userId: 'STU003',
        name: 'Arjun Reddy',
        rollNumber: '21BCE9876',
        email: 'arjun.r21@college.edu',
        phone: '9876543212',
        department: 'ECE',
        year: '3rd Year',
        formData: {
            teamName: 'Byte Force',
            teamSize: '2',
            experience: 'Beginner',
            laptop: false
        },
        status: 'registered',
        qrCode: 'TECH-EVT001-STU003-9Q2L5',
        attended: true,
        attendedAt: '2026-01-15T09:30:00',
        markedBy: 'USR004',
        registeredAt: '2026-01-07T09:45:00'
    },
    {
        id: 'REG004',
        eventId: 'EVT002',
        userId: 'STU004',
        name: 'Sneha Gupta',
        rollNumber: '23BCE4567',
        email: 'sneha.g23@college.edu',
        phone: '9876543213',
        department: 'CSE',
        year: '1st Year',
        formData: {},
        status: 'registered',
        qrCode: 'TECH-EVT002-STU004-4K7N1',
        attended: false,
        registeredAt: '2026-01-08T11:00:00'
    }
];

export const venues = [
    'Main Auditorium',
    'Seminar Hall A',
    'Seminar Hall B',
    'Computer Lab 1',
    'Computer Lab 2',
    'Computer Lab 3',
    'Open Air Theatre',
    'Sports Ground',
    'Conference Room 1',
    'Conference Room 2'
];

export const notifications = [
    {
        id: 'NOT001',
        type: 'approval',
        title: 'Event Approved',
        message: 'Your event "TechFest 2026 - Hackathon" has been approved by SAC.',
        eventId: 'EVT001',
        read: true,
        createdAt: '2025-12-05T10:00:00'
    },
    {
        id: 'NOT002',
        type: 'registration',
        title: 'New Registration',
        message: 'Rahul Verma registered for TechFest 2026 - Hackathon.',
        eventId: 'EVT001',
        read: true,
        createdAt: '2026-01-05T10:30:00'
    },
    {
        id: 'NOT003',
        type: 'registration',
        title: 'New Registration',
        message: 'Priya Nair registered for TechFest 2026 - Hackathon.',
        eventId: 'EVT001',
        read: false,
        createdAt: '2026-01-06T14:20:00'
    },
    {
        id: 'NOT004',
        type: 'pending',
        title: 'Event Pending Review',
        message: 'Your event "Web Development Bootcamp" is pending SAC approval.',
        eventId: 'EVT003',
        read: false,
        createdAt: '2026-01-05T16:00:00'
    }
];

// Form field types for the form builder
export const formFieldTypes = [
    { type: 'text', label: 'Text Input', icon: '✏️' },
    { type: 'email', label: 'Email', icon: '📧' },
    { type: 'tel', label: 'Phone Number', icon: '📱' },
    { type: 'number', label: 'Number', icon: '🔢' },
    { type: 'textarea', label: 'Long Text', icon: '📝' },
    { type: 'select', label: 'Dropdown', icon: '📋' },
    { type: 'radio', label: 'Radio Buttons', icon: '⭕' },
    { type: 'checkbox', label: 'Checkbox', icon: '☑️' }
];

// Calendar events for conflict checking
export const calendarEvents = events
    .filter(e => e.status === 'approved' || e.status === 'completed')
    .map(e => ({
        id: e.id,
        title: e.name,
        date: e.date,
        endDate: e.endDate || e.date,
        startTime: e.startTime,
        endTime: e.endTime,
        venue: e.venue,
        clubName: currentClub.name
    }));
