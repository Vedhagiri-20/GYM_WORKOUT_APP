// Thin wrapper so you can swap storage later if needed
export const storage = {
get(key, fallback = null) {
try {
const raw = localStorage.getItem(key);
return raw ? JSON.parse(raw) : fallback;
} catch {
return fallback;
}
},
set(key, value) {
localStorage.setItem(key, JSON.stringify(value));
},
remove(key) {
localStorage.removeItem(key);
},
};