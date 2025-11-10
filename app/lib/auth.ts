export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

// Mock user data - in a real app, this would come from an API
const mockUsers = [
  {
    id: '1',
    username: 'houston@century.com',
    email: 'houston@century.com',
    role: 'admin',
    password: '12345'
  }
];

export const authenticateUser = async (credentials: LoginCredentials): Promise<User | null> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const user = mockUsers.find(u => 
    u.username === credentials.username && 
    u.password === credentials.password
  );
  
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  
  return null;
};

export const logoutUser = async (): Promise<void> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  // In a real app, you would call an API to invalidate the session
}; 