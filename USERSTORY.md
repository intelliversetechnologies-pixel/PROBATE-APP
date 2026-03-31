# Probate Ease User Stories

## Product Context
Probate Ease is the FRISOPS Probadmin experience for handling probate administration, alleged deceased requests, document verification, KYC, compliance review, payment handling, and final transmission of shares or ownership rights after the death of a shareholder.

The platform is intended to digitize and coordinate the work of FRISOPS officers, compliance teams, KYC teams, lawyers, court agents, banks, stockbrokers, client services, and clients through a single workflow-driven environment.

## Goals
- Digitize end-to-end probate administration.
- Reduce delays caused by fragmented paper workflows.
- Centralize document collection, codification, review, approvals, and feedback.
- Provide role-based visibility for internal and external stakeholders.
- Maintain auditability, governance, and compliance across all actions.

## Primary Personas

### Client / Executor / Administrator
As a client, I want to initiate a probate or alleged deceased request, upload documents, receive feedback, and track the progress of my matter so that I can complete the transmission process without repeated physical visits.

### Approved Proxy
As a law firm or stockbroker acting for a client, I want to submit authorized probate documents and receive status updates so that I can represent the client efficiently within the legal boundaries of the process.

### FRISOPS DCP Officer
As a DCP officer, I want to capture client intake details, verify required identifiers, upload documents, and route requests into Probadmin so that probate matters enter the system correctly from the first touchpoint.

### Probate Officer
As a probate officer, I want to codify requests, bind documents to a unique control code, trigger stakeholder workflows, and track all statuses so that I can manage probate files from intake to transmission.

### Compliance Officer
As a compliance officer, I want to review document packs, proxy eligibility, Estock and EDAS validations, and governance rules so that only compliant transmissions proceed.

### KYC Officer
As a KYC officer, I want to conduct identity, address, and personality verification for claimants and administrators so that fraudulent or invalid requests are blocked early.

### Lawyer / Court Agent
As a lawyer or court stakeholder, I want to receive probate documents, review them, return confirmations or rejections, and upload stamped evidence so that legal validation is completed within the same platform.

### Bank Officer
As a bank officer, I want to receive banker confirmation requests, verify signatures, and complete higher-officer OTP approvals so that probate-related bank validation is secure and auditable.

### Higher Officer / HOD / Super Admin
As a higher officer, I want to approve within preset limits, view escalations, and intervene where allowed so that governance and exception handling are enforced properly.

## Core Epic 1: Client Intake and Alleged Deceased Requests

### Story 1.1
As a client or proxy, I want to initiate a request through onsite, stockbroker, legal firm, FRIS Info, or online portal channels so that the platform supports the real intake paths used by customers.

### Story 1.2
As a DCP officer, I want to capture deceased details, claimant details, NIN, proxy details, and intake source so that the probate file starts with complete statutory context.

### Story 1.3
As a probate officer, I want to generate a unique control code that includes the court code so that every future action references one authoritative file identity.

### Story 1.4
As a probate officer, I want the system to detect when an account has already been marked as alleged deceased so that duplicate codification is prevented.

## Core Epic 2: Document Pack and Codification

### Story 2.1
As a DCP officer, I want to upload and bind required probate documents to a control code so that the system maintains one complete digital file.

### Story 2.2
As a probate officer, I want required document completion enforced before submission so that incomplete files do not move to downstream teams.

### Story 2.3
As a probate officer, I want the system to distinguish approved, pending, rejected, and view-only documents with clear watermarks so that all stakeholders understand document state immediately.

### Story 2.4
As a client or proxy, I want to see the required transmission document checklist so that I know what must be submitted before processing continues.

## Core Epic 3: Proxy and Governance Validation

### Story 3.1
As a governance engine, I want feedback sent only to approved proxies so that unauthorized intermediaries do not receive protected probate updates.

### Story 3.2
As a probate officer, I want to capture statutory IDs and authorization letters for stockbrokers and law firms so that proxy legitimacy is documented.

### Story 3.3
As compliance, I want preset approval limits and officer roles recognized within the workflow so that departmental governance is respected.

## Core Epic 4: Bank Confirmation Workflow

### Story 4.1
As a probate officer, I want banker confirmation requests triggered into the bank workflow so that signature verification happens without leaving the platform.

### Story 4.2
As a bank officer, I want to approve or reject a banker confirmation request and attach the resulting evidence so that downstream teams can proceed with confidence.

### Story 4.3
As a higher bank officer, I want OTP-based approval for sensitive confirmations so that sign-off is secure.

### Story 4.4
As a client, I want to be notified when bank confirmation is approved or rejected so that I know the next action to take.

## Core Epic 5: Lawyer and Court Review

### Story 5.1
As a probate officer, I want to send LA or Will documents to lawyers for reconfirmation so that legal review is formalized.

### Story 5.2
As a lawyer, I want to return an ok/not ok decision and upload stamped court evidence so that court progress is visible within the case file.

### Story 5.3
As a court stakeholder, I want to confirm or reject a probate document with reasons so that decisions are recorded transparently.

### Story 5.4
As a probate officer, I want rejected legal feedback to trigger structured client and proxy notifications so that remediation can start immediately.

## Core Epic 6: KYC Verification

### Story 6.1
As a KYC officer, I want to run identity verification against NIN and related records so that claimant identity is validated.

### Story 6.2
As a KYC officer, I want to run address verification without exposing scheduling details to the client so that investigations remain effective.

### Story 6.3
As a KYC officer, I want to record personality verification outcomes so that impersonation risks are reduced.

### Story 6.4
As compliance, I want KYC results automatically visible in the probate file so that I can make final decisions faster.

## Core Epic 7: Compliance and Final Transmission

### Story 7.1
As a compliance officer, I want to review the complete file against Estock, EDAS, governance rules, and mandatory forms so that only valid transmissions proceed.

### Story 7.2
As compliance, I want to request more information, gag documents, or schedule stakeholder meetings where needed so that edge cases are handled safely.

### Story 7.3
As a higher officer, I want to approve final transmission within my assigned limit so that the process remains controlled.

### Story 7.4
As client services, I want e-dividend and CSCS forms triggered after approval so that post-transmission processing can continue.

## Core Epic 8: Payments and Finance

### Story 8.1
As a probate officer, I want to issue payment instructions tied to the control code so that every fee is traceable to the correct matter.

### Story 8.2
As a client, I want to pay through integrated channels such as Paystack or Remita so that the probate process is easier to complete.

### Story 8.3
As a DCP officer, I want to upload physical finance receipts into the same file when payments are made offline so that no financial evidence is lost.

### Story 8.4
As finance, I want KYC and other internal charges reflected in the workflow so that revenue and processing actions stay synchronized.

## Core Epic 9: Meetings, Biometrics, and Feedback

### Story 9.1
As a probate officer, I want to schedule physical or virtual meetings with stakeholders so that appearance and relationship validation can be completed.

### Story 9.2
As a probate officer, I want to store meeting outcomes, pictures, recordings, or biometrics so that sensitive approvals are supported by evidence.

### Story 9.3
As a client, I want to receive real-time feedback at every major workflow stage so that I always know current status and required next steps.

## Core Epic 10: Audit, Reporting, and Oversight

### Story 10.1
As management, I want KPI, audit, and feedback engines to run across all actions so that operational accountability is measurable.

### Story 10.2
As an oversight stakeholder, I want a full audit trail of every approval, rejection, upload, and workflow transition so that compliance reviews are reliable.

### Story 10.3
As FRISL, I want centralized reporting on active files, bottlenecks, and stakeholder queues so that the organization can improve turnaround time and service quality.

## MVP Scope Recommendation
The first working MVP should prioritize:
- Probate intake and alleged deceased request capture
- Codification and control code generation
- Document pack management
- Approved proxy handling
- Bank confirmation workflow
- Lawyer and court status workflow
- KYC desk
- Compliance review
- Payment issuance and receipt capture
- Case timeline and stakeholder notifications

## Success Criteria
- A new probate matter can be initiated and tracked with a single control code.
- Internal teams can see stage-by-stage workflow status.
- Clients and approved proxies receive structured updates.
- Mandatory documents and validation steps are visible before final transmission.
- The product reflects the real FRISOPS probate process rather than a generic case tracker.
