export interface CellLesson { id: string; title: string; markdown: string }
export interface CellQuestion { id: string; lesson: string; question: string; options: [string,string,string,string]; letter: 'A'|'B'|'C'|'D'; explanation: string }
export interface CellContent { version: 1; status: 'academic-review-pending'; course: 'Cell Structure'; scope: 'HB1:First'; lessons: CellLesson[]; questions: CellQuestion[] }
export interface CellAnswer { question: string; option: 0|1|2|3 }
export interface CellAttempt { id: string; completedAt: string; answers: CellAnswer[] }
export interface CellDraft { id: string; questions: string[]; index: number; answers: CellAnswer[]; selected: 0|1|2|3|null; checked: boolean }
export interface CellState { version: 1; lessons: Record<string,string>; attempts: CellAttempt[]; draft: CellDraft|null; reading?: Record<string, CellReadingPosition> }

export interface CellReadingPosition { section: string; offset: number; updatedAt: string }
// Optional reading: Record<string, CellReadingPosition> extends the existing version-1 state;
// older records without it remain valid. Offset is approximate position, never mastery.
