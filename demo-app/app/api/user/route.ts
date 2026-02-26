import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Mock database - replace with actual database
const users: { id: string; email: string; password: string; name: string }[] = [
    {
        id: '1',
        email: 'satish@gmail.com',
        password: hashPassword('password123'),
        name: 'Satish Shewale',
    },
];

function hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { action, email, password, name } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        if (action === 'register') {
            if (!name) {
                return NextResponse.json(
                    { error: 'Name is required for registration' },
                    { status: 400 }
                );
            }

            const userExists = users.find((u) => u.email === email);
            if (userExists) {
                return NextResponse.json(
                    { error: 'User already exists' },
                    { status: 409 }
                );
            }

            const newUser = {
                id: crypto.randomUUID(),
                email,
                password: hashPassword(password),
                name,
            };
            users.push(newUser);

            return NextResponse.json(
                { message: 'User registered successfully', userId: newUser.id },
                { status: 201 }
            );
        }

        if (action === 'login') {
            const user = users.find((u) => u.email === email);
            if (!user || user.password !== hashPassword(password)) {
                return NextResponse.json(
                    { error: 'Invalid email or password' },
                    { status: 401 }
                );
            }

            return NextResponse.json(
                { message: 'Login successful', userId: user.id, name: user.name },
                { status: 200 }
            );
        }

        return NextResponse.json(
            { error: 'Invalid action' },
            { status: 400 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function GET() {
  const users = [{ id: 1, name: 'user1' }];
  return NextResponse.json(users, { status: 200 });
}