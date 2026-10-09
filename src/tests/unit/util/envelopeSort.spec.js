/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it } from 'vitest'
import {
	compareEnvelopes,
	envelopeCursor,
	isEnvelopeAfterCursor,
} from '../../../util/envelopeSort.js'

function envelope(dateInt, seen) {
	return {
		dateInt,
		flags: { seen },
	}
}

describe('envelopeSort', () => {
	it('sorts unread first and keeps both groups newest first', () => {
		const messages = [
			envelope(400, true),
			envelope(100, false),
			envelope(300, false),
			envelope(200, true),
		]

		expect(messages.sort((a, b) => compareEnvelopes('unread', a, b)))
			.toEqual([
				envelope(300, false),
				envelope(100, false),
				envelope(400, true),
				envelope(200, true),
			])
	})

	it('encodes unread and read phases in the cursor sign', () => {
		expect(envelopeCursor('unread', envelope(300, false))).toBe(300)
		expect(envelopeCursor('unread', envelope(300, true))).toBe(-300)
	})

	it('continues from unread messages into all read messages', () => {
		const cursor = 300

		expect(isEnvelopeAfterCursor('unread', envelope(200, false), cursor)).toBe(true)
		expect(isEnvelopeAfterCursor('unread', envelope(400, false), cursor)).toBe(false)
		expect(isEnvelopeAfterCursor('unread', envelope(500, true), cursor)).toBe(true)
	})

	it('continues only through older read messages in the read phase', () => {
		const cursor = -300

		expect(isEnvelopeAfterCursor('unread', envelope(200, true), cursor)).toBe(true)
		expect(isEnvelopeAfterCursor('unread', envelope(400, true), cursor)).toBe(false)
		expect(isEnvelopeAfterCursor('unread', envelope(100, false), cursor)).toBe(false)
	})
})
