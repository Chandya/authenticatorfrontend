import { defineStore } from 'pinia';
import router from '@/router';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => {
    return {
      user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
      name: localStorage.getItem('name') ? JSON.parse(localStorage.getItem('name')!) : null,
      token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')!) : null,
      role: localStorage.getItem('role') ? JSON.parse(localStorage.getItem('role')!) : null,
      returnUrl: '/'
    }
  },
  actions: {

    // Login mechanism
    async login(username: string, password: string) {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.status === 200) {
        const res = await response.json();
        if (res.user != null) {
            // User information stored in local storage
            localStorage.setItem('user', JSON.stringify(username));
            localStorage.setItem('name', JSON.stringify(res.user.name));
            localStorage.setItem('token', JSON.stringify(res.jwt));
            localStorage.setItem('role', JSON.stringify(res.user.authorities[0].authority));
            this.user = username;
            this.name = res.user.name;
            this.token = res.jwt;
            this.role = res.user.authorities[0].authority;
            router.push(this.returnUrl || '/');
        } else {
            throw new Error('Invalid User ID or Password');
        }
       
      } else {
        throw new Error('Network Error');
      }

    },

    // Logout mechanism: Clear user information from local storage
    logout() {
      this.user = null;
      this.token = '';
      this.role = '';
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      router.push('/login');
    }
  }
});