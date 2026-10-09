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
		if (cursor < 0) {
			return envelope.flags?.seen === true
				&& envelope.dateInt < Math.abs(cursor)
		}

		return (envelope.flags?.seen !== true && envelope.dateInt < cursor)
			|| envelope.flags?.seen === true
	}

	if (sortOrder === 'oldest') {
		return envelope.dateInt > cursor
	}

	return envelope.dateInt < cursor
}
