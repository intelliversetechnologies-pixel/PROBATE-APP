export const diditProviderMeta = {
  name: 'Didit',
  tagline: 'Global ID, face match, passive liveness, and fraud signals',
  description:
    'Best for global user-facing verification flows where you want hosted sessions, biometrics, and fraud screening from a single API integration.',
  envVars: ['DIDIT_API_KEY', 'DIDIT_WORKFLOW_ID'],
  docsUrl: 'https://docs.didit.me/sessions-api/create-session',
}

export const dojahProviderMeta = {
  name: 'Dojah',
  tagline: 'Nigeria-ready KYC lookups for BVN, NIN, and phone data',
  description:
    'Best for Nigerian government-data and telecom-linked verification checks such as BVN, NIN, and phone-number verification.',
  envVars: ['DOJAH_APP_ID', 'DOJAH_SECRET_KEY'],
  docsUrl: 'https://docs.dojah.io/overview/quickstart',
}

export const dojahLookupConfig = {
  nin: {
    label: 'NIN lookup',
    queryKey: 'nin',
    path: '/api/v1/kyc/nin',
    placeholder: '22345678901',
  },
  bvn: {
    label: 'BVN validation',
    queryKey: 'bvn',
    path: '/api/v1/kyc/bvn',
    placeholder: '22222222222',
  },
  phone: {
    label: 'Phone verification',
    queryKey: 'phone_number',
    path: '/api/v1/kyc/phone_number/basic',
    placeholder: '09011111111',
  },
} as const

export type DojahLookupType = keyof typeof dojahLookupConfig

export function getDojahBaseUrl() {
  return process.env.DOJAH_ENV === 'production'
    ? 'https://api.dojah.io'
    : 'https://sandbox.dojah.io'
}

export function getConfiguredProviderFlags() {
  return {
    didit:
      Boolean(process.env.DIDIT_API_KEY) &&
      Boolean(process.env.DIDIT_WORKFLOW_ID),
    dojah:
      Boolean(process.env.DOJAH_APP_ID) &&
      Boolean(process.env.DOJAH_SECRET_KEY),
  }
}
