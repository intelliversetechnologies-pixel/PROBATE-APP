import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const apiKey = process.env.DIDIT_API_KEY
  const workflowId = process.env.DIDIT_WORKFLOW_ID

  if (!apiKey || !workflowId) {
    return NextResponse.json(
      {
        error:
          'Didit is not configured yet. Add DIDIT_API_KEY and DIDIT_WORKFLOW_ID to your environment.',
      },
      { status: 400 },
    )
  }

  const payload = await request.json()
  const body = {
    workflow_id: workflowId,
    vendor_data: payload.vendorData || payload.caseId || 'probate-ease-kyc',
    callback:
      payload.callback ||
      process.env.DIDIT_CALLBACK_URL ||
      `${request.nextUrl.origin}/dashboard/kyc`,
    callback_method: 'both',
    metadata: payload.metadata || {
      source: 'probate-ease',
      caseId: payload.caseId || '',
      userType: payload.userType || 'claimant',
    },
    language: 'en',
    contact_details: {
      email: payload.email || undefined,
      phone: payload.phone || undefined,
      send_notification_emails: false,
      email_lang: 'en',
    },
    expected_details: {
      first_name: payload.firstName || undefined,
      last_name: payload.lastName || undefined,
      identification_number: payload.identificationNumber || undefined,
      address: payload.address || undefined,
      country: payload.country || undefined,
      nationality: payload.nationality || undefined,
      ip_address:
        request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        undefined,
    },
  }

  const response = await fetch('https://verification.didit.me/v3/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    return NextResponse.json(
      {
        error: 'Failed to create Didit verification session.',
        details: data,
      },
      { status: response.status },
    )
  }

  return NextResponse.json(data)
}
