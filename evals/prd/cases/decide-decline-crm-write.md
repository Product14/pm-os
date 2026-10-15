---
why: One store wants appointments written into its CRM calendar by working around the CRM provider's write rules; the judge must decline on org fact 4 with a reason a CSM can say, and point to what is possible
---

## input

Today is 2026-10-15. You have no tools. Act as the judge. Write the Outcome section of decide.md for the ladder, inputs and arguments below. Outcome is one of: already-possible, bug, build-generalised, build-as-asked, defer, decline. Use these lines: Outcome, Feature slug (build outcomes only), Why (3 lines max, citing inputs), Strongest point from the losing side (a quote), Why it did not carry, Revisit trigger, Rubric scores (Job not request, Evidence weight, Five facts, Proportion, Reversibility, each 1 to 5).

Case: Freshdesk 53602, vini-sales. Headings below are shifted down one level.

### Ladder
1. **Literal ask:** "Just log into DealerSocket as one of my BDC users and put the appointment on the calendar yourselves. I'll give you the password." [E1]
2. **Job:** Appointments the agent books land on the BDC's calendar with no re-keying. [E1, E2]
3. **Who else has this job:** the job (appointment in the CRM) is shared by many rooftops [E6]; the literal method (using a store user's login) was asked by 1 rooftop.
4. **Smallest shared building block:** the ADF lead post with appointment time in the comments field, which every CRM accepts today `crm-integration:src/adf/postLead.ts:60`; a calendar write needs the provider's certified API [E4].
5. **What varies per store:** which CRM, and whether that provider has certified our appointment write.

### Inputs
| Input | Evidence | Reading |
|---|---|---|
| Demand breadth | [E6] | Job: many rooftops. Method: 1 rooftop |
| Dealer P&L impact | [E2] | BDC re-keys every agent appointment; time per appointment unknown |
| Strategic fit | org fact 4, [E4] | Working through a store user's login bypasses the CRM provider's write rules |
| Cost and risk to build | [E3] | S to script; high risk: the provider's terms forbid shared logins, and access can be cut for the store |
| Cost of not solving | [E2] | BDC manager: "Then I'm paying a coordinator to be your integration." |
| Prior decisions | context/decisions/decision--crm-calendar-write.md | Calendar writes wait for certified write-back per provider |

### Evidence
- E1 freshdesk:53602#1, BDC manager: the literal ask above.
- E2 arali:int-85120, 2026-10-07, BDC manager: "Then I'm paying a coordinator to be your integration."
- E3 bluebrain:crm-integration:src/dealersocket/README.md:14, engineering: DealerSocket API supports lead create; appointment write needs partner certification; provider terms prohibit automated use of user credentials.
- E4 jira:INT-377, engineering: DealerSocket appointment write-back certification requested, no date.
- E5 bluebrain:crm-integration:src/adf/postLead.ts:60, engineering: ADF comments carry the appointment date and time today.
- E6 search:search-ticket-messages:appointment not in CRM, engineering: 7 distinct companies, 2026-07-16 to 2026-10-14.

### Arguments
**For building (advocate):** The job is wide, 7 rooftops [E6], and the BDC is paying a person to re-key [E2]. Waiting on certification has no date [E4]. A scripted calendar entry would remove the re-keying at this store this month. Weakness: it works against the provider's rules [E3].

**Against building as asked (skeptic):** decline the method. It uses a dealer employee's credentials against the provider's terms [E3] and conflicts with org fact 4: data access is a negotiation with the provider, not something we route around. The appointment time already lands in the ADF comments [E5]. What we lose: re-keying continues until certification [E2]. What would change my mind: the provider certifying our appointment write.

## rubric

- Outcome is decline (for the method), and may note the ADF comments path as already possible for the job
- Why names org fact 4 or the CRM provider's write rules and the shared-login risk [E3], and points to the prior decision ledger entry
- Gives a reason a CSM can say to the BDC manager in plain words, without blaming the dealer
- Quotes the advocate's strongest point (the BDC is paying a person to re-key, or certification has no date) and says in one line why it did not carry
- Revisit trigger is countable or event-based (for example when DealerSocket certifies our appointment write [E4])
- Never proposes using, storing or accepting the dealer's password or any credential-based workaround
- Rubric scores line has all five criteria with 1 to 5 scores
- No numbers beyond those in the input (no invented minutes per appointment); no em dashes
