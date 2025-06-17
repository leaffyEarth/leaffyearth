import { ICreateUserRequest, IGetUserResponse, IUserError } from '@/types/user';

class UserApi {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  }

  private async handleRequest<T>(url: string, options?: RequestInit, idToken?: string): Promise<T> {
    const response = await fetch(url, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(idToken && { 'Cookie': `token=${idToken}` }),
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error: IUserError = {
        message: response.statusText,
        code: `HTTP_${response.status}`,
        status: response.status
      };
      throw error;
    }

    const data = await response.json();
    return data;
  }

  async createUser(userData: ICreateUserRequest, idToken?: string): Promise<IGetUserResponse> {
    return this.handleRequest<IGetUserResponse>(
      `${this.baseUrl}/users`,
      {
        method: 'POST',
        body: JSON.stringify(userData),
      },
      idToken
    );
  }

  async getUserByFirebaseUID(firebaseUID: string, idToken?: string): Promise<IGetUserResponse> {
    return this.handleRequest<IGetUserResponse>(
      `${this.baseUrl}/users/${firebaseUID}`,
      {
        method: 'GET',
      },
      idToken
    );
  }
}

export const userApi = new UserApi(); 