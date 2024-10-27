import {
  ApplicationCommandOptionType,
  InteractionResponseType,
  InteractionType,
  MessageFlags,
} from "discord-api-types/v10";
import { NextResponse } from "next/server";
import { AppAbbreviationName, AppRoomName } from "~/app/(site)/config";
import { verifyInteractionRequest } from "~/app/(site)/utils";
import { Routes } from "discord-api-types/v10";
import { discordAPIRest } from "../../../utils";
import { writeServerClient } from "~/app/(site)/serverClient";
import { revalidateTag, revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

/**
 * Use edge runtime which is faster, cheaper, and has no cold-boot.
 * If you want to use node runtime, you can change this to `node`, but you'll also have to polyfill fetch (and maybe other things).
 *
 * @see https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes
 */
// export const runtime = "edge";

/**
 * Handle Discord interactions. Discord will send interactions to this endpoint.
 *
 * @see https://discord.com/developers/docs/interactions/receiving-and-responding#receiving-an-interaction
 */
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  // if (process.env.NODE_ENV !== "development") return new NextResponse("Disabled route", { status: 401 });
  const verifyResult = await verifyInteractionRequest(
    request,
    process.env.DISCORD_PUBLIC_KEY!
  );
  if (!verifyResult.isValid || !verifyResult.interaction) {
    return new NextResponse("Invalid request", { status: 401 });
  }
  const { interaction } = verifyResult;
  if (interaction.type === InteractionType.Ping) {
    // The `PING` message is used during the initial webhook handshake, and is
    // required to configure the webhook in the developer portal.
    return NextResponse.json({ type: InteractionResponseType.Pong });
  }

  if (interaction.type === InteractionType.ApplicationCommand) {
    const { name, options } = interaction.data;

    switch (name) {
      case "sccroom":
        const discordMember = interaction.member;
        if (!discordMember)
          return NextResponse.json({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
              content: `You must use this command in the ${AppAbbreviationName} server`,
              flags: MessageFlags.Ephemeral,
            },
          });

        const hasSCCRole = discordMember.roles.includes(
          process.env.DISCORD_SCC_ROOM_ROLE_ID!
        );
        if (!hasSCCRole)
          return NextResponse.json({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
              content: `You can't toggle the status of the ${AppRoomName}. If you are interested in monitoring this room, contact a ${AppAbbreviationName} executive.`,
              flags: MessageFlags.Ephemeral,
            },
          });

        const discordUser = discordMember.user;

        const roomOption = (options ?? [])[0];
        if (
          !roomOption ||
          roomOption.type !== ApplicationCommandOptionType.Boolean
        )
          return NextResponse.json({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
              content: `Internal App Error`,
              flags: MessageFlags.Ephemeral,
            },
          });

        const isRoomOpen = roomOption.value;

        const roomItems = isRoomOpen
          ? {
              emoji: "🔓",
              statusPastTense: "opened",
            }
          : {
              emoji: "🔐",
              statusPastTense: "closed",
            };

        await discordAPIRest.post(
          Routes.interactionCallback(interaction.id, interaction.token),
          {
            body: {
              type: 5,
              flags: MessageFlags.Ephemeral,
            }
          }
        );

        const DISCORD_SCC_ROOM_CHANNEL_ID =
          process.env.DISCORD_SCC_ROOM_CHANNEL_ID!;
        try {
          await discordAPIRest.patch(
            Routes.channel(DISCORD_SCC_ROOM_CHANNEL_ID),
            {
              body: {
                name: `${roomItems.emoji} ${isRoomOpen ? "open" : "closed"}`,
              }
            }
          );
          await Promise.all([
            discordAPIRest.post(
              Routes.channelMessages(DISCORD_SCC_ROOM_CHANNEL_ID),
              {
                body: {
                  enforce_nonce: true,
                  content: `${roomItems.emoji}: <@${discordUser.id}> has ${roomItems.statusPastTense} the ${AppRoomName}`,
                },
                headers: {
                  "X-Nonce": uuidv4(),
                },
              }
            ),
            writeServerClient.create({
              _type: "roomStatus",
              discordUserId: discordUser.id,
              status: isRoomOpen,
            }),
          ]);
          await discordAPIRest.post(
            Routes.webhook(process.env.DISCORD_BOT_ID!, interaction.token),
            {
              body: {
                content: `You have ${roomItems.statusPastTense} the ${AppRoomName}!`,
                flags: MessageFlags.Ephemeral,
                with_response: true,
                enforce_nonce: true,
              },
              headers: {
                "X-Nonce": uuidv4(),
              },
            }
          );
          revalidateTag("roomStatus");
          revalidatePath("/api/room-status", "page");
          return new NextResponse("Success");
        } catch (e) {
          console.error(e);
          await discordAPIRest.post(
            Routes.webhook(process.env.DISCORD_BOT_ID!, interaction.token),
            {
              body: {
                content: `:octagonal_sign: Internal App Error. Try again or contact an ${AppAbbreviationName} Executive`,
                flags: MessageFlags.Ephemeral,
                with_response: true,
                enforce_nonce: true,
              },
              headers: {
                "X-Nonce": uuidv4(),
              },
            }
          );
          return new NextResponse("Success");
        }
      default:
        return NextResponse.json({
          type: InteractionResponseType.ChannelMessageWithSource,
          data: { content: `Unknown command` },
        });
    }
  }
  return new NextResponse("Unknown command", { status: 400 });
}
