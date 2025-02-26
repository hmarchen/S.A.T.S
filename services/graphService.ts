import { Client } from '@microsoft/microsoft-graph-client';
import 'isomorphic-fetch';

export interface EventDetails {
  subject: string;
  body: string;
  startDateTime: Date;
  endDateTime: Date;
  location: string;
  attendees: string[];
}

export class GraphService {
  private client: Client;

  constructor(accessToken: string) {
    this.client = Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      },
    });
  }

  async createCalendarEvent(details: EventDetails): Promise<any> {
    try {
      const event = {
        subject: details.subject,
        body: {
          contentType: 'HTML',
          content: details.body,
        },
        start: {
          dateTime: details.startDateTime.toISOString(),
          timeZone: 'UTC',
        },
        end: {
          dateTime: details.endDateTime.toISOString(),
          timeZone: 'UTC',
        },
        location: {
          displayName: details.location,
        },
        attendees: details.attendees.map(email => ({
          emailAddress: {
            address: email,
          },
          type: 'required',
        })),
        isOnlineMeeting: true,
        onlineMeetingProvider: 'teamsForBusiness',
      };

      const response = await this.client
        .api('/me/events')
        .post(event);

      return response;
    } catch (error) {
      console.error('Error creating calendar event:', error);
      throw error;
    }
  }
} 