import axios, { AxiosHeaders } from "axios";

export async function SendDiscordAPIRequest(options: {
  method: "get" | "post" | "patch" | "delete" | "put";
  headers?: Record<string, any>;
  path: string;
  body?: any;
}) {
  return await axios(`https://discord.com/api/v10/${options.path}`, {
    method: options.method,
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      ...(options.headers ?? {}),
    },
    validateStatus: () => true,
    data: options.body,
  });
}
