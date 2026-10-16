/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

export function compareEnvelopes(sortOrder, a, b) {
	if (sortOrder === 'unread') {
		const aSeen = a.flags?.seen === true
		const bSeen = b.flags?.seen === true

		if (aSeen !== bSeen) {
			return aSeen ? 1 : -1
		}

		return b.dateInt - a.dateInt
			|| (Number(b.databaseId) || 0) - (Number(a.databaseId) || 0)
	}

	if (sortOrder === 'oldest') {
		return a.dateInt - b.dateInt
	}

	return b.dateInt - a.dateInt
}

export function envelopeCursor(sortOrder, envelope) {
	if (sortOrder === 'unread') {
		return envelope.flags?.seen === true
			? -envelope.dateInt
			: envelope.dateInt
	}

	return envelope.dateInt
}

export function isEnvelopeAfterCursor(sortOrder, envelope, cursor) {
	if (sortOrder === 'unread') {
		const timestamp = typeof cursor === 'object' ? cursor.timestamp : cursor
		const id = typeof cursor === 'object' ? cursor.id : undefined
		const older = envelope.dateInt < Math.abs(timestamp)
			|| (id !== undefined && envelope.dateInt === Math.abs(timestamp) && envelope.databaseId < id)

		if (timestamp < 0) {
			return envelope.flags?.seen === true && older
		}

		return (envelope.flags?.seen !== true && older)
			|| envelope.flags?.seen === true
	}

	if (sortOrder === 'oldest') {
		return envelope.dateInt > cursor
	}

	return envelope.dateInt < cursor
}
