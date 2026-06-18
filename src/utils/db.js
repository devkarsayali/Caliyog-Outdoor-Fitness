// src/utils/db.js

const STORAGE_KEY = "caliyog_admin_data";

const defaultData = {
  events: [
    { img: "e1", title: "Outdoor Fitness Event" },
    { img: "e2", title: "Group Workout Session" },
    { img: "e3", title: "Fitness Challenge" },
    { img: "e4", title: "Community Training" },
    { img: "e5", title: "Club Celebration" },
    { img: "e6", title: "CaliYog Memories" },
    { img: "e7", title: "Fitness Community" },
    { img: "e8", title: "Team Motivation" },
  ],

  organisedEvents: [
    "CaliYog National Championship 2024",
    "CaliYog Hyrox Competition",
    "Small Treks × 3",
    "Calisthenics Community Meet-Up",
    "CaliYog Premier League Cricket × 2",
  ],

  experts: [
    {
      name: "Ketan Sankpal",
      role: "Founder of CaliYog Fitness Club",
      info: "K-11 Certified, Calisthenics Level-1 Trainer, 9+ years experience.",
    },
    {
      name: "Rohan Bagadi",
      role: "Calisthenics Athlete",
      info: "4 years teaching experience. D.Pharmacy.",
    },
  ],

  memberships: [
    {
      title: "Yearly Membership",
      price: "₹24,000",
      subtitle: "Best Value Plan",
      features: [
        "12 Months Full Access",
        "All Batches Included",
        "Fitness Guidance",
        "Strength & Cardio Training",
      ],
      featured: false,
    },
    {
      title: "Kids Yearly",
      price: "₹30,000",
      subtitle: "Special Kids Program",
      features: [
        "Kids Fitness Program",
        "Agility Drills",
        "Mind-Body Coordination",
        "Sports Specific Training",
      ],
      featured: true,
    },
  ],

  batches: [
    {
      icon: "🔥",
      title: "Weight Loss & Fitness",
      points: [
        "Fat loss training",
        "Cardio workouts",
        "Bodyweight exercises",
      ],
    },
    {
      icon: "💪",
      title: "Strength Training",
      points: [
        "Muscle building",
        "Strength improvement",
        "Personal guidance",
      ],
    },
  ],

  enquiries: [],

  joinRequests: [],

  members: [],

  batchMembers: [],
};

function getStorage() {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);

    if (!storedData) {
      saveStorage(defaultData);
      return defaultData;
    }

    const parsedData = JSON.parse(storedData);

    return {
      ...defaultData,
      ...parsedData,

      events: Array.isArray(parsedData.events)
        ? parsedData.events
        : defaultData.events,

      organisedEvents: Array.isArray(parsedData.organisedEvents)
        ? parsedData.organisedEvents
        : defaultData.organisedEvents,

      experts: Array.isArray(parsedData.experts)
        ? parsedData.experts
        : defaultData.experts,

      memberships: Array.isArray(parsedData.memberships)
        ? parsedData.memberships
        : defaultData.memberships,

      batches: Array.isArray(parsedData.batches)
        ? parsedData.batches
        : defaultData.batches,

      enquiries: Array.isArray(parsedData.enquiries)
        ? parsedData.enquiries
        : defaultData.enquiries,

      joinRequests: Array.isArray(parsedData.joinRequests)
        ? parsedData.joinRequests
        : defaultData.joinRequests,

      members: Array.isArray(parsedData.members)
        ? parsedData.members
        : defaultData.members,

      batchMembers: Array.isArray(parsedData.batchMembers)
        ? parsedData.batchMembers
        : defaultData.batchMembers,
    };
  } catch (error) {
    console.error("LocalStorage Error:", error);
    saveStorage(defaultData);
    return defaultData;
  }
}

function saveStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function emitUpdate() {
  window.dispatchEvent(new Event("caliyog_db_update"));
}

export const db = {
  getAllData() {
    return getStorage();
  },

  resetData() {
    saveStorage(defaultData);
    emitUpdate();
  },

  // EVENTS
  getEvents() {
    return getStorage().events;
  },

  addEvent(event) {
    const data = getStorage();
    data.events.push(event);
    saveStorage(data);
    emitUpdate();
  },

  updateEvent(index, event) {
    const data = getStorage();

    if (index >= 0 && index < data.events.length) {
      data.events[index] = event;
      saveStorage(data);
      emitUpdate();
    }
  },

  deleteEvent(index) {
    const data = getStorage();

    if (index >= 0 && index < data.events.length) {
      data.events.splice(index, 1);
      saveStorage(data);
      emitUpdate();
    }
  },

  // ORGANISED EVENTS
  getOrganisedEvents() {
    return getStorage().organisedEvents;
  },

  addOrganisedEvent(event) {
    const data = getStorage();
    data.organisedEvents.push(event);
    saveStorage(data);
    emitUpdate();
  },

  updateOrganisedEvent(index, event) {
    const data = getStorage();

    if (index >= 0 && index < data.organisedEvents.length) {
      data.organisedEvents[index] = event;
      saveStorage(data);
      emitUpdate();
    }
  },

  deleteOrganisedEvent(index) {
    const data = getStorage();

    if (index >= 0 && index < data.organisedEvents.length) {
      data.organisedEvents.splice(index, 1);
      saveStorage(data);
      emitUpdate();
    }
  },

  // EXPERTS
  getExperts() {
    return getStorage().experts;
  },

  addExpert(expert) {
    const data = getStorage();
    data.experts.push(expert);
    saveStorage(data);
    emitUpdate();
  },

  updateExpert(index, expert) {
    const data = getStorage();

    if (index >= 0 && index < data.experts.length) {
      data.experts[index] = expert;
      saveStorage(data);
      emitUpdate();
    }
  },

  deleteExpert(index) {
    const data = getStorage();

    if (index >= 0 && index < data.experts.length) {
      data.experts.splice(index, 1);
      saveStorage(data);
      emitUpdate();
    }
  },

  // MEMBERSHIPS
  getMemberships() {
    return getStorage().memberships;
  },

  addMembership(plan) {
    const data = getStorage();
    data.memberships.push(plan);
    saveStorage(data);
    emitUpdate();
  },

  updateMembership(index, plan) {
    const data = getStorage();

    if (index >= 0 && index < data.memberships.length) {
      data.memberships[index] = plan;
      saveStorage(data);
      emitUpdate();
    }
  },

  deleteMembership(index) {
    const data = getStorage();

    if (index >= 0 && index < data.memberships.length) {
      data.memberships.splice(index, 1);
      saveStorage(data);
      emitUpdate();
    }
  },

  // BATCHES
  getBatches() {
    return getStorage().batches;
  },

  addBatch(batch) {
    const data = getStorage();
    data.batches.push(batch);
    saveStorage(data);
    emitUpdate();
  },

  updateBatch(index, batch) {
    const data = getStorage();

    if (index >= 0 && index < data.batches.length) {
      data.batches[index] = batch;
      saveStorage(data);
      emitUpdate();
    }
  },

  deleteBatch(index) {
    const data = getStorage();

    if (index >= 0 && index < data.batches.length) {
      data.batches.splice(index, 1);
      saveStorage(data);
      emitUpdate();
    }
  },

  // ENQUIRIES
  getEnquiries() {
    return getStorage().enquiries;
  },

  addEnquiry(enquiry) {
    const data = getStorage();

    const newEnquiry = {
      id: Date.now(),
      name: enquiry.name,
      email: enquiry.email,
      phone: enquiry.phone,
      message: enquiry.message,
      status: "New",
      date: new Date().toISOString(),
    };

    data.enquiries.unshift(newEnquiry);

    saveStorage(data);
    emitUpdate();
  },

  updateEnquiryStatus(id, status) {
    const data = getStorage();

    data.enquiries = data.enquiries.map((enquiry) =>
      enquiry.id === id
        ? {
            ...enquiry,
            status,
          }
        : enquiry
    );

    saveStorage(data);
    emitUpdate();
  },

  deleteEnquiry(id) {
    const data = getStorage();

    data.enquiries = data.enquiries.filter(
      (enquiry) => enquiry.id !== id
    );

    saveStorage(data);
    emitUpdate();
  },

  // JOIN REQUESTS / REPORTS
  getJoinRequests() {
    return getStorage().joinRequests;
  },

  addJoinRequest(request) {
    const data = getStorage();

    const newRequest = {
      id: Date.now(),
      name: request.name,
      email: request.email,
      mobile: request.mobile,
      address: request.address,
      batch: request.batch,
      timingType: request.timingType,
      timing: request.timing,
      membership: request.membership,
      transactionType: request.transactionType,
      parentName: request.parentName || "",
      parentContact: request.parentContact || "",
      status: "New",
      memberAdded: false,
      batchAdded: false,
      date: new Date().toISOString(),
    };

    data.joinRequests.unshift(newRequest);

    saveStorage(data);
    emitUpdate();
  },

  updateJoinRequestStatus(id, status) {
    const data = getStorage();

    data.joinRequests = data.joinRequests.map((request) =>
      request.id === id
        ? {
            ...request,
            status,
          }
        : request
    );

    saveStorage(data);
    emitUpdate();
  },

  addMemberFromRequest(id) {
    const data = getStorage();

    const request = data.joinRequests.find(
      (item) => item.id === id
    );

    if (!request) return;

    const alreadyAdded = data.members.some(
      (member) => member.requestId === id
    );

    if (alreadyAdded) return;

    const newMember = {
      id: Date.now(),
      requestId: id,
      name: request.name,
      email: request.email,
      mobile: request.mobile,
      address: request.address,
      membership: request.membership,
      transactionType: request.transactionType,
      startDate: new Date().toISOString(),
      status: "Active",
    };

    data.members.unshift(newMember);

    data.joinRequests = data.joinRequests.map((item) =>
      item.id === id
        ? {
            ...item,
            memberAdded: true,
            status: "Checked",
          }
        : item
    );

    saveStorage(data);
    emitUpdate();
  },

  addBatchMemberFromRequest(id) {
    const data = getStorage();

    const request = data.joinRequests.find(
      (item) => item.id === id
    );

    if (!request) return;

    const alreadyAdded = data.batchMembers.some(
      (member) => member.requestId === id
    );

    if (alreadyAdded) return;

    const newBatchMember = {
      id: Date.now(),
      requestId: id,
      name: request.name,
      email: request.email,
      mobile: request.mobile,
      batch: request.batch,
      timingType: request.timingType,
      timing: request.timing,
      parentName: request.parentName || "",
      parentContact: request.parentContact || "",
      date: new Date().toISOString(),
    };

    data.batchMembers.unshift(newBatchMember);

    data.joinRequests = data.joinRequests.map((item) =>
      item.id === id
        ? {
            ...item,
            batchAdded: true,
            status: "Checked",
          }
        : item
    );

    saveStorage(data);
    emitUpdate();
  },

  deleteJoinRequest(id) {
    const data = getStorage();

    data.joinRequests = data.joinRequests.filter(
      (request) => request.id !== id
    );

    saveStorage(data);
    emitUpdate();
  },

  // MEMBERS LIST
  getMembers() {
    return getStorage().members;
  },

  deleteMember(id) {
    const data = getStorage();

    data.members = data.members.filter(
      (member) => member.id !== id
    );

    saveStorage(data);
    emitUpdate();
  },

  // BATCH MEMBERS LIST
  getBatchMembers() {
    return getStorage().batchMembers;
  },

  deleteBatchMember(id) {
    const data = getStorage();

    data.batchMembers = data.batchMembers.filter(
      (member) => member.id !== id
    );

    saveStorage(data);
    emitUpdate();
  },
};