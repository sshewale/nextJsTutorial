'use client';
import { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Add your login API call here
            console.log('Login attempt:', { email, password });
            
            const response = await fetch('/api/user', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ action: 'login', email, password }),
            });
            const data = await response.json();
            if (!response.ok) {
              throw new Error(data.error || 'Login failed');
            }
            console.log('Login successful:', data);
            // Handle successful login (e.g., redirect, store token, etc.)
            window.location.href = '/services'; // Example redirect
            
        } catch (err) {
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
                    >
                        {loading ? 'Loading...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}