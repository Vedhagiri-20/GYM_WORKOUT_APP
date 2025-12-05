// Replace these stubs with your real API calls.
import { storage } from "../utils/storage";

const SESSION_KEY = "gymapp.session";

export function getSession() {
return storage.get(SESSION_KEY);
}

export function setSession(session) {
storage.set(SESSION_KEY, session);
}

export function clearSession() {
storage.remove(SESSION_KEY);
}

// Mock login – swap with real API. Accepts role: "client" | "trainer" | "admin"
export async function login({ email, password, role }) {
// TODO: call your backend and return token + role from server
if (!email || !password || !role) throw new Error("Missing credentials");
const fakeToken = "fake-jwt-token";
const user = { id: "u1", email, role };
const session = { token: fakeToken, user };
setSession(session);
return session;
}

export async function logout() {
clearSession();
}