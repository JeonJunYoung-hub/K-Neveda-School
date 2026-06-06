type FirestoreValue =
  | { stringValue: string }
  | { integerValue: string }
  | { doubleValue: number }
  | { booleanValue: boolean }
  | { nullValue: null };

type FirestoreDocument = {
  name: string;
  fields?: Record<string, FirestoreValue>;
};

type SignInResponse = {
  email: string;
  expiresIn: string;
  idToken: string;
  localId: string;
};

const firebaseConfig = {
  adminEmail: import.meta.env.VITE_FIREBASE_ADMIN_EMAIL || '',
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
};

export function isFirebaseConfigured() {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
}

export function getFirebaseSetupStatus() {
  return {
    adminEmail: firebaseConfig.adminEmail,
    isConfigured: isFirebaseConfigured(),
  };
}

function getFirestoreBaseUrl() {
  return `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents`;
}

function withApiKey(url: string) {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}key=${encodeURIComponent(firebaseConfig.apiKey)}`;
}

function getAuthUrl(path: string) {
  return `https://identitytoolkit.googleapis.com/v1/${path}?key=${firebaseConfig.apiKey}`;
}

function encodeFirestoreValue(value: unknown): FirestoreValue {
  if (typeof value === 'boolean') {
    return { booleanValue: value };
  }

  if (typeof value === 'number') {
    return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
  }

  if (value === null || value === undefined) {
    return { nullValue: null };
  }

  return { stringValue: String(value) };
}

function decodeFirestoreValue(value: FirestoreValue) {
  if ('stringValue' in value) {
    return value.stringValue;
  }

  if ('integerValue' in value) {
    return Number(value.integerValue);
  }

  if ('doubleValue' in value) {
    return value.doubleValue;
  }

  if ('booleanValue' in value) {
    return value.booleanValue;
  }

  return null;
}

function toFirestoreFields(data: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, encodeFirestoreValue(value)]));
}

function fromFirestoreDocument<T>(document: FirestoreDocument): T & { id: string } {
  const values = Object.fromEntries(
    Object.entries(document.fields || {}).map(([key, value]) => [key, decodeFirestoreValue(value)]),
  );
  return {
    id: document.name.split('/').pop() || '',
    ...values,
  } as T & { id: string };
}

function getHeaders(idToken?: string) {
  return {
    ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
    'Content-Type': 'application/json',
  };
}

async function assertOk(response: Response) {
  if (response.ok) {
    return;
  }

  const text = await response.text();
  throw new Error(text || response.statusText);
}

export async function signInAdmin(email: string, password: string): Promise<SignInResponse> {
  const response = await fetch(getAuthUrl('accounts:signInWithPassword'), {
    body: JSON.stringify({ email, password, returnSecureToken: true }),
    headers: getHeaders(),
    method: 'POST',
  });
  await assertOk(response);
  return response.json() as Promise<SignInResponse>;
}

export async function listDocuments<T>(collection: string, idToken?: string): Promise<Array<T & { id: string }>> {
  const response = await fetch(withApiKey(`${getFirestoreBaseUrl()}/${collection}`), {
    headers: getHeaders(idToken),
  });

  if (response.status === 404) {
    return [];
  }

  await assertOk(response);
  const payload = (await response.json()) as { documents?: FirestoreDocument[] };
  return (payload.documents || []).map((document) => fromFirestoreDocument<T>(document));
}

export async function createDocument<T extends object>(
  collection: string,
  data: T,
  idToken?: string,
) {
  const response = await fetch(withApiKey(`${getFirestoreBaseUrl()}/${collection}`), {
    body: JSON.stringify({ fields: toFirestoreFields(data as Record<string, unknown>) }),
    headers: getHeaders(idToken),
    method: 'POST',
  });
  await assertOk(response);
  return fromFirestoreDocument<T>((await response.json()) as FirestoreDocument);
}

export async function updateDocument<T extends object>(
  collection: string,
  id: string,
  data: T,
  idToken: string,
) {
  const mask = Object.keys(data).map((key) => `updateMask.fieldPaths=${encodeURIComponent(key)}`).join('&');
  const response = await fetch(withApiKey(`${getFirestoreBaseUrl()}/${collection}/${id}?${mask}`), {
    body: JSON.stringify({ fields: toFirestoreFields(data as Record<string, unknown>) }),
    headers: getHeaders(idToken),
    method: 'PATCH',
  });
  await assertOk(response);
  return fromFirestoreDocument<T>((await response.json()) as FirestoreDocument);
}

export async function deleteDocument(collection: string, id: string, idToken: string) {
  const response = await fetch(withApiKey(`${getFirestoreBaseUrl()}/${collection}/${id}`), {
    headers: getHeaders(idToken),
    method: 'DELETE',
  });
  await assertOk(response);
}
