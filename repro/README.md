# Minimal reproducible HTML emails for Nextcloud Mail #14248 and #14249

These two *.eml fixtures contain synthetic data only; they are not copies of private
messages and are safe to import into test mailboxes.

- 14248-hidden-mso.eml: HTML email containing Outlook-only CSS inside a
  downlevel-hidden MSO conditional comment. In unpatched Nextcloud Mail,
  HTMLPurifier's ExtractStyleBlocks can leak the CSS into the regular message.
  Normal web rendering should not apply this CSS.
- 14249-flexbox.eml: Inline valid Flexbox styles for centering a 90px logo
  and aligning product-description and quantity columns. Unpatched HTMLPurifier
  removes the Flexbox declarations.

## Screenshots

Open an imported fixture in a test installation of Mail without the corresponding
patch, then open the same fixture with that patch. Capture the same message view,
at the same width and zoom, for a genuine before/after pair.

No screenshots are included here: illustrative browser mockups must not be
presented as authentic Nextcloud Mail UI captures.

Both PRs remain drafts while the requested UI evidence is outstanding.
