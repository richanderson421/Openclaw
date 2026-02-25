# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

## Discord Event Digest Logic (Forge)

When generating "next 7 days" digests from Discord scheduled events:

1. Pull events via Discord event-list for the target guild.
2. Use each event's concrete `scheduled_start_time` (ignore recurrence metadata for day labels).
3. Convert every timestamp to `America/New_York` before grouping or labeling.
4. Group by **local ET date key** (`YYYY-MM-DD` in ET), not UTC date.
5. Sort by local datetime ascending.
6. Display as `Day, Mon D, h:mm AM/PM` in ET.
7. Include events where `start >= now` and `< now + 7 days`.
8. Do not infer additional instances beyond what Discord returns in this window.

This avoids day-shift bugs caused by UTC timestamps + recurrence interpretation.

## Gmail Safety Rule (Mr_Anderson)

For `work-gmail` MCP access:

- **Never run modify/send/delete/trash/label-changing actions without explicit per-action approval from Mr_Anderson.**
- Read/search/summarize is allowed by default.
- If a requested action could change mailbox state, ask first and wait for explicit confirmation.

---

Add whatever helps you do your job. This is your cheat sheet.
