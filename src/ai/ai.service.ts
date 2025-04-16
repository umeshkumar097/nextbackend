import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class AiService {
  private client: Client;

  constructor() {
    this.client = new Client({
      node: process.env.ELASTIC_URL || 'http://localhost:9200',
    });
  }

  async matchSpeakers(query: string | null): Promise<any[]> {
    const keyword = query ?? ''; // fallback if null
    const result = await this.client.search({
      index: 'speakers',
      query: {
        match: {
          expertise: keyword,
        },
      },
    });

    return result.hits.hits.map((hit: any) => hit._source);
  }
}
