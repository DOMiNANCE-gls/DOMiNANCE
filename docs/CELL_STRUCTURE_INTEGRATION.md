# Cell Structure pilot integration

This feature adapts the supplied kit to DOMiNANCE-gls/DOMiNANCE and Firebase. The kit's original Supabase/dominance-learn deployment instructions do not apply. Phase 1 was checkpointed as 89d982a on pj/student-experience-foundation; the separate pilot branch is codex/hb1-cell-structure-content. No merge or deployment is authorized.

## Content and import

Unchanged source lessons and question JSON are versioned under content/cell-structure. schema.d.ts documents the JavaScript data contracts; no TypeScript toolchain has been introduced. Run npm run content:cell to rebuild the deterministic public/dashboard/cell-content.js student asset. npm run build recompiles it automatically. Stable source filenames and question IDs are the upsert keys: rerunning compilation replaces the same generated asset, never appending duplicate lessons/questions or writing to Firebase.

The compiler checks 46 distinct lessons, 170 distinct questions, four distinct nonempty options, valid A–D answers and valid lesson references. It removes only internal QA sections and source/status metadata from student output. Lecture content, learning missions where supplied, Slide Essentials, Concept Connections and scientific clarification notes are retained. No academic text or replacement questions were generated. Source-page citations embedded in academic explanations remain; provenance metadata fields are excluded.

No QA CSVs, original slide screenshots, inventoried figures or new diagrams are published. Diagram placement and labels require academic review. Not every question has a signed four-option scientific reconciliation, and not every lesson/figure has independent slide-by-slide approval. The pilot is explicitly labelled awaiting academic approval.

## Existing application integration

public/dashboard/cell-structure.js adds a bounded safe Markdown renderer (escaped HTML; headings, emphasis, lists, tables; no executable HTML, images, or links), searchable lesson catalogue, read markers and lesson/all-course practice. It plugs into existing My Courses, Practice and My Progress without redesigning Home/Profile or migrating the React/iframe architecture. Existing course eligibility and favourites are preserved. HB1 Semester 1 content remains accessible for later eligible students through previous years.

Students may change a selection before Check answer. Checking locks that question and reveals the correct option and supplied explanation. Options shuffle while storing their original indices, preserving the A–D mapping. Untimed practice saves one resumable draft, including selected answers and explanation state; explicit Exit practice keeps it. Browser history uses the existing accessible confirmation. Reload presents Resume saved practice rather than silently starting a new attempt. Completion records once and retains a focused result screen with a clear return button. No timed mode, timer, official score, mastery claim, flashcards or LAMLA content engine is added.

Existing generic quizzes/LAMLA remain demonstrations with their original discard-on-exit behaviour. Cell Structure results appear in a separate My Progress panel, using acknowledged data only; they are not silently mixed into existing demo-labelled Home metrics or daily goals. Home Continue Learning can reopen the validated lesson ID; reading-position tracking is not yet supported.

## Persistence, access and migration

The authenticated parent owns identity. Additive users/{auth.uid}.dashboardState.cellStructure JSON uses the existing private profile document and authenticated storage adapter. Completion histories and read markers merge in a Firestore transaction, deduplicating attempt IDs. One in-progress draft per account uses last-writer behaviour across tabs; simultaneous independent drafts are not supported. Pilot limits: 100 completed attempts and the existing 100,000-character field limit; capacity failures preserve records and report a save error rather than pruning history.

UI history is self-reported and client-editable, never an authorization source or certified examination record. Existing production Firestore rules were neither edited nor deployed. Emulator rules deny ordinary students access to another student's private profile/state; existing super-admin permissions are unchanged. Academic level filtering is navigation policy, not a new content secrecy boundary: the compiled lessons/questions are static application assets and can be fetched directly. A paid/licensed or secure assessment release would need separately approved protected content delivery and server-side grading. No such release is claimed here.

No ambiguous legacy browser data is imported. Existing demo histories/preferences/profile values remain separate. Failed writes use the existing sync banner and Retry; unacknowledged data is memory-only and is not guaranteed to survive closing/reloading while offline. Corrupt pilot state is not overwritten. No production test accounts, requests or data writes were used.

No database migration or admin seed is necessary. Rollback: revert the pilot integration commit to the Phase 1 checkpoint; leave the additive private field intact for a future reviewed migration. Do not delete student data to roll back UI code.

## Verification and review

See the draft PR for final command results and UI captures. Use fictional accounts on demo-dominance only: npm run emulators, npm run dev:emulator, npm test, npm run test:emulators, npm run lint and npm run build. Review the 46/170 source package academically before considering merge. Ofobi's GitHub reviewer handle is not established; do not guess an account or send unsolicited messages.

Physical touch devices, screen readers, production Firebase behaviour and exhaustive scientific/figure review remain outside verified results. A narrow supported Markdown subset is intentional; future content requiring links, code/math blocks or figures needs a reviewed renderer extension.

## Follow-up onboarding clarification

The intended student flow is year and applicable semester, with eligible courses provided automatically. All eligible courses already appear in My Courses without manual favourites. The optional onboarding/Home favourites picker remains from Phase 1 under the explicit preserve-selection constraint. Remove that onboarding step and reconcile the Home empty-state wording in the next separately reviewed correction; it is not a prerequisite for this pilot and must not become a course-access gate.

Verified locally: 83 automated tests passed; the real isolated Auth/Firestore integration scenario passed (including expected cross-account permission denials); lint passed with the same eight pre-existing legacy React warnings; production build passed with the existing bundle-size warning. The shared validation/index split keeps academic text out of the React account bundle (1,082.78 kB final versus 1,075.26 kB Phase 1, before gzip). The generated content is loaded by the authenticated iframe.

Actual interface checks: fictional registration/onboarding, course opening/search, lesson/table rendering, mark-as-read, selection changes, checking/explanations, one-question completion, reload/Resume, Escape cancellation, confirmed exit preserving the draft, Home Continue Learning, confirmed My Progress results, sign-out/account switching and return-to-first-account persistence. A second fictional HB1 student selected no favourites and still saw Cell Structure in My Courses, with zero activity from the first account. Desktop and 390px layouts checked; phone reader had equal document client/scroll widths (380px) and contained table scrolling. Automated UI-handler tests additionally completed a six-question lesson. Physical touch and screen-reader testing remain unverified.

Review images (fictional emulator account only):

![Desktop lesson](review/cell-structure-desktop-lesson.png)
![Mobile lesson](review/cell-structure-mobile-lesson.png)
![Mobile answer explanation](review/cell-structure-mobile-practice.png)
