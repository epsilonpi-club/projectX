// Mock Data for Student Portal

export const currentUser = {
    id: 'STU001',
    name: 'Praneeth Chetty',
    rollNumber: '21BCE1234',
    email: 'praneeth.c21@college.edu',
    department: 'Computer Science & Engineering',
    year: '3rd Year',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
    eventsAttended: 12,
    certificatesEarned: 8,
    activityPoints: 245
};

export const events = [
    {
        id: 'EVT001',
        name: 'TechFest 2026 - Hackathon',
        description: 'Annual 24-hour hackathon where talented developers collaborate to build innovative solutions. Open to all students with programming experience.',
        clubId: 'CLB001',
        clubName: 'Tech Club',
        date: '2026-01-15',
        time: '09:00 AM',
        endDate: '2026-01-16',
        endTime: '09:00 AM',
        venue: 'Main Auditorium, Block A',
        category: 'Tech',
        totalSeats: 200,
        seatsAvailable: 45,
        poster: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=250&fit=crop',
        isFeatured: true,
        registrationDeadline: '2026-01-12',
        rules: ['Teams of 2-4 members', 'Bring your own laptop', 'No pre-built projects allowed'],
        eligibility: 'All students from CSE, IT, ECE, EEE departments'
    },
    {
        id: 'EVT002',
        name: 'Classical Music Night',
        description: 'Experience an evening of soul-stirring classical music performances by renowned artists and talented student musicians.',
        clubId: 'CLB002',
        clubName: 'Music Society',
        date: '2026-01-20',
        time: '06:00 PM',
        venue: 'Open Air Theatre',
        category: 'Cultural',
        totalSeats: 500,
        seatsAvailable: 180,
        poster: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=250&fit=crop',
        isFeatured: true,
        registrationDeadline: '2026-01-18',
        rules: ['Formal attire preferred', 'No flash photography'],
        eligibility: 'Open to all students'
    },
    {
        id: 'EVT003',
        name: 'Inter-College Basketball Tournament',
        description: 'Annual basketball championship featuring teams from colleges across the state. Register your team and compete for the trophy!',
        clubId: 'CLB003',
        clubName: 'Sports Club',
        date: '2026-01-25',
        time: '08:00 AM',
        endDate: '2026-01-27',
        venue: 'Indoor Sports Complex',
        category: 'Sports',
        totalSeats: 100,
        seatsAvailable: 0,
        poster: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=250&fit=crop',
        isFeatured: false,
        registrationDeadline: '2026-01-20',
        rules: ['Team of 5+2 substitutes', 'Valid college ID mandatory', 'Sports uniform required'],
        eligibility: 'All undergraduate students'
    },
    {
        id: 'EVT004',
        name: 'AI/ML Workshop Series',
        description: 'A comprehensive 3-day workshop covering fundamentals of Artificial Intelligence and Machine Learning with hands-on projects.',
        clubId: 'CLB001',
        clubName: 'Tech Club',
        date: '2026-02-01',
        time: '10:00 AM',
        endDate: '2026-02-03',
        venue: 'Computer Lab 3, Block B',
        category: 'Tech',
        totalSeats: 60,
        seatsAvailable: 22,
        poster: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=250&fit=crop',
        isFeatured: true,
        registrationDeadline: '2026-01-28',
        rules: ['Laptop with Python installed required', 'Basic programming knowledge expected'],
        eligibility: '2nd year and above'
    },
    {
        id: 'EVT005',
        name: 'Annual Cultural Festival - Euphoria',
        description: 'The biggest cultural extravaganza of the year featuring dance, drama, music, fashion show, and more exciting performances.',
        clubId: 'CLB002',
        clubName: 'Cultural Committee',
        date: '2026-02-10',
        time: '04:00 PM',
        endDate: '2026-02-12',
        venue: 'College Ground',
        category: 'Cultural',
        totalSeats: 2000,
        seatsAvailable: 1250,
        poster: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=250&fit=crop',
        isFeatured: true,
        registrationDeadline: '2026-02-08',
        rules: ['College ID mandatory', 'Guest passes available on request'],
        eligibility: 'All students'
    },
    {
        id: 'EVT006',
        name: 'Photography Walk',
        description: 'Join fellow photography enthusiasts for a morning walk around campus capturing the beauty of nature and architecture.',
        clubId: 'CLB004',
        clubName: 'Photography Club',
        date: '2026-01-18',
        time: '06:30 AM',
        venue: 'Meet at Main Gate',
        category: 'Cultural',
        totalSeats: 30,
        seatsAvailable: 8,
        poster: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=250&fit=crop',
        isFeatured: false,
        registrationDeadline: '2026-01-16',
        rules: ['Bring your own camera/phone', 'Comfortable walking shoes recommended'],
        eligibility: 'All students'
    }
];

export const clubs = [
    {
        id: 'CLB001',
        name: 'Tech Club',
        category: 'Technical',
        description: 'Fostering innovation and technical excellence through hackathons, workshops, and coding competitions. Join us to explore cutting-edge technologies.',
        logo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop',
        members: 450,
        email: 'techclub@college.edu',
        instagram: '@techclub_official'
    },
    {
        id: 'CLB002',
        name: 'Music Society',
        category: 'Cultural',
        description: 'For the love of music! We organize concerts, jam sessions, and music workshops throughout the year. All genres and skill levels welcome.',
        logo: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop',
        members: 280,
        email: 'music@college.edu',
        instagram: '@music_society'
    },
    {
        id: 'CLB003',
        name: 'Sports Club',
        category: 'Sports',
        description: 'Promoting physical fitness and sportsmanship. We manage all inter-college sports events and daily practice sessions for various sports.',
        logo: 'https://images.unsplash.com/photo-1461896836934- voices-in-1470abf7b879?w=100&h=100&fit=crop',
        members: 520,
        email: 'sports@college.edu',
        instagram: '@sports_official'
    },
    {
        id: 'CLB004',
        name: 'Photography Club',
        category: 'Creative',
        description: 'Capturing moments, creating memories. Learn photography techniques, participate in photo walks, and showcase your work in exhibitions.',
        logo: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=100&h=100&fit=crop',
        members: 150,
        email: 'photo@college.edu',
        instagram: '@lens_club'
    },
    {
        id: 'CLB005',
        name: 'Literary Society',
        category: 'Literary',
        description: 'For word enthusiasts! Debates, poetry slams, creative writing workshops, and book club sessions. Express yourself through the power of words.',
        logo: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=100&fit=crop',
        members: 180,
        email: 'literary@college.edu',
        instagram: '@lit_society'
    },
    {
        id: 'CLB006',
        name: 'Robotics Club',
        category: 'Technical',
        description: 'Building the future, one robot at a time. Participate in robotics competitions, build autonomous machines, and learn electronics.',
        logo: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop',
        members: 95,
        email: 'robotics@college.edu',
        instagram: '@robo_club'
    }
];

export const registrations = [
    {
        id: 'REG001',
        eventId: 'EVT001',
        eventName: 'TechFest 2026 - Hackathon',
        eventDate: '2026-01-15',
        eventTime: '09:00 AM',
        venue: 'Main Auditorium, Block A',
        clubName: 'Tech Club',
        status: 'upcoming',
        registeredOn: '2026-01-05',
        qrCode: 'TECHFEST-2026-STU001-EVT001',
        attended: false
    },
    {
        id: 'REG002',
        eventId: 'EVT004',
        eventName: 'AI/ML Workshop Series',
        eventDate: '2026-02-01',
        eventTime: '10:00 AM',
        venue: 'Computer Lab 3, Block B',
        clubName: 'Tech Club',
        status: 'upcoming',
        registeredOn: '2026-01-08',
        qrCode: 'AIML-WS-STU001-EVT004',
        attended: false
    },
    {
        id: 'REG003',
        eventId: 'EVT010',
        eventName: 'Web Development Bootcamp',
        eventDate: '2025-12-10',
        eventTime: '10:00 AM',
        venue: 'Computer Lab 1, Block B',
        clubName: 'Tech Club',
        status: 'completed',
        registeredOn: '2025-12-01',
        qrCode: 'WEBDEV-STU001-EVT010',
        attended: true,
        certificate: true
    },
    {
        id: 'REG004',
        eventId: 'EVT011',
        eventName: 'Annual Sports Day',
        eventDate: '2025-11-20',
        eventTime: '07:00 AM',
        venue: 'Sports Ground',
        clubName: 'Sports Club',
        status: 'completed',
        registeredOn: '2025-11-10',
        qrCode: 'SPORTS-DAY-STU001-EVT011',
        attended: true,
        certificate: true
    },
    {
        id: 'REG005',
        eventId: 'EVT012',
        eventName: 'Photography Exhibition',
        eventDate: '2025-10-15',
        eventTime: '02:00 PM',
        venue: 'Art Gallery',
        clubName: 'Photography Club',
        status: 'completed',
        registeredOn: '2025-10-05',
        qrCode: 'PHOTO-EX-STU001-EVT012',
        attended: false,
        certificate: false
    }
];

export const notifications = [
    {
        id: 'NOT001',
        type: 'reminder',
        title: 'Event Reminder',
        message: 'TechFest 2026 - Hackathon starts in 7 days. Make sure you have your team ready!',
        timestamp: '2026-01-08T09:00:00',
        read: false,
        eventId: 'EVT001'
    },
    {
        id: 'NOT002',
        type: 'confirmation',
        title: 'Registration Confirmed',
        message: 'You have successfully registered for AI/ML Workshop Series.',
        timestamp: '2026-01-08T08:30:00',
        read: false,
        eventId: 'EVT004'
    },
    {
        id: 'NOT003',
        type: 'certificate',
        title: 'Certificate Available',
        message: 'Your certificate for Web Development Bootcamp is now available for download.',
        timestamp: '2026-01-07T14:00:00',
        read: true,
        eventId: 'EVT010'
    },
    {
        id: 'NOT004',
        type: 'attendance',
        title: 'Attendance Marked',
        message: 'Your attendance for Annual Sports Day has been marked successfully.',
        timestamp: '2025-11-20T09:30:00',
        read: true,
        eventId: 'EVT011'
    }
];

export const certificates = [
    {
        id: 'CERT001',
        eventName: 'Web Development Bootcamp',
        eventDate: '2025-12-10',
        issuedOn: '2025-12-15',
        type: 'Participation'
    },
    {
        id: 'CERT002',
        eventName: 'Annual Sports Day',
        eventDate: '2025-11-20',
        issuedOn: '2025-11-25',
        type: 'Participation'
    },
    {
        id: 'CERT003',
        eventName: 'Coding Competition 2025',
        eventDate: '2025-09-15',
        issuedOn: '2025-09-20',
        type: 'Winner - 2nd Place'
    }
];

export const categories = ['Tech', 'Cultural', 'Literary', 'Creative'];
export const venues = ['Nalanda Auditorium', 'Chaitana Auditorium', 'Prerna Auditorium', 'Computer Lab 3, Block B'];
