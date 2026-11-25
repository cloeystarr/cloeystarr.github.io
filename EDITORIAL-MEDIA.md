Every standalone photograph in Portals needs an executed AI treatment and visual
review before publication. This includes supporting images and photographic video
previews. Borders, CSS filters and unexecuted prompts do not satisfy the requirement.

Use the actual source photograph and Chloe's references. Preserve facial likeness,
body, gesture, clothing and event context. Check hands, name tags, signs and QR codes
at full size. Keep fine text source-soft when it cannot be reproduced faithfully.
Do not generate a new event, costume or person as documentary evidence.

Save versioned derivatives in assets/editorial, keep the originals, retain source
credits and links, and identify AI treatments in captions and alt text. A treated
film preview does not change or finish the source film. Existing authored AI art,
quoted posts, interfaces and diagrams retain their source integrity; these categories
must not be used to exempt standalone photos.

Register reviewed assets, their hashes and classifications in
content/editorial-media.json. New or changed images require fresh visual review.
Run `python3 scripts/check_editorial_media.py` before publishing and after builds.
The checker rejects unknown assets, changed reviewed files, untreated original photo
paths, missing disclosures, empty sources and photo reuse across different stories.
It does not establish artistic approval or grant permission to publish new drafts.

The November 2026 historical photo repair covers the 38 existing Portals stories.
The canonical approved headshot and separately approved site rooms remain protected;
the blog uses a separate light/film-texture derivative where required.

November 25, 2026: Chloe directs that captions omit AI-editing disclosures.
Keep the executed treatments, source relationships and reviews in production
records; caption the scene and retain relevant credits. This supersedes the
earlier visible-caption-label requirement.
