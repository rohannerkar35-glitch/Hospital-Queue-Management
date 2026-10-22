// System Authentication Accounts & Credentials
// Features Indian Names: Rohan, Akash, Om for OPD system roles

export const AUTH_ACCOUNTS = {
  patient: {
    role: 'patient',
    portalName: 'Patient Portal',
    name: 'Om Kulkarni',
    displayName: 'Om Kulkarni',
    username: 'om',
    email: 'om@hospital.in',
    password: 'om123',
    targetTab: 'patient-portal',
    badge: 'Verified Patient',
    patientId: 'PAT-884920',
    phone: '+91 98220 54321',
    age: 28,
    gender: 'Male',
    bloodGroup: 'B+',
    allergies: 'None recorded',
    emergencyContact: 'Akash Kulkarni (+91 98220 11223)',
    description: 'View active digital tokens, QR pass, medical prescriptions, and queue position.'
  },
  doctor: {
    role: 'doctor',
    portalName: 'Doctor Console',
    name: 'Dr. Rohan Nerkar',
    displayName: 'Dr. Rohan Nerkar, MD',
    username: 'rohan',
    email: 'rohan@hospital.in',
    password: 'rohan123',
    targetTab: 'doctor-dashboard',
    badge: 'Senior Consultant',
    doctorId: 'pune-doc-8',
    department: 'Cardiology & Heart Care',
    qualification: 'MD (Cardiology), Chief Cardiologist',
    roomNo: 'Cardiac Wing Room 104',
    phone: '+91 98220 99887',
    description: 'Consultation room console, call next patient with audio chime, write digital Rx, and manage OPD load.'
  },
  reception: {
    role: 'reception',
    portalName: 'Reception Desk',
    name: 'Akash Verma',
    displayName: 'Akash Verma (Desk #2)',
    username: 'akash',
    email: 'akash@hospital.in',
    password: 'akash123',
    targetTab: 'reception-dashboard',
    badge: 'Front Desk Lead',
    operatorId: 'REC-AKASH-04',
    desk: 'OPD Reception Desk #2',
    shift: 'Morning & Afternoon Shift',
    phone: '+91 98901 33445',
    description: 'Register walk-in patients, issue express tokens, scan/verify digital QR passes, and print token slips.'
  },
  admin: {
    role: 'admin',
    portalName: 'Admin Dashboard',
    name: 'Rohan Nerkar',
    displayName: 'Rohan Nerkar (Director)',
    username: 'admin',
    email: 'admin.rohan@hospital.in',
    password: 'admin123',
    targetTab: 'admin-dashboard',
    badge: 'Hospital Director',
    adminId: 'ADM-ROHAN-01',
    department: 'Hospital Administration & Analytics',
    phone: '+91 98220 00001',
    description: 'Executive command center, real-time hospital throughput analytics, doctor utilization & surge controls.'
  }
};

/**
 * Validate credentials for a specific role or cross-role
 */
export function validateLogin(requestedRole, identifier, password) {
  if (!identifier || !password) {
    return { success: false, message: 'Please enter both username/email and password.' };
  }

  const cleanIdent = identifier.trim().toLowerCase();
  const cleanPass = password.trim();

  // If a specific role was requested
  if (requestedRole && AUTH_ACCOUNTS[requestedRole]) {
    const acc = AUTH_ACCOUNTS[requestedRole];
    const isMatch = (cleanIdent === acc.username.toLowerCase() || cleanIdent === acc.email.toLowerCase()) && 
                    cleanPass === acc.password;
    if (isMatch) {
      return { success: true, account: acc };
    }
  }

  // Check any matching account across roles
  for (const key of Object.keys(AUTH_ACCOUNTS)) {
    const acc = AUTH_ACCOUNTS[key];
    const isMatch = (cleanIdent === acc.username.toLowerCase() || cleanIdent === acc.email.toLowerCase()) && 
                    cleanPass === acc.password;
    if (isMatch) {
      return { success: true, account: acc };
    }
  }

  return { 
    success: false, 
    message: 'Invalid credentials. Please check your username/email or password.' 
  };
}
