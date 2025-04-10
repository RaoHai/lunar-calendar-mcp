#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import fetch from "node-fetch";
import { SolarDay } from "tyme4ts";

// Server setup
const server = new Server({
  name: "mcp-server/chinese-lunar-calendar",
  version: "0.1.0",
}, {
  capabilities: {
    tools: {},
  },
});


const TOOLS = [
  {
    name: "get_lunar",
    description: "获取当天的农历日期",
    inputSchema: {
      type: "object",
      properties: {
        date: {
          type: "string",
          description: "今天的日期，格式为 YYYY-MM-DD"
        },
      }
    }
  }
];

async function handleLunar(dateStr: string) {
  const date = new Date(dateStr);
  const solar = SolarDay.fromYmd(date.getFullYear(), date.getMonth(), date.getDay());
  return solar.getLunarDay().toString();
}

// Set up request handlers
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: TOOLS
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  switch (request.params.name) {
    case 'get_lunar':
      const { date } = request.params.arguments!;
      return {
        content: [{
          type: 'text',
          text: await handleLunar(date as string),
        }],
      }
    default:
      return {
        content: [{
                type: "text",
                text: `Unknown tool: ${request.params.name}`
            }],
        isError: true
    };
  }
});


async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Chinese Luar Calendar MCP Server running on stdio");
}

runServer().catch((error) => {
  console.error("Fatal error running server:", error);
  process.exit(1);
});