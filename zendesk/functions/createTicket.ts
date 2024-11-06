import { log } from "@restackio/ai/function";
import { Ticket } from "node-zendesk/clients/core/tickets";
import type { CreateOrUpdateTicket, CustomField, Priority, Status, TicketComment, Type } from "node-zendesk/clients/core/tickets"
import { zendeskClient } from "../utils/client";

export type { CreateOrUpdateTicket, CustomField, Priority, Status, TicketComment, Type } from "node-zendesk/clients/core/tickets"

// @see {@link https://developer.zendesk.com/documentation/ticketing/reference-guides/via-object-reference/}
export type Via = {
  channel: number | string;
  source: {
    from: {
      address: string;
      name: string;
    };
    rel: null | string;
    to: {
      address: string;
      name: string;
    };
  }
};

// @see {@link https://blakmatrix.github.io/node-zendesk/code/modules/clients_core_tickets.html#ticket}
export type CreateTicket = {
  assignee_email?: string;
  assignee_id?: number;
  attribute_value_ids?: Array<number>;
  brand_id?: number;
  collaborator_ids?: Array<number>;
  comment: TicketComment;
  custom_fields?: Array<CustomField>;
  custom_status_id?: number;
  due_at?: string;
  email_ccs?: object;
  external_id?: string;
  followers?: object;
  group_id?: number;
  macro_id?: number;
  organization_id?: number;
  priority?: Priority;
  problem_id?: number;
  recipient?: string;
  requester?: object;
  requester_id: number;
  safe_update?: boolean;
  sharing_agreement_ids?: Array<number>;
  status?: Status;
  subdomain?: string;
  subject?: string;
  submitter_id?: number;
  tags?: Array<string>;
  ticket_form_id?: number;
  token?: string;
  type?: Type;
  updated_stamp?: string;
  username?: string;
  via?: Via;
  via_id?: number;
};

/**
 * Create ticket
 *
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/}
 * @see {@link https://developer.zendesk.com/documentation/ticketing/managing-tickets/creating-and-updating-tickets/}
 * @see {@link https://blakmatrix.github.io/node-zendesk/code/classes/clients_core_tickets.Tickets.html#create}
 * @see {@link https://blakmatrix.github.io/node-zendesk/code/modules/clients_core_tickets.html#ticket}
 */
export async function createTicket({
  assignee_email,
  assignee_id,
  attribute_value_ids,
  collaborator_ids,
  custom_fields,
  custom_status_id,
  brand_id,
  comment,
  due_at,
  email_ccs,
  external_id,
  followers,
  group_id,
  macro_id,
  organization_id,
  priority,
  problem_id,
  recipient,
  requester,
  requester_id,
  safe_update,
  sharing_agreement_ids,
  status,
  subdomain,
  subject,
  submitter_id,
  tags,
  ticket_form_id,
  token,
  type,
  updated_stamp,
  username,
  via,
  via_id,
}: CreateTicket): Promise<Ticket> {

  try {
    const zendesk = zendeskClient({ token, subdomain, username });

    const ticket: Record<string, boolean | number | Array<number> | object | string | Array<string> | undefined | Array<CustomField> | Priority | Status | TicketComment> = {
      ...(assignee_email && { assignee_email }),
      ...(assignee_id && { assignee_id }),
      ...(attribute_value_ids && { attribute_value_ids }),
      ...(brand_id && { brand_id }),
      ...(collaborator_ids && { collaborator_ids }),
      ...(comment && { comment }),
      ...(custom_fields && { custom_fields }),
      ...(custom_status_id && { custom_status_id }),
      ...(due_at && { due_at }),
      ...(email_ccs && { email_ccs }),
      ...(external_id && { external_id }),
      ...(followers && { followers }),
      ...(group_id && { group_id }),
      ...(macro_id && { macro_id }),
      ...(organization_id && { organization_id }),
      ...(priority && { priority }),
      ...(problem_id && { problem_id }),
      ...(recipient && { recipient }),
      ...(requester && { requester }),
      ...(requester_id && { requester_id }),
      ...(safe_update && { safe_update }),
      ...(sharing_agreement_ids && { sharing_agreement_ids }),
      ...(status && { status }),
      ...(subject && { subject }),
      ...(submitter_id && { submitter_id }),
      ...(tags && { tags }),
      ...(ticket_form_id && { ticket_form_id }),
      ...(type && { type }),
      ...(updated_stamp && { updated_stamp }),
      ...(via && { via }),
      ...(via_id && { via_id }),
    };

    const response = await zendesk.tickets.create({
      ticket
    } as CreateOrUpdateTicket);

    return response.result;

  } catch (error) {
    log.error("Zendesk Create Ticket error", { error });
    throw new Error(`Zendesk Create Ticket error ${error}`);
  }
}
