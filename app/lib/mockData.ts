export interface CompletedBooking {
  bookingId: string;
  date: string;
  entryTime: string;
  exitTime: string;
  laneBooked: string;
  laneDetails: {
    laneNumber: string;
    laneType:
      | "Fast Bowling"
      | "Spin Bowling"
      | "Batting Practice"
      | "All-Round";
    duration: string; // e.g., "2 hours"
    coachAssigned?: string;
  };
  ballDetails: {
    ballType: "Red Ball" | "White Ball" | "Pink Ball" | "Practice Ball";
    ballCount: number;
    ballSpeed?: string; // e.g., "120-140 km/h"
    ballCondition: "New" | "Good" | "Worn" | "Practice";
  };
  memberDetails: {
    membersAccompanying: number;
    memberNames?: string[];
    ageGroup: "Under-16" | "16-25" | "26-35" | "36-50" | "50+";
    experienceLevel: "Beginner" | "Intermediate" | "Advanced" | "Professional";
  };
  camDetails: {
    camInstalled: boolean;
    camLocation: string;
    recordingDuration?: string;
    highlightsGenerated?: boolean;
  };
  sessionNotes?: string;
  performanceMetrics?: {
    ballsBowled?: number;
    ballsBatted?: number;
    accuracy?: string; // e.g., "85%"
    speed?: string; // e.g., "135 km/h average"
    technique?: "Good" | "Needs Improvement" | "Excellent";
  };
}

export interface InductionBooking {
  inductionId: string;
  bookedDate: string; // Date when induction was booked
  scheduledDate: string; // Date when induction is scheduled
  scheduledTime: string; // Time when induction is scheduled
  status: "Scheduled" | "Completed" | "Cancelled" | "No-Show";
  inductionType:
    | "Beginner"
    | "Intermediate"
    | "Advanced"
    | "Professional"
    | "Family"
    | "Corporate";
  duration: string; // e.g., "1 hour", "1.5 hours"
  coachAssigned: string;
  laneAssigned?: string; // Optional - some inductions might not need specific lane
  equipmentProvided: string[]; // e.g., ["Bat", "Helmet", "Pads", "Gloves"]
  safetyBriefing: boolean;
  facilityTour: boolean;
  rulesAndRegulations: boolean;
  emergencyProcedures: boolean;
  membershipOptions: string[]; // e.g., ["Premium", "Standard", "Night Owl"]
  specialRequirements?: string; // e.g., "Wheelchair accessible", "Sign language interpreter"
  notes?: string;
  completedDate?: string; // Only for completed inductions
  completedTime?: string; // Only for completed inductions
  feedback?: {
    rating: number; // 1-5 stars
    comments?: string;
    wouldRecommend: boolean;
  };
}

export interface BillingInfo {
  billingPeriod: "Weekly" | "Fortnightly" | "Monthly" | "Quarterly" | "Annual";
  nextBillingCycle: string; // Date in YYYY-MM-DD format
  amount: number; // Amount in currency (e.g., USD, INR)
  currency: "USD" | "INR" | "AUD";
  paymentMethod:
    | "Credit Card"
    | "Debit Card"
    | "Bank Transfer"
    | "Cash"
    | "Digital Wallet";
  lastPaymentDate: string; // Date in YYYY-MM-DD format
  lastPaymentAmount: number;
  autoRenewal: boolean;
  paymentStatus: "Paid" | "Pending" | "Failed" | "Overdue";
  dueDate: string; // Date in YYYY-MM-DD format
  lateFees?: number;
  discountApplied?: number;
  taxAmount: number;
  totalAmount: number; // amount + tax - discount
  billingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  invoiceNumber?: string;
  subscriptionStartDate: string; // Date in YYYY-MM-DD format
  subscriptionEndDate?: string; // Date in YYYY-MM-DD format (for fixed-term subscriptions)
  planName: string; // e.g., "Premium Annual", "Standard Monthly"
  planFeatures: string[]; // e.g., ["Unlimited Bookings", "Priority Support", "Video Analysis"]
  cancellationPolicy?: string;
  refundPolicy?: string;
}

export interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive";
  joinDate: string;
  membership:
    | "Premium"
    | "Standard"
    | "Night Owl"
    | "Family"
    | "Tour Only"
    | "Prospect"
    | "Induction";
  center: string;
  relationshipType: "Subscription" | "Booked Tour" | "Prospect" | "Induction";
  image?: string; // User profile image path
  tourDate?: string; // For booked tours
  completedTourDate?: string; // For completed tours
  completedBookings?: CompletedBooking[]; // For subscription members with booking history
  billingInfo?: BillingInfo; // For subscription members only
  inductionBookings?: InductionBooking[]; // For induction bookings
  // Cricket training center specific details
  tourDetails?: {
    entryTime: string;
    exitTime?: string; // Only for completed tours
    laneBooked: string;
    laneDetails: {
      laneNumber: string;
      laneType:
        | "Fast Bowling"
        | "Spin Bowling"
        | "Batting Practice"
        | "All-Round";
      duration: string; // e.g., "2 hours"
      coachAssigned?: string;
    };
    // Only for completed tours - full details
    ballDetails?: {
      ballType: "Red Ball" | "White Ball" | "Pink Ball" | "Practice Ball";
      ballCount: number;
      ballSpeed?: string; // e.g., "120-140 km/h"
      ballCondition: "New" | "Good" | "Worn" | "Practice";
    };
    memberDetails?: {
      membersAccompanying: number;
      memberNames?: string[];
      ageGroup: "Under-16" | "16-25" | "26-35" | "36-50" | "50+";
      experienceLevel:
        | "Beginner"
        | "Intermediate"
        | "Advanced"
        | "Professional";
    };
    camDetails?: {
      camInstalled: boolean;
      camLocation: string;
      recordingDuration?: string;
      highlightsGenerated?: boolean;
    };
    sessionNotes?: string;
    performanceMetrics?: {
      ballsBowled?: number;
      ballsBatted?: number;
      accuracy?: string; // e.g., "85%"
      speed?: string; // e.g., "135 km/h average"
      technique?: "Good" | "Needs Improvement" | "Excellent";
    };
  };
}

export const mockMembers: Member[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    status: "Active",
    joinDate: "2023-08-15",
    membership: "Premium",
    center: "Bangalore",
    relationshipType: "Subscription",
    image: "/user.jpeg",
    billingInfo: {
      billingPeriod: "Annual",
      nextBillingCycle: "2024-08-15",
      amount: 12000,
      currency: "INR",
      paymentMethod: "Credit Card",
      lastPaymentDate: "2023-08-15",
      lastPaymentAmount: 12000,
      autoRenewal: true,
      paymentStatus: "Paid",
      dueDate: "2024-08-15",
      taxAmount: 2160,
      totalAmount: 14160,
      billingAddress: {
        street: "123 Cricket Avenue",
        city: "Bangalore",
        state: "Karnataka",
        zipCode: "560001",
        country: "India",
      },
      invoiceNumber: "INV-2023-001",
      subscriptionStartDate: "2023-08-15",
      planName: "Premium Annual",
      planFeatures: [
        "Unlimited Bookings",
        "Priority Support",
        "Video Analysis",
        "Personal Coach Sessions",
        "Equipment Rental",
        "Locker Access",
        "Guest Passes (2 per month)",
      ],
      cancellationPolicy: "30-day notice required for cancellation",
      refundPolicy: "Pro-rated refund for unused period",
    },
    completedBookings: [
      {
        bookingId: "BK001",
        date: "2024-01-15",
        entryTime: "09:00",
        exitTime: "11:30",
        laneBooked: "Lane A-1",
        laneDetails: {
          laneNumber: "A-1",
          laneType: "Fast Bowling",
          duration: "2.5 hours",
          coachAssigned: "Coach Rahul Sharma",
        },
        ballDetails: {
          ballType: "Red Ball",
          ballCount: 8,
          ballSpeed: "135-155 km/h",
          ballCondition: "New",
        },
        memberDetails: {
          membersAccompanying: 0,
          ageGroup: "26-35",
          experienceLevel: "Advanced",
        },
        camDetails: {
          camInstalled: true,
          camLocation: "Lane A-1 Camera 1",
          recordingDuration: "2.5 hours",
          highlightsGenerated: true,
        },
        sessionNotes: "Fast bowling practice focusing on pace and accuracy",
        performanceMetrics: {
          ballsBowled: 60,
          ballsBatted: 0,
          accuracy: "85%",
          speed: "145 km/h average",
          technique: "Excellent",
        },
      },
      {
        bookingId: "BK002",
        date: "2024-01-22",
        entryTime: "14:00",
        exitTime: "16:30",
        laneBooked: "Lane B-2",
        laneDetails: {
          laneNumber: "B-2",
          laneType: "All-Round",
          duration: "2.5 hours",
          coachAssigned: "Coach Virat Kohli",
        },
        ballDetails: {
          ballType: "White Ball",
          ballCount: 6,
          ballSpeed: "120-140 km/h",
          ballCondition: "Good",
        },
        memberDetails: {
          membersAccompanying: 1,
          memberNames: ["Mike Johnson"],
          ageGroup: "26-35",
          experienceLevel: "Advanced",
        },
        camDetails: {
          camInstalled: true,
          camLocation: "Lane B-2 Camera 2",
          recordingDuration: "2.5 hours",
          highlightsGenerated: true,
        },
        sessionNotes: "Comprehensive all-round practice session",
        performanceMetrics: {
          ballsBowled: 45,
          ballsBatted: 40,
          accuracy: "82%",
          speed: "130 km/h average",
          technique: "Good",
        },
      },
      {
        bookingId: "BK003",
        date: "2024-02-05",
        entryTime: "10:00",
        exitTime: "12:00",
        laneBooked: "Lane C-1",
        laneDetails: {
          laneNumber: "C-1",
          laneType: "Batting Practice",
          duration: "2 hours",
          coachAssigned: "Coach Sachin Tendulkar",
        },
        ballDetails: {
          ballType: "Red Ball",
          ballCount: 10,
          ballSpeed: "125-145 km/h",
          ballCondition: "Good",
        },
        memberDetails: {
          membersAccompanying: 0,
          ageGroup: "26-35",
          experienceLevel: "Advanced",
        },
        camDetails: {
          camInstalled: true,
          camLocation: "Lane C-1 Camera 1",
          recordingDuration: "2 hours",
          highlightsGenerated: true,
        },
        sessionNotes:
          "Batting practice focusing on technique and shot selection",
        performanceMetrics: {
          ballsBowled: 0,
          ballsBatted: 80,
          accuracy: "90%",
          speed: "N/A",
          technique: "Excellent",
        },
      },
    ],
    inductionBookings: [
      {
        inductionId: "IND001",
        bookedDate: "2023-08-10",
        scheduledDate: "2023-08-15",
        scheduledTime: "10:00",
        status: "Completed",
        inductionType: "Advanced",
        duration: "1.5 hours",
        coachAssigned: "Coach Rahul Sharma",
        laneAssigned: "Lane A-1",
        equipmentProvided: [
          "Bat",
          "Helmet",
          "Pads",
          "Gloves",
          "Protective Gear",
        ],
        safetyBriefing: true,
        facilityTour: true,
        rulesAndRegulations: true,
        emergencyProcedures: true,
        membershipOptions: ["Premium", "Standard", "Night Owl"],
        notes: "Advanced player with previous cricket experience",
        completedDate: "2023-08-15",
        completedTime: "11:30",
        feedback: {
          rating: 5,
          comments:
            "Excellent induction session. Coach was very knowledgeable and helpful.",
          wouldRecommend: true,
        },
      },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 234-5678",
    status: "Active",
    joinDate: "2023-09-20",
    membership: "Induction",
    center: "Houston, USA",
    relationshipType: "Induction",
    image: "/user.jpeg",

    inductionBookings: [
      {
        inductionId: "IND002",
        bookedDate: "2023-09-15",
        scheduledDate: "2023-09-20",
        scheduledTime: "14:00",
        status: "Completed",
        inductionType: "Beginner",
        duration: "1 hour",
        coachAssigned: "Coach Mike Johnson",
        equipmentProvided: ["Bat", "Helmet", "Pads", "Gloves"],
        safetyBriefing: true,
        facilityTour: true,
        rulesAndRegulations: true,
        emergencyProcedures: true,
        membershipOptions: ["Standard", "Premium", "Night Owl"],
        notes: "First-time cricket player, needs basic introduction",
        completedDate: "2023-09-20",
        completedTime: "15:00",
        feedback: {
          rating: 4,
          comments:
            "Good introduction to cricket. Would have liked more hands-on practice time.",
          wouldRecommend: true,
        },
      },
    ],
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    phone: "+1 (555) 345-6789",
    status: "Inactive",
    joinDate: "2023-07-10",
    membership: "Night Owl",
    center: "Melbourne, AUS",
    relationshipType: "Subscription",
    billingInfo: {
      billingPeriod: "Fortnightly",
      nextBillingCycle: "2024-04-15",
      amount: 120,
      currency: "AUD",
      paymentMethod: "Debit Card",
      lastPaymentDate: "2024-03-15",
      lastPaymentAmount: 120,
      autoRenewal: false,
      paymentStatus: "Overdue",
      dueDate: "2024-04-01",
      lateFees: 15,
      taxAmount: 12,
      totalAmount: 147,
      billingAddress: {
        street: "789 Cricket Street",
        city: "Melbourne",
        state: "Victoria",
        zipCode: "3000",
        country: "Australia",
      },
      invoiceNumber: "INV-2024-003",
      subscriptionStartDate: "2023-07-10",
      subscriptionEndDate: "2024-04-01",
      planName: "Night Owl Fortnightly",
      planFeatures: [
        "Late Night Access (8 PM - 2 AM)",
        "Up to 15 Bookings per month",
        "Night Coach Availability",
        "Reduced Rates for Off-Peak Hours",
      ],
      cancellationPolicy: "14-day notice required",
      refundPolicy: "Pro-rated refund for unused period",
    },
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice.brown@example.com",
    phone: "+1 (555) 456-7890",
    status: "Active",
    joinDate: "2023-10-25",
    membership: "Family",
    center: "Brisbane, AUS",
    relationshipType: "Subscription",
    image: "/user.jpeg",
    billingInfo: {
      billingPeriod: "Quarterly",
      nextBillingCycle: "2024-07-25",
      amount: 450,
      currency: "AUD",
      paymentMethod: "Bank Transfer",
      lastPaymentDate: "2024-01-25",
      lastPaymentAmount: 450,
      autoRenewal: true,
      paymentStatus: "Paid",
      dueDate: "2024-07-25",
      discountApplied: 45,
      taxAmount: 40.5,
      totalAmount: 445.5,
      billingAddress: {
        street: "321 Family Court",
        city: "Brisbane",
        state: "Queensland",
        zipCode: "4000",
        country: "Australia",
      },
      invoiceNumber: "INV-2024-004",
      subscriptionStartDate: "2023-10-25",
      planName: "Family Quarterly",
      planFeatures: [
        "Up to 4 Family Members",
        "Unlimited Bookings for Family",
        "Family Coach Sessions",
        "Group Discounts",
        "Family Locker Access",
        "Child-Friendly Equipment",
      ],
      cancellationPolicy: "30-day notice required",
      refundPolicy: "Pro-rated refund for unused period",
    },
    inductionBookings: [
      {
        inductionId: "IND003",
        bookedDate: "2023-10-20",
        scheduledDate: "2023-10-25",
        scheduledTime: "11:00",
        status: "Completed",
        inductionType: "Family",
        duration: "2 hours",
        coachAssigned: "Coach Sarah Wilson",
        laneAssigned: "Lane C-2",
        equipmentProvided: [
          "Bat",
          "Helmet",
          "Pads",
          "Gloves",
          "Child-sized Equipment",
        ],
        safetyBriefing: true,
        facilityTour: true,
        rulesAndRegulations: true,
        emergencyProcedures: true,
        membershipOptions: ["Family", "Premium", "Standard"],
        specialRequirements: "Child-friendly session for family with kids",
        notes: "Family of 4 with two children aged 8 and 12",
        completedDate: "2023-10-25",
        completedTime: "13:00",
        feedback: {
          rating: 5,
          comments:
            "Perfect family induction! Kids loved it and we all learned a lot.",
          wouldRecommend: true,
        },
      },
    ],
  },
  {
    id: 5,
    name: "Charlie Green",
    email: "charlie.green@example.com",
    phone: "+1 (555) 567-8901",
    status: "Active",
    joinDate: "2023-11-01",
    membership: "Premium",
    center: "Bangalore",
    relationshipType: "Subscription",
    billingInfo: {
      billingPeriod: "Monthly",
      nextBillingCycle: "2024-04-01",
      amount: 1500,
      currency: "INR",
      paymentMethod: "Digital Wallet",
      lastPaymentDate: "2024-03-01",
      lastPaymentAmount: 1500,
      autoRenewal: true,
      paymentStatus: "Paid",
      dueDate: "2024-04-01",
      taxAmount: 270,
      totalAmount: 1770,
      billingAddress: {
        street: "555 Green Avenue",
        city: "Bangalore",
        state: "Karnataka",
        zipCode: "560002",
        country: "India",
      },
      invoiceNumber: "INV-2024-005",
      subscriptionStartDate: "2023-11-01",
      planName: "Premium Monthly",
      planFeatures: [
        "Unlimited Bookings",
        "Priority Support",
        "Video Analysis",
        "Personal Coach Sessions",
        "Equipment Rental",
        "Locker Access",
        "Guest Passes (1 per month)",
      ],
      cancellationPolicy: "30-day notice required for cancellation",
      refundPolicy: "No refunds for partial months",
    },
    completedBookings: [
      {
        bookingId: "BK004",
        date: "2024-01-10",
        entryTime: "16:00",
        exitTime: "18:30",
        laneBooked: "Lane D-1",
        laneDetails: {
          laneNumber: "D-1",
          laneType: "Spin Bowling",
          duration: "2.5 hours",
          coachAssigned: "Coach Anil Kumble",
        },
        ballDetails: {
          ballType: "Practice Ball",
          ballCount: 5,
          ballSpeed: "90-110 km/h",
          ballCondition: "Practice",
        },
        memberDetails: {
          membersAccompanying: 0,
          ageGroup: "26-35",
          experienceLevel: "Intermediate",
        },
        camDetails: {
          camInstalled: true,
          camLocation: "Lane D-1 Camera 1",
          recordingDuration: "2.5 hours",
          highlightsGenerated: true,
        },
        sessionNotes: "Spin bowling practice with focus on leg spin techniques",
        performanceMetrics: {
          ballsBowled: 50,
          ballsBatted: 0,
          accuracy: "75%",
          speed: "100 km/h average",
          technique: "Good",
        },
      },
      {
        bookingId: "BK005",
        date: "2024-01-25",
        entryTime: "11:00",
        exitTime: "13:00",
        laneBooked: "Lane E-2",
        laneDetails: {
          laneNumber: "E-2",
          laneType: "Batting Practice",
          duration: "2 hours",
          coachAssigned: "Coach Brian Lara",
        },
        ballDetails: {
          ballType: "White Ball",
          ballCount: 8,
          ballSpeed: "115-135 km/h",
          ballCondition: "Good",
        },
        memberDetails: {
          membersAccompanying: 2,
          memberNames: ["David Warner", "Steve Smith"],
          ageGroup: "26-35",
          experienceLevel: "Advanced",
        },
        camDetails: {
          camInstalled: true,
          camLocation: "Lane E-2 Camera 2",
          recordingDuration: "2 hours",
          highlightsGenerated: true,
        },
        sessionNotes: "Batting practice focusing on aggressive stroke play",
        performanceMetrics: {
          ballsBowled: 0,
          ballsBatted: 70,
          accuracy: "88%",
          speed: "N/A",
          technique: "Excellent",
        },
      },
    ],
    inductionBookings: [
      {
        inductionId: "IND004",
        bookedDate: "2023-10-28",
        scheduledDate: "2023-11-01",
        scheduledTime: "16:00",
        status: "Completed",
        inductionType: "Intermediate",
        duration: "1.5 hours",
        coachAssigned: "Coach Anil Kumble",
        laneAssigned: "Lane D-1",
        equipmentProvided: [
          "Bat",
          "Helmet",
          "Pads",
          "Gloves",
          "Protective Gear",
        ],
        safetyBriefing: true,
        facilityTour: true,
        rulesAndRegulations: true,
        emergencyProcedures: true,
        membershipOptions: ["Premium", "Standard", "Night Owl"],
        notes: "Intermediate player with some cricket background",
        completedDate: "2023-11-01",
        completedTime: "17:30",
        feedback: {
          rating: 4,
          comments: "Good session, learned about spin bowling techniques.",
          wouldRecommend: true,
        },
      },
    ],
  },
  {
    id: 6,
    name: "Diana Prince",
    email: "diana.prince@example.com",
    phone: "+1 (555) 678-9012",
    status: "Inactive",
    joinDate: "2023-12-03",
    membership: "Standard",
    center: "Houston, USA",
    relationshipType: "Subscription",
    billingInfo: {
      billingPeriod: "Weekly",
      nextBillingCycle: "2024-04-07",
      amount: 35,
      currency: "USD",
      paymentMethod: "Credit Card",
      lastPaymentDate: "2024-03-31",
      lastPaymentAmount: 35,
      autoRenewal: false,
      paymentStatus: "Failed",
      dueDate: "2024-04-07",
      taxAmount: 2.98,
      totalAmount: 37.98,
      billingAddress: {
        street: "777 Wonder Woman Way",
        city: "Houston",
        state: "Texas",
        zipCode: "77002",
        country: "USA",
      },
      invoiceNumber: "INV-2024-006",
      subscriptionStartDate: "2023-12-03",
      subscriptionEndDate: "2024-04-07",
      planName: "Standard Weekly",
      planFeatures: [
        "Up to 3 Bookings per week",
        "Standard Support",
        "Basic Equipment Access",
      ],
      cancellationPolicy: "Cancel anytime",
      refundPolicy: "No refunds for partial weeks",
    },
  },
  {
    id: 7,
    name: "Ethan Hunt",
    email: "ethan.hunt@example.com",
    phone: "+1 (555) 789-0123",
    status: "Active",
    joinDate: "2023-12-05",
    membership: "Night Owl",
    center: "Melbourne, AUS",
    relationshipType: "Subscription",
    billingInfo: {
      billingPeriod: "Monthly",
      nextBillingCycle: "2024-04-05",
      amount: 200,
      currency: "AUD",
      paymentMethod: "Credit Card",
      lastPaymentDate: "2024-03-05",
      lastPaymentAmount: 200,
      autoRenewal: true,
      paymentStatus: "Paid",
      dueDate: "2024-04-05",
      taxAmount: 20,
      totalAmount: 220,
      billingAddress: {
        street: "888 Mission Impossible Drive",
        city: "Melbourne",
        state: "Victoria",
        zipCode: "3001",
        country: "Australia",
      },
      invoiceNumber: "INV-2024-007",
      subscriptionStartDate: "2023-12-05",
      planName: "Night Owl Monthly",
      planFeatures: [
        "Late Night Access (8 PM - 2 AM)",
        "Up to 20 Bookings per month",
        "Night Coach Availability",
        "Reduced Rates for Off-Peak Hours",
        "Priority Night Booking",
      ],
      cancellationPolicy: "30-day notice required",
      refundPolicy: "Pro-rated refund for unused period",
    },
  },
  {
    id: 8,
    name: "Fiona Gallagher",
    email: "fiona.gallagher@example.com",
    phone: "+1 (555) 890-1234",
    status: "Active",
    joinDate: "2023-12-07",
    membership: "Family",
    center: "Brisbane, AUS",
    relationshipType: "Subscription",
    billingInfo: {
      billingPeriod: "Monthly",
      nextBillingCycle: "2024-04-07",
      amount: 180,
      currency: "AUD",
      paymentMethod: "Debit Card",
      lastPaymentDate: "2024-03-07",
      lastPaymentAmount: 180,
      autoRenewal: true,
      paymentStatus: "Paid",
      dueDate: "2024-04-07",
      discountApplied: 18,
      taxAmount: 16.2,
      totalAmount: 178.2,
      billingAddress: {
        street: "999 Shameless Street",
        city: "Brisbane",
        state: "Queensland",
        zipCode: "4001",
        country: "Australia",
      },
      invoiceNumber: "INV-2024-008",
      subscriptionStartDate: "2023-12-07",
      planName: "Family Monthly",
      planFeatures: [
        "Up to 4 Family Members",
        "Unlimited Bookings for Family",
        "Family Coach Sessions",
        "Group Discounts",
        "Family Locker Access",
        "Child-Friendly Equipment",
      ],
      cancellationPolicy: "30-day notice required",
      refundPolicy: "Pro-rated refund for unused period",
    },
  },
  {
    id: 9,
    name: "George Martin",
    email: "george.martin@example.com",
    phone: "+1 (555) 901-2345",
    status: "Inactive",
    joinDate: "2023-12-09",
    membership: "Premium",
    center: "Bangalore",
    relationshipType: "Subscription",
    billingInfo: {
      billingPeriod: "Quarterly",
      nextBillingCycle: "2024-06-09",
      amount: 4000,
      currency: "INR",
      paymentMethod: "Bank Transfer",
      lastPaymentDate: "2024-01-09",
      lastPaymentAmount: 4000,
      autoRenewal: false,
      paymentStatus: "Pending",
      dueDate: "2024-04-09",
      taxAmount: 720,
      totalAmount: 4720,
      billingAddress: {
        street: "111 Game of Thrones Road",
        city: "Bangalore",
        state: "Karnataka",
        zipCode: "560003",
        country: "India",
      },
      invoiceNumber: "INV-2024-009",
      subscriptionStartDate: "2023-12-09",
      subscriptionEndDate: "2024-04-09",
      planName: "Premium Quarterly",
      planFeatures: [
        "Unlimited Bookings",
        "Priority Support",
        "Video Analysis",
        "Personal Coach Sessions",
        "Equipment Rental",
        "Locker Access",
        "Guest Passes (3 per quarter)",
      ],
      cancellationPolicy: "30-day notice required for cancellation",
      refundPolicy: "Pro-rated refund for unused period",
    },
  },
  {
    id: 10,
    name: "Hannah Lee",
    email: "hannah.lee@example.com",
    phone: "+1 (555) 012-3456",
    status: "Active",
    joinDate: "2024-01-11",
    membership: "Standard",
    center: "Houston, USA",
    relationshipType: "Subscription",
    billingInfo: {
      billingPeriod: "Fortnightly",
      nextBillingCycle: "2024-04-15",
      amount: 75,
      currency: "USD",
      paymentMethod: "Digital Wallet",
      lastPaymentDate: "2024-04-01",
      lastPaymentAmount: 75,
      autoRenewal: true,
      paymentStatus: "Paid",
      dueDate: "2024-04-15",
      taxAmount: 6.38,
      totalAmount: 81.38,
      billingAddress: {
        street: "222 Hannah Street",
        city: "Houston",
        state: "Texas",
        zipCode: "77003",
        country: "USA",
      },
      invoiceNumber: "INV-2024-010",
      subscriptionStartDate: "2024-01-11",
      planName: "Standard Fortnightly",
      planFeatures: [
        "Up to 5 Bookings per fortnight",
        "Standard Support",
        "Basic Equipment Access",
        "Locker Access",
      ],
      cancellationPolicy: "Cancel anytime",
      refundPolicy: "No refunds for partial periods",
    },
  },
  {
    id: 11,
    name: "Ian Wright",
    email: "ian.wright@example.com",
    phone: "+1 (555) 123-4568",
    status: "Active",
    joinDate: "2024-01-13",
    membership: "Night Owl",
    center: "Melbourne, AUS",
    relationshipType: "Subscription",
  },
  {
    id: 12,
    name: "Julia Roberts",
    email: "julia.roberts@example.com",
    phone: "+1 (555) 234-5679",
    status: "Inactive",
    joinDate: "2024-01-15",
    membership: "Family",
    center: "Brisbane, AUS",
    relationshipType: "Subscription",
  },
  {
    id: 13,
    name: "Kevin Durant",
    email: "kevin.durant@example.com",
    phone: "+1 (555) 345-6780",
    status: "Active",
    joinDate: "2024-01-17",
    membership: "Premium",
    center: "Bangalore",
    relationshipType: "Subscription",
    billingInfo: {
      billingPeriod: "Annual",
      nextBillingCycle: "2025-01-17",
      amount: 15000,
      currency: "INR",
      paymentMethod: "Credit Card",
      lastPaymentDate: "2024-01-17",
      lastPaymentAmount: 15000,
      autoRenewal: true,
      paymentStatus: "Paid",
      dueDate: "2025-01-17",
      discountApplied: 1500,
      taxAmount: 2700,
      totalAmount: 16200,
      billingAddress: {
        street: "333 Basketball Court",
        city: "Bangalore",
        state: "Karnataka",
        zipCode: "560004",
        country: "India",
      },
      invoiceNumber: "INV-2024-011",
      subscriptionStartDate: "2024-01-17",
      planName: "Premium Annual Pro",
      planFeatures: [
        "Unlimited Bookings",
        "Priority Support",
        "Video Analysis",
        "Personal Coach Sessions",
        "Equipment Rental",
        "Locker Access",
        "Guest Passes (5 per month)",
        "Performance Analytics",
        "Nutrition Consultation",
      ],
      cancellationPolicy: "30-day notice required for cancellation",
      refundPolicy: "Pro-rated refund for unused period",
    },
    completedBookings: [
      {
        bookingId: "BK006",
        date: "2024-02-08",
        entryTime: "08:00",
        exitTime: "10:30",
        laneBooked: "Lane F-1",
        laneDetails: {
          laneNumber: "F-1",
          laneType: "Fast Bowling",
          duration: "2.5 hours",
          coachAssigned: "Coach Brett Lee",
        },
        ballDetails: {
          ballType: "Red Ball",
          ballCount: 7,
          ballSpeed: "140-160 km/h",
          ballCondition: "New",
        },
        memberDetails: {
          membersAccompanying: 0,
          ageGroup: "26-35",
          experienceLevel: "Professional",
        },
        camDetails: {
          camInstalled: true,
          camLocation: "Lane F-1 Camera 1",
          recordingDuration: "2.5 hours",
          highlightsGenerated: true,
        },
        sessionNotes:
          "Professional fast bowling session with focus on pace and swing",
        performanceMetrics: {
          ballsBowled: 65,
          ballsBatted: 0,
          accuracy: "88%",
          speed: "150 km/h average",
          technique: "Excellent",
        },
      },
      {
        bookingId: "BK007",
        date: "2024-02-20",
        entryTime: "15:00",
        exitTime: "17:30",
        laneBooked: "Lane G-2",
        laneDetails: {
          laneNumber: "G-2",
          laneType: "All-Round",
          duration: "2.5 hours",
          coachAssigned: "Coach Jacques Kallis",
        },
        ballDetails: {
          ballType: "White Ball",
          ballCount: 6,
          ballSpeed: "125-145 km/h",
          ballCondition: "Good",
        },
        memberDetails: {
          membersAccompanying: 1,
          memberNames: ["Russell Westbrook"],
          ageGroup: "26-35",
          experienceLevel: "Professional",
        },
        camDetails: {
          camInstalled: true,
          camLocation: "Lane G-2 Camera 2",
          recordingDuration: "2.5 hours",
          highlightsGenerated: true,
        },
        sessionNotes:
          "Comprehensive all-round practice covering batting and bowling",
        performanceMetrics: {
          ballsBowled: 50,
          ballsBatted: 45,
          accuracy: "85%",
          speed: "135 km/h average",
          technique: "Excellent",
        },
      },
      {
        bookingId: "BK008",
        date: "2024-03-02",
        entryTime: "12:00",
        exitTime: "14:00",
        laneBooked: "Lane H-3",
        laneDetails: {
          laneNumber: "H-3",
          laneType: "Spin Bowling",
          duration: "2 hours",
          coachAssigned: "Coach Shane Warne",
        },
        ballDetails: {
          ballType: "Practice Ball",
          ballCount: 4,
          ballSpeed: "85-105 km/h",
          ballCondition: "Practice",
        },
        memberDetails: {
          membersAccompanying: 0,
          ageGroup: "26-35",
          experienceLevel: "Professional",
        },
        camDetails: {
          camInstalled: true,
          camLocation: "Lane H-3 Camera 1",
          recordingDuration: "2 hours",
          highlightsGenerated: true,
        },
        sessionNotes: "Spin bowling practice with focus on googly and flipper",
        performanceMetrics: {
          ballsBowled: 40,
          ballsBatted: 0,
          accuracy: "80%",
          speed: "95 km/h average",
          technique: "Good",
        },
      },
    ],
    inductionBookings: [
      {
        inductionId: "IND005",
        bookedDate: "2024-01-10",
        scheduledDate: "2024-01-17",
        scheduledTime: "09:00",
        status: "Completed",
        inductionType: "Professional",
        duration: "2 hours",
        coachAssigned: "Coach Brett Lee",
        laneAssigned: "Lane F-1",
        equipmentProvided: [
          "Bat",
          "Helmet",
          "Pads",
          "Gloves",
          "Protective Gear",
          "Professional Equipment",
        ],
        safetyBriefing: true,
        facilityTour: true,
        rulesAndRegulations: true,
        emergencyProcedures: true,
        membershipOptions: ["Premium", "Standard", "Night Owl"],
        notes:
          "Professional athlete with basketball background, interested in cricket",
        completedDate: "2024-01-17",
        completedTime: "11:00",
        feedback: {
          rating: 5,
          comments:
            "Outstanding induction! Coach Brett was amazing and the facilities are world-class.",
          wouldRecommend: true,
        },
      },
      {
        inductionId: "IND006",
        bookedDate: "2024-04-01",
        scheduledDate: "2024-04-15",
        scheduledTime: "14:00",
        status: "Scheduled",
        inductionType: "Advanced",
        duration: "1.5 hours",
        coachAssigned: "Coach Jacques Kallis",
        laneAssigned: "Lane G-2",
        equipmentProvided: [
          "Bat",
          "Helmet",
          "Pads",
          "Gloves",
          "Protective Gear",
        ],
        safetyBriefing: true,
        facilityTour: false,
        rulesAndRegulations: false,
        emergencyProcedures: true,
        membershipOptions: ["Premium", "Standard"],
        notes: "Follow-up induction for advanced techniques",
      },
    ],
  },
  {
    id: 14,
    name: "Laura Palmer",
    email: "laura.palmer@example.com",
    phone: "+1 (555) 456-7891",
    status: "Active",
    joinDate: "2024-01-19",
    membership: "Standard",
    center: "Houston, USA",
    relationshipType: "Subscription",
  },
  {
    id: 15,
    name: "Mike Ross",
    email: "mike.ross@example.com",
    phone: "+1 (555) 567-8902",
    status: "Inactive",
    joinDate: "2024-01-21",
    membership: "Night Owl",
    center: "Melbourne, AUS",
    relationshipType: "Subscription",
  },
  {
    id: 16,
    name: "Nina Simone",
    email: "nina.simone@example.com",
    phone: "+1 (555) 678-9013",
    status: "Active",
    joinDate: "2024-01-23",
    membership: "Family",
    center: "Brisbane, AUS",
    relationshipType: "Subscription",
  },
  {
    id: 17,
    name: "Oscar Wilde",
    email: "oscar.wilde@example.com",
    phone: "+1 (555) 789-0124",
    status: "Active",
    joinDate: "2024-01-25",
    membership: "Premium",
    center: "Bangalore",
    relationshipType: "Subscription",
    completedBookings: [
      {
        bookingId: "BK009",
        date: "2024-02-12",
        entryTime: "17:00",
        exitTime: "19:30",
        laneBooked: "Lane I-1",
        laneDetails: {
          laneNumber: "I-1",
          laneType: "Batting Practice",
          duration: "2.5 hours",
          coachAssigned: "Coach Ricky Ponting",
        },
        ballDetails: {
          ballType: "Red Ball",
          ballCount: 9,
          ballSpeed: "130-150 km/h",
          ballCondition: "New",
        },
        memberDetails: {
          membersAccompanying: 0,
          ageGroup: "36-50",
          experienceLevel: "Advanced",
        },
        camDetails: {
          camInstalled: true,
          camLocation: "Lane I-1 Camera 1",
          recordingDuration: "2.5 hours",
          highlightsGenerated: true,
        },
        sessionNotes:
          "Batting practice focusing on defensive techniques and shot selection",
        performanceMetrics: {
          ballsBowled: 0,
          ballsBatted: 85,
          accuracy: "92%",
          speed: "N/A",
          technique: "Excellent",
        },
      },
      {
        bookingId: "BK010",
        date: "2024-02-28",
        entryTime: "09:30",
        exitTime: "12:00",
        laneBooked: "Lane J-2",
        laneDetails: {
          laneNumber: "J-2",
          laneType: "All-Round",
          duration: "2.5 hours",
          coachAssigned: "Coach Rahul Dravid",
        },
        ballDetails: {
          ballType: "White Ball",
          ballCount: 7,
          ballSpeed: "115-135 km/h",
          ballCondition: "Good",
        },
        memberDetails: {
          membersAccompanying: 2,
          memberNames: ["Lord Alfred Douglas", "Bosie"],
          ageGroup: "36-50",
          experienceLevel: "Advanced",
        },
        camDetails: {
          camInstalled: true,
          camLocation: "Lane J-2 Camera 2",
          recordingDuration: "2.5 hours",
          highlightsGenerated: true,
        },
        sessionNotes:
          "Comprehensive cricket session with friends focusing on all aspects",
        performanceMetrics: {
          ballsBowled: 55,
          ballsBatted: 50,
          accuracy: "87%",
          speed: "125 km/h average",
          technique: "Good",
        },
      },
    ],
  },
  {
    id: 18,
    name: "Paula Abdul",
    email: "paula.abdul@example.com",
    phone: "+1 (555) 890-1235",
    status: "Inactive",
    joinDate: "2024-01-27",
    membership: "Standard",
    center: "Houston, USA",
    relationshipType: "Subscription",
  },
  {
    id: 19,
    name: "Quentin Blake",
    email: "quentin.blake@example.com",
    phone: "+1 (555) 901-2346",
    status: "Active",
    joinDate: "2024-02-01",
    membership: "Night Owl",
    center: "Melbourne, AUS",
    relationshipType: "Subscription",
  },
  {
    id: 20,
    name: "Rachel Green",
    email: "rachel.green@example.com",
    phone: "+1 (555) 012-3457",
    status: "Active",
    joinDate: "2024-02-03",
    membership: "Family",
    center: "Brisbane, AUS",
    relationshipType: "Subscription",
  },
  {
    id: 21,
    name: "Steve Rogers",
    email: "steve.rogers@example.com",
    phone: "+1 (555) 123-4569",
    status: "Inactive",
    joinDate: "2024-02-05",
    membership: "Premium",
    center: "Bangalore",
    relationshipType: "Subscription",
  },
  {
    id: 22,
    name: "Tina Fey",
    email: "tina.fey@example.com",
    phone: "+1 (555) 234-5680",
    status: "Active",
    joinDate: "2024-02-07",
    membership: "Standard",
    center: "Houston, USA",
    relationshipType: "Subscription",
  },
  {
    id: 23,
    name: "Uma Thurman",
    email: "uma.thurman@example.com",
    phone: "+1 (555) 345-6781",
    status: "Active",
    joinDate: "2024-02-09",
    membership: "Night Owl",
    center: "Melbourne, AUS",
    relationshipType: "Subscription",
  },
  {
    id: 24,
    name: "Victor Hugo",
    email: "victor.hugo@example.com",
    phone: "+1 (555) 456-7892",
    status: "Inactive",
    joinDate: "2024-02-11",
    membership: "Family",
    center: "Brisbane, AUS",
    relationshipType: "Subscription",
  },
  {
    id: 25,
    name: "Wendy Darling",
    email: "wendy.darling@example.com",
    phone: "+1 (555) 567-8903",
    status: "Active",
    joinDate: "2024-02-13",
    membership: "Tour Only",
    center: "Bangalore",
    relationshipType: "Booked Tour",
    tourDate: "2024-03-15",
    tourDetails: {
      entryTime: "14:00",
      laneBooked: "Lane A-3",
      laneDetails: {
        laneNumber: "A-3",
        laneType: "Fast Bowling",
        duration: "2 hours",
        coachAssigned: "Coach Rahul Sharma",
      },
      ballDetails: {
        ballType: "Red Ball",
        ballCount: 6,
        ballSpeed: "120-140 km/h",
        ballCondition: "Good",
      },
      memberDetails: {
        membersAccompanying: 2,
        memberNames: ["Peter Pan", "Tinker Bell"],
        ageGroup: "16-25",
        experienceLevel: "Intermediate",
      },
      camDetails: {
        camInstalled: true,
        camLocation: "Lane A-3 Camera 1",
        recordingDuration: "2 hours",
        highlightsGenerated: false,
      },
      sessionNotes:
        "Fast bowling practice session with focus on line and length",
    },
  },
  {
    id: 26,
    name: "Xavier Woods",
    email: "xavier.woods@example.com",
    phone: "+1 (555) 678-9014",
    status: "Active",
    joinDate: "2024-02-15",
    membership: "Prospect",
    center: "Houston, USA",
    relationshipType: "Prospect",
    completedTourDate: "2024-01-28",
    tourDetails: {
      entryTime: "10:30",
      exitTime: "12:45",
      laneBooked: "Lane B-2",
      laneDetails: {
        laneNumber: "B-2",
        laneType: "All-Round",
        duration: "2.5 hours",
        coachAssigned: "Coach Mike Johnson",
      },
      ballDetails: {
        ballType: "White Ball",
        ballCount: 8,
        ballSpeed: "110-130 km/h",
        ballCondition: "Good",
      },
      memberDetails: {
        membersAccompanying: 1,
        memberNames: ["Kofi Kingston"],
        ageGroup: "26-35",
        experienceLevel: "Advanced",
      },
      camDetails: {
        camInstalled: true,
        camLocation: "Lane B-2 Camera 2",
        recordingDuration: "2.5 hours",
        highlightsGenerated: true,
      },
      sessionNotes:
        "Comprehensive all-round practice session with batting and bowling",
      performanceMetrics: {
        ballsBowled: 48,
        ballsBatted: 36,
        accuracy: "78%",
        speed: "125 km/h average",
        technique: "Good",
      },
    },
  },
  {
    id: 27,
    name: "Yara Greyjoy",
    email: "yara.greyjoy@example.com",
    phone: "+1 (555) 789-0125",
    status: "Active",
    joinDate: "2024-02-17",
    membership: "Premium",
    center: "Melbourne, AUS",
    relationshipType: "Subscription",
  },
  {
    id: 28,
    name: "Zara Phillips",
    email: "zara.phillips@example.com",
    phone: "+1 (555) 890-1236",
    status: "Active",
    joinDate: "2024-02-19",
    membership: "Prospect",
    center: "Brisbane, AUS",
    relationshipType: "Booked Tour",
    tourDate: "2024-03-20",
    tourDetails: {
      entryTime: "16:00",
      laneBooked: "Lane C-1",
      laneDetails: {
        laneNumber: "C-1",
        laneType: "Spin Bowling",
        duration: "1.5 hours",
        coachAssigned: "Coach Shane Warne",
      },
      ballDetails: {
        ballType: "Practice Ball",
        ballCount: 4,
        ballSpeed: "80-100 km/h",
        ballCondition: "Practice",
      },
      memberDetails: {
        membersAccompanying: 0,
        ageGroup: "26-35",
        experienceLevel: "Beginner",
      },
      camDetails: {
        camInstalled: true,
        camLocation: "Lane C-1 Camera 1",
        recordingDuration: "1.5 hours",
        highlightsGenerated: false,
      },
      sessionNotes: "Spin bowling introduction session for beginners",
    },
  },
  {
    id: 29,
    name: "Adam Levine",
    email: "adam.levine@example.com",
    phone: "+1 (555) 901-2347",
    status: "Inactive",
    joinDate: "2024-02-21",
    membership: "Prospect",
    center: "Bangalore",
    relationshipType: "Prospect",
    completedTourDate: "2024-01-10",
    tourDetails: {
      entryTime: "09:00",
      exitTime: "11:30",
      laneBooked: "Lane A-1",
      laneDetails: {
        laneNumber: "A-1",
        laneType: "Batting Practice",
        duration: "2.5 hours",
        coachAssigned: "Coach Virat Kohli",
      },
      ballDetails: {
        ballType: "Red Ball",
        ballCount: 10,
        ballSpeed: "130-150 km/h",
        ballCondition: "New",
      },
      memberDetails: {
        membersAccompanying: 3,
        memberNames: ["Blake Shelton", "Gwen Stefani", "Kelly Clarkson"],
        ageGroup: "36-50",
        experienceLevel: "Professional",
      },
      camDetails: {
        camInstalled: true,
        camLocation: "Lane A-1 Camera 3",
        recordingDuration: "2.5 hours",
        highlightsGenerated: true,
      },
      sessionNotes:
        "Professional batting practice with focus on technique and timing",
      performanceMetrics: {
        ballsBowled: 0,
        ballsBatted: 72,
        accuracy: "92%",
        speed: "N/A",
        technique: "Excellent",
      },
    },
  },
  {
    id: 30,
    name: "Bella Swan",
    email: "bella.swan@example.com",
    phone: "+1 (555) 012-3458",
    status: "Active",
    joinDate: "2024-02-23",
    membership: "Standard",
    center: "Houston, USA",
    relationshipType: "Subscription",
  },
  {
    id: 31,
    name: "Carlos Santana",
    email: "carlos.santana@example.com",
    phone: "+1 (555) 123-4570",
    status: "Active",
    joinDate: "2024-02-25",
    membership: "Prospect",
    center: "Melbourne, AUS",
    relationshipType: "Booked Tour",
    tourDate: "2024-03-25",
    tourDetails: {
      entryTime: "13:30",
      laneBooked: "Lane D-2",
      laneDetails: {
        laneNumber: "D-2",
        laneType: "Fast Bowling",
        duration: "2 hours",
        coachAssigned: "Coach Glenn McGrath",
      },
      ballDetails: {
        ballType: "White Ball",
        ballCount: 6,
        ballSpeed: "140-160 km/h",
        ballCondition: "Good",
      },
      memberDetails: {
        membersAccompanying: 1,
        memberNames: ["Rob Thomas"],
        ageGroup: "50+",
        experienceLevel: "Intermediate",
      },
      camDetails: {
        camInstalled: true,
        camLocation: "Lane D-2 Camera 2",
        recordingDuration: "2 hours",
        highlightsGenerated: false,
      },
      sessionNotes:
        "Fast bowling practice with focus on swing and seam movement",
    },
  },
  {
    id: 32,
    name: "Diana Ross",
    email: "diana.ross@example.com",
    phone: "+1 (555) 234-5681",
    status: "Active",
    joinDate: "2024-02-27",
    membership: "Night Owl",
    center: "Brisbane, AUS",
    relationshipType: "Subscription",
  },
  {
    id: 33,
    name: "Eddie Vedder",
    email: "eddie.vedder@example.com",
    phone: "+1 (555) 345-6792",
    status: "Inactive",
    joinDate: "2024-02-29",
    membership: "Prospect",
    center: "Bangalore",
    relationshipType: "Prospect",
    completedTourDate: "2024-01-12",
    tourDetails: {
      entryTime: "15:00",
      exitTime: "17:15",
      laneBooked: "Lane B-3",
      laneDetails: {
        laneNumber: "B-3",
        laneType: "Spin Bowling",
        duration: "2.25 hours",
        coachAssigned: "Coach Anil Kumble",
      },
      ballDetails: {
        ballType: "Practice Ball",
        ballCount: 5,
        ballSpeed: "90-110 km/h",
        ballCondition: "Practice",
      },
      memberDetails: {
        membersAccompanying: 0,
        ageGroup: "36-50",
        experienceLevel: "Beginner",
      },
      camDetails: {
        camInstalled: true,
        camLocation: "Lane B-3 Camera 1",
        recordingDuration: "2.25 hours",
        highlightsGenerated: true,
      },
      sessionNotes: "Spin bowling basics and leg spin techniques",
      performanceMetrics: {
        ballsBowled: 36,
        ballsBatted: 0,
        accuracy: "65%",
        speed: "100 km/h average",
        technique: "Needs Improvement",
      },
    },
  },
  {
    id: 34,
    name: "Fiona Apple",
    email: "fiona.apple@example.com",
    phone: "+1 (555) 456-7803",
    status: "Active",
    joinDate: "2024-03-01",
    membership: "Tour Only",
    center: "Houston, USA",
    relationshipType: "Booked Tour",
    tourDate: "2024-04-01",
    tourDetails: {
      entryTime: "11:00",
      laneBooked: "Lane E-1",
      laneDetails: {
        laneNumber: "E-1",
        laneType: "Batting Practice",
        duration: "1.5 hours",
        coachAssigned: "Coach Sachin Tendulkar",
      },
      ballDetails: {
        ballType: "Pink Ball",
        ballCount: 4,
        ballSpeed: "100-120 km/h",
        ballCondition: "New",
      },
      memberDetails: {
        membersAccompanying: 2,
        memberNames: ["Alanis Morissette", "Tori Amos"],
        ageGroup: "26-35",
        experienceLevel: "Intermediate",
      },
      camDetails: {
        camInstalled: true,
        camLocation: "Lane E-1 Camera 1",
        recordingDuration: "1.5 hours",
        highlightsGenerated: false,
      },
      sessionNotes: "Day-night batting practice with pink ball",
    },
  },
  {
    id: 35,
    name: "George Clooney",
    email: "george.clooney@example.com",
    phone: "+1 (555) 567-8914",
    status: "Active",
    joinDate: "2024-03-03",
    membership: "Premium",
    center: "Melbourne, AUS",
    relationshipType: "Subscription",
  },
  {
    id: 36,
    name: "Helen Mirren",
    email: "helen.mirren@example.com",
    phone: "+1 (555) 678-9025",
    status: "Active",
    joinDate: "2024-03-05",
    membership: "Family",
    center: "Brisbane, AUS",
    relationshipType: "Subscription",
  },
  {
    id: 37,
    name: "Ian McKellen",
    email: "ian.mckellen@example.com",
    phone: "+1 (555) 789-0136",
    status: "Inactive",
    joinDate: "2024-03-07",
    membership: "Prospect",
    center: "Bangalore",
    relationshipType: "Prospect",
    completedTourDate: "2024-01-15",
    tourDetails: {
      entryTime: "08:30",
      exitTime: "10:45",
      laneBooked: "Lane A-2",
      laneDetails: {
        laneNumber: "A-2",
        laneType: "All-Round",
        duration: "2.25 hours",
        coachAssigned: "Coach Rahul Dravid",
      },
      ballDetails: {
        ballType: "Red Ball",
        ballCount: 7,
        ballSpeed: "115-135 km/h",
        ballCondition: "Good",
      },
      memberDetails: {
        membersAccompanying: 1,
        memberNames: ["Patrick Stewart"],
        ageGroup: "50+",
        experienceLevel: "Advanced",
      },
      camDetails: {
        camInstalled: true,
        camLocation: "Lane A-2 Camera 2",
        recordingDuration: "2.25 hours",
        highlightsGenerated: true,
      },
      sessionNotes:
        "Comprehensive cricket session covering all aspects of the game",
      performanceMetrics: {
        ballsBowled: 42,
        ballsBatted: 38,
        accuracy: "82%",
        speed: "125 km/h average",
        technique: "Good",
      },
    },
  },
  {
    id: 38,
    name: "Jennifer Lawrence",
    email: "jennifer.lawrence@example.com",
    phone: "+1 (555) 890-1247",
    status: "Active",
    joinDate: "2024-03-09",
    membership: "Tour Only",
    center: "Houston, USA",
    relationshipType: "Booked Tour",
    tourDate: "2024-04-05",
    tourDetails: {
      entryTime: "17:00",
      laneBooked: "Lane F-3",
      laneDetails: {
        laneNumber: "F-3",
        laneType: "Spin Bowling",
        duration: "1 hour",
        coachAssigned: "Coach Muttiah Muralitharan",
      },
      ballDetails: {
        ballType: "Practice Ball",
        ballCount: 3,
        ballSpeed: "70-90 km/h",
        ballCondition: "Practice",
      },
      memberDetails: {
        membersAccompanying: 0,
        ageGroup: "16-25",
        experienceLevel: "Beginner",
      },
      camDetails: {
        camInstalled: true,
        camLocation: "Lane F-3 Camera 1",
        recordingDuration: "1 hour",
        highlightsGenerated: false,
      },
      sessionNotes: "Basic spin bowling introduction for complete beginners",
    },
  },
  {
    id: 39,
    name: "Keanu Reeves",
    email: "keanu.reeves@example.com",
    phone: "+1 (555) 901-2358",
    status: "Active",
    joinDate: "2024-03-11",
    membership: "Standard",
    center: "Melbourne, AUS",
    relationshipType: "Subscription",
  },
  {
    id: 40,
    name: "Lady Gaga",
    email: "lady.gaga@example.com",
    phone: "+1 (555) 012-3469",
    status: "Active",
    joinDate: "2024-03-13",
    membership: "Premium",
    center: "Brisbane, AUS",
    relationshipType: "Subscription",
  },
  {
    id: 41,
    name: "Morgan Freeman",
    email: "morgan.freeman@example.com",
    phone: "+1 (555) 123-4580",
    status: "Active",
    joinDate: "2024-03-15",
    membership: "Tour Only",
    center: "Bangalore",
    relationshipType: "Booked Tour",
    tourDate: "2024-04-10",
    tourDetails: {
      entryTime: "14:30",
      laneBooked: "Lane G-1",
      laneDetails: {
        laneNumber: "G-1",
        laneType: "Fast Bowling",
        duration: "2 hours",
        coachAssigned: "Coach Brett Lee",
      },
      ballDetails: {
        ballType: "White Ball",
        ballCount: 6,
        ballSpeed: "145-165 km/h",
        ballCondition: "New",
      },
      memberDetails: {
        membersAccompanying: 2,
        memberNames: ["Tim Robbins", "Andy Dufresne"],
        ageGroup: "50+",
        experienceLevel: "Professional",
      },
      camDetails: {
        camInstalled: true,
        camLocation: "Lane G-1 Camera 3",
        recordingDuration: "2 hours",
        highlightsGenerated: false,
      },
      sessionNotes:
        "Professional fast bowling session with focus on pace and accuracy",
    },
  },
  {
    id: 42,
    name: "Natalie Portman",
    email: "natalie.portman@example.com",
    phone: "+1 (555) 234-5691",
    status: "Inactive",
    joinDate: "2024-03-17",
    membership: "Prospect",
    center: "Houston, USA",
    relationshipType: "Prospect",
    completedTourDate: "2024-01-20",
    tourDetails: {
      entryTime: "12:00",
      exitTime: "14:30",
      laneBooked: "Lane H-2",
      laneDetails: {
        laneNumber: "H-2",
        laneType: "Batting Practice",
        duration: "2.5 hours",
        coachAssigned: "Coach Brian Lara",
      },
      ballDetails: {
        ballType: "Red Ball",
        ballCount: 8,
        ballSpeed: "125-145 km/h",
        ballCondition: "Good",
      },
      memberDetails: {
        membersAccompanying: 1,
        memberNames: ["Mila Kunis"],
        ageGroup: "26-35",
        experienceLevel: "Intermediate",
      },
      camDetails: {
        camInstalled: true,
        camLocation: "Lane H-2 Camera 2",
        recordingDuration: "2.5 hours",
        highlightsGenerated: true,
      },
      sessionNotes:
        "Batting practice focusing on defensive techniques and shot selection",
      performanceMetrics: {
        ballsBowled: 0,
        ballsBatted: 60,
        accuracy: "88%",
        speed: "N/A",
        technique: "Good",
      },
    },
  },
  {
    id: 43,
    name: "Oprah Winfrey",
    email: "oprah.winfrey@example.com",
    phone: "+1 (555) 345-6802",
    status: "Active",
    joinDate: "2024-03-19",
    membership: "Family",
    center: "Melbourne, AUS",
    relationshipType: "Subscription",
  },
  {
    id: 44,
    name: "Patrick Stewart",
    email: "patrick.stewart@example.com",
    phone: "+1 (555) 456-7913",
    status: "Active",
    joinDate: "2024-03-21",
    membership: "Night Owl",
    center: "Brisbane, AUS",
    relationshipType: "Subscription",
  },
  {
    id: 45,
    name: "Queen Latifah",
    email: "queen.latifah@example.com",
    phone: "+1 (555) 567-8024",
    status: "Active",
    joinDate: "2024-03-23",
    membership: "Tour Only",
    center: "Bangalore",
    relationshipType: "Booked Tour",
    tourDate: "2024-04-15",
    tourDetails: {
      entryTime: "16:30",
      laneBooked: "Lane I-1",
      laneDetails: {
        laneNumber: "I-1",
        laneType: "All-Round",
        duration: "2 hours",
        coachAssigned: "Coach Jacques Kallis",
      },
      ballDetails: {
        ballType: "White Ball",
        ballCount: 6,
        ballSpeed: "110-130 km/h",
        ballCondition: "Good",
      },
      memberDetails: {
        membersAccompanying: 1,
        memberNames: ["LL Cool J"],
        ageGroup: "36-50",
        experienceLevel: "Advanced",
      },
      camDetails: {
        camInstalled: true,
        camLocation: "Lane I-1 Camera 1",
        recordingDuration: "2 hours",
        highlightsGenerated: false,
      },
      sessionNotes:
        "All-round cricket practice covering both batting and bowling skills",
    },
  },
  {
    id: 46,
    name: "Robert Downey Jr.",
    email: "robert.downey@example.com",
    phone: "+1 (555) 678-9135",
    status: "Active",
    joinDate: "2024-03-25",
    membership: "Premium",
    center: "Houston, USA",
    relationshipType: "Subscription",
  },
  {
    id: 47,
    name: "Sandra Bullock",
    email: "sandra.bullock@example.com",
    phone: "+1 (555) 789-0246",
    status: "Inactive",
    joinDate: "2024-03-27",
    membership: "Prospect",
    center: "Melbourne, AUS",
    relationshipType: "Prospect",
    completedTourDate: "2024-01-25",
    tourDetails: {
      entryTime: "10:00",
      exitTime: "12:15",
      laneBooked: "Lane J-3",
      laneDetails: {
        laneNumber: "J-3",
        laneType: "Spin Bowling",
        duration: "2.25 hours",
        coachAssigned: "Coach Shane Warne",
      },
      ballDetails: {
        ballType: "Practice Ball",
        ballCount: 4,
        ballSpeed: "85-105 km/h",
        ballCondition: "Practice",
      },
      memberDetails: {
        membersAccompanying: 0,
        ageGroup: "36-50",
        experienceLevel: "Beginner",
      },
      camDetails: {
        camInstalled: true,
        camLocation: "Lane J-3 Camera 1",
        recordingDuration: "2.25 hours",
        highlightsGenerated: true,
      },
      sessionNotes: "Spin bowling basics with focus on leg spin and googly",
      performanceMetrics: {
        ballsBowled: 30,
        ballsBatted: 0,
        accuracy: "60%",
        speed: "95 km/h average",
        technique: "Needs Improvement",
      },
    },
  },
  {
    id: 48,
    name: "Tom Hanks",
    email: "tom.hanks@example.com",
    phone: "+1 (555) 890-1357",
    status: "Active",
    joinDate: "2024-03-29",
    membership: "Standard",
    center: "Brisbane, AUS",
    relationshipType: "Subscription",
  },
  {
    id: 49,
    name: "Uma Thurman",
    email: "uma.thurman2@example.com",
    phone: "+1 (555) 901-2468",
    status: "Active",
    joinDate: "2024-04-01",
    membership: "Tour Only",
    center: "Bangalore",
    relationshipType: "Booked Tour",
    tourDate: "2024-04-20",
    tourDetails: {
      entryTime: "13:00",
      laneBooked: "Lane K-2",
      laneDetails: {
        laneNumber: "K-2",
        laneType: "Fast Bowling",
        duration: "1.5 hours",
        coachAssigned: "Coach Wasim Akram",
      },
      ballDetails: {
        ballType: "White Ball",
        ballCount: 5,
        ballSpeed: "130-150 km/h",
        ballCondition: "New",
      },
      memberDetails: {
        membersAccompanying: 1,
        memberNames: ["John Travolta"],
        ageGroup: "36-50",
        experienceLevel: "Intermediate",
      },
      camDetails: {
        camInstalled: true,
        camLocation: "Lane K-2 Camera 2",
        recordingDuration: "1.5 hours",
        highlightsGenerated: false,
      },
      sessionNotes:
        "Fast bowling practice with focus on swing bowling techniques",
    },
  },
  {
    id: 50,
    name: "Viola Davis",
    email: "viola.davis@example.com",
    phone: "+1 (555) 012-3579",
    status: "Active",
    joinDate: "2024-04-03",
    membership: "Premium",
    center: "Houston, USA",
    relationshipType: "Subscription",
  },
];
