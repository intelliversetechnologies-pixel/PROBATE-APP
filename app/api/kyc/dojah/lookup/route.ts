import { NextRequest, NextResponse } from 'next/server'
import {
  dojahLookupConfig,
  type DojahLookupType,
  getDojahBaseUrl,
} from '@/lib/kyc-integrations'

function isLookupType(value: string): value is DojahLookupType {
  return value === 'nin' || value === 'bvn' || value === 'phone'
}

export async function POST(request: NextRequest) {
  const appId = process.env.DOJAH_APP_ID
  const secretKey = process.env.DOJAH_SECRET_KEY

  if (!appId || !secretKey) {
    return NextResponse.json(
      {
        error:
          'Dojah is not configured yet. Add DOJAH_APP_ID and DOJAH_SECRET_KEY to your environment.',
      },
      { status: 400 },
    )
  }

  const payload = await request.json()
  const type = payload.type

  if (typeof type !== 'string' || !isLookupType(type)) {
    return NextResponse.json(
      { error: 'Unsupported Dojah lookup type.' },
      { status: 400 },
    )
  }

  const config = dojahLookupConfig[type]
  const lookupValue = payload.value

  if (typeof lookupValue !== 'string' || !lookupValue.trim()) {
    return NextResponse.json(
      { error: `${config.label} requires a value.` },
      { status: 400 },
    )
  }

  const params = new URLSearchParams({
    [config.queryKey]: lookupValue.trim(),
  })

  if (type === 'bvn') {
    if (payload.firstName) params.set('first_name', payload.firstName)
    if (payload.lastName) params.set('last_name', payload.lastName)
    if (payload.dob) params.set('dob', payload.dob)
  }

  if (payload.customerReference) {
    params.set('customer_reference', payload.customerReference)
  }

  const response = await fetch(`${getDojahBaseUrl()}${config.path}?${params.toString()}`, {
    method: 'GET',
    headers: {
      AppId: appId,
      Authorization: secretKey,
    },
    cache: 'no-store',
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    return NextResponse.json(
      {
        error: `Dojah ${config.label.toLowerCase()} failed.`,
        details: data,
      },
      { status: response.status },
    )
  }

  return NextResponse.json(data)
}
