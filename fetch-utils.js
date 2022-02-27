const SUPABASE_URL = 'https://rkpkbgcxtxmmqwaozrit.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrcGtiZ2N4dHhtbXF3YW96cml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQzNDE0NzksImV4cCI6MTk1OTkxNzQ3OX0.BlZaNNVLhHKpWOLgA-78IfDScamHmyZyr18toNO8npQ';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function fetchItem() {
    const resp = await client.from('product').select('*');

    console.log('resp', resp);

    return checkError(resp);
}
export async function addCart(item) {
    const resp = await client.from('customer_product').insert(item);
    return checkError(resp);
}
export async function fetchCart() {
    const resp = await client.from('customer_product').select(`product_id, product( * )`);
    console.log('fetchCart', resp);
    return checkError(resp);
}

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./other-page');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
